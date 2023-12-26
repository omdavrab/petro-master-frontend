// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";

// const middleware = [thunk];
// const intialstate = {};

// const store = createStore(
//   rootReducer,
//   intialstate,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "LogIn",
    "GetMenu",
    "StoraSideBarData",
    "GetFoodCategoryByRestaurant",
    "MenuFoodCategory",
    "CartStoreData",
    "GetOrder",
    "UserLogIn",
    "RestaurantUserData",
    "TotalCount",
    "RestaurantTrendingItem",
    "Banner"
  ],
};
import { composeWithDevTools } from "redux-devtools-extension";

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

export default store;
