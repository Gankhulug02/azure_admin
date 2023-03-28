import React, { useState, useContext, useEffect } from 'react';

// Material UI
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Import Function
import MyAlert from '../alert/alert';
import { editTravel, deleteTravel, createTravel } from '../../axios/travel';
import { CategoryContext } from '../../context/Category';
import { AlertContext } from '../../context/Alert';

// import { filter } from 'lodash';
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

const TravelModal = ({ isModal, filteredTravel, setFilteredTravel, modalToggle, setTravelData, travelData }) => {
  const [catId, setCatId] = useState('');

  // Context
  const { categories, getCategory } = useContext(CategoryContext);
  const { setOpen, setAlertText, setAlertSeverity } = useContext(AlertContext);

  if (!categories[0]) {
    getCategory();
  }
  const { title, description, travelImg, travelRating, travelDay, travelPrice, index, _id, name } = filteredTravel;

  const handleChange = (event) => {
    setCatId(event.target.value);
  };

  let form = 'your data';

  if (name === 'Edit') {
    form = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, title: event.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, description: event.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={travelImg}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, travelImg: event.target.value });
          }}
        />
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'spaceBetween' }}>
          <TextField
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            type="number"
            value={travelRating}
            onChange={(event) => {
              setFilteredTravel({ ...filteredTravel, travelRating: event.target.value });
            }}
            sx={{ flex: '1' }}
          />
          <TextField
            id="outlined-basic"
            label="Day"
            variant="outlined"
            type="number"
            value={travelDay}
            onChange={(event) => {
              setFilteredTravel({ ...filteredTravel, travelDay: event.target.value });
            }}
            sx={{ flex: '1' }}
          />
          <Box sx={{ flex: '1' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={catId}
                label="Category"
                onChange={handleChange}
              >
                {categories.map((e, index) => (
                  <MenuItem key={index} value={e._id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          value={travelPrice}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, travelPrice: event.target.value });
          }}
        />
        <Button
          onClick={() => {
            travelData[index] = filteredTravel;
            setTravelData(travelData);
            editTravel(filteredTravel, _id, catId, modalToggle, setOpen, setAlertText, setAlertSeverity);
          }}
        >
          Submit
        </Button>
      </Box>
    );
  } else if (name === 'Delete') {
    form = (
      <Box>
        <Box>
          <h4>Энэ category-г устгахдаа итгэлтэй байна уу?</h4>
        </Box>
        <Box>
          <Button
            onClick={() => {
              console.log(_id);
              deleteTravel({ _id });
              setFilteredTravel({});
              modalToggle();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              modalToggle();
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    );
  } else if (name === 'New Category') {
    form = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, title: event.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, description: event.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={travelImg}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, travelImg: event.target.value });
          }}
        />
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'spaceBetween' }}>
          <TextField
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            type="number"
            value={travelRating}
            onChange={(event) => {
              setFilteredTravel({ ...filteredTravel, travelRating: event.target.value });
            }}
            sx={{ flex: '1' }}
          />
          <TextField
            id="outlined-basic"
            label="Day"
            variant="outlined"
            type="number"
            value={travelDay}
            onChange={(event) => {
              setFilteredTravel({ ...filteredTravel, travelDay: event.target.value });
            }}
            sx={{ flex: '1' }}
          />
          <Box sx={{ flex: '1' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={catId}
                label="Category"
                onChange={handleChange}
              >
                {categories.map((e, index) => (
                  <MenuItem key={index} value={e._id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          value={travelPrice}
          onChange={(event) => {
            setFilteredTravel({ ...filteredTravel, travelPrice: event.target.value });
          }}
        />
        <Button
          onClick={() => {
            travelData[travelData.length] = filteredTravel;
            setTravelData(travelData);
            createTravel({ filteredTravel, catId, modalToggle });
          }}
        >
          Submit
        </Button>
      </Box>
    );
  }

  const handleClose = () => modalToggle();

  return (
    <Box>
      <Modal
        open={isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{form}</Box>
      </Modal>
      <MyAlert />
    </Box>
  );
};

export default TravelModal;
