import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {

  public fg: FormGroup;
  isEdit = false;
  @Input() content;
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private storage: AngularFireStorage,
    public spinner: NgxSpinnerService
  ) {
    this.fg = this.fb.group({
      modelId: [0],
      modelName: [''],
      description: [''],
      modelImage: [''],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (model) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(model[key]);
    })
  }
  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateModel(model).subscribe(res => {
        if (res) {
          this.toastr.success('Model updated successfully.', 'Model');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Model not updated successfully.', 'Model');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Model not updated successfully.', 'Model');
        this.activeModal.close();
      });
    } else {
      this.configService.AddModel(model).subscribe(res => {
        if (res) {
          this.toastr.success('Model added successfully.', 'Model');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Model not added successfully.', 'Model');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Model not added successfully.', 'Model');
        this.activeModal.close();
      })
    }
  }
}
