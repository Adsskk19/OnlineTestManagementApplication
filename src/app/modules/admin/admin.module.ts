import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminNavbarComponent,
    AddQuestionsComponent,
    AllStudentsComponent,
    UpdateAdminProfileComponent,
    AdminFooterComponent,
    AddQuizComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule
  ]
})
export class AdminModule { }
