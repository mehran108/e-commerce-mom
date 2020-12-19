import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() title;
  @Input() content;
  files = [];
  public fg: FormGroup;
  isEdit = false;
  categoryList = [];
  brandList = [];
  uploadPercent;
  documents = [];
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit() {
    this.configService.GetCategoryList({}).subscribe(res => {
      this.categoryList = res;
    });
    this.configService.GetBrandList({}).subscribe(res => {
      this.brandList = res;
    });
    this.initializeForm();
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
  public initializeForm = () => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'\&$#@!`";
    const lengthOfCode = 6;
    this.fg = this.fb.group({
      productId: [0],
      productName: ['', Validators.required],
      price: [null, Validators.required],
      salesPrice: [null],
      productCode: [this.makeRandom(lengthOfCode, possible), Validators.required],
      discount: [null],
      shortDetails: [null],
      description: [null],
      stock: [null],
      brandId: [null],
      sale: [null],
      categoryId: [null],
      newPro: [null],
      tags: [''],
      pictures: []
    });
  }
  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  onRemove = (file) => {

  }
  onSelect = (file) => {

  }
  onSubmit() {
    const model = {
      ...this.fg.value
    };
    model.stock = model.stock ? 1 : 0;
    if (this.isEdit) {
      this.configService.UpdateProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product updated successfully.', 'Product');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Product not updated successfully.', 'Product');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Product not updated successfully.', 'Product');
        this.activeModal.close();
      });
    } else {
      this.configService.AddProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product added successfully.', 'Product');
          this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Product not added successfully.', 'Product');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Product not added successfully.', 'Product');
        this.activeModal.close();
      })
    }
  }
  uploadFile(event) {
    if (event && event.target.files.length > 0) {
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
          console.log(this.documents);
        });
      })
    )
      .subscribe();
  }
}
