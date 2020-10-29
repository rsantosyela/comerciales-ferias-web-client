import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { FairsComponent } from './components/fairs/fairs.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CommercialAgentsComponent } from './components/commercial-agents/commercial-agents.component';
import { EditFairComponent } from './components/edit-fair/edit-fair.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { EditCommercialAgentComponent } from './components/edit-commercial-agent/edit-commercial-agent.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';

import { ResetPasswordRenderComponent } from './custom-components/reset.password.render.component';
import { CustomActionsRenderComponent } from './custom-components/custom.actions.render.components';
import { CommercialAgentRenderComponent } from './custom-components/commercial.agent.render.component';
import { FairRenderComponent } from './custom-components/fair.render.component';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    FairsComponent,
    ContactsComponent,
    CommercialAgentsComponent,
    EditFairComponent,
    EditContactComponent,
    EditCommercialAgentComponent,
    UsersComponent,
    LoginComponent,
    HeaderComponent, 
    ResetPasswordRenderComponent, 
    CustomActionsRenderComponent,
    CommercialAgentRenderComponent,
    FairRenderComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [ResetPasswordRenderComponent, CustomActionsRenderComponent, CommercialAgentRenderComponent, FairRenderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
