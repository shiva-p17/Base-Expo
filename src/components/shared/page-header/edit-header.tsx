// External imports
// React & React Native
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
// Misc
import { getStatusBarHeight } from 'react-native-status-bar-height';

// Relative imports
// Components
import { EditButton, BackButton } from './header-buttons';
// Constants
import { MAIN_BLUE, WHITE_COLOR } from '../../../constants/colors';

const BAR_SIZE = Platform.select({
  android: 56,
  default: 44,
});

export const EditHeader: React.SFC<EditHeaderProps> = ({
  confirmDisabled = false,
  title,
  cancelText,
  confirmText,
  isModalHeader,
  navigation,
  withBackButton,
  buttonMarginTop,
  onHeaderConfirmButtonClick,
  onCancelClick,
  transparentBackground,
  customBackground,
  customColor,
}) => {
  return (
    <HeaderContainer
      transparentBackground={!!transparentBackground}
      customBackground={customBackground}
      isModalHeader={isModalHeader || false}
    >
      <LeftContent>
        {withBackButton ? (
          <BackButton
            customIconColor={customColor}
            transparentBackground={transparentBackground}
            buttonMarginTop={buttonMarginTop}
            onPress={onCancelClick ? onCancelClick : () => navigation.goBack()}
          />
        ) : (
          <EditButton
            text={cancelText}
            onPress={onCancelClick ? onCancelClick : () => navigation.goBack()}
          />
        )}
      </LeftContent>
      <MainContent>
        <HeaderText>{title}</HeaderText>
      </MainContent>
      <RightContent testID='editHeaderRightButton'>
        {!confirmDisabled && (
          <EditButton
            transparentBackground={transparentBackground}
            text={confirmText}
            customIconColor={customColor}
            onPress={onHeaderConfirmButtonClick}
          />
        )}
      </RightContent>
    </HeaderContainer>
  );
};

type OwnProps = {
  confirmDisabled?: boolean;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  isModalHeader?: boolean;
  withBackButton?: boolean;
  transparentBackground?: boolean;
  customBackground?: string;
  customColor?: string;
  buttonMarginTop?: number;
  // This `any` is to get around the hack that was used to get around Staat library not passing
  // navigation as a prop to functional components, so it has to be manually passed
  // tslint:disable-next-line
  navigation?: any;
  onCancelClick?(): void;
  onHeaderConfirmButtonClick?(): void;
};

type EditHeaderProps = OwnProps;

export default EditHeader;

const HeaderContainer = styled.View<{
  isModalHeader: boolean;
  transparentBackground: boolean;
  customBackground?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  background-color: ${props =>
  props.transparentBackground
    ? 'rgba(0,0,0,0)'
    : props.customBackground
    ? props.customBackground
    : WHITE_COLOR};
  padding-top: ${props =>
  !!props.isModalHeader && Platform.OS === 'android'
    ? getStatusBarHeight() - 25
    : getStatusBarHeight()}px;
  min-height: ${props =>
  !!props.isModalHeader && Platform.OS === 'android'
    ? BAR_SIZE + getStatusBarHeight() - 25
    : BAR_SIZE + getStatusBarHeight()}px;
`;

const MainContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LeftContent = styled.View`
  flex-direction: row;
  flex-basis: 30%;
  flex-grow: 0;
  justify-content: flex-start;
  align-items: center;
`;

const RightContent = styled.View`
  flex-direction: row;
  flex-basis: 30%;
  flex-grow: 0;
  justify-content: flex-end;
  align-items: center;
`;

export const HeaderText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${MAIN_BLUE};
`;
