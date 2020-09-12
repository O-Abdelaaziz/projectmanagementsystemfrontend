import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';


const routes: Routes = [
   {path:'' ,redirectTo:'/login', pathMatch:'full'},
   {path:'login' ,component:LoginComponent,canActivate:[AfterAuthGuard]},
   {path:'register' ,component:RegisterComponent},

   {path:'dashboard',loadChildren:() =>import('./pages/main/main.module').then(m=>m.MainModule) ,canActivate:[AuthGuard]},

   {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
