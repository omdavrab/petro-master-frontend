const initialState = {
    tank: {},
    tanklist: [],
    error: {},
};

export const Tank = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TANK":
            return {
                ...state,
                tank: action.payload,
            };
        case "GET_TANK":
            return {
                ...state,
                tanklist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
