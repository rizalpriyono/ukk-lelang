const convertRupiah = (number) => {
  const format = number.toString().split("").reverse().join("");
  const convert = format.match(/\d{1,3}/g);

  return convert.join(".").split("").reverse().join("");
};

export default convertRupiah;
