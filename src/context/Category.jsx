// import React from 'react';
import axios from 'axios';
import { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);

  const [fileteredCategory, setFilteredCategory] = useState([]);

  const [catData, setCatData] = useState({});

  const { _id } = catData;

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

  const updateCategory = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/categories/${_id}`, catData);
      // toggleSubmit();
      // modalToggle();
    } catch (error) {
      console.log('UC', error);
    }
  };

  const addCategory = async ({ newCategoryObj }) => {
    console.log('AC', newCategoryObj);
    try {
      const res = await axios.post('http://localhost:8000/categories', newCategoryObj);
      // toggleSubmit();
      // modalToggle();
    } catch (error) {
      console.log('AC', error);
    }
  };

  const deleteCat = ({ _id }) => {
    axios
      .delete(`http://localhost:8000/categories/${_id}`)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategory,
        fileteredCategory,
        setFilteredCategory,
        getCategory,
        addCategory,
        updateCategory,
        catData,
        setCatData,
        deleteCat,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
