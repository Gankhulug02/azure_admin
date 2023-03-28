import axios from 'axios';
import React, { useEffect } from 'react';

const editCat = ({ _id, titleChange, descriptionChange, imgChange, ratingChange, toggleSubmit }) => {
  axios
    .put(`http://localhost:8000/categories/${_id}`, {
      title: titleChange,
      description: descriptionChange,
      categoryImg: imgChange,
      categoryRating: ratingChange,
    })
    .then((res) => {
      console.log('res', res);
      toggleSubmit();
    })
    .catch((err) => {
      console.log('Err', err);
    });
};

const createCat = ({ titleChange, descriptionChange, imgChange, ratingChange, toggleSubmit }) => {
  axios
    .post(`http://localhost:8000/categories`, {
      title: titleChange,
      description: descriptionChange,
      categoryImg: imgChange,
      categoryRating: ratingChange,
    })
    .then((res) => {
      console.log('res', res);
      toggleSubmit();
    })
    .catch((err) => {
      console.log('Err', err);
    });
};

const deleteCat = ({ _id, toggleSubmit }) => {
  axios
    .delete(`http://localhost:8000/categories/${_id}`)
    .then((res) => {
      console.log('res', res);
      toggleSubmit();
    })
    .catch((err) => {
      console.log('Err', err);
    });
};

export { editCat, deleteCat, createCat };
