import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNIN = 'SIGNIN';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SIGNIN_G = 'SIGNIN_G';
export const LOGOUT_G = 'LOGOUT_G';
export const SIGNIN_ERRED = 'SIGNIN_ERRED';
export const SIGNUP_ERRED = 'SIGNUP_ERRED';
export const CLEAR_ERROR_ON_LEAVE = 'CLEAR_ERROR_ON_LEAVE';

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {username: string, password: string}) { }
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {username: string, password: string}) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) { }
}

export class SigninG implements Action {
  readonly type = SIGNIN_G;
}

export class LogoutG implements Action {
  readonly type = LOGOUT_G;
}

export class SigninErred implements Action {
  readonly type = SIGNIN_ERRED;
}

export class SignupErred implements Action {
  readonly type = SIGNUP_ERRED;
}

export class ClearErrorOnLeave implements Action {
  readonly type = CLEAR_ERROR_ON_LEAVE;
}

export type AuthActions = Signup
  | TrySignup
  | Signin
  | TrySignin
  | Logout
  | SetToken
  | SigninG
  | LogoutG
  | SigninErred
  | SignupErred
  | ClearErrorOnLeave;
