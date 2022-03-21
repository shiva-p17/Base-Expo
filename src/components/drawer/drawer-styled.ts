// External imports
// React & React Native
import { Dimensions } from 'react-native';

// Relative imports
// Constants
import {
  DARK_GREY,
  DRAWER_HEADER_TEXT,
  LIGHT_GREY,
  MAIN_BLUE,
  PRIMARY_COLOR,
} from '../../constants/colors';
import styled, { css } from 'styled-components/native';

const { height } = Dimensions.get('window');

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 60px 15px 40px 20px;
  background: ${MAIN_BLUE};
`;

export const HeaderContent = styled.TouchableOpacity`
  flex-direction: row;
`;

export const TouchableDrawerItem = styled.TouchableOpacity<{
  isActive?: boolean;
}>`
  ${height > 696
    ? `padding: 15px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
  flex-shrink: 0;
  ${(props: { isActive?: boolean }) =>
    props.isActive &&
    css`
      background-color: rgba(82, 55, 172, 0.2);
      margin-right: 10px;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    `}
`;

export const DrawerItemView = styled.View`
  ${height > 696
    ? `padding: 15px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
  flex-shrink: 0;
`;

export const DrawerBackItemView = styled.View`
  ${height > 696
    ? `padding: 45px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
  flex-shrink: 0;
  background: ${MAIN_BLUE};
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 15px;
`;

export const DrawerSubItemView = styled.View`
  ${height > 696
    ? `padding: 15px 20px 15px 50px`
    : `padding: 8px 20px 8px 50px`};
  flex-shrink: 0;
`;

export const DrawerTopContainer = styled.View`
  padding-top: 20px;
`;

export const IconWrapper = styled.View`
  align-self: center;
`;

export const DrawerHeaderTextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 15px;
  padding-bottom: 5px;
  align-self: center;
`;

export const DrawerHeaderText = styled.Text<{ hasRightMargin: boolean }>`
  color: ${DRAWER_HEADER_TEXT};
  font-size: 20px;
  align-self: center;
`;

export const DrawerItemText = styled.Text<{ isActive?: boolean }>`
  font-size: 18px;
  color: #000;
  ${(props: { isActive?: boolean }) =>
    props.isActive &&
    css`
      color: rgba(82, 55, 172, 1);
    `}
`;

export const DrawerBackItemText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackMenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: -10px;
`;

export const SwitchAppText = styled.Text`
  font-size: 18px;
  color: ${DARK_GREY};
`;

export const AppVersionWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  ${height > 696
    ? `padding: 15px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
`;

export const AppVersionText = styled(SwitchAppText)`
  font-size: 14px;
`;

export const Separator = styled.View`
  height: 2px;
  margin: 25px 0;
  width: 100%;
  background-color: ${LIGHT_GREY};
`;
