import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ToastrModule } from 'ngx-toastr';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AgGridModule } from '@ag-grid-community/angular';
import { NameRendererComponent } from "../common/name.renderer";
import { ButtonRendererComponent } from "../common/button-renderer.component";
import { EditButtonRendererComponent } from "../common/edit-button-renderer";
import { ViewRendererComponent } from "../common/view-renderer";
import { ToggleButtonRendererComponent } from "../common/toggle-button-renderer";
import { ConfirmationDialogComponent } from 'reusable/confirmation-dialog/confirmation-dialog.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    AgGridModule.forRoot(),
  ],
  providers: [
    LocalstorageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    PerfectScrollbarModule,
    AgGridModule,
    NameRendererComponent,
    ButtonRendererComponent,
    EditButtonRendererComponent,
    ToggleButtonRendererComponent,
    ViewRendererComponent,
    ConfirmationDialogComponent
  ],
  declarations: [
    NameRendererComponent,
    ButtonRendererComponent,
    EditButtonRendererComponent,
    ToggleButtonRendererComponent,
    ViewRendererComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    NameRendererComponent,
    ButtonRendererComponent,
    EditButtonRendererComponent,
    ToggleButtonRendererComponent,
    ViewRendererComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedLibraryModule { }
