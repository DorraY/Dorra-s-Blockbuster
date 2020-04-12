import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Feedback, ContactType} from '../shared/feedback'
import { flyInOut, expand } from '../animations/app.animations';
import {FeedbackService} from '../services/feedback.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host: {
    '[@flyInOut]' : 'true',
    'style': 'display: block'

  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  
  feedbackForm: FormGroup
  feedback: Feedback
  contactType = ContactType
  feedbackCopy: Feedback=null
  errMess: string
  showSpinner=false

  


  @ViewChild('fform',{static: true}) feedbackFormDirective

  formErrors = {
    'firstName': '',
    'lastName': '',
    'telNum': '',
    'email': ''
  }

  validationMessages = {
    'firstName': {
      'required':      'First Name is required.',
      'pattern':       'First Name must contain only alphabetical characters!',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastName': {
      'required':      'Last Name is required.',
      'pattern':       'Last Name must contain only alphabetical characters!',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telNum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.',
      'minlength':     'Phone number is of 8 numbers!',
      'maxlength':     'Phone number is of 8 numbers only!'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  }

  constructor(private fService: FeedbackService,
        @Inject('BaseURL') private BaseURL,
     private fb: FormBuilder) 
  {
   }


   createForm(): void {
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telNum: ['', [Validators.required, Validators.pattern, Validators.minLength(8),Validators.maxLength(8)] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)] ],
    })

    this.feedbackForm.valueChanges.subscribe( data =>  this.onValueChanged(data))
    this.onValueChanged()  //reset form validations
  }



    onValueChanged(data?: any) { // question mark means the parameter is optional
      if (!this.feedbackForm) { return; } // no feedback, no problem
      const form = this.feedbackForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {  //The hasOwnProperty method returns a boolean indicating whether the object has the specified property.
          this.formErrors[field] = '';
          // clear previous error message (if any)
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    onSubmit() {
      this.feedbackCopy = this.feedbackForm.value;
      this.showSpinner = true
      console.log(this.feedbackCopy)
      this.fService.putFeedback(this.feedbackCopy)
        .subscribe(feedback => 
          { 
              this.feedback = feedback
              this.showSpinner = false
              console.log(this.feedback); 
              setTimeout(() => this.feedback = null              
              , 5000)

          }
        )
        

    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum: '',
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    })
    // this.feedbackFormDirective.resetForm()
  }
  ngOnInit() {
    this.createForm()
  }


}