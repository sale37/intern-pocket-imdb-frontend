import { AUTH_USER } from '../actions/ActionTypes';
import { authService } from '../../services/AuthService';

const authReducer = (state = authService.isAuthenticated(), action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
