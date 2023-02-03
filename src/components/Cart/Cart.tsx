import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductFullDetails from '../Products/ProductFullDetails';
import { useAppSelector } from '../../hooks/reduxHook';
import CardFullDetails from './CartFullDetails';

const Cart: React.FC = () => {
  const cart = useAppSelector((store) => store.cartReducer);

  return (
    <Box className="cart__wrapper">
      {cart.type === undefined && cart.cart.length === 0 && <Typography>Nothing in here</Typography>}
      {cart.type === 'search' && (
        <Box className="cart__cardsWrapper">
          <Typography>{`Search term: ${cart.extras}.`}</Typography>
          {cart.cartSearchResult?.map((product) => (
            <ProductFullDetails key={`cart-search-${product.id}`} catName="" product={product} />
          ))}
        </Box>
      )}
      {cart.type === 'cart' && (
        <Box className="cart_cardsWrapper">
          {cart.cart.length === 0 && <Typography className="cart__noItem">There is no product in your cart. Go to Product and start buying!</Typography>}
          {cart.cart.map((cartProduct) => (
            <CardFullDetails key={`cart-cart-${cartProduct.product.id}`} catName="" cartProduct={cartProduct} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
