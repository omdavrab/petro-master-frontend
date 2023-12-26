const initialState = {
    cartData: [],
    order: {},
    error: {},
    orderList: {},
    orderListByRestaurant: [],
    orderViewData: []
};

export const CreateOrder = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return {
                ...state,
                order: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action.payload };
        default:
            return state;
            break;
    }
};

export const GetOrder = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ORDER":
            return {
                ...state,
                orderList: action.payload,
            };
        case "GET_ORDER_BY_RESTAURANT":
            return {
                ...state,
                orderListByRestaurant: action.payload,
            };
        case "ORDER_VIEW_STORE_DATA":
            return {
                ...state,
                orderViewData: action.payload,
            };
        case "SET_LOADING":
            return { ...state, error: action.payload };
        default:
            return state;
            break;
    }
};
