import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductPlacementProps } from '../../types/props';
import SaleIcon from '../Basic/SaleIcon';

const ProductPlacement: React.FC<ProductPlacementProps> = (props) => {
  const navigate = useNavigate();
  const { size, product, isOnSale, isHideDescription } = props;
  const baseSize = [250, 25, 12];
  const newSize = baseSize.map((s) => (s * size) / 100);

  const handleClick = () => {
    navigate(`/products/${product.category.name}/${product.id}`);
  };
  return (
    <Card sx={{ maxWidth: newSize[0] }} className="product-card" onClick={handleClick}>
      <div className="productimg-wrapper">
        <CardMedia className={'productimg ' + isOnSale} component="img" height={newSize[1] + '%'} width={newSize[1] + '%'} image={product.images[0]} alt={product.title} />
        {isOnSale && <SaleIcon size={25} />}
      </div>
      <CardContent>
        {' '}
        <Typography variant="h2" sx={{ fontSize: size !== 100 ? '12px' : '16px' }} color="text.primary" fontWeight={'bold'}>
          {product.title}
        </Typography>
        <Typography sx={{ fontSize: size !== 100 ? '12px' : '16px' }} color="text.secondary">
          {product.category.name}
        </Typography>
        <Typography sx={{ fontSize: size !== 100 ? '12px' : '16px' }} color="text.primary">
          {product.price + ' EUR'}
        </Typography>
        {!isHideDescription && (
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductPlacement;
