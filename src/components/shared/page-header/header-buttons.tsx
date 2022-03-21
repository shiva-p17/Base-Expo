import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';
import {
  BLACK_COLOR,
  HEADER_TEXT_COLOR,
  MAIN_BLUE,
  WHITE_COLOR,
} from '../../../constants/colors';
import { ICON_ARROW_LEFT } from '../../../assets/header';

const size = Platform.select({
  android: 56,
  default: 44,
});

type HeaderButtonProps = {
  text?: string;
  customIconColor?: string;
  disabled?: boolean;
  transparentBackground?: boolean;
  buttonMarginTop?: number;
  onPress?(): void;
};

export const HeaderButton: React.SFC<HeaderButtonProps> = ({
  children,
  ...rest
}) => <StyledHeaderButton {...rest}>{children}</StyledHeaderButton>;

export const EditHeaderButton: React.SFC<HeaderButtonProps> = ({
  children,
  ...rest
}) => <StyledEditHeaderButton {...rest}>{children}</StyledEditHeaderButton>;

export const HamburgerButton: React.SFC<HeaderButtonProps> = (props) => (
  <HeaderButton {...props}>
    <Icon
      type='material'
      name='menu'
      color={HEADER_TEXT_COLOR}
      tvParallaxProperties
    />
  </HeaderButton>
);

export const BackButton: React.SFC<HeaderButtonProps> = (props) => (
  <HeaderButton {...props}>
    <ICON_ARROW_LEFT
      width={60}
      height={30}
      fill={
        (!props.transparentBackground &&
          !props.customIconColor &&
          HEADER_TEXT_COLOR) ||
        (props.customIconColor && props.customIconColor) ||
        BLACK_COLOR
      }
    />
  </HeaderButton>
);

export const CloseButton: React.SFC<HeaderButtonProps> = (props) => (
  <HeaderButton {...props}>
    <Icon
      type='material'
      name='close'
      color={
        (!props.transparentBackground && HEADER_TEXT_COLOR) ||
        (props.customIconColor && props.customIconColor) ||
        BLACK_COLOR
      }
      size={size - 24}
      tvParallaxProperties
    />
  </HeaderButton>
);

export const RightButton: React.SFC<HeaderButtonProps> = (props) => (
  <HeaderButton {...props}>
    <Icon
      type='feather'
      name='trash-2'
      color={
        (!props.transparentBackground && HEADER_TEXT_COLOR) ||
        (props.customIconColor && props.customIconColor) ||
        BLACK_COLOR
      }
      size={20}
      tvParallaxProperties
    />
  </HeaderButton>
);

export const FilterButton: React.SFC<HeaderButtonProps> = (props) => (
  <HeaderButton {...props}>
    <Icon
      type='material'
      name='filter-list'
      color={
        (!props.transparentBackground && HEADER_TEXT_COLOR) ||
        (props.customIconColor && props.customIconColor) ||
        WHITE_COLOR
      }
      size={24}
      tvParallaxProperties
    />
  </HeaderButton>
);

export const EditButton: React.SFC<HeaderButtonProps> = (props) => (
  <EditHeaderButton {...props}>
    <StyledText transparentBackground={props.transparentBackground}>
      {props.text}
    </StyledText>
  </EditHeaderButton>
);

const StyledText = styled.Text<{ transparentBackground?: boolean }>`
  font-weight: bold;
  color: ${(props) =>
    (props.transparentBackground && MAIN_BLUE) || HEADER_TEXT_COLOR};
  font-size: 18px;
  align-self: center;
  align-content: center;
`;

const StyledHeaderButton = styled.TouchableOpacity<HeaderButtonProps>`
  ${(props: HeaderButtonProps) =>
    props.buttonMarginTop &&
    css`
      margin-top: ${props.buttonMarginTop};
    `};
  justify-content: center;
  align-items: center;
  height: ${size}px;
  width: ${size}px;
`;

const StyledEditHeaderButton = styled.TouchableOpacity<HeaderButtonProps>`
  ${(props: HeaderButtonProps) =>
    props.buttonMarginTop &&
    css`
      margin-top: ${props.buttonMarginTop}px;
    `};
  justify-content: center;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;
