export const getSearchedData = (products, query) => {
    if (query === '') return products;
    return products.filter((product) => product.productName.toLowerCase().includes(query.toLowerCase()));
  };