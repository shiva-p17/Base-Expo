import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const BlankHeader = styled.View`
  padding-top: ${getStatusBarHeight()}px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
`;
