export const removeItemFromArray = (removeId, array, setArray) => {
  const removeItem = array.filter((item) => item.id !== removeId);
  setArray(removeItem);
};
