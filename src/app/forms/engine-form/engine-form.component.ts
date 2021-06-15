import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';
@Component({
  selector: 'app-engine-form',
  templateUrl: './engine-form.component.html',
  styleUrls: ['./engine-form.component.scss']
})
export class EngineFormComponent implements OnInit {
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
      engineId: [0],
      engineName: [''],
      description: [''],
      engineImage: [''],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (engine) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(engine[key]);
    })
  }
  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateEngine(model).subscribe(res => {
        if (res) {
          this.toastr.success('Engine updated successfully.', 'Engine');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Engine not updated successfully.', 'Engine');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Engine not updated successfully.', 'Engine');
        this.activeModal.close();
      });
    } else {
      this.configService.AddEngine(model).subscribe(res => {
        if (res) {
          this.toastr.success('Engine added successfully.', 'Engine');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Engine not added successfully.', 'Engine');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Engine not added successfully.', 'Engine');
        this.activeModal.close();
      })
    }
  }
}
