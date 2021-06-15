import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';
@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.scss']
})
export class MakeFormComponent implements OnInit {
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
      makeId: [0],
      makeName: [''],
      description: [''],
      makeImage: [''],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (make) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(make[key]);
    })
  }
  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateMake(model).subscribe(res => {
        if (res) {
          this.toastr.success('Make updated successfully.', 'Make');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Make not updated successfully.', 'Make');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Make not updated successfully.', 'Make');
        this.activeModal.close();
      });
    } else {
      this.configService.AddMake(model).subscribe(res => {
        if (res) {
          this.toastr.success('Make added successfully.', 'Make');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Make not added successfully.', 'Make');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Make not added successfully.', 'Make');
        this.activeModal.close();
      })
    }
  }
}
