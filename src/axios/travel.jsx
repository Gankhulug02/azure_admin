import axios from 'axios';
import React, { useEffect } from 'react';

const editTravel = (filteredTravel, _id, catId, modalToggle, setOpen, setAlertText, setAlertSeverity) => {
  axios
    .put(`http://localhost:8000/travels/${_id}`, { ...filteredTravel, category: catId })
    .then((res) => {
      console.log('res', res);
      console.log('res.body.message', res.data.message);
      setAlertSeverity('error');
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

export { editTravel, deleteTravel, createTravel };
