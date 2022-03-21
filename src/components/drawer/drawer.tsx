import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import {
  DrawerHeaderText,
  DrawerHeaderTextWrapper,
  DrawerItemText,
  DrawerItemView,
  DrawerTopContainer,
  HeaderContainer,
  HeaderContent,
  MenuItem,
  TouchableDrawerItem,
} from './drawer-styled';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { loadProfilePhotoUrl } from '../../helpers/profile-helper';
import { SITE_LOGO } from '../../assets/branding';
import {
  AppScreens,
  AuthScreens,
  PreloadScreens,
} from '../../navigation/screens';
import { AppState } from '../../state/types';
import { bindActionCreators } from 'redux';
import * as requests from '../../state/requests';
import { User } from '../../types/user';
import { useIndicator } from '../shared/use-indicator/use-indicator';

const Drawer: React.FunctionComponent<DrawerComponentProps> = ({
  user,
  logout,
}) => {
  const navigation = useNavigation<any>();
  const [showFullScreenIndicator, closeFullScreenIndicator] = useIndicator();

  const onDrawerItemClick = (
    screen: AppScreens | AuthScreens | PreloadScreens,
    params: any = {},
  ) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screen as unknown as never, params as unknown as never);
  };

  const renderMenuItem = (
    screen: AppScreens | AuthScreens | PreloadScreens,
    label: string,
    params?: any,
  ) => {
    return (
      <TouchableDrawerItem onPress={() => onDrawerItemClick(screen, params)}>
        <MenuItem>
          <DrawerItemText>{label}</DrawerItemText>
        </MenuItem>
      </TouchableDrawerItem>
    );
  };

  /*const renderMenuLink = (
    screen: AppScreens | AuthScreens | PreloadScreens,
    label: string,
    params?: any,
  ) => {
    return (
      <TouchableDrawerItem onPress={() => onDrawerItemClick(screen, params)}>
        <MenuItem>
          <DrawerItemText>{label}</DrawerItemText>
        </MenuItem>
      </TouchableDrawerItem>
    );
  };*/

  const triggerLogout = async () => {
    showFullScreenIndicator!();
    try {
      await logout();
    } catch (_) {}
    closeFullScreenIndicator!();
  };

  const renderAuthenticatedItems = () => {
    return (
      <DrawerTopContainer>
        {renderMenuItem(AppScreens.Home, 'Home')}
        <TouchableOpacity onPress={triggerLogout}>
          <DrawerItemView>
            <MenuItem>
              <DrawerItemText>Logout</DrawerItemText>
            </MenuItem>
          </DrawerItemView>
        </TouchableOpacity>
      </DrawerTopContainer>
    );
  };

  const renderUnAuthenticatedItems = () => {
    return (
      <DrawerTopContainer>
        {renderMenuItem(AuthScreens.Login, 'Login')}
      </DrawerTopContainer>
    );
  };

  const renderHeader = () => {
    const profilePicture = loadProfilePhotoUrl(user!);
    if (user && user.objectId) {
      return (
        <HeaderContainer>
          <HeaderContent onPress={() => navigation.navigate(AppScreens.Home)}>
            {profilePicture ? (
              <Avatar
                rounded
                size={60}
                source={{ uri: profilePicture }}
                title={(user?.name || 'NA')[0]}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.4)',
                  borderRadius: 30,
                }}
              />
            ) : (
              <Avatar
                rounded
                size={60}
                title={(user?.name || 'NA')[0]}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.4)',
                  borderRadius: 30,
                }}
                titleStyle={{
                  color: '#fff',
                }}
              />
            )}
            <DrawerHeaderTextWrapper>
              <DrawerHeaderText hasRightMargin={false} numberOfLines={2}>
                {user!.name}
              </DrawerHeaderText>
            </DrawerHeaderTextWrapper>
          </HeaderContent>
        </HeaderContainer>
      );
    }
    return (
      <HeaderContainer>
        <HeaderContent onPress={() => navigation.navigate(AuthScreens.Login)}>
          <Avatar
            rounded
            size={60}
            source={SITE_LOGO}
            title='Innoworks'
            containerStyle={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: 'rgba(255,255,255,1)',
              borderRadius: 30,
            }}
          />
          <DrawerHeaderTextWrapper>
            <DrawerHeaderText
              hasRightMargin={false}
              numberOfLines={2}
              testID='drawerHeaderText'
            >
              Sign in / Sign up
            </DrawerHeaderText>
          </DrawerHeaderTextWrapper>
        </HeaderContent>
      </HeaderContainer>
    );
  };

  const renderMainMenu = () => {
    return (
      <React.Fragment>
        {renderHeader()}
        <ScrollView>
          {user && user.objectId
            ? renderAuthenticatedItems()
            : renderUnAuthenticatedItems()}
        </ScrollView>
      </React.Fragment>
    );
  };

  return <View style={{ flex: 1 }}>{renderMainMenu()}</View>;
};

type StateProps = {
  user?: User;
};

type OwnProps = {};

type DispatchProps = {
  logout: typeof requests.user.logout;
};

type DrawerComponentProps = OwnProps & StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  ({ users }) => ({
    user: users.user,
  }),
  (dispatch) => bindActionCreators({ logout: requests.user.logout }, dispatch),
)(Drawer);
