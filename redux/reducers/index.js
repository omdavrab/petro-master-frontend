import { combineReducers } from "redux";
import { UserlogIn, logIn, passwordForgot, signUp } from "./auth";
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
import { SignUpStateData } from "./state";
import { Employee } from "./employee";
import { Tank } from "./tank";
import { Machine } from "./machine";
import { Rate } from "./rate";

const reducer = combineReducers({
  SignUpStateData: SignUpStateData,
  SignUp: signUp,
  Employee : Employee,
  Tank : Tank,
  Machine : Machine,
  Rate : Rate,
  // OtpVerify: otpVerify,
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
  Tax: Tax,
});

export default reducer;
