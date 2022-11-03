const uniqueArray = (arr: []) => {
  const ids: any = [];

  return arr.filter((item: any) => {
    if (!ids.includes(item.id)) {
      ids.push(item.id);
      return true;
    }
    return false;
  });
};
export default uniqueArray;
