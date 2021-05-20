const initialState = {
  user_id: 0,
  first_name: "",
  last_name: "",
  email: "",
  profile_pic: "",
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {},
  };
}

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      const { user_id, first_name, last_name, email, profile_pic } = payload;
      return { ...state, user_id, first_name, last_name, email, profile_pic };

    case LOGOUT_USER:
      return state;

    default:
      return state;
  }
}
