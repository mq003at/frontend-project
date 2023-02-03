import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { switchCart } from '../../redux/reducers/cartReducer';
import { HeaderButtonProps } from '../../types/props';

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.text.toLowerCase() === 'carts') dispatch(switchCart({ type: 'cart', extras: '' }));
  }, [dispatch, props.text]);

  return (
    <Grid item xs={4}>
      <Button variant="text" onClick={() => navigate(`${props.text.toLowerCase()}`)}>
        {props.text}
      </Button>
    </Grid>
  );
};

export default HeaderButton;
