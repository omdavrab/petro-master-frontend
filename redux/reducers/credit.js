const initialState = {
    party: {},
    partylist: [],
    error: {},
};

export const Party = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PARTY":
            return {
                ...state,
                party: action.payload,
            };
        case "GET_PARTY":
            return {
                ...state,
                partylist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
