import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './AuthService/admin.guard';
import { studentGuard } from './AuthService/student.guard';
import { EnteremailComponent } from './enteremail/enteremail.component';
import { EnternewotpComponent } from './enternewotp/enternewotp.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path:'contactus',component:ContactusComponent
  },
  {
    path: 'enteremail', component: EnteremailComponent
  },
  {
    path: 'enternewotp', component: EnternewotpComponent
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'student',
    canMatch: [studentGuard],
    loadChildren: () => import('./modules/student/student.module').then((m) => m.StudentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
