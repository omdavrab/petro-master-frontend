const initialState = {
    tax: {},
    taxlist: [],
    error: {},
};

export const Tax = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TAX":
            return {
                ...state,
                tax: action.payload,
            };
        case "GET_TAX":
            return {
                ...state,
                taxlist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
