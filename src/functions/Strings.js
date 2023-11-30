export const ShowOnlyTwo = (str = "") => {
  let [name1, name2] = str.split(" ");
  if (name1?.length > 0 && name2?.length > 0) {
    return name1[0].toUpperCase() + name2[0].toUpperCase();
  }
  if (name1?.length > 0) {
    return name1[0].toUpperCase();
  }

  return "US";
};
