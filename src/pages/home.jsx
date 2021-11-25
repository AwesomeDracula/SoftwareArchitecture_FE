import React, { useEffect, useContext } from "react";
import ProductCard from "components/Product";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts
} from "contexts/products";
import { CommonStateContext } from "contexts/common";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Home = () => {
  const { products, isLoading, isLoaded } = useContext(ProductsStateContext);
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);

  const [cate, setCate] = React.useState("");

  const handleChange = (event) => {
    setCate(event.target.value);
  };

  const productsList =
    products &&
    products.filter((product) => {
      let name = product.name ? product.name : product.title;
      return (
        name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <Box sx={{ maxWidth: 900 }} style={{ margin: "0 auto", marginTop: 50 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cate}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={1}>Books</MenuItem>
            <MenuItem value={2}>Electronics</MenuItem>
            <MenuItem value={3}>Shoes</MenuItem>
            <MenuItem value={4}>Clothes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="products">
        {isLoaded &&
          productsList.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
