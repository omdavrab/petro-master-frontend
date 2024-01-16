const initialState = {
  report: {},
  reportlist: [],
  error: {},
};

export const Report = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REPORT":
      return {
        ...state,
        report: action.payload,
      };
    case "GET_REPORT":
      return {
        ...state,
        reportlist: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};
