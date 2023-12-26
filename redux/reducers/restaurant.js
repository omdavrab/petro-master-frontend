const initialState = {
  restaurantData: {},
  restaurant: {},
  editRestaurantData: {},
  restaurantCustomersData: {},
  restaurantTrendingItem: [],
};

export const Restaurant = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RESTAURANT":
      return {
        ...state,
        restaurant: action.payload.data,
      };
    case "RESTAURANT_DATA":
      return {
        ...state,
        restaurantData: action.payload,
      };
    case "EDIT_RESTAURANT_DATA":
      return {
        ...state,
        editRestaurantData: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const RestaurantUserData = (state = initialState, action) => {
  switch (action.type) {
    case "RESTAURANT_CUSTOMERS_DATA":
      return {
        ...state,
        restaurantCustomersData: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const RestaurantTrendingItem = (state = initialState, action) => {
  switch (action.type) {
    case "RESTAURANT_TRENDING_ITEMS":
      return {
        ...state,
        restaurantTrendingItem: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};
