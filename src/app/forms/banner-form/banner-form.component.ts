import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  public fg: FormGroup;
  isEdit = false;
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
    this.fg = this.fb.group({
      bannerId: [0],
      title: [''],
      subTitle: [''],
      image: [null]
    })
  }

  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateBanner(model).subscribe(res => {
        if (res) {
          this.toastr.success('Banner updated successfully.', 'Banner');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong banner not updated successfully.', 'Banner');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong banner not updated successfully.', 'Banner');
        this.activeModal.close();
      });
    } else {
      this.configService.AddBanner(model).subscribe(res => {
        if (res) {
          this.toastr.success('Banner added successfully.', 'Banner');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong banner not added successfully.', 'Banner');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong banner not added successfully.', 'Banner');
        this.activeModal.close();
      })
    }
  }
  ngOnInit() {
  }

}
