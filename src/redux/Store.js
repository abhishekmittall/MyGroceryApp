const {configureStore} = require('@reduxjs/toolkit');

import ProductReducer from './slices/ProductsSlice';
import WishlistReducer from './slices/WishlistSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    wishlist: WishlistReducer,
  },
});
