import { createContext, useState } from 'react';

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [alertText, setAlertText] = useState();

  const [alertSeverity, setAlertSeverity] = useState('success');

  return (
    <AlertContext.Provider value={{ open, setOpen, alertText, setAlertText, alertSeverity, setAlertSeverity }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
