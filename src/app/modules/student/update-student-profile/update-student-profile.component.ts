import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import Swal from 'sweetalert2';
import { StudentService } from '../student.service';
import * as countries from 'countries-list';

@Component({
  selector: 'app-update-student-profile',
  templateUrl: './update-student-profile.component.html',
  styleUrls: ['./update-student-profile.component.css']
})
export class UpdateStudentProfileComponent {
  profileForm: FormGroup;
  profile: Profile;
  showPasswordError = false;
  showEmailError = false;
  showCountryCodeError = false;
  showPhoneNumberError = false;
  countryList: { countryCode: string, countryName: string }[] = [];

  constructor(private studentService: StudentService) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      countryCode: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
      gender: new FormControl(),
    });
  }

  onPassword() {
    if (!this.profileForm.get('password').valid) {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }
  }

  onEmail() {
    if (!this.profileForm.get('email').valid) {
      this.showEmailError = true;
    } else {
      this.showEmailError = false;
    }
  }

  onCountryCode() {
    if (!this.profileForm.get('countryCode').valid) {
      this.showCountryCodeError = true;
    } else {
      this.showCountryCodeError = false;
    }
  }

  onPhoneNumber() {
    if (!this.profileForm.get('phoneNumber').valid) {
      this.showPhoneNumberError = true;
    } else {
      this.showPhoneNumberError = false;
    }
  }

  ngOnInit(): void {
    this.populateCountryList();
    this.studentService.getProfileByUserName().subscribe(
      res => {
        this.profile = res
        this.profileForm = new FormGroup({
          firstName: new FormControl(this.profile.firstName),
          lastName: new FormControl(this.profile.lastName),
          userName: new FormControl(this.profile.userName),
          password: new FormControl(this.profile.password,[
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{4,19}$/)
          ]),
          countryCode: new FormControl(this.profile.countryCode,[
            Validators.required
          ]),
          phoneNumber: new FormControl(this.profile.phoneNumber, [
            Validators.required,
            Validators.pattern(/^[6-9]\d{9}$/)
          ]),
          email: new FormControl(this.profile.email, [
            Validators.required,
            Validators.pattern(/^[a-z0-9.-]+@[a-z]+\.[a-z]{2,}$/)
          ]),
          role: new FormControl(this.profile.role),
          gender: new FormControl(this.profile.gender),
        });
        this.profileForm.patchValue({ password: '' });
      }
    )
  }

  populateCountryList() {
    this.countryList = Object.entries(countries.countries).map(([countryCode, country]) => ({
      countryCode,
      countryName: country.name
    }));
  }

  updateStudentProfile(data: any) {
    if (this.profileForm.invalid) {
      Swal.fire({
        icon: 'warning',
        text: 'Please fill out all the required fields',
        width: '18rem',
        padding: '1rem'
      });
      return;
    }
    data.userName = this.profile.userName
    this.studentService.updateStudent(data.userName, data).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          text: 'Profile Updated Succesfully',
          width: '18rem',
          padding: '1rem'
        }).then((result) => {
          window.location.reload();
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          text: err.error.message,
          width: '18rem',
          padding: '1rem'
        });
      }
    )
  }

  clear(): void {
    window.location.reload();
  }

  hidePassword: boolean = true;
  passwordHide(): void {
    this.hidePassword = !this.hidePassword;
  }

  onPhoneNumbers(event: any) {
    const input = event.target;
    const inputValue = input.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.substring(0, 10);
    input.value = truncatedValue;
  }
}