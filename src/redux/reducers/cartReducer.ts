import { createSlice } from '@reduxjs/toolkit';
import { addNotification } from '../../components/Functions/common';
import { CartReducer } from '../../types/common';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: { cart: [] } as CartReducer,
  reducers: {
    // Change product quantity and if the quantity exceeds the current in the cart, remove it. It can also be used to add more Product into the cart
    updateCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingCart = state.cart.find((item) => item.product.id === product.id);

      if (existingCart) {
        if (quantity === 0) {
          const newCart = state.cart.filter((item) => item.product.id !== product.id);
          addNotification('Product removed', `${existingCart.product.title} has been removed from your cart.`, 'success');
          return { ...state, cart: newCart };
        } else {
          addNotification('Product updated', `You will now have ${quantity} ${existingCart.product.title} in your cart`, 'success');
          return {
            ...state,
            cart: state.cart.map((item) => (item.product.id === product.id ? { ...item, quantity } : item)),
          };
        }
      } else {
        addNotification('Product updated', `You will now have ${quantity} ${product.title} in your cart`, 'success');
        return { ...state, cart: [...state.cart, { product: product, quantity: quantity }] };
      }
    },

    // Return the search product
    extraCart: (state, action) => {
      return { ...state, cartSearchResult: action.payload };
    },

    // Switch functionality
    switchCart: (state, action) => {
      return { ...state, type: action.payload.type, extras: action.payload };
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { updateCart, extraCart, switchCart } = cartSlice.actions;
