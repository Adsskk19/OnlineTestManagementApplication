import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  form:FormGroup=this.fb.group({
    from_name:'',
    to_name:'ADMIN',
    from_email:'',
    message:'',
  })

  constructor(private fb:FormBuilder){

  }

  async send(){
    emailjs.init('YIwmO9chwgbOZ32F3');
    let response=await emailjs.send("service_j8sghe8","template_36yrkfq",{
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email:this.form.value.from_email,
      message: this.form.value.message,
      });
 
      alert('Message has been sent.');
      this.form.reset();
  }

     

}
