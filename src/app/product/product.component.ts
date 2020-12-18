import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from 'app/forms/product-form/product-form.component';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public columnDefs = [{
    headerName: 'Product',
    field: 'name',
    cellRenderer: 'nameRenderer',
    cellRendererParams: {
      onClick: this.openModal.bind(this),
    },
    pinned: 'left',
  },
  {
    headerName: 'Product Price',
    field: 'price'
  },
  {
    headerName: 'Product Sale Price',
    field: 'salePrice'
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
    field: 'category'
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
  public gridOptions: any;
  public info: string;
  private gridApi: any;
  public productList = [];
  public modules = AllCommunityModules;
  public gridColumnApi: any;
  public pinnedBottomRowData: any;
  public getRowStyle: any;
  public selectedCategory: any;
  constructor(
    private modalService: NgbModal,
    public configService: ConfigurationService
  ) {
    this.gridOptions = {
      frameworkComponents: {
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
  ngOnInit() {
    this.getProductList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    this.modalService.open(ProductFormComponent, { size: 'lg' }).result.then((result) => {

    }, (reason) => {

    });
  }
  openRemoveDialog(row: any): void {
  }
  public removeItemMaster(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        active: false
      };
      // this.firebaseService.DeleteCategory(selectedItem).then(res => { });
      // this.confirmationDialogRef.close();
    }
  }
  public openModal(data?) {
    // if (data && data.rowData) {
    //   this.selectedCategory = data.rowData;
    // }
  }
  public getProductList = () => {
    this.configService.GetProductList({}).subscribe((res: any) => {
      this.productList = res
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  public cellClicked = (event) => {
    this.selectedCategory = event.data;
    this.openModal();
  }
  onFilterTextBoxChanged(event) {
    this.gridOptions.api.setQuickFilter(event.target.value);
  }
}
