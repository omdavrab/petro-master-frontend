const initialState = {
  total: {},
};

export const TotalCount = (state = initialState, action) => {
  switch (action.type) {
    case "COUNT_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
      break;
  }
};
