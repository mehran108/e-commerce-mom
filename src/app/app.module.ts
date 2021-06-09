import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { DragulaService } from "ng2-dragula";
import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { BannerComponent } from './banner/banner.component';
import { ProductFormComponent } from './forms/product-form/product-form.component';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { BannerFormComponent } from './forms/banner-form/banner-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from 'services/configuration.service';
import { BrandComponent } from './brand/brand.component';
import { BrandFormComponent } from './forms/brand-form/brand-form.component';
import { HttpInterceptorService } from "services/http-interceptor.service";
import { SharedLibraryModule } from "modules/shared.library.module";
import { ConfirmationDialogComponent } from "reusable/confirmation-dialog/confirmation-dialog.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "environments/environment";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { SliderComponent } from './slider/slider.component';
import { SliderFormComponent } from "./forms/slider-form/slider-form.component";
import { BusinessInfoComponent } from './business-info/business-info.component';
import { BusinessInfoFormComponent } from "./forms/business-info-form/business-info-form.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from "@kolkov/angular-editor";
// import { MatFormFieldModule } from "@angular/material";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    ProductComponent,
    CategoryComponent,
    BannerComponent,
    OrderComponent,
    UserComponent,
    ProductFormComponent,
    CategoryFormComponent,
    BannerFormComponent,
    UserFormComponent,
    BrandComponent,
    BrandFormComponent,
    SliderFormComponent,
    SliderComponent,
    BusinessInfoComponent,
    BusinessInfoFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    SharedLibraryModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR KEY"
    }),
    PerfectScrollbarModule,
    NgxSpinnerModule,
    NgSelectModule,
    MatSnackBarModule,
    MatCardModule,
    AngularEditorModule
    // MatFormFieldModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DragulaService,
    ConfigurationService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: BUCKET, useValue: 'gs://angular-systems.appspot.com/' }
  ],
  entryComponents: [
    ProductFormComponent,
    CategoryFormComponent,
    BannerFormComponent,
    UserFormComponent,
    BrandFormComponent,
    UserFormComponent,
    SliderFormComponent,
    BusinessInfoFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
