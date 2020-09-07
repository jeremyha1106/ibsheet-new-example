const actions = {
  SET_STATE: 'user/SET_STATE',
  LOGIN: 'user/LOGIN',
  LOAD_CURRENT_ACCOUNT: 'user/LOAD_CURRENT_ACCOUNT',
  LOGOUT: 'user/LOGOUT',
};

const initialState = {
  id: '',
  name: '',
  role: '',
  email: '',
  avatar: '',
  authorized: false,
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
