import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

const useLocalStorage = (key, defaultValue) => {
   /* uncomment the below code to delete the array and then recomment it */
  /* localStorage.removeItem(key); */
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, [JSON.stringify(value)]);
    console.log(key, value);
  }, [key, value]);

  return [value, setValue];
};
export default useLocalStorage