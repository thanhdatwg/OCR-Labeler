import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageComparationOption } from 'src/app/models/image-compare-funcs';
import ImageStatus, { getImageStatusString } from 'src/app/models/image-status';
import UploadedImage from 'src/app/models/uploaded-image';
import { BackendService } from 'src/app/services/backend.service';

const IMAGES_PER_PAGE: number = 10;

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.scss']
})
export class MyImagesComponent implements OnInit {
  public currentPage: number = null;
  public imagesPerPage: number = IMAGES_PER_PAGE;
  public imagesCount: number = null;
  public uploadedImages: UploadedImage[] = [];
  public selectedId: number = 0;
  public selectedRegion: UploadedImage = null;
  public isVisible: boolean = false;

  public sortOptions: { label: string, value: ImageComparationOption }[] = [
    { label: 'Upload date (Latest first)', value: ImageComparationOption.UPLOAD_LATEST_FIRST },
    { label: 'Upload date (Oldest first)', value: ImageComparationOption.UPLOAD_OLDEST_FIRST },
    { label: 'Status (Asc.)', value: ImageComparationOption.STATUS_ASC },
    { label: 'Status (Desc.)', value: ImageComparationOption.STATUS_DESC }
  ];
  public selectedSortOption: ImageComparationOption = ImageComparationOption.UPLOAD_LATEST_FIRST;

  public filterStatusOptions: { label: string, value: ImageStatus }[] = [
    { label: getImageStatusString(ImageStatus.Uploaded), value: ImageStatus.Uploaded },
    { label: getImageStatusString(ImageStatus.Processed), value: ImageStatus.Processed },
    { label: getImageStatusString(ImageStatus.NotProcessed), value: ImageStatus.NotProcessed },
    { label: getImageStatusString(ImageStatus.Published), value: ImageStatus.Published }
  ];
  public filteredStatuses: ImageStatus[] = [];

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPage(1, this.selectedSortOption, this.filteredStatuses);
  }

  refresh(): void {
    this.loadPage(this.currentPage, this.selectedSortOption, this.filteredStatuses);
  }

  loadPage(pageId: number, sortOption: ImageComparationOption, filteredStatuses: ImageStatus[]): void {
    this.currentPage = pageId;
    this.selectedSortOption = sortOption;
    this.filteredStatuses = filteredStatuses;
    this.backend.loadUserImages(IMAGES_PER_PAGE * (pageId - 1), IMAGES_PER_PAGE, sortOption, filteredStatuses).then((result) => {
      this.currentPage = result.pageId;
      this.imagesCount = result.imagesCount;
      this.uploadedImages = result.images;
    }, (reason) => {

    });
  }

  onImageClicked(id: number): void {
    this.router.navigateByUrl(`/manage-image/${this.uploadedImages[id].imageId}`);
  }

  changePage(event: number): void {
    if (event === this.currentPage) {
      return;
    }
    this.loadPage(event, this.selectedSortOption, this.filteredStatuses);
  }
}
