import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-business-info-form',
  templateUrl: './business-info-form.component.html',
  styleUrls: ['./business-info-form.component.scss']
})
export class BusinessInfoFormComponent implements OnInit {
  public fg: FormGroup;
  isEdit = false;
  @Input() content;
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
    this.fg = this.fb.group({
      id: [0],
      value: [''],
      code: [''],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (brand) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(brand[key]);
    })
  }
  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateLookupValue(model).subscribe(res => {
        if (res) {
          this.toastr.success('Business Information updated successfully.', 'Business Information');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Business Information not updated successfully.', 'Business Information');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Business Information not updated successfully.', 'Business Information');
        this.activeModal.close();
      });
    }
  }

}
