export const addItemToArray = (Array, setArray, item) => {
  if (Array.filter((e) => e?.id === item?.id).length === 0) {
    setArray((prev) => [...prev, item]);
  }
};
