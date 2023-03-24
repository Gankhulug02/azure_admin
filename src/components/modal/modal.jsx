import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { editCat, deleteCat, createCat } from '../../axios/index';

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

export default function BasicModal({ isModal, catData, modalToggle, isSubmit, setIsSubmit }) {
  console.log(catData.name);

  const { _id, title, description, categoryImg, categoryRating } = catData;

  const [open, setOpen] = React.useState(true);

  const [iconName, setIconName] = React.useState('');

  const [titleChange, setTitleChange] = React.useState(title);

  const [descriptionChange, setDescriptionChange] = React.useState(description);

  const [imgChange, setImgChange] = React.useState(categoryImg);

  const [ratingChange, setRatingChange] = React.useState(categoryRating);

  let form = '';

  if (catData.name === 'Edit') {
    form = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={titleChange}
          onChange={(event) => {
            setTitleChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={descriptionChange}
          onChange={(event) => {
            setDescriptionChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={imgChange}
          onChange={(event) => {
            setImgChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Rating"
          variant="outlined"
          type="number"
          value={ratingChange}
          onChange={(event) => {
            setRatingChange(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            editCat({ titleChange, descriptionChange, imgChange, ratingChange, _id });
            modalToggle();
            setIsSubmit(!isSubmit);
          }}
        >
          Submit
        </Button>
      </Box>
    );
  } else if (catData.name === 'Delete') {
    form = (
      <Box>
        <Box>
          <h4>Энэ category-г устгахдаа итгэлтэй байна уу?</h4>
        </Box>
        <Box>
          <Button
            onClick={() => {
              deleteCat({ _id });
              modalToggle();
              setIsSubmit(!isSubmit);
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
  } else if (catData.name === 'New Category') {
    form = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(event) => {
            setTitleChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(event) => {
            setDescriptionChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          onChange={(event) => {
            setImgChange(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Rating"
          variant="outlined"
          type="number"
          onChange={(event) => {
            setRatingChange(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            createCat({ titleChange, descriptionChange, imgChange, ratingChange, _id });
            modalToggle();
            setIsSubmit(!isSubmit);
          }}
        >
          Submit
        </Button>
      </Box>
    );
  }

  //   const handleOpen = (e) => {
  //     setOpen(true);
  //     setIconName(e);
  //   };

  const handleClose = () => modalToggle();

  return (
    <div>
      {/* <Button onClick={() => handleOpen(name)}>{icon}</Button> */}
      <Modal
        open={isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{form}</Box>
      </Modal>
    </div>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { TextField } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '40%',
//   height: '80%',
//   bgcolor: 'background.paper',
//   border: '1px solid grey',
//   borderRadius: '20px',
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({ icon, name, title, description, categoryImg, categoryRating }) {
//   const [open, setOpen] = React.useState(false);

//   const [iconName, setIconName] = React.useState('');

//   const [titleChange, setTitleChange] = React.useState(title);

//   const [descriptionChange, setDescriptionChange] = React.useState(description);

//   const [imgChange, setImgChange] = React.useState(categoryImg);

//   const [ratingChange, setRatingChange] = React.useState(categoryRating);

//   const form = '';
//   const formData = [
//     { value: title, label: 'title', change: titleChange },
//     { value: description, label: 'description', change: descriptionChange },
//     { value: categoryImg, label: 'Image', change: imgChange },
//     { value: categoryRating, label: 'Rating', change: ratingChange },
//   ];

//   const handleChange = (event) => {
//     console.log(event.target);
//     console.log(event.target.value);
//     setRatingChange(event.target.value);
//   };

//   const handleOpen = (e) => {
//     setOpen(true);
//     setIconName(e);
//   };
//   //   if(iconName=="Delete"){
//   //     form=
//   //   }

//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={() => handleOpen(name)}>{icon}</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
//             {formData.map((e, index) => (
//               <TextField
//                 key={index}
//                 id="outlined-basic"
//                 label={e.label}
//                 variant="outlined"
//                 value={e.change}
//                 onChange={handleChange}
//               />
//             ))}
//           </Box>
//           <Button>Submit</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
