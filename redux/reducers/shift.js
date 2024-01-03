const initialState = {
    shift: {},
    shiftlist: [],
    error: {},
};

export const Shift = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_SHIFT":
            return {
                ...state,
                shift: action.payload,
            };
        case "GET_SHIFT":
            return {
                ...state,
                shiftlist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
