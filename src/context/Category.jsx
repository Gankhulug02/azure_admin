// import React from 'react';
import axios from 'axios';
import { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);

  const [fileteredCategory, setFilteredCategory] = useState([]);

  const [catData, setCatData] = useState({});

  const [newCategoryObj, setNewCategoryObj] = useState({
    title: '',
    description: '',
    categoryImg: 'url',
    categoryRating: '',
  });

  const [newTravelObj, setNewTravelObj] = useState({
    title: '',
    description: '',
    categoryImg: 'url',
    categoryRating: '',
  });

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

  const updateCategory = async ({ setAlertText }) => {
    try {
      const res = await axios.put(`http://localhost:8000/categories/${_id}`, catData);
      setAlertText('Amjilltai soligdloo');
      // toggleSubmit();
      // modalToggle();
    } catch (error) {
      console.log('UC', error);
    }
  };

  const addCategory = async ({ newCategoryObj, setAlertText }) => {
    console.log('AC', newCategoryObj);
    try {
      const res = await axios.post('http://localhost:8000/categories', newCategoryObj);
      setAlertText('shine category amjilltai uuslee ');
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

  // Travel

  const editTravel = (filteredTravel, _id, catId, modalToggle, setOpen, setAlertText, setAlertSeverity) => {
    console.log(filteredTravel);
    axios
      .put(`http://localhost:8000/travels/${_id}`, { ...filteredTravel, category: catId })
      .then((res) => {
        console.log('res', res);
        console.log('res.body.message', res.data.message);
        setAlertSeverity('success');
        setOpen(true);
        setAlertText(res.data.message);
        modalToggle();
      })
      .catch((err) => {
        console.log(err);
        // errorAlert(err);
      });
  };

  const createTravel = ({ filteredTravel, catId, modalToggle }) => {
    const { name, ...rest } = filteredTravel;
    console.log('', rest);

    axios
      .post(`http://localhost:8000/travels`, { ...rest, travelLocation: 'Tokyo', category: catId })
      .then((res) => {
        console.log('res', res);
        modalToggle();
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  const deleteTravel = ({ _id, modalToggle }) => {
    console.log(_id);
    axios
      .delete(`http://localhost:8000/travels/${_id}`)
      .then((res) => {
        console.log('res', res);
        modalToggle();
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
        newCategoryObj,
        setNewCategoryObj,
        createTravel,
        deleteTravel,
        editTravel,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
