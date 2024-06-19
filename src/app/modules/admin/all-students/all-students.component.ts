import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent {
  constructor(private adminService: AdminService) { }

  p: number = 1;
  students: Profile[]
  originalList: Profile[] = [];

  ngOnInit(): void {
    this.adminService.viewAllStudents().subscribe(
      (res: Profile[]) => {
        this.originalList = res;
        this.students = res.reverse();
      }
    );
  }

  firstName: any;
  lastName: any;
  userName: any;
  email: any;
  phoneNumber: "";
  emptyList: boolean = false;
  searchQuery: string = '';

  searchByNameEmailPhone() {
    const filters = {
      firstName: this.searchQuery.toLowerCase(),
      lastName: this.searchQuery.toLowerCase(),
      userName: this.searchQuery.toLowerCase(),
      email: this.searchQuery.toLowerCase(),
      phoneNumber: this.searchQuery
    };
    if (filters.firstName != '' && filters.lastName != '' && filters.userName != '' && filters.email != '' && filters.phoneNumber != '') {
      this.students = this.originalList.filter(user => {
        return (
          user.firstName.toLowerCase().includes(filters.userName) ||
          user.lastName.toLowerCase().includes(filters.lastName) ||
          user.userName.toLowerCase().includes(filters.userName) ||
          user.email.toLowerCase().includes(filters.email) ||
          user.phoneNumber.includes(filters.phoneNumber)
        );
      });
      this.emptyList = this.students.length === 0;
    }
    else {
      this.students = this.originalList;
      this.emptyList = false;
    }
  }

  reset() {
    this.searchQuery = '';
    this.adminService.viewAllStudents().subscribe(
      (res: Profile[]) => {
        this.students = res;
      }
    );
    this.p = 1;
    location.reload();
  }

  reverse: boolean = false;
  orderBy(key: string) {
    this.students.sort((a, b) => {
      if (a[key] > b[key]) {
        return this.reverse ? -1 : 1;
      }
      if (a[key] < b[key]) {
        return this.reverse ? 1 : -1;
      }
      return 0;
    });
    this.reverse = !this.reverse;
  }
}
