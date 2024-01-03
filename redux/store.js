import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "SignUpStateData",
    "LogIn",
    "Employee",
    "Tank",
    "Machine",
    "Rate",
    "Bank",
    "Upi",
    "Shift",
    
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
