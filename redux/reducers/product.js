const initialState = {
    product: {},
    productlist: [],
    error: {},
};

export const Product = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PRODUCT":
            return {
                ...state,
                product: action.payload,
            };
        case "GET_PRODUCT":
            return {
                ...state,
                productlist: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action?.payload?.response };
        default:
            return state;
            break;
    }
};
