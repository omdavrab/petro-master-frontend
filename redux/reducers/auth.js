const initialState = {
  user: {},
  error: [],
  otp: {},
  token:null,
  forgotOtp:{}
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };

    default:
      return state;
      break;
  }
};

export const otpVerify = (state = initialState, action) => {
  switch (action.type) {
    case "OTP_VERIFY":
      return {
        ...state,
        otp: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action.payload };

    default:
      return state;
      break;
  }
};

export const passwordForgot = (state = initialState, action) => {
  switch (action.type) {
    case "FORGOT_PASSWORD":
      return {
        ...state,
        forgotOtp: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action.payload };

    default:
      return state;
      break;
  }
};

export const logIn = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        user: action.payload.data,
      };
      case "SAVE_TOKEN":
      return {
        ...state,
        token: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };

    default:
      return state;
      break;
  }
};

export const UserlogIn = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action?.payload?.data?.user,
      };
      case "SAVE_TOKEN":
      return {
        ...state,
        token: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };

    default:
      return state;
      break;
  }
};
