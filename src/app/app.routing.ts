import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FairsComponent } from './components/fairs/fairs.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CommercialAgentsComponent } from './components/commercial-agents/commercial-agents.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './helpers/auth.guard';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'agentes-comerciales', component: CommercialAgentsComponent, canActivate: [AuthGuard]},
    {path: 'contactos', component: ContactsComponent, canActivate: [AuthGuard]},
    {path: 'ferias', component: FairsComponent, canActivate: [AuthGuard]},
    
    //{path: '**', redirectTo: 'usuarios'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);