const initialState = {
    cartData: [],
    order: {},
    error: {},
    orderList: {}
};

export const CartStoreData = (state = initialState, action) => {
    switch (action.type) {
        case "CART_STORE_DATA":
            return {
                ...state,
                cartData: action.payload,
            };
        default:
            return state;
            break;
    }
};
