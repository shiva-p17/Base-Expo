import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

export const SnackbarContext = createContext<Partial<WithSnackbarProps>>({});

const SnackbarProvider: React.FunctionComponent = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [snackbarStyle, setSnackbarStyle] = useState('default');

  const triggerSnackbar = (text: string, type: string) => {
    setText(text);
    setSnackbarStyle(type);
    setOpen(true);
  };

  // Manages all the snackbar's opening process
  const openSnackbar = (text: string, type = 'default') => {
    // Closes the snackbar if it is already open
    if (open) {
      setOpen(false);
      setTimeout(() => {
        triggerSnackbar(text, type);
      }, 250);
    } else {
      triggerSnackbar(text, type);
    }
  };

  // Closes the snackbar just by setting the "open" state to false
  const closeSnackbar = () => {
    setOpen(false);
  };

  // @ts-ignore
  const barStyle = snackbarStyles[snackbarStyle];
  // @ts-ignore
  const barTextStyle = snackbarStyles[`${snackbarStyle}Text`] || {};

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        visible={open}
        duration={2000}
        onDismiss={closeSnackbar}
        wrapperStyle={{ paddingHorizontal: 8, elevation: 10 }}
        style={[snackbarStyles.defaultWrapperStyles, barStyle]}
      >
        <Text style={[barTextStyle, snackbarStyles.defaultSnackbar]}>
          {text}
        </Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  function open(text = '', type = 'default') {
    openSnackbar!(text, type);
  }

  // Returns methods in hooks array way
  return [open, closeSnackbar];
};

export default SnackbarProvider;

export type WithSnackbarProps = {
  openSnackbar: (text: string, type?: string) => void;
  closeSnackbar: () => void;
};

const snackbarStyles = StyleSheet.create({
  default: {},
  defaultWrapperStyles: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 50,
  },
  success: {
    backgroundColor: '#DBF8E8',
    borderColor: '#94E9BA',
  },
  successText: {
    color: '#0E9C4D',
  },
  info: {
    backgroundColor: '#CDE8F5',
    borderColor: '#7EBDDF',
  },
  infoText: {
    color: '#4480AE',
  },
  danger: {
    backgroundColor: '#FFE4E4',
    borderColor: '#ffa2b0',
  },
  dangerText: {
    color: '#CC3A3A',
  },
  warning: {
    backgroundColor: '#FFF7DF',
    borderColor: '#FFF6DE',
  },
  warningText: {
    color: '#CCA023',
  },
  defaultSnackbar: {
    fontSize: 15,
  },
});
