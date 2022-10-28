const SET_USERS = "user/SET_USERS";

// init state
const initialState = {
  users: [],
};

// Actions
export const setUsersAction = (payload) => ({
  type: SET_USERS,
  payload,
});

// reducer
export const userReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
