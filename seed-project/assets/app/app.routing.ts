import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { authRouting } from './auth/auth.routing';

const appRoutes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full'},
  { path: 'messages', component: MessagesComponent },
  //{ path: 'auth', component: AuthenticationComponent, children: authRoutes}
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: './auth/auth.module#AuthModule'
  }
];

export const appRouting = RouterModule.forRoot(appRoutes);
