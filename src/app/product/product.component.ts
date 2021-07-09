import { AllCommunityModules, ValueGetterParams } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from 'app/forms/product-form/product-form.component';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { NameRendererComponent } from 'common/name.renderer';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public columnDefs = [
    { 
     headerName: 'Sr. no',
     valueGetter: (args) => this._getIndexValue(args),
     cellRenderer: 'nameRenderer',
     cellRendererParams: {
     onClick: this.open.bind(this),
    },
     pinned: 'left',
     width:120
    }
    ,
    {
    headerName: 'Part Number',
    field: 'partNumber'
  },
    {
    headerName: 'Product',
    field: 'productName'
  },
  {
    headerName: 'Product Price',
    field: 'price'
  },
  {
    headerName: 'Product Sale Price',
    field: 'salesPrice'
  },
  {
    headerName: 'Product Code',
    field: 'productCode'
  },
  {
    headerName: 'Discount',
    field: 'discount'
  },
  {
    headerName: 'Category',
    field: 'category.categoryName'
  },
  {
    headerName: '',
    field: 'delete',
    filter: false,
    pinned: 'right',
    cellRenderer: 'deleteButtonRenderer',
    cellRendererParams: {
      onClick: this.openRemoveDialog.bind(this),
    },
    width: 80
  }
  ];
  _getIndexValue(args: ValueGetterParams): any {
    return args.node.rowIndex + 1;
  } 
  public gridOptions: any;
  public info: string;
  private gridApi: any;
  public productList = [];
  public categoryList = [];
  public modules = AllCommunityModules;
  public gridColumnApi: any;
  public pinnedBottomRowData: any;
  public getRowStyle: any;
  public selectedCategory: any;
  constructor(
    private modalService: NgbModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    public router: Router
  ) {
    this.gridOptions = {
      frameworkComponents: {
        nameRenderer: NameRendererComponent,
        deleteButtonRenderer: ButtonRendererComponent
      },
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      },
      pagination: true,
      paginationAutoPageSize: true,
    };
  }
  async ngOnInit() {
    this.categoryList = await this.configService.GetCategoryList({}).toPromise();
    this.getProductList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    // const modalRef = this.modalService.open(ProductFormComponent, { size: 'lg' });
    // modalRef.componentInstance.content = content;
    // modalRef.result.then(res => {
    //   if (res) {
    //     this.getProductList();
    //   }
    // });
    if (content) {
      this.router.navigate(['/product-form'], {queryParams: {
        id: btoa(content.rowData.productId)
      }})
    } else {
      this.router.navigate(['/product-form'])
    }
  }
  openRemoveDialog(row: any): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = row.rowData.productName;
    modalRef.componentInstance.content = row.rowData;
    modalRef.result.then(res => {
      this.removeProduct(res);
    });
  }
  public removeProduct(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        isActive: false
      };
      this.configService.ActivateProduct(model).subscribe(res => {
        if (res) {
          this.toastr.success('Product removed successfully.', 'Product');
          this.getProductList();
        }
      }, error => {
        this.toastr.info('Product not removed successfully.', 'Oops');
      })
    }
  }
  public getProductList = () => {
    this.configService.GetProductList({}).subscribe((res: any) => {
      this.productList = res;
      this.productList = this.productList.map(product => ({ ...product, category: this.categoryList.find(cat => cat.categoryId === product.categoryId) }))
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onFilterTextBoxChanged(event) {
    this.gridOptions.api.setQuickFilter(event.target.value);
  }
}
