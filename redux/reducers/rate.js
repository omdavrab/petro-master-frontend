const initialState = {
  rate: {},
  ratelist: [],
  date: {},
  error: {},
};

export const Rate = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RATE":
      return {
        ...state,
        rate: action.payload,
      };
    case "GET_RATE":
      return {
        ...state,
        ratelist: action.payload,
      };
    case "DATE_RATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};
