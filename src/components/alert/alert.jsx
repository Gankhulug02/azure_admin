import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertContext } from '../../context/Alert';

export default function MyAlert() {
  const { open, setOpen, alertText, alertSeverity } = useContext(AlertContext);

  return (
    <Box sx={{ position: 'absolute', top: '20px', left: '0px', zIndex: '9999999', width: '20%' }}>
      <Collapse in={open}>
        <Alert
          severity={alertSeverity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              {console.log(alertSeverity, 'hardaa')}
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertText}
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button>
    </Box>
  );
}
