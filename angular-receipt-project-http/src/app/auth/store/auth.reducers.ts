import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  errored: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false,
  errored: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true,
        errored: false
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false,
        errored: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload,
        authenticated: true,
        errored: false
      };
    case (AuthActions.SIGNIN_ERRED):
    case (AuthActions.SIGNUP_ERRED):
      return {
        ...state,
        token: null,
        authenticated: false,
        errored: true
      };
    case (AuthActions.CLEAR_ERROR_ON_LEAVE):
      return {
        ...state,
        errored: false
      };
    default:
      return state;
  }
}
