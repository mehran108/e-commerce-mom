
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
// import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: ``
})

export class ToggleButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  checked = false;
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.checked = this.params.data.isPublish;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onChange instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onChange(params);
    }
  }
}
