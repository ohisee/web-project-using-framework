import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private _userService: UserService,
        private router: Router) { }

    ngOnInit() {

    }

    get userService(): UserService {
        return this._userService;
    }

    public login(email: string, password: string) {
        this._userService.login(email, password).subscribe(
            (user) => {
                console.log(user);
            },
            (error) => {
                console.log(error);
            },
            () => { // complete
                alert('login successfully');
                this.router.navigateByUrl('/home');
            }
        );
    }

}
