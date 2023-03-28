import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { editCat, deleteCat, createCat } from '../../axios/category';

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

export default function CategoryModal({ isModal, catData, modalToggle, isSubmit, setIsSubmit }) {
  const { _id, title, description, categoryImg, categoryRating } = catData;

  const [titleChange, setTitleChange] = React.useState(title);

  const [descriptionChange, setDescriptionChange] = React.useState(description);

  const [imgChange, setImgChange] = React.useState(categoryImg);

  const [ratingChange, setRatingChange] = React.useState(categoryRating);

  const toggleSubmit = () => {
    console.log(isSubmit);
    setIsSubmit(!isSubmit);
  };

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
            editCat({ titleChange, descriptionChange, imgChange, ratingChange, _id, toggleSubmit });
            modalToggle();
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
              deleteCat({ _id, setIsSubmit });
              modalToggle();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              modalToggle();
              toggleSubmit();
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
            createCat({ titleChange, descriptionChange, imgChange, ratingChange, _id, toggleSubmit });
            modalToggle();
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
    </Box>
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
