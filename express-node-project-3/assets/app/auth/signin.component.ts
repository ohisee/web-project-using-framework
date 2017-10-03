import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { TOKEN, USERID } from '../shared/name.constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        //Validators.email
        Validators.pattern(/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    const user = new User(
      this.signinForm.value.email,
      this.signinForm.value.password);
    this.authService.signin(user).subscribe(
      (data) => {
        sessionStorage.setItem(TOKEN, data.token);
        sessionStorage.setItem(USERID, data.userId);
        this.router.navigateByUrl('/'); // route to root page
      },
      (error) => console.log(error),
      () => {}

    );
    this.signinForm.reset();
  }

}
