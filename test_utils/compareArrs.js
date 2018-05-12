module.exports = (arrOne, arrTwo) => {
  if (arrOne.length !== arrTwo.length) return false;

  const clone = Array.from(arrTwo);
  return !arrOne.some((e) => {
    const index = clone.indexOf(e);
    if (index > -1) {
      clone.splice(index, 1);
      return false;
    }
    return true;
  });
};
