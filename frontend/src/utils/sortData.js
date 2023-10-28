export const getSortedData = (sortedList, sortBy) => {
    if (sortBy && sortBy === 'HIGH_TO_LOW') {
      return sortedList.slice().sort((a, b) => b['productDiscountPrice'] - a['productDiscountPrice']);
    }
    if (sortBy && sortBy === 'LOW_TO_HIGH') {
      return sortedList.slice().sort((a, b) => a['productDiscountPrice'] - b['productDiscountPrice']);
    }
    return sortedList;
  };