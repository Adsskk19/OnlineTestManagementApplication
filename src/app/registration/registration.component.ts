import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as countries from 'countries-list';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  showFirstNameError = false;
  showLastNameError = false;
  showUserNameError = false;
  showPasswordError = false;
  showEmailError = false;
  showCountryCodeError = false;
  showPhoneNumberError = false;
  showGenderError = false;
  countryList: { countryCode: string, countryName: string }[] = [];
  hidePassword: boolean = true;
  
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.populateCountryList();
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]{1,}$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]{1,}$/)]),
      userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\\_@]{1,}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{4,19}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\\.-]+@[a-z]+\.[a-z]{2,}$/)]),
      role: new FormControl('USER', [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{9}$/)]),
      gender: new FormControl('', [Validators.required, Validators.pattern(/^(Male|Female|Others)$/)]),
    });
  }

  populateCountryList() {
    this.countryList = Object.entries(countries.countries).map(([countryCode, country]) => ({
      countryCode,
      countryName: country.name
    }));
  }

  onFirstName() {
    if (!this.registrationForm.get('firstName').valid) {
      this.showFirstNameError = true;
    } else {
      this.showFirstNameError = false;
    }
  }

  onLastName() {
    if (!this.registrationForm.get('lastName').valid) {
      this.showLastNameError = true;
    } else {
      this.showLastNameError = false;
    }
  }

  onGender() {
    if (!this.registrationForm.get('gender').valid) {
      this.showGenderError = true;
    } else {
      this.showGenderError = false;
    }
  }

  onEmail() {
    if (!this.registrationForm.get('email').valid) {
      this.showEmailError = true;
    } else {
      this.showEmailError = false;
    }
  }

  onCountryCode() {
    if (!this.registrationForm.get('countryCode').valid) {
      this.showCountryCodeError = true;
    } else {
      this.showCountryCodeError = false;
    }
  }

  onPhoneNumbers(event: any) {
    const input = event.target;
    const inputValue = input.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.substring(0, 10);
    input.value = truncatedValue;
  }

  onUserName() {
    if (!this.registrationForm.get('userName').valid) {
      this.showUserNameError = true;
    } else {
      this.showUserNameError = false;
    }
  }

  onPassword() {
    if (!this.registrationForm.get('password').valid) {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }
  }

  passwordHide(): void {
    this.hidePassword = !this.hidePassword;
  }

  clear(): void {
    window.location.reload();
  }
  
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      userData.countryCode = this.registrationForm.value.countryCode;
      userData.countryName = this.registrationForm.value.countryName;

      this.http.post('http://localhost:7001/register', userData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            text: 'Registered Successfully',
            width: '18rem',
            padding: '1rem'
          }).then((result) => {
            this.router.navigate(['/']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: error.error.message,
            width: '18rem',
            padding: '1rem'
          });
        }
      );
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Please fill out all the required fields',
        width: '18rem',
        padding: '1rem'
      });
    }
  }
}