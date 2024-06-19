import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentFooterComponent } from './student-footer/student-footer.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from './question/feedback-form/feedback-form.component';
import { ScoresComponent } from './scores/scores.component';


@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentNavbarComponent,
    StudentFooterComponent,
    UpdateStudentProfileComponent,
    QuestionComponent,
    QuizComponent,
    ScoresComponent,
    FeedbackFormComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    DatePipe, // Add DatePipe here
  ],
})
export class StudentModule { }
