import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FormsModule } from '@angular/forms';
import { ImageGridModule } from 'src/app/components/image-grid/image-grid.module';


@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    NzButtonModule,
    NzSkeletonModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzEmptyModule,
    NzTypographyModule,
    FormsModule,
    ImageGridModule
  ],
  exports: [
    VerifyComponent
  ]
})
export class VerifyModule { }
