import { Card, Box, Typography, Grid, Button, TextField } from '@mui/material';
import { useState } from 'react';
import Slider from 'react-slick';
import { useAppDispatch } from '../../hooks/reduxHook';
import { updateCart } from '../../redux/reducers/cartReducer';
import { CartProduct } from '../../types/common';
import DoneIcon from '@mui/icons-material/Done';

const CardFullDetails: React.FC<{ catName: string; cartProduct: CartProduct }> = (props) => {
  const { catName, cartProduct } = props;
  const [value, setValue] = useState(cartProduct.quantity);
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) setValue(value - 1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  function handleButton() {
    dispatch(updateCart({ product: cartProduct.product, quantity: value }));
  }

  return (
    <Card className="product-f-details wrapper">
      <Box className="product-f-details show-cat" textAlign={'left'}>
        <Typography marginLeft={'1.25em'} padding={'0.5em 0.5em'} color="text.secondary">
          {'>'} {cartProduct.product.category.name}
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={4}>
          <Box paddingBottom={'2em'} paddingLeft={'1em'} paddingRight={'1em'}>
            <Slider {...settings}>
              {cartProduct.product.images.map((image) => (
                <div className="product-f-details-imgwrapper" key={`fullDetail-${image}`}>
                  <img src={image} alt={cartProduct.product.title} />
                </div>
              ))}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box className="product-f-details mainInfo" textAlign={'left'}>
            <Typography className="product-f-details title">{cartProduct.product.title}</Typography>
            <Typography className="product-f-details price">{cartProduct.product.price} EUR.</Typography>
          </Box>
          <Box className="product-f-details buyout-container">
            <Box className="product-f-details incBox" textAlign={'left'}>
              <Button onClick={handleDecrease}>-</Button>
              <TextField
                className="product-f-details incInput"
                variant="outlined"
                value={value}
                type={'nummber'}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <Button onClick={handleIncrease}>+</Button>
            </Box>
            <Button className="product-f-details shopIcon" onClick={() => handleButton()}>
              <DoneIcon />
            </Button>
          </Box>
          <Box>
            <Typography variant="subtitle1" textAlign={'left'}>
              {cartProduct.product.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardFullDetails;
