const initialState = {
  data: {},
};

export const SignUpStateData = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUPSTATE":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
      break;
  }
};
