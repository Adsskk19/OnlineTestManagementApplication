import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css'],
})
export class AddQuestionsComponent {
  quizTitle: string;
  questions: any = [];
  selectedQuestion: any;
  newQuestion: any = {
    quizTitle: '',
    que: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOpt: '',
  };

  constructor(
    private queService: QuestionService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quizTitle = params['quizTitle'];
      this.queService.getQueByQuizTitle(this.quizTitle).subscribe((data) => {
        this.questions = data;
      });
    });
  }

  addQuestion() {
    this.newQuestion.quizTitle = this.quizTitle;
    console.log(this.newQuestion);

    this.queService.addQuestion(this.newQuestion).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  openUpdateModal(question: any) {
    this.newQuestion = question;
  }

  deleteQuestion(question: any) {
    console.log(question);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.queService.deleteQuestion(question.queId).subscribe();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then((result)=>location.reload());
      }
    });
  }

  reload() {
    window.location.reload();
  }
}
