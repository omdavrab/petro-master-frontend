import { combineReducers } from "redux";
import { UserlogIn, logIn, passwordForgot, signUp } from "./auth";
import { Open } from "./loader";
import { OpenSideBar } from "./sidebar";
import { TotalCount } from "./dashboard";
import { SignUpStateData } from "./state";
import { Employee } from "./employee";
import { Tank } from "./tank";
import { Machine } from "./machine";
import { Rate } from "./rate";
import { Bank } from "./bank";
import { Upi } from "./upi";
import { Shift } from "./shift";
import { Report } from "./dailyReport";
import { Product } from "./product";
import { Party } from "./credit";

const reducer = combineReducers({
  SignUpStateData: SignUpStateData,
  SignUp: signUp,
  Employee: Employee,
  Tank: Tank,
  Machine: Machine,
  Rate: Rate,
  Bank: Bank,
  Upi: Upi,
  Shift: Shift,
  Product: Product,
  Report: Report,
  Party : Party,
  ForgotOtpVerify: passwordForgot,
  LogIn: logIn,
  UserLogIn: UserlogIn,
  HandleLoader: Open,
  Token: logIn,
  UserToken: UserlogIn,
  StoraSideBarData: OpenSideBar,
  TotalCount: TotalCount,
});

export default reducer;
