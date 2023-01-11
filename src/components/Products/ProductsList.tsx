import { Box, Card, CardContent, CardHeader, Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Pagination, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Category, Product } from "../../types/common";
import { sortAllByPrice } from "../../redux/reducers/productReducer";
import { store } from "../../redux/store";
import { style } from "@mui/system";
import ProductCard from "../Basic/ProductCard";
import ProductPlacement from "../FrontPage/ProductPlacement";

const ProductsList: React.FC = () => {
  const [isAsc, revertSort] = useState(true);
  const categoryList = useAppSelector((state) => state.categoryReducer);
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let params = useParams() as unknown as string;
  let currentCat: any = "";
  if (params) currentCat = params;

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [chosenCat, setChosenCat] = useState<number>(-1);

  const [priceRange, setPriceRange] = useState<number[]>([10, 100000]);
  const [minMaxPrice, setMinMaxPrice] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const viewProducts = currentProducts.slice(currentPage * 12 - 12, currentPage * 12);

  // Testing grouping all components into one
  useEffect(() => {
    let tempArr: Product[] = [];
    if (currentCat.category && categoryList.length > 0 && products.length > 0) {
      const a = categoryList.find((cat) => cat.name === currentCat.category);
      if (a === undefined) navigate("/error");
      else {
        tempArr = products.filter((product: Product) => product.category.name === a.name);
        setChosenCat(a.id);
      }
    } else if (products.length > 0) tempArr = products.map((x: any) => x);

    if (tempArr.length > 0) {
      if (isAsc) {
        console.log(tempArr);
        tempArr.sort((a, b) => (a.price > b.price ? 1 : -1));
        setMinMaxPrice([tempArr[0].price, tempArr[tempArr.length - 1].price]);
      } else {
        tempArr.sort((a, b) => (a.price > b.price ? -1 : 1));
        setMinMaxPrice([tempArr[0].price, tempArr[tempArr.length - 1].price]);
      }
    }
    setCurrentProducts(tempArr.map((x: any) => x));
  }, [currentCat.category, categoryList, navigate, products, isAsc]);

  useEffect(() => {
    if (categoryList.length > 0 && products.length > 0 && chosenCat !== -1) {
      console.log(products, chosenCat, "current");
      setCurrentProducts(products.filter((product: Product) => product.category.id === chosenCat + 1));
    }
  }, [categoryList, chosenCat, products]);

  useEffect(() => {
    setCurrentProducts((currentProducts) => currentProducts.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]));
    setCurrentPage(1)
  }, [priceRange]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value} EUR`;
  }

  const handleList = (index: number) => {
    if (index === chosenCat) setChosenCat(-1);
    else setChosenCat(index);
  };

  const handlePageChange = (event: any, pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("mm", minMaxPrice);
  }, [minMaxPrice]);

  return (
    <div className="products-page">
      <Box className="products-page intro">
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              The Winston Products
            </Typography>
            <Typography sx={{ fontSize: 14 }} component="div">
              The best products are available. With personalized birthday gifting option, our products are sure to delight. Make their birthday this year extra spcial - a gift with heart and soul.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box className="products-page products">
        <Grid container spacing={"4em"}>
          <Grid item xs={3}>
            <Box textAlign={"left"}>
              <Box>
                <Typography variant="h6" component="div">
                  Price
                </Typography>
                {minMaxPrice.length > 0 && <Slider getAriaLabel={() => "Temperature range"} value={priceRange} onChange={handleChange} valueLabelDisplay="auto" getAriaValueText={valuetext} min={minMaxPrice[0]} max={minMaxPrice[1]} />}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton selected={isAsc === true && true} onClick={() => revertSort(!isAsc)}>
                      <ListItemText primary={"Ascending"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton selected={isAsc === false && true} onClick={() => revertSort(!isAsc)}>
                      <ListItemText primary={"Descending"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Category
                </Typography>
                <List>
                  {categoryList.map((category, index) => (
                    <ListItem key={`list-${category.id}`} disablePadding>
                      <ListItemButton selected={chosenCat === index && true} onClick={() => handleList(index)}>
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={9}>
            <Box textAlign={"left"}>
              <Typography variant="h6" component="div">
                Products
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", p: 1, m: 1, bgcolor: "background.paper", borderRadius: 1 }}>
              {viewProducts.map((product) => (
                <ProductPlacement key={`productLis-${product.id}`} size={50} product={product} isOnSale={false} isHideDescription={true} />
              ))}

              <Pagination count={Math.ceil(currentProducts.length / 12)} page={currentPage} variant="outlined" onChange={handlePageChange} shape="rounded" size="large" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductsList;
