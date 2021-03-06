import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
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
  items: GalleryItem[];
  files = [];
  public fg: FormGroup;
  isEdit = false;
  categoryList = [];
  brandList = [];
  uploadPercent;
  documents = [];
  productId;
  constructor(
    public fb: FormBuilder,
    // public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private storage: AngularFireStorage,
    public gallery: Gallery, public lightbox: Lightbox,
    public route: ActivatedRoute,
    private modalService: NgbModal
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
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.productId = atob(params.id);
        this.getProduct();
      }
    });
    this.loadGallery();
  }
  getProduct() {
    this.configService.GetProduct({ productId: this.productId }).subscribe(res => {
      this.isEdit = true;
      this.initializeFormWithValues(res);
      this.documents = res.pictures;
      this.loadGallery();
    });
  }
  loadGallery = () => {
    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.documents.map(item => new ImageItem({ src: item.url, thumb: item.url }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Bottom
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
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
    const doc = this.documents.filter(document => !document.documentId);
    this.fg.controls['pictures'].setValue(this.documents);
    const model = {
      ...this.fg.value
    };
    model.stock = model.stock ? 1 : 0;
    if (this.isEdit) {
      this.configService.UpdateProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product updated successfully.', 'Product');
          // this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Product not updated successfully.', 'Product');
          // this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Product not updated successfully.', 'Product');
        // this.activeModal.close();
      });
    } else {
      this.configService.AddProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product added successfully.', 'Product');
          // this.activeModal.close(true);
        } else {
          this.toastr.info('Something went wrong Product not added successfully.', 'Product');
          // this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Product not added successfully.', 'Product');
        // this.activeModal.close();
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
          this.documents.push({ url: res, documentName: file.name });
          console.log(this.documents);
        });
      })
    )
      .subscribe();
  }
  openConfirmation = (document) => {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = 'Picture';
    modalRef.componentInstance.content = document;
    modalRef.result.then(res => {
      if (res) {
        if (document.documentId) {
          const model = {
            ...document,
            active: false
          }
          this.configService.ActivateProductDocument(model).subscribe(res => {
            if (res) {
              this.documents = this.documents.filter(doc => doc.documentId !== document.documentId);
            }
          });
        } else {
          this.documents = this.documents.filter(doc => doc.documentId !== document.documentId)
        }
      }
    });

  }
}
