import * as dotenv from 'dotenv';
dotenv.config();

import { Coordinate, Region, TextRegion } from "src/app/models/text-region";
import Axios from 'axios';
import LabelStatus from 'src/app/models/label-status';
import User from 'src/app/models/user';
import uid from 'uid';

const craftHost: string = process.env.CRAFT_HOST;
const craftPort: string = process.env.CRAFT_PORT;

function getCraftApi(api: string): string {
    return `http://${craftHost}:${craftPort}${api}`;
}

function processImageWithCraft(imageId: string, user: User, image: Buffer): Promise<TextRegion[]> {
    return new Promise<TextRegion[]>((resolve, reject) => {
        Axios.post(getCraftApi('/query_box'), image, {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        }).then((result) => {
            const regions: Region[] = [];
            for (let item of result.data.regions) {
                const vertices: Coordinate[] = [];
                for (let v of item) {
                    vertices.push(Coordinate.parseFromJson(v));
                }
                regions.push(new Region(vertices));
            }
            const results: TextRegion[] = [];
            for (let item of regions) {
                results.push(new TextRegion(
                    uid(35),
                    imageId,
                    item,
                    null,
                    LabelStatus.NotLabeled,
                    user,
                    null,
                    null
                ));
            }
            resolve(results);
        }, reject);
    });
}

export { processImageWithCraft };