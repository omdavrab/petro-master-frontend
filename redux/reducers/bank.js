const initialState = {
    bank: {},
    banklist: [],
    error: {},
};

export const Bank = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_BANK":
            return {
                ...state,
                bank: action.payload,
            };
        case "GET_BANK":
            return {
                ...state,
                banklist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
