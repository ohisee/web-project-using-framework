import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: 'authentication.component.html'
})
export class AuthenticationComponent implements OnInit {

  signinForm: FormGroup;
  errormsg: string = '';
  display: string = 'none';

  constructor(
    private authService: AuthService, 
    private dataStorageService: DataStorageService, 
    private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (!this.signinForm.invalid) {
      this.authService.signin(
        this.signinForm.value.username,
        this.signinForm.value.password)
      .then((result) => {
        this.display = 'none';
        //sessionStorage.setItem('id', 'something');
        //document.cookie = 'res=' + JSON.stringify(result) + ';path=/';
        //console.log(result);
        this.dataStorageService.fetchData();
        this.router.navigateByUrl('/messages');
      })
      .catch((error) => {
        this.display = 'block';
        this.errormsg = (error.message) ? error.message : 'unable to sign in';
      });
      this.signinForm.reset();
    } else {
      this.display = 'block';
      this.errormsg = 'We do not recognize this email and your credential';
    }
  }

}