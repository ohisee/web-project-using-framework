import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

// export const authRoutes: Routes = [
//   { path: '', redirectTo: 'signup', pathMatch: 'full' }, //relative to /auth
//   { path: 'signup', component: SignupComponent },
//   { path: 'signin', component: SigninComponent },
//   { path: 'logout', component: LogoutComponent }
// ];

const authRoutes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, //relative to /auth
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent }
];

export const authRouting = RouterModule.forChild(authRoutes);
