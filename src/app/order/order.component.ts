import { OrderDetailsComponent } from './../forms/order-details/order-details.component';
import { AllCommunityModules, ValueGetterParams } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { NameRendererComponent } from 'common/name.renderer';
import { ConfigurationService } from 'services/configuration.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditButtonRendererComponent } from 'common/edit-button-renderer';
import { OrderStatusComponent } from 'app/forms/order-status/order-status.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public columnDefs = [
    { 
      headerName: 'Sr. no',
      valueGetter: (args) => this._getIndexValue(args),
      cellRenderer: 'nameRenderer',
      cellRendererParams: {
      onClick: this.open.bind(this),
     },
      width:120
     }
     ,
     {
      headerName: 'Status',
      field: 'orderStatus',
      pinned:'left'
    },
     {
      headerName: 'Order Code',
      field: 'orderTrackingID',
    },
    {
      headerName: 'Total Price',
      field: 'orderPrice',
    },
    {
      headerName: 'User Name',
      field: 'userName',
    },
    {
      headerName: 'Phone',
      field: 'userPhone',
    },
    {
      headerName: 'S_R Name',
      field: 'shippingRecieverName'
    },
    {
      headerName: 'S_R Phone',
      field: 'shippingPersonPhone'
    },
    {
      headerName: 'S_R Address',
      field: 'shipperAddress',
      width:620
    },
    // {
    //   headerName: 'B_R Name',
    //   field: 'billRecieverName'
    // },
    // {
    //   headerName: 'B_R Phone',
    //   field: 'billPersonPhone'
    // },
    // {
    //   headerName: 'B_R Address',
    //   field: 'billingAddress'
    // },
   
    {
      headerName: 'Status',
      field: 'orderStatus',
      pinned:'right',
      cellRenderer: 'statusButtonRenderer',
      cellRendererParams: {
        onClick: this.HandleChangeStatus.bind(this)
      },
    },
    {
      headerName: 'Action',
      field: 'delete',
      filter: false,
      pinned: 'right',
      cellRenderer: 'deleteButtonRenderer',
      cellRendererParams: {
        onClick: this.openRemoveDialog.bind(this),
      }
    }
  ];
  _getIndexValue(args: ValueGetterParams): any {
    return args.node.rowIndex + 1;
  } 
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
    public configService: ConfigurationService,
    private modalService: NgbModal
  ) {
    this.gridOptions = {
      frameworkComponents: {
        nameRenderer: NameRendererComponent,
        deleteButtonRenderer: ButtonRendererComponent,
        statusButtonRenderer: EditButtonRendererComponent
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
  HandleChangeStatus(orderRow){
    console.log("orderId",orderRow.rowData['orderId']);
    // const orderId = orderRow.rowData['orderId'];
    const modalRef = this.modalService.open(OrderStatusComponent, { size: 'lg' });
    // const status=["Pending","Approved", "Shipped","Closed"];
    const orderDetail={};
    orderDetail['Id']=orderRow.rowData['orderId'];
    orderDetail['Status']=orderRow.rowData['orderStatus'];
    console.log({orderDetail});
    modalRef.componentInstance.content = orderDetail;
  }
  ngOnInit() {
    this.getOrderList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    const modalRef = this.modalService.open(OrderDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.content = content;
    // const modalRef = this.modalService.open(Order, { size: 'sm' })
    // modalRef.componentInstance.content = content;
    // modalRef.result.then(res => {
    //   if (res) {
    //     this.getBannerList();
    //   }
    // });
  }
  openRemoveDialog(row: any): void {

  }
  public removeItemMaster(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        isActive: false
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
      console.log("orderList",this.orderList);
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
