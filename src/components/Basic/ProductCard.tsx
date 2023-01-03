import { Card, CardMedia, CardContent, Typography, Avatar } from "@mui/material";
import { Fragment } from "react";
import { ProductProps } from "../../types/props";

const ProductCard: React.FC<ProductProps> = (props) => {
    
  const promotionCard:  React.FC<ProductProps> = ({id}) => (
    <Card sx={{ maxWidth: 900 }}>
      <CardMedia component="img" height={194} image="https://api.lorem.space/image?w=640&h=480&r=9067" alt="Tasty Soft Chair" />
      <CardContent>
        <Typography variant="body2">Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals</Typography>
      </CardContent>
    </Card>
  );

  const normalCard: React.FC<ProductProps> = ({type, id}) => (
    <Card sx={{ maxWidth: 900 }}>
    <Avatar variant={type} sx={{ width: 200, height: 200 }} src="https://api.lorem.space/image?w=640&h=480&r=9067" alt="Tasty Soft Chair" />
    <CardContent>
      <Typography variant="body2">Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals</Typography>
    </CardContent>
  </Card>
  )

  return (
    <Fragment>
        {props.type ? normalCard({id:props.id, type: props.type }) : promotionCard({id: props.id})}
    </Fragment>
  );
};

export default ProductCard;
