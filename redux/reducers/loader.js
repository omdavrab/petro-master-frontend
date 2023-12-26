const initialState = {
  status: false,
};

export const Open = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOADER":
      return {
        ...state,
        status: true,
      };
    case "CLOSE_LOADER":
      return {
        ...state,
        status: false,
      };
    default:
      return state;
      break;
  }
};
