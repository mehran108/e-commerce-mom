import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from "./forms-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";
import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ArchwizardModule } from 'angular-archwizard';

import { ValidationFormsComponent } from "./validation/validation-forms.component";
import { BasicComponent } from './layouts/basic/basic.component';
import { HorizontalComponent } from './layouts/horizontal/horizontal.component';
import { HiddenLabelsComponent } from './layouts/hidden-labels/hidden-labels.component';
import { FormActionsComponent } from './layouts/form-actions/form-actions.component';
import { BorderedComponent } from './layouts/bordered/bordered.component';
import { StripedRowsComponent } from './layouts/striped-rows/striped-rows.component';
import { InputsComponent } from './elements/inputs/inputs.component';
import { InputGroupsComponent } from './elements/input-groups/input-groups.component';
import { InputGridComponent } from './elements/input-grid/input-grid.component';
import { ArchwizardComponent } from './archwizard/archwizard.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OrderStatusComponent } from './order-status/order-status.component';



@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NGXFormWizardModule,
        ArchwizardModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        NgxSpinnerModule,
        NgSelectModule,
        AngularEditorModule
        
    ],
    declarations: [
        ValidationFormsComponent,
        BasicComponent,
        HorizontalComponent,
        HiddenLabelsComponent,
        FormActionsComponent,
        BorderedComponent,
        StripedRowsComponent,
        InputsComponent,
        InputGroupsComponent,
        InputGridComponent,
        ArchwizardComponent,
        OrderStatusComponent,
    ]

})
export class FormModule { }
