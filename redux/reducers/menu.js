const initialState = {
  error: {},
  menu: {},
  menuData: [],
  delete: {},
  menuId: "",
  menuEdit: []
};

export const Menu = (state = initialState, action) => {
  switch (action.type) {
    case "RESTAURANT_MENU":
      return {
        ...state,
        menu: action.payload.data,
      };
    case "DELETE_RESTAURANT_MENU":
      return {
        ...state,
        delete: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const getMenu = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESTAURANT_MENU":
      return {
        ...state,
        menuData: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const getMenuById = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESTAURANT_MENU_BY_ID":
      return {
        ...state,
        menuId: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};

export const editMenu = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_RESTAURANT_MENU":
      return {
        ...state,
        menuEdit: action.payload.data,
      };
    case "SET_LOADING":
      return { ...state, error: action?.payload?.response };
    default:
      return state;
      break;
  }
};