const initialState = {
    upi: {},
    upilist: [],
    error: {},
};

export const Upi = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_UPI":
            return {
                ...state,
                upi: action.payload,
            };
        case "GET_UPI":
            return {
                ...state,
                upilist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
