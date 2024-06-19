import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  {
    path: 'studenthome', component: StudentHomeComponent
  },
  {
    path: 'updateProfile', component: UpdateStudentProfileComponent
  },
  {
    path: 'quiz', component: QuizComponent
  },
  {
    path: 'question', component: QuestionComponent
  },
  {
    path: 'scores', component: ScoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
