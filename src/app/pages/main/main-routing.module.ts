import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NewCustomerComponent } from 'src/app/views/customers/new-customer/new-customer.component';
import { ListCustomersComponent } from 'src/app/views/customers/list-customers/list-customers.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NewProjectComponent } from 'src/app/views/projects/new-project/new-project.component';
import { ListProjectsComponent } from 'src/app/views/projects/list-projects/list-projects.component';
import { ProjectStatusComponent } from 'src/app/views/project-status/project-status.component';
import { ProjectIssuesComponent } from 'src/app/views/project-issues/project-issues.component';
import { UserComponent } from 'src/app/views/user/user.component';
import { ListUsersComponent } from 'src/app/views/list-users/list-users.component';
import { CategoriesComponent } from 'src/app/views/categories/categories.component';
import { TaskComponent } from 'src/app/views/task/task.component';
import { TaskListComponent } from 'src/app/views/task-list/task-list.component';
import { UserProfileComponent } from 'src/app/views/user-profile/user-profile.component';
import { NoticeComponent } from 'src/app/views/notice/notice.component';

const routes: Routes = [
  {path:'' ,component:MainComponent,children:[
    {path:'',component:DashboardComponent,data : {  
      title: 'Dashboard '  
      } 
    },
    {path:'users' ,component:ListUsersComponent},
    {path:'users/:uid' ,component:ListUsersComponent},
    {path:'usersprofile/:uid' ,component:UserProfileComponent},
    {path:'usertask' ,component:UserComponent},

    {path:'newcustomer' ,component:NewCustomerComponent},
    {path:"newcustomer/:uid",component:NewCustomerComponent},
    {path:'customers' ,component:ListCustomersComponent},

    {path:'newproject' ,component:NewProjectComponent},
    {path:"newproject/:uid",component:NewProjectComponent},

    {path:'projects' ,component:ListProjectsComponent},
    {path:'projectstatus' ,component:ProjectStatusComponent},
    {path:'projectstatus/:uid' ,component:ProjectStatusComponent},

    {path:'projectissues' ,component:ProjectIssuesComponent},
    {path:'projectissues/:uid' ,component:ProjectIssuesComponent},

    {path:'newtask' ,component:TaskComponent},
    {path:"newtask/:uid",component:TaskComponent},
    {path:'tasks' ,component:TaskListComponent},

    {path:'notices' ,component:NoticeComponent},
    {path:"notices/:uid",component:NoticeComponent},

    {path:'categories' ,component:CategoriesComponent},
    {path:'categories/:uid' ,component:CategoriesComponent},
  ], canActivate:[AuthGuard]},
  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
