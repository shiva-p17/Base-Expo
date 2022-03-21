import React, { createContext, useContext, useState } from 'react';
import { Modal, Portal, Surface } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
  ACTIVITY_INDICATOR_COLOR,
  MODAL_TEXT_COLOR,
} from '../../../constants/colors';

export const IndicatorContext = createContext<Partial<WithSnackbarProps>>({});

const IndicatorProvider: React.FunctionComponent = ({ children }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [indicatorText, setIndicatorText] = useState('');

  const triggerIndicator = (type: boolean) => {
    setShowIndicator(type);
  };

  // Manages all the Indicator's opening process
  const showFullScreenIndicator = (text = '') => {
    triggerIndicator(true);
    setIndicatorText(text);
  };

  const closeFullScreenIndicator = () => {
    triggerIndicator(false);
    setIndicatorText('');
  };

  return (
    <IndicatorContext.Provider
      value={{ showFullScreenIndicator, closeFullScreenIndicator }}
    >
      {children}
      <Portal>
        <Modal visible={showIndicator} dismissable={false}>
          <LocalContainer>
            <ActivityIndicator
              size='large'
              animating={true}
              color={ACTIVITY_INDICATOR_COLOR}
            />
            {!!indicatorText.length && (
              <ContentView>
                <ContentText>{indicatorText}</ContentText>
              </ContentView>
            )}
          </LocalContainer>
        </Modal>
      </Portal>
    </IndicatorContext.Provider>
  );
};

export const useIndicator = () => {
  const { showFullScreenIndicator, closeFullScreenIndicator } =
    useContext(IndicatorContext);

  function open(text = '') {
    showFullScreenIndicator!(text);
  }

  // Returns methods in hooks array way
  return [open, closeFullScreenIndicator];
};

export default IndicatorProvider;

export type WithSnackbarProps = {
  showFullScreenIndicator: (text: string) => void;
  closeFullScreenIndicator: () => void;
};

const ModalContainer = styled(Surface)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  elevation: ${`2`};
`;

const LocalContainer = styled(ModalContainer)`
  padding: 15px;
  margin-left: 30%;
  margin-right: 30%;
`;

const ContentView = styled.View`
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${MODAL_TEXT_COLOR};
`;
