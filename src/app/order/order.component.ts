import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public columnDefs = [
    {
      headerName: 'Order Code',
      field: 'orderCode',
    },
    {
      headerName: 'First Name',
      field: 'userDetails.user_details.first_name',
    },
    {
      headerName: 'Last Name',
      field: 'userDetails.user_details.last_name'
    },
    {
      headerName: 'Last Name',
      field: 'userDetails.user_details.last_name'
    },
    {
      headerName: 'Contact',
      field: 'userDetails.user_details.mobile'
    },
    {
      headerName: 'City',
      field: 'userDetails.user_details.city_state'
    },
    {
      headerName: 'Country',
      field: 'userDetails.user_details.country'
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
  public orderList = [];
  public modules = AllCommunityModules;
  public gridColumnApi: any;
  public pinnedBottomRowData: any;
  public getRowStyle: any;
  public selectedCategory: any;
  constructor(
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
    this.getOrderList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open() {
  }
  openRemoveDialog(row: any): void {

  }
  public removeItemMaster(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        active: false
      };
    }
  }
  public openModal(data?) {
    // if (data && data.rowData) {
    //   this.selectedCategory = data.rowData;
    // }
  }
  public getOrderList = () => {
    this.configService.GetOrderList({}).subscribe(res => {
      this.orderList = res;
    })
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
