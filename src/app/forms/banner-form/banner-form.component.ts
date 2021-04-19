import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from 'services/configuration.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  public fg: FormGroup;
  isEdit = false;
  @Input() content;
  uploadPercent;
  documents = [];
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private storage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) {
    this.fg = this.fb.group({
      bannerId: [0],
      title: [''],
      subTitle: [''],
      image: [null],
      isActive: [true]
    })
  }
  ngOnInit() {
    if (this.content && this.content.rowData) {
      this.isEdit = true;
      this.initializeFormWithValues(this.content.rowData);
    }
  }
  initializeFormWithValues = (banner) => {
    Object.keys(this.fg.controls).forEach(key => {
      this.fg.controls[key].setValue(banner[key]);
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
          this.activeModal.close(true);
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
          this.activeModal.close(true);
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

  uploadFile(event) {
    if (event && event.target.files.length > 0) {
      this.spinner.show();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.uploadFilesToFirebase(event.target.files[i]);
      }
    }
  }
  public uploadFilesToFirebase = (file: File) => {
    const filePath = `Uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(res => {
          this.documents.push({ documentPath: res, documentName: file.name });
          this.fg.controls['image'].setValue(res);
          this.spinner.hide();
          console.log(this.documents);
        });
      })
    )
      .subscribe();
  }
}
