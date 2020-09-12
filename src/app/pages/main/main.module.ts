import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { MenuSettingsComponent } from './menu-settings/menu-settings.component';
import { FooterComponent } from './footer/footer.component';
import { MainRoutingModule } from './main-routing.module';
import { NewCustomerComponent } from 'src/app/views/customers/new-customer/new-customer.component';
import { ListCustomersComponent } from 'src/app/views/customers/list-customers/list-customers.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewProjectComponent } from 'src/app/views/projects/new-project/new-project.component';
import { ListProjectsComponent } from 'src/app/views/projects/list-projects/list-projects.component';
import { ProjectStatusComponent } from 'src/app/views/project-status/project-status.component';
import { ProjectIssuesComponent } from 'src/app/views/project-issues/project-issues.component';
import { UserComponent } from 'src/app/views/user/user.component';
import { UserProfileComponent } from 'src/app/views/user-profile/user-profile.component';
import { TaskComponent } from 'src/app/views/task/task.component';
import { ListUsersComponent } from 'src/app/views/list-users/list-users.component';
import { TaskListComponent } from 'src/app/views/task-list/task-list.component';
import { NoticeComponent } from 'src/app/views/notice/notice.component';
import { CategoriesComponent } from 'src/app/views/categories/categories.component';

import { BadgeLabelComponent } from 'src/app/shared/badge-label/badge-label.component';
import { MessagesMenuComponent } from 'src/app/shared/messages-menu/messages-menu.component';
import { ChartsModule } from 'ng2-charts'

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuSidebarComponent,
    FooterComponent,
    MenuSettingsComponent,
    DashboardComponent,
    UserComponent,
    UserProfileComponent,
    ListUsersComponent,
    NewCustomerComponent,
    ListCustomersComponent,
    NewProjectComponent,
    ListProjectsComponent,
    ProjectStatusComponent,
    ProjectIssuesComponent,
    TaskComponent,
    TaskListComponent,
    NoticeComponent,
    CategoriesComponent,
    BadgeLabelComponent,
    MessagesMenuComponent,
    ],
  imports: [MainRoutingModule, CommonModule, FormsModule, HttpClientModule,ChartsModule],
  providers: [],
})
export class MainModule {}
