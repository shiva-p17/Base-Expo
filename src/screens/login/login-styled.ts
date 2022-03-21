import styled from 'styled-components/native';
import {MAIN_BLUE, PRIMARY_COLOR, WHITE_COLOR} from '../../constants/colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styledNative from 'styled-components-native';
import { TouchableRipple } from 'react-native-paper';

export const LoginWrapper = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-top: ${getStatusBarHeight()}px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export const LoginBoxInner = styled.View`
  background: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  width: 85%;
`;

export const SubmitButton = styledNative(TouchableRipple)`
  .style {
    border-radius: 45px;
    align-items: center;
    align-self: center;
    justify-content: center;
    flex-grow: 0;
    padding: 15px 50px;
    background-color: ${MAIN_BLUE};
  }
`;

export const SubmitText = styled.Text`
  color: ${WHITE_COLOR};
`;
