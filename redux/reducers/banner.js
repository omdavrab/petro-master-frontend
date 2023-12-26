const initialState = {
    banner: {},
    bannerlist: [],
    error: {},
};

export const Banner = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_BANNER":
            return {
                ...state,
                banner: action.payload,
            };
        case "GET_BANNER":
            return {
                ...state,
                bannerlist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
