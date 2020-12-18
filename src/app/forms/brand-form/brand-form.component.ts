import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  public fg: FormGroup;
  isEdit = false;
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
    this.fg = this.fb.group({
      id: [],
      brandName: [''],
      brandDescription: [''],
      isActive: [true]
    })
  }

  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateBrand(model).subscribe(res => {
        if (res) {
          this.toastr.success('Brand updated successfully.', 'Brand');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong Brand not updated successfully.', 'Brand');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Brand not updated successfully.', 'Brand');
        this.activeModal.close();
      });
    } else {
      this.configService.AddBrand(model).subscribe(res => {
        if (res) {
          this.toastr.success('Brand added successfully.', 'Brand');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong Brand not added successfully.', 'Brand');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Brand not added successfully.', 'Brand');
        this.activeModal.close();
      })
    }
  }
  ngOnInit() {
  }

}
