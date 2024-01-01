const initialState = {
    employee: {},
    employeelist: [],
    error: {},
};

export const Employee = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_EMPLOYEE":
            return {
                ...state,
                employee: action.payload,
            };
        case "GET_EMPLOYEE":
            return {
                ...state,
                employeelist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
