import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserComponent } from './user/user.component';
import { AccountsComponent } from './accounts/accounts.component';
import { EmailTempletsComponent } from './email-templets/email-templets.component';
import {AuthGuard} from './guards/auth.guard'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
      
      
    },
    {
      path: 'forgotpassword',
     component: ForgotpasswordComponent 
       
    },

    { path: 'changepassword' ,
     component: ChangepasswordComponent,
     canActivate: [AuthGuard] // User must be logged in to view this route
    },

  
    {
      path: 'dashboard',  canActivate: [AuthGuard],children:[
        
        { path: '' , component: DashboardComponent},
           { path: '' , component: HeaderComponent, outlet: 'header'},
           { path: '' , component: NavMenuComponent, outlet: 'navbar'}
        ]},
    
    {
      path:'user',  data: { title: 'users list' }, canActivate: [AuthGuard],children:[
        { path: '' , component: AccountsComponent},
           { path: '' , component: HeaderComponent, outlet: 'header'},
           { path: '' , component: NavMenuComponent, outlet: 'navbar'}
        ]},
    {
      path:'accounts',  canActivate: [AuthGuard],children:[
        { path: '' , component: UserComponent},
           { path: '' , component: HeaderComponent, outlet: 'header'},
           { path: '' , component: NavMenuComponent, outlet: 'navbar'}
        ]},
    {
      path:'email',  canActivate: [AuthGuard],children:[
        { path: '' , component: EmailTempletsComponent},
           { path: '' , component: HeaderComponent, outlet: 'header'},
           { path: '' , component: NavMenuComponent, outlet: 'navbar'}
        ]},
   
    {
      path: '**',
      component: LoginComponent
    },
  ]; 
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  