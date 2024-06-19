import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enteremail',
  templateUrl: './enteremail.component.html',
  styleUrls: ['./enteremail.component.css']
})
export class EnteremailComponent {
  showEmailTextBox: boolean = true;
  emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.emailForm = this.formBuilder.group({
      email: ['']
    });
  }

  forgotPassword() {
    if (this.emailForm) {
      const emailId = this.emailForm.get('email').value;
      this.http.post("http://localhost:7001/sendEmail/OnPasswordReset/" + emailId, {}).subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: 'Otp sent successfully to reset password',
          width: '18rem',
          padding: '1rem'
        }).then((result) => {
          this.router.navigate(['/enternewotp']);
        });
      },
        (error) => {
          Swal.fire({
            icon: 'warning',
            text: error.error.message,
            width: '18rem',
            padding: '1rem'
          });
        }
      );
    }
  }
}
