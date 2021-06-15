import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {
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
      typeId: [0],
      typeName: [''],
      description: [''],
      typeImage: [''],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (type) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(type[key]);
    })
  }
  onSubmit() {
    const type = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateType(type).subscribe(res => {
        if (res) {
          this.toastr.success('Type updated successfully.', 'Type');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Type not updated successfully.', 'Type');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Type not updated successfully.', 'Type');
        this.activeModal.close();
      });
    } else {
      this.configService.AddType(type).subscribe(res => {
        if (res) {
          this.toastr.success('Type added successfully.', 'Type');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Type not added successfully.', 'Type');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Type not added successfully.', 'Type');
        this.activeModal.close();
      })
    }
  }
}
