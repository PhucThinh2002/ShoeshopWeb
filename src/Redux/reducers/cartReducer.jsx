import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addProductAction: (state, action) => {
        const { id, quantity } = action.payload;
        const itemCart = state.cart.find(item => item.id === id);

        if (itemCart) {
            itemCart.quantity += quantity;
        } else {
            state.cart.push({ ...action.payload, quantity });
        }
    },
    deleteProductAction: (state,action) => {
      const {payload} = action;
      state.cart = state.cart.filter(item => item.id !== payload);
    },
    changeQuantityProductAction:(state,action) => {
      const {payload} = action;
      let itemCart = state.cart.find(item=>item.id === payload.id);
      if(itemCart) {
          itemCart.quantity += payload.quantity;
      }
    }

  }
});

export const { addProductAction, changeQuantityProductAction, deleteProductAction } = cartReducer.actions;

export default cartReducer.reducer;
