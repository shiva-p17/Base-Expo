import React from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { css } from 'styled-components/native';
import {
  HEADER_BACKGROUND,
  HEADER_TEXT_COLOR,
  WHITE_COLOR,
} from '../../../constants/colors';
import { BackButton } from './header-buttons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BlankHeader } from './blank-header';
import { useNavigation } from '@react-navigation/native';

const BAR_SIZE = Platform.select({
  android: 56,
  default: 44,
});

type OwnProps = {
  title: string;
  buttonMarginTop?: number;
  iconSource?: ImageSourcePropType | null;
  onHeaderButtonClick?(): void;
  onTitlePress?(): void;
};

type ClickableHeaderProps = OwnProps;

export const ClickableHeader: React.SFC<ClickableHeaderProps> = ({
  buttonMarginTop,
  onTitlePress,
  title,
  iconSource,
}) => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <HeaderContainer>
        <BackButton
          buttonMarginTop={buttonMarginTop}
          onPress={() => navigation.goBack()}
        />
        <MainContentClickable title={title}>
          <TouchableOpacityStyled onPress={onTitlePress}>
            {iconSource && <TitleIcon source={iconSource} />}
            <HeaderText>
              {title.length > 20 ? title.substring(0, 20) + '...' : title}
            </HeaderText>
            <Icon
              name='keyboard-arrow-down'
              color={WHITE_COLOR}
              size={32}
              style={{ alignSelf: 'center', marginTop: 5 }}
            />
          </TouchableOpacityStyled>
        </MainContentClickable>
      </HeaderContainer>
    </React.Fragment>
  );
};

const HeaderContainer = styled(BlankHeader)`
  background-color: ${HEADER_BACKGROUND};
  min-height: ${BAR_SIZE + getStatusBarHeight()};
`;

const HeaderText = styled(Text)`
  font-size: 20px;
  color: ${HEADER_TEXT_COLOR};
`;

const MainContentClickable = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  ${(props: OwnProps) =>
    props.title &&
    css`
      align-items: center;
      padding-right: ${BAR_SIZE};
    `}
`;

const TouchableOpacityStyled = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const TitleIcon = styled(Image)`
  height: 15px;
  width: 15px;
  resize-mode: contain;
  margin-right: 5px;
`;

export default ClickableHeader;
