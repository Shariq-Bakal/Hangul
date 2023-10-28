export const getRatedData = (products, rating) => {
    return products.filter((item) => item.rating >= rating);
  };