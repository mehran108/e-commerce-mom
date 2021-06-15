import { Component, OnInit } from '@angular/core';
import { AllCommunityModules, ValueGetterParams } from '@ag-grid-community/all-modules';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from 'services/configuration.service';
import { NameRendererComponent } from 'common/name.renderer';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
import { ModelFormComponent } from 'app/forms/model-form/model-form.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

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
      headerName: 'Model Name',
      field: 'modelName'
    },
    {
      headerName: 'Model Description',
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
    this.getModelList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    const modalRef = this.modalService.open(ModelFormComponent, { size: 'sm' })
    modalRef.componentInstance.content = content;
    modalRef.result.then(res => {
      if (res) {
        this.getModelList();
      }
    });
  }
  openRemoveDialog(row: any): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = row.rowData.modelName;
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
      this.configService.ActivateModel(model).subscribe(res => {
        if (res) {
          this.getModelList();
        }
      })
    }
  }
  public openModal(data?) {
    // if (data && data.rowData) {
    //   this.selectedCategory = data.rowData;
    // }
  }
  public getModelList = () => {
    this.configService.GetModelList({}).subscribe((res: any) => {
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
