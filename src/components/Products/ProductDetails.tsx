import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { Product } from '../../types/common';
import ProductFullDetails from './ProductFullDetails';

const ProductDetail: React.FC = () => {
  const products = useAppSelector((state) => state.productReducer);
  const { category, id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product>();

  useEffect(() => {
    if (products.length > 0 && id !== undefined) setCurrentProduct(products.find((product: Product) => product.id === parseInt(id)));
  }, [products, id]);

  return <div className="product-details">{currentProduct && category && <ProductFullDetails catName={category} product={currentProduct} />}</div>;
};

export default ProductDetail;
