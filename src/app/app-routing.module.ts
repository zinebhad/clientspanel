import { AuthGuardGuard } from './guards/auth-guard.guard';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddClientComponent } from './components/addclient/add-client.component';
import { ClientsComponent } from './components/clients/clients.component';


const routes: Routes = [
  {
    path :"",
    component : DashboardComponent,canActivate :[AuthGuardGuard]
  },
 
  {
    path :"login",
    component : LoginComponent
  },
  {
    path :"register",
    component : RegisterComponent
  },
  {
    path :"client/add",
    component : AddClientComponent,canActivate :[AuthGuardGuard]
  },
  {
    path :"client/edit/:id",
    component : EditClientComponent,canActivate :[AuthGuardGuard]
  },
  {
    path :"client/:id",
    component: DetailsClientComponent,canActivate :[AuthGuardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
