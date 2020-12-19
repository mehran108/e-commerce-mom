import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderFormComponent } from 'app/forms/slider-form/slider-form.component';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { NameRendererComponent } from 'common/name.renderer';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
import { ConfigurationService } from 'services/configuration.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  public columnDefs = [
    {
      headerName: 'Title',
      field: 'title',
      cellRenderer: 'nameRenderer',
      cellRendererParams: {
        onClick: this.open.bind(this),
      },
      pinned: 'left',
    },
    {
      headerName: 'Sub Title',
      field: 'subTitle',
    },
    {
      headerName: 'Image',
      field: 'image',
      cellRenderer: params => {
        return params.value ? `<img width="50" height="50" src=${params.value}>` : '';
      },
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
  public gridOptions: any;
  public info: string;
  private gridApi: any;
  public sliderList = [];
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
    this.getSliderList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    const modalRef = this.modalService.open(SliderFormComponent, { size: 'sm' })
    modalRef.componentInstance.content = content;
    modalRef.result.then(res => {
      if (res) {
        this.getSliderList();
      }
    });
  }
  openRemoveDialog(row: any): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = row.rowData.title;
    modalRef.componentInstance.content = row.rowData;
    modalRef.result.then(res => {
      this.removeItemMaster(res);
    });
  }
  public removeItemMaster(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        active: false
      };
      this.configService.ActivateSlider(model).subscribe(res => {
        if (res) {
          this.getSliderList();
        }
      })
    }
  }
  public openModal(data?) {
    // if (data && data.rowData) {
    //   this.selectedCategory = data.rowData;
    // }
  }
  public getSliderList = () => {
    this.configService.GetSliderList({}).subscribe(res => {
      this.sliderList = res;
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
