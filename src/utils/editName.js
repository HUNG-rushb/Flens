const editName = (strToSearch, strToFind, strToInsert) => {
  var n = strToSearch.lastIndexOf(strToFind);
  return (
    strToSearch.substring(0, n) + '-' + strToInsert + strToSearch.substring(n)
  );
};

export default editName;
