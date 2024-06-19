import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  quizes: any;
  newTopic: any = {};
  newQuiz: any = {
    title: "",
    quizImg: "",
  };

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit() {
    this.quizService.getAllQuiz().subscribe((quiz) => {
      this.quizes = quiz;
      console.log(this.quizes);
    });
  }


  addAndUpdateQuestion(newQuiz: any) {
    if (newQuiz.id) {
      this.quizService.updateQuiz(newQuiz, newQuiz.id).subscribe((data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          text: 'This Test updated successfully',
          width: '18rem',
          padding: '1rem'
        }).then(res => location.reload());
      });

    }
    else {
      this.quizService.addQuiz(this.newQuiz).subscribe((data) => {
        console.log(data);
        if (data == "quiz already exists") {
          Swal.fire({
            icon: 'error',
            text: 'This Test already exists',
            width: '18rem',
            padding: '1rem'
          }).then(res => location.reload());

        } else {
          Swal.fire({
            icon: 'success',
            text: 'This Test added successfully',
            width: '18rem',
            padding: '1rem'
          }).then(res => location.reload());;
        }
      });
    }
  }

  openUpdateModal(quiz: any) {
    console.log(quiz)
    this.newQuiz = quiz;

  }

  deleteQuestion(quiz: any) {
    console.log(quiz);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      width: '18rem',
      padding: '1rem',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(quiz.id).subscribe();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          width: '18rem',
          padding: '1rem'
        }).then((result) => location.reload());
      }
    });
  }

  reload() {
    window.location.reload();
  }


  openQuiz(quizTitle: String) {
    this.router.navigate(["admin/addQuestions"], {
      queryParams: {
        quizTitle: quizTitle,
      },
    });
  }
}
