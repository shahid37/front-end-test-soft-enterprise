export const verifyObject = (obj) => {
  // Check if the object has exactly 3 keys
  const keys = Object.keys(obj);
  if (keys.length !== 3) {
    return false;
  }

  // Check if all values are not empty
  for (let key of keys) {
    const value = obj[key];
    if (value === null || value === undefined || value === "") {
      return false;
    }
  }

  return true;
};

