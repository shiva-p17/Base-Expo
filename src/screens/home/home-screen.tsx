import React from 'react';
import { Text, View } from 'react-native';
import PageHeader from '../../components/shared/page-header/page-header';
import { StatusBar } from 'expo-status-bar';

const HomeScreen: React.FunctionComponent<HomeScreenProps> = () => {
  return (
    <View>
      <StatusBar style='light' />
      <PageHeader withHamburger title='Dashboard' />
      <Text>Placeholder content</Text>
    </View>
  );
};

type StateProps = {};

type OwnProps = {};

type DispatchProps = {};

type HomeScreenProps = OwnProps & StateProps & DispatchProps;

export default HomeScreen;
