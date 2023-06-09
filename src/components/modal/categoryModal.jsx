import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CategoryContext } from '../../context/Category';
import { AlertContext } from '../../context/Alert';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  //   height: '60%',
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function CategoryModal({ isModal, modalToggle, isSubmit, setIsSubmit, newCategory }) {
  const { catData, setCatData, newCategoryObj, setNewCategoryObj, addCategory, updateCategory } =
    useContext(CategoryContext);
  const { setOpen, setAlertText } = useContext(AlertContext);

  const changeHandler = (e) => {
    if (newCategory) {
      setNewCategoryObj({ ...newCategoryObj, [e.target.name]: e.target.value });
    } else {
      setCatData({ ...catData, [e.target.name]: e.target.value });
    }
  };

  const handleClose = () => {
    setOpen(true);
    modalToggle();
    setIsSubmit(!isSubmit);
  };

  return (
    <Box>
      <Modal
        open={isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h3">{newCategory ? 'Шинэ' : ' Өөрчлөх'} категори</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              value={newCategory ? newCategoryObj.title : catData.title}
              onChange={changeHandler}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={newCategory ? newCategoryObj.description : catData.description}
              onChange={changeHandler}
            />
            <TextField
              variant="outlined"
              type="file"
              name="categoryImg"
              onChange={async (e) => {
                console.log(e.target.files[0]);
                const imgData = new FormData();
                imgData.append('image', e.target.files[0]);
                const res = await axios.post('http://localhost:8000/upload', imgData);
                if (newCategory) {
                  setNewCategoryObj({ ...newCategoryObj, categoryImg: res.data.imgUrl });
                } else {
                  setCatData({ ...catData, categoryImg: res.data.imgUrl });
                }
              }}
            />
            <TextField
              id="outlined-basic"
              label="Rating"
              variant="outlined"
              type="number"
              name="categoryRating"
              value={newCategory ? newCategoryObj.categoryRating : catData.categoryRating}
              onChange={changeHandler}
            />
            <Button
              onClick={() => {
                if (newCategory) {
                  addCategory({ newCategoryObj, setAlertText });
                  handleClose();
                } else {
                  console.log(catData);
                  updateCategory({ setAlertText });
                  handleClose();
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
