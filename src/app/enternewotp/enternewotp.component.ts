import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enternewotp',
  templateUrl: './enternewotp.component.html',
  styleUrls: ['./enternewotp.component.css']
})
export class EnternewotpComponent {
  combinedForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.combinedForm = this.formBuilder.group({
      otp: [''],
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{4,19}$/)])
    });
  }

  showPasswordError = false;
  onPassword() {
    if (!this.combinedForm.get('password').valid) {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }
  }

  submitCombinedForm() {
    if (this.combinedForm) {
      const otpp = this.combinedForm.get('otp').value;
      const password = this.combinedForm.get('newPassword').value;
      this.http.put("http://localhost:7001/sendEmail/" + otpp + "/" + password, {}).subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: 'Password reset successful',
          width: '18rem',
          padding: '1rem'
        }).then((result) => {
          this.router.navigate(['/']);
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

  hidePassword: boolean = true;
  passwordHide(): void {
    this.hidePassword = !this.hidePassword;
  }
}
