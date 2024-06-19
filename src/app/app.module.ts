import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginnavbarComponent } from './loginnavbar/loginnavbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorProvider } from './services/jwt.interceptor';
import { LoginfooterComponent } from './loginfooter/loginfooter.component';
import { EnteremailComponent } from './enteremail/enteremail.component';
import { EnternewotpComponent } from './enternewotp/enternewotp.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginnavbarComponent,
    LoginComponent,
    LoginfooterComponent,
    EnteremailComponent,
    EnternewotpComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    
  ],
  providers: [JwtInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
