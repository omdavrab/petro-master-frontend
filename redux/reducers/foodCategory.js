const initialState = {
  foodCategory: [],
  error: [],
  getFoodCategory: {},
  menuDataByCategory: {},
  deleteFoodCategory: {},
  storeData: {},
  editFoodCategory: {},
  categoryByRestaurant: [],
};

export const FoodCategory = (state = initialState, action) => {
  switch (action.type) {
    case "FOOD_CATEGORY":
      return {
        ...state,
        foodCategory: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const GetFoodCategory = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FOOD_CATEGORY":
      return {
        ...state,
        getFoodCategory: action.payload.data.result,
      };
    case "STORE_DATA":
      return {
        ...state,
        storeData: action.payload,
      };
    case "GET_RESTAURANT_MENU_BY_CATEGORY":
      return {
        ...state,
        menuDataByCategory: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const DeleteFoodCategory = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_RESTAURANT_CATEGORY":
      return {
        ...state,
        deleteFoodCategory: action.payload.data.result,
      };
    case "EDIT_FOOD_CATEGORY":
      return {
        ...state,
        editFoodCategory: action.payload.data.result,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const GetFoodCategoryByRestaurant = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FOOD_CATEGORY_BY_RESTAURANT":
      return {
        ...state,
        categoryByRestaurant: action.payload,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};
