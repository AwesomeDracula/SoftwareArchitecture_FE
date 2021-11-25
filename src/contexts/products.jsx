import React, { useReducer, createContext } from "react";
import axios from "axios";
import * as AppURL from "services/urlAPI";
import instance from "services";

const initialState = {
  products: null,
  isLoading: false,
  isLoaded: false
};

export const ProductsStateContext = createContext();
export const ProductsDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        products: action.payload.products
      };
    case "GET_PRODUCTS_FAILURE":
      return {
        ...state,
        products: null,
        isLoading: false,
        isLoaded: false
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductsDispatchContext.Provider value={dispatch}>
      <ProductsStateContext.Provider value={state}>
        {children}
      </ProductsStateContext.Provider>
    </ProductsDispatchContext.Provider>
  );
};

export const getProducts = (dispatch) => {
  dispatch({
    type: "GET_PRODUCTS_REQUEST"
  });
  const urlBooks = AppURL.baseUrl + AppURL.getBooks;
  const urlClothes = AppURL.baseUrl + AppURL.getClothes;
  const urlElectronics = AppURL.baseUrl + AppURL.getElectronic;
  const urlShoes = AppURL.baseUrl + AppURL.getShoes;
  const requestBooks = axios.get(urlBooks);
  const requestClothes = axios.get(urlClothes);
  const requestElectronics = axios.get(urlElectronics);
  const requestShoes = axios.get(urlShoes);
  axios
    .all([requestBooks, requestClothes, requestElectronics, requestShoes])
    .then(
      axios.spread((...responses) => {
        const responseBooks = responses[0];
        const responseClothes = responses[1];
        const responesElectronics = responses[2];
        const responseShoes = responses[3];
        console.log(responseBooks);
        let totalRes = [
          ...responseBooks.data.body,
          ...responseClothes.data.body,
          ...responseShoes.data.body,
          ...responesElectronics.data.body
        ];
        dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: {
            products: totalRes
          }
        });
      })
    )
    .catch((errors) => {
      dispatch({
        type: "GET_PRODUCTS_FAILURE"
      });
    });
};

export default ProductsProvider;
