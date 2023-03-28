// import React from 'react';
import axios from 'axios';
import { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);

  const [fileteredCategory, setFilteredCategory] = useState([]);

  const getCategory = () => {
    axios
      .get('http://localhost:8000/categories')
      .then((res) => {
        console.log('CAT IRLEE', res.data.categories);
        setCategory(res.data.categories);
        setFilteredCategory(res.data.categories);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategory, fileteredCategory, setFilteredCategory, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
