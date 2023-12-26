import { combineReducers } from "redux";
import { UserlogIn, logIn, otpVerify, passwordForgot, signUp } from "./auth";
import { Open } from "./loader";
import {
  Restaurant,
  RestaurantTrendingItem,
  RestaurantUserData,
} from "./restaurant";
import {
  DeleteFoodCategory,
  FoodCategory,
  GetFoodCategory,
  GetFoodCategoryByRestaurant,
} from "./foodCategory";
import { Menu, getMenu, getMenuById, editMenu } from "./menu";
import { OpenSideBar } from "./sidebar";
import { QRCode } from "./qrCode";
import { CartStoreData } from "./cart";
import { CreateOrder, GetOrder } from "./order";
import { TotalCount } from "./dashboard";
import { Banner } from "./banner";
import { Tax } from "./tax";

const reducer = combineReducers({
  SignUp: signUp,
  OtpVerify: otpVerify,
  ForgotOtpVerify: passwordForgot,
  LogIn: logIn,
  UserLogIn: UserlogIn,
  HandleLoader: Open,
  Restaurant: Restaurant,
  FoodCategory: FoodCategory,
  FoodCategory: GetFoodCategory,
  MenuFoodCategory: GetFoodCategory,
  GetMenu: getMenu,
  CreteMenu: Menu,
  Token: logIn,
  UserToken: UserlogIn,
  MenuId: getMenuById,
  EditMenu: editMenu,
  DeleteFoodCategory: DeleteFoodCategory,
  StoraSideBarData: OpenSideBar,
  QRCode: QRCode,
  GetFoodCategoryByRestaurant: GetFoodCategoryByRestaurant,
  CartStoreData: CartStoreData,
  CreateOrder: CreateOrder,
  GetOrder: GetOrder,
  RestaurantUserData: RestaurantUserData,
  TotalCount: TotalCount,
  RestaurantTrendingItem: RestaurantTrendingItem,
  Banner: Banner,
  Tax: Tax
});

export default reducer;
