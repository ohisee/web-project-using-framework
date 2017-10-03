import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Cookies from 'cookies-js';

@Component({
  selector: 'create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  private static readonly DRAFT_COOKIE = 'create-lesson-draft';

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      longDescription: ['']
    });
  }

  ngOnInit() {

    const draft = Cookies.get(CreateLessonComponent.DRAFT_COOKIE);

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges.filter(
      () => {
        return this.form.valid;
      }
    ).do(
      (validValue) => {
        Cookies.set(
          CreateLessonComponent.DRAFT_COOKIE,
          JSON.stringify(validValue));
      }
    ).subscribe();
  }

}
