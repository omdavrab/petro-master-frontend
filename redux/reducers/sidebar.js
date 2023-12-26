const initialState = {
    list: {},
};

export const OpenSideBar = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_SIDEBAR":
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
            break;
    }
};
