const initialState = {
    machine: {},
    machinelist: [],
    error: {},
};

export const Machine = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_MACHINE":
            return {
                ...state,
                machine: action.payload,
            };
        case "GET_MACHINE":
            return {
                ...state,
                machinelist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
