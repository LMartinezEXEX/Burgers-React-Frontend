import { ADD_BURGER, APPLY_COUPON, APPLY_FREE_DELIVERY, COMPLETE_ORDER, REMOVE_BURGER, REMOVE_COUPON, REMOVE_INGREDIENT } from "./types";

export const addBurger = (burger) => ({
    type: ADD_BURGER,
    price: burger.price,
    burger: burger
})

export const removeBurger = (burger) => ({
    type: REMOVE_BURGER,
    price: burger.price,
    burger: burger
})

export const removeIngredient = (burgerInOrderId, ingredient) => ({
    type: REMOVE_INGREDIENT,
    price: ingredient.price,
    burgerInOrderId: burgerInOrderId
})

export const completeOrder = () => ({
    type: COMPLETE_ORDER
})

export const applyCoupon = (coupon) => ({
    type: APPLY_COUPON,
    discount: coupon.discount
})

export const removeCoupon = () => ({
    type: REMOVE_COUPON
})

export const applyFreeDelivery = () => ({
    type: APPLY_FREE_DELIVERY
})