// @ts-nocheck
import React from 'react';
import { navigationRef } from '../helpers/root-navigation';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import { useSelector } from 'react-redux';
import { userSelect } from '../state/user/user-slice';
import { isAuthenticated } from '../state/user/user-select';
import AppStack from './app-stack';

const Navigation: React.FunctionComponent<NavigationProps> = () => {
  const users = useSelector(userSelect);
  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated(users) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

type StateProps = {};

type OwnProps = {};

type DispatchProps = {};

type NavigationProps = OwnProps & StateProps & DispatchProps;

export default Navigation;
