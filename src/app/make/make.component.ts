import { Component, OnInit } from '@angular/core';
import { AllCommunityModules, ValueGetterParams } from '@ag-grid-community/all-modules';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from 'services/configuration.service';
import { NameRendererComponent } from 'common/name.renderer';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
import { MakeFormComponent } from 'app/forms/make-form/make-form.component';
@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {

  public columnDefs = [
    {
      headerName: 'Sr. no',
      valueGetter: (args) => this._getIndexValue(args),
      cellRenderer: 'nameRenderer',
      cellRendererParams: {
        onClick: this.open.bind(this),
      },
      pinned: 'left',
      width: 120
    }
    ,
    {
      headerName: 'Make Name',
      field: 'makeName'
    },
    {
      headerName: 'Make Description',
      field: 'description',
      width: 500
    },
    {
      headerName: '',
      field: 'delete',
      filter: false,
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
  public categoryList = [];
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
  ngOnInit() {
    this.getMakeList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    const modalRef = this.modalService.open(MakeFormComponent, { size: 'sm' })
    modalRef.componentInstance.content = content;
    modalRef.result.then(res => {
      if (res) {
        this.getMakeList();
      }
    });
  }
  openRemoveDialog(row: any): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = row.rowData.makeName;
    modalRef.componentInstance.content = row.rowData;
    modalRef.result.then(res => {
      this.removeItemMaster(res);
    });
  }
  public removeItemMaster(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        isActive: false
      };
      this.configService.ActivateMake(model).subscribe(res => {
        if (res) {
          this.getMakeList();
        }
      })
    }
  }
  public openModal(data?) {
    // if (data && data.rowData) {
    //   this.selectedCategory = data.rowData;
    // }
  }
  public getMakeList = () => {
    this.configService.GetMakeList({}).subscribe((res: any) => {
      this.categoryList = res
    }, error => {

    });
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
