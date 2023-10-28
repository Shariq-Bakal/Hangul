export const getProductsInPriceRange = (products, price) => {
    return products.filter((item) => Number(item.productDiscountPrice) <= Number(price));
  };