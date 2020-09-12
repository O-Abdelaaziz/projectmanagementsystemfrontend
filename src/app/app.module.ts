import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


// import { MessagesMenuComponent } from './shared/messages-menu/messages-menu.component';
// import { NoticeComponent } from './views/notice/notice.component';
// import { BadgeLabelComponent } from './shared/badge-label/badge-label.component';
// import { TaskListComponent } from './views/task-list/task-list.component';
// import { CategoriesComponent } from './views/categories/categories.component';
// import { ListUsersComponent } from './views/list-users/list-users.component';
// import { MainComponent } from './pages/main/main.component';
// import { HeaderComponent } from './pages/main/header/header.component';
// import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
// import { FooterComponent } from './pages/main/footer/footer.component';
// import { MenuSettingsComponent } from './pages/main/menu-settings/menu-settings.component';
// import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { ListCustomersComponent } from './views/customers/list-customers/list-customers.component';
// import { NewCustomerComponent } from './views/customers/new-customer/new-customer.component';
// import { UserComponent } from './views/user/user.component';
// import { UserProfileComponent } from './views/user-profile/user-profile.component';
// import { TaskComponent } from './views/task/task.component';
// import { ProjectIssuesComponent } from './views/project-issues/project-issues.component';
// import { ProjectStatusComponent } from './views/project-status/project-status.component';
// import { NewProjectComponent } from './views/projects/new-project/new-project.component';
// import { ListProjectsComponent } from './views/projects/list-projects/list-projects.component';
//import { EditCustomerComponent } from './views/customers/edit-customer/edit-customer.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    // MessagesMenuComponent,
    // NoticeComponent,
    // BadgeLabelComponent,
    // TaskListComponent,
    // CategoriesComponent,
    // ListUsersComponent,
    // UserComponent,
    // UserProfileComponent,
    // TaskComponent,
    // ProjectIssuesComponent,
    // ProjectStatusComponent,
    // NewProjectComponent,
    // ListProjectsComponent,
    //EditCustomerComponent,
    // MainComponent,
    // HeaderComponent,
    // MenuSidebarComponent,
    // FooterComponent,
    // MenuSettingsComponent,
    // DashboardComponent,
    // ListCustomersComponent,
    // NewCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),        

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
