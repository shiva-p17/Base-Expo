import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import {
  BLACK_COLOR,
  HEADER_BACKGROUND,
  HEADER_TEXT_COLOR,
  LIGHT_GREY,
  MEDIUM_GREY_COLOR,
} from '../../../constants/colors';
import {
  BackButton,
  CloseButton,
  FilterButton,
  HamburgerButton,
  HeaderButton,
  RightButton,
} from './header-buttons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BlankHeader } from './blank-header';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type OwnProps = {
  withBackButton?: boolean;
  withCloseButton?: boolean;
  withHamburger?: boolean;
  transparentBackground?: boolean;
  title?: string;
  headerBackground?: string;
  buttonMarginTop?: number;
  spacer?: boolean;
  rightIcon?: boolean;
  rightContainer?: React.ReactNode;
  rightElement?: React.ComponentType;
  filterIcon?: boolean;
  customIconColor?: string;
  onHeaderButtonClick?(): void;
  onRightIconButtonClick?(): void;
};

export type PageHeaderTypes = OwnProps;

type PageHeaderProps = OwnProps;

export const BAR_SIZE = Platform.select({
  android: 56,
  default: 44,
});

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  withBackButton,
  withCloseButton,
  withHamburger,
  transparentBackground,
  onHeaderButtonClick,
  buttonMarginTop,
  children,
  title,
  spacer,
  rightIcon,
  filterIcon,
  rightContainer,
  onRightIconButtonClick,
  customIconColor,
  headerBackground,
  rightElement: RightElement,
}) => {
  const navigation = useNavigation();

  return (
    <HeaderContainer
      transparentBackground={transparentBackground}
      headerBackground={headerBackground}
    >
      {withBackButton && (
        <BackButton
          transparentBackground={transparentBackground || !!headerBackground}
          buttonMarginTop={buttonMarginTop}
          customIconColor={customIconColor}
          onPress={() => {
            if (onHeaderButtonClick) {
              onHeaderButtonClick();
            } else {
              navigation.goBack();
            }
          }}
        />
      )}
      {withCloseButton && (
        <CloseButton
          transparentBackground={transparentBackground}
          buttonMarginTop={buttonMarginTop}
          customIconColor={customIconColor}
          onPress={() => {
            if (onHeaderButtonClick) {
              onHeaderButtonClick();
            } else {
              navigation.goBack();
            }
          }}
        />
      )}
      {withHamburger && (
        <HamburgerButton
          buttonMarginTop={buttonMarginTop}
          onPress={() => {
            if (onHeaderButtonClick) {
              onHeaderButtonClick();
            } else {
              navigation.dispatch(DrawerActions.openDrawer());
            }
          }}
        />
      )}
      {/* Spacer is used to center the header if there is no hamburger or back button */}
      {spacer && <Spacer />}
      <MainContent title={title}>
        {!!title ? (
          <HeaderText
            transparentBackground={transparentBackground}
            headerBackground={headerBackground}
            numberOfLines={1}
          >
            {title}
          </HeaderText>
        ) : (
          children
        )}
      </MainContent>
      {spacer && <Spacer />}
      {rightIcon && (
        <RightButton
          transparentBackground={transparentBackground}
          buttonMarginTop={buttonMarginTop}
          customIconColor={customIconColor}
          onPress={() => {
            if (onRightIconButtonClick) {
              onRightIconButtonClick();
            }
          }}
        />
      )}
      {rightContainer && (
        <HeaderButton
          onPress={() => {
            if (onRightIconButtonClick) {
              onRightIconButtonClick();
            }
          }}
        >
          {rightContainer}
        </HeaderButton>
      )}
      {RightElement && <RightElement />}
      {filterIcon && (
        <FilterButton
          transparentBackground={transparentBackground}
          buttonMarginTop={buttonMarginTop}
          customIconColor={customIconColor}
          onPress={() => {
            if (onRightIconButtonClick) {
              onRightIconButtonClick();
            }
          }}
        />
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled(BlankHeader)`
  min-height: ${BAR_SIZE + getStatusBarHeight()}px;
  ${(props: OwnProps) =>
    !props.transparentBackground &&
    css`
      background-color: ${props.headerBackground
        ? props.headerBackground
        : HEADER_BACKGROUND};
    `}
`;

const Spacer = styled.View`
  width: 50px;
`;

const HeaderText = styled.Text<OwnProps>`
  font-size: 20px;
  color: ${HEADER_TEXT_COLOR};
  ${(props: OwnProps) =>
    css`
      color: ${(props.transparentBackground && BLACK_COLOR) ||
      (props.headerBackground ? BLACK_COLOR : HEADER_TEXT_COLOR)};
    `}
`;

const MainContent = styled.View<OwnProps>`
  justify-content: center;
  flex: 1;
  ${(props: OwnProps) =>
    props.title &&
    css`
      align-items: center;
      padding-right: ${BAR_SIZE}px;
    `}
  ${(props: OwnProps) =>
    (!props.withBackButton || !props.withHamburger || !props.withCloseButton) &&
    css`
      align-items: flex-start;
      padding-left: 15px;
    `}
`;

export const PageTitleWrapper = styled.View`
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${LIGHT_GREY};
`;

export const PageTitle = styled.Text`
  font-size: 32px;
  color: ${BLACK_COLOR};
  margin: 0 20px;
`;

export const PageSubTitle = styled.Text`
  font-size: 16px;
  color: ${MEDIUM_GREY_COLOR};
  margin: 0 25px;
`;

export default PageHeader;
