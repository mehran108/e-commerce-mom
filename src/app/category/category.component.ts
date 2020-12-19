import { Component, OnInit } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFormComponent } from 'app/forms/category-form/category-form.component';
import { ConfigurationService } from 'services/configuration.service';
import { NameRendererComponent } from 'common/name.renderer';
import { ButtonRendererComponent } from 'common/button-renderer.component';
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public columnDefs = [
    {
      headerName: 'Category',
      field: 'categoryName',
      cellRenderer: 'nameRenderer',
      cellRendererParams: {
        onClick: this.open.bind(this),
      },
      pinned: 'left',
    },
    {
      headerName: 'Category Description',
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
    public configService: ConfigurationService,
    public toastr: ToastrService
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
    this.getCategoryList();
    this.getRowStyle = (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
  }
  open(content) {
    const modalRef = this.modalService.open(CategoryFormComponent, { size: 'sm' });
    modalRef.componentInstance.content = content;
    modalRef.result.then(res => {
      if (res) {
        this.getCategoryList();
      }
    });
  }
  openRemoveDialog(row: any): void {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'sm', });
    modalRef.componentInstance.header = row.rowData.categoryName;
    modalRef.componentInstance.content = row.rowData;
    modalRef.result.then(res => {
      this.removeCategory(res);
    });
  }
  public removeCategory(selectedItem: any) {
    if (selectedItem) {
      const model = {
        ...selectedItem,
        active: false
      };
      this.configService.ActivateCategory(model).subscribe(res => {
        if (res) {
          this.toastr.success('Category removed successfully.', 'Category');
          this.getCategoryList();
        }
      }, error => {
        this.toastr.info('Category not removed successfully.', 'Oops');
      })
    }
  }
  public getCategoryList = () => {
    this.configService.GetCategoryList({}).subscribe((res: any) => {
      this.categoryList = res
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
