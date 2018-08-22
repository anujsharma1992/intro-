import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// import pagination component


import { NgxPaginateModule } from 'ngx-paginate';
// import {PaginatorModule} from 'primeng/paginator';
import {NgxPaginationModule} from 'ngx-pagination';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {NgxPaginationModule} from 'ngx-pagination';
// import {UserEditComponent} from './user-edit/user-edit.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserComponent } from './user/user.component';
import { EmailTempletsComponent } from './email-templets/email-templets.component';
import { AccountsComponent } from './accounts/accounts.component';
import{AuthGuard} from './guards/auth.guard'
import { UserService } from './services/admin.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChartsModule } from 'ng2-charts';
import { UserEditComponent } from './user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NavMenuComponent,
    UserComponent,
    EmailTempletsComponent,
    AccountsComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    UserEditComponent,
  
  ],
  imports: [
    NgxPaginateModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    HttpModule,
    AppRoutingModule,

    

  ],
  providers: [AuthService , UserService,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[UserEditComponent],

})
export class AppModule { }
