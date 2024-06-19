import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: 'adminhome', component: AdminHomeComponent
  },
  {
    path: 'allStudents', component: AllStudentsComponent
  },
  {
    path: 'updateProfile', component: UpdateAdminProfileComponent
  },
  {
    path: 'addQuestions', component: AddQuestionsComponent
  },
  {
    path: 'addQuiz', component: AddQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
