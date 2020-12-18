import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerFormComponent } from 'app/forms/banner-form/banner-form.component';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public columnDefs = [
    {
      headerName: 'Title',
      field: 'title',
      autoHeight: true,
    },
    {
      headerName: 'Sub Title',
      field: 'subTitle',
      autoHeight: true,
    },
    {
      headerName: 'Image',
      field: 'image',
      cellRenderer: params => {
        return `<img src=${params.value}>`;
      },
    }
  ];
  public gridOptions: any;
  public info: string;
  private gridApi: any;
  public bannerList = [];
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
    this.getBannerList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    this.modalService.open(BannerFormComponent, {size: 'sm'}).result.then((result) => {

    }, (reason) => {

    });
  }
  openRemoveGoalDialog(row: any): void {
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
  public getBannerList = () => {
    this.configService.GetBannerList({}).subscribe(res => {
      this.bannerList = res;
    }, error => {

    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  }
  public cellClicked = (event) => {
    this.selectedCategory = event.data;
    this.openModal();
  }
  onFilterTextBoxChanged(event) {
    this.gridOptions.api.setQuickFilter(event.target.value);
  }
}
