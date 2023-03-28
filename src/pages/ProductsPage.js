import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Rating from '@mui/material/Rating';

// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
import TravelModal from '../components/modal/travelModal';

import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '../sections/@dashboard/user/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [travelData, setTravelData] = useState([]);

  const [filteredTravel, setFilteredTravel] = useState({});

  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const getTravel = () => {
    axios
      .get(`http://localhost:8000/travels`)
      .then((res) => {
        console.log('res', res.data.travels);
        setTravelData(res.data.travels);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  useEffect(() => {
    getTravel();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Travel | Minimal UI </title>
      </Helmet>

      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            onClick={() => {
              setFilteredTravel({ name: 'New Category' });
              toggleModal();
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Шинэ Travel Үүсгэх
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 4,
            borderRadius: '10px',
            backgroundColor: '#fff',
            flexWrap: 'wrap',
            gap: '35px',
          }}
        >
          {travelData.map((e, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '450px',
                height: '450px',
                // boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  border: '0px solid black',
                }}
              >
                <img
                  src={e.travelImg}
                  alt="Italian Trulli"
                  style={{ width: '100%', borderRadius: '5px', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '55%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '5px',
                  py: 1,
                }}
              >
                <Box sx={{ display: 'flex', gap: '5px', width: '100%' }}>
                  <Box sx={{ border: '0px solid red', flex: '1' }}>
                    <Rating
                      name="no-value"
                      value={e.travelRating}
                      sx={{ fontSize: '15px' }}
                      // onChange={(event) => {
                      //   console.log(event.target.value);
                      //   travelData[index].travelRating = event.target.value;
                      //   console.log(travelData);
                      //   setTravelData(travelData);
                      // }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'end', pr: 2, border: '0px solid red', flex: '1' }}>
                    {e.travelPrice}$
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}>
                  <Box sx={{ border: '0px solid red', flex: '2.5', fontSize: '20px' }}>{e.title}</Box>
                  <Box
                    sx={{
                      display: 'flex',
                      fontSize: '15px',
                      justifyContent: 'end',
                      pr: 2,
                      border: '0px solid red',
                      flex: '1',
                    }}
                  >
                    {e.travelDay} Day
                  </Box>
                </Box>
                <Box sx={{ width: '100%', fontSize: '15px', border: 'px solid grey' }}>
                  <Typography variant="p">
                    {`Day 1: Arrival and exploring. Day 2: Shibuya and Harajuku. Day 3: Asakusa and Ueno. Day 4: Tsukiji
  Fish Market and Ginza. Day 5: Shinjuku and Kabukicho. Day 6: Akihabara and Odaiba. Day 7: Tokyo
  Disneyland or DisneySea. Plus plenty of food, shopping, and exploring in between`.substring(0, 60)}
                    ...
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    sx={{
                      border: '1px solid black',
                      borderRadius: '0px',
                      '&:hover': {
                        borderRadius: '5px',
                        backgroundColor: 'white',
                      },
                    }}
                    onClick={() => {
                      setFilteredTravel({ ...e, name: 'Edit', index });
                      toggleModal({ ...e, name: 'Edit', index });
                    }}
                  >
                    <Typography variant="p" sx={{ fontSize: '0.7rem', color: 'black' }}>
                      EDIT
                    </Typography>
                    {/* <EditIcon sx={{ color: 'grey', fontSize: '20px' }} /> */}
                  </Button>
                  <Button
                    sx={{
                      border: '1px solid black',
                      borderRadius: '0px',
                      '&:hover': {
                        borderRadius: '5px',
                        backgroundColor: 'white',
                      },
                    }}
                    onClick={() => {
                      setFilteredTravel({ ...e, name: 'Delete', index });
                      toggleModal();
                    }}
                  >
                    <Typography variant="p" sx={{ fontSize: '0.7rem', color: 'black' }}>
                      DELETE
                    </Typography>
                    {/* <DeleteIcon sx={{ color: 'red', fontSize: '20px' }} /> */}
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <TravelModal
          isModal={isModal}
          modalToggle={toggleModal}
          setTravelData={setTravelData}
          travelData={travelData}
          setFilteredTravel={setFilteredTravel}
          filteredTravel={filteredTravel}
        />
        {/* <ModalYesOrNo
          open={yes}
          handleClose={handleNo}
          title="Travel"
          noFunc={() => {
            console.log('No');
          }}
          yesFunc={() => {
            console.log('Yes Delete');
          }}
        /> */}
      </Container>
    </>
  );
}
