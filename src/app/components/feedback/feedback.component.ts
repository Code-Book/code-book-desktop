import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;

  customFormItems = ['useFulNess', 'easeOfUse', 'performance', 'coolness', 'shouldOpenSource', 'likeToContribute'];

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    fb: FormBuilder) {
    this.feedbackForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      useFulNess: [1],
      easeOfUse: [1],
      performance: [1],
      coolness: [1],
      message: [''],
      suggestedName: [''],
      shouldOpenSource: [1],
      likeToContribute: [1]
    });

    for (const item of this.customFormItems) {
      this.feedbackForm.get(item).valueChanges.subscribe(e => {
        this.feedbackForm.get(item).setValue(e, { emitEvent: false });
      });
    }

  }

  onSubmit() {
    this.feedbackService.postFeedback(this.feedbackForm.value).subscribe(() => { });
    setTimeout(() => {
      this.router.navigate(['']);
    }, 500);
  }

}
