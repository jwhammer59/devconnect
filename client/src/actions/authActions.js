import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode Token to get User Data
      const decoded = jwt_decode(token);
      // Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove Token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove Auth Header for Future Requests
  setAuthToken(false);
  // Set Current User to {} which will also set isAuthenticated to False
  dispatch(setCurrentUser({}));
};
