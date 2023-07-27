import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fb: FormBuilder) {
    
  }

  contactForm = this.fb.group({
    name: [''],
    phoneNumber: ['']
  })

  save = () => {
    console.log("testinho: :D ", this.contactForm.value)
  }
}
