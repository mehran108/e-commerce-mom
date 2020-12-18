import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() title;
  files = [];
  public fg: FormGroup;
  isEdit = false;
  categoryList = [
    {categoryId: 1, categoryName: 'Men'},
    {categoryId: 2, categoryName: 'Women'},
    {categoryId: 3, categoryName: 'Assessories'},
  ];
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }
  public initializeForm = () => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'\&$#@!`";
    const lengthOfCode = 6;
    this.fg = this.fb.group({
      id: null,
      name: ['', Validators.required],
      price: [null, Validators.required],
      salePrice: [null],
      productCode: [this.makeRandom(lengthOfCode, possible), Validators.required],
      discount: [null],
      shortDetails: [null],
      description: [null],
      stock: [null],
      brand: [null],
      sale: [null],
      category: [null],
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
    if (this.isEdit) {
      this.configService.UpdateProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product updated successfully.', 'Product');
          this.activeModal.close();
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
          this.activeModal.close();
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
}
