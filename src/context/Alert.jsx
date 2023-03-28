import { createContext, useState } from 'react';

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [alertText, setAlertText] = useState();

  const [alertSeverity, setAlertSeverity] = useState('success');

  const errorAlert = ({ err }) => {
    // setAlertSeverity('success');
    // setAlertText('aldaa garlaa');
    // setOpen(true);
    // console.log('Errosoooo', err);
    // console.log(setAlertSeverity);
    // console.log('sevirity', alertSeverity);
  };

  return (
    <AlertContext.Provider
      value={{ open, setOpen, alertText, setAlertText, alertSeverity, setAlertSeverity, errorAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
