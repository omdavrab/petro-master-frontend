import { HandleCartStoreData } from "@/redux/action/cart";
import { HandleGetMenuByCategoryStore } from "@/redux/action/foodCategory";

export const updateCartItemQuantity = async (
  cartData,
  menuData,
  data,
  operation,
  dispatch
) => {
  let newQuantity;
  if (operation === "increment") {
    newQuantity = data.QTY < 5 ? data.QTY + 1 : data.QTY;
  } else if (operation === "decrement") {
    newQuantity = data.QTY > 1 ? data.QTY - 1 : data.QTY;
    if (newQuantity <= 1) {
      // Remove the item from the cart if quantity becomes zero
      const newCartData = cartData.filter((item) => item._id !== data._id);
      dispatch(HandleCartStoreData(newCartData));
      return;
    }
  }

  const updatedCartData = cartData.map((item) => {
    if (item._id === data._id) {
      item.QTY = newQuantity;
      item.newPrice = item.price * newQuantity;
    }
    return item;
  });

  const updatedMenuData = menuData.map((item) => {
    if (item._id === data._id) {
      item.QTY = newQuantity;
      item.newPrice = item.price * newQuantity;
    }
    return item;
  });

  dispatch(HandleGetMenuByCategoryStore(updatedMenuData));
  await dispatch(HandleCartStoreData(updatedCartData));
};
