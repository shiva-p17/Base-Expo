import React, { useState } from 'react';
import {
  LoginBoxInner,
  LoginWrapper,
  SubmitButton,
  SubmitText,
} from './login-styled';
import { Image } from 'react-native-elements';
import { SITE_LOGO } from '../../assets/branding';
import ValidatedMaterialTextField from '../../components/shared/validated-text-field/validated-material-text-field';
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WHITE_COLOR } from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../state/types';
import * as requests from '../../state/requests';
import { useSnackbar } from '../../components/shared/with-snackbar/with-snackbar';

const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({ login }) => {
  const [userEmail, setUserEmail] = useState('');
  const [_userEmailError, setUserEmailError] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [_userPasswordError, setUserPasswordError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [openSnackbar] = useSnackbar();

  const onChangeText = (name: string, text: string, hasError: boolean) => {
    if (name === 'userEmail') {
      setUserEmail(text);
      setUserEmailError(hasError);
    }
    if (name === 'userPassword') {
      setUserPassword(text);
      setUserPasswordError(hasError);
    }
  };

  const onSubmitPressed = async () => {
    if (isFormValid()) {
      openSnackbar!('Please enter all fields', 'warning');
      return;
    }
    setIsSubmitted(true);
    setIsFormSubmitted(true);
    try {
      await login(userEmail, userPassword);
    } catch (e) {
      openSnackbar!(e.message, 'danger');
    }
    setIsFormSubmitted(false);
    setIsSubmitted(false);
  };

  const isFormValid = () => {
    return !userEmail && !userPassword;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <React.Fragment>
        <StatusBar animated style='light' />
        <LoginWrapper>
          <Image
            source={SITE_LOGO}
            style={{ width: 190, height: 90 }}
            resizeMode={'contain'}
          />
          <LoginBoxInner>
            <ValidatedMaterialTextField
              label={'EMAIL'}
              email={true}
              name='userEmail'
              value={userEmail}
              onValueUpdated={onChangeText}
              keyboardType='email-address'
              textContentType='emailAddress'
              disabled={isSubmitted}
              required={true}
            />

            <ValidatedMaterialTextField
              label={'PASSWORD'}
              disabled={isSubmitted}
              name='userPassword'
              value={userPassword}
              onValueUpdated={onChangeText}
              textContentType='password'
              minValueLength={6}
              hasSecureTextEntry
              noBottomMargin
            />
            <SubmitButton
              borderless={true}
              onPress={onSubmitPressed}
              rippleColor={'rgba(255, 255, 255, 0.3)'}
              disabled={isSubmitted}
            >
              {!isFormSubmitted ? (
                <SubmitText>Login</SubmitText>
              ) : (
                <ActivityIndicator color={WHITE_COLOR} />
              )}
            </SubmitButton>
          </LoginBoxInner>
        </LoginWrapper>
      </React.Fragment>
    </TouchableWithoutFeedback>
  );
};

type StateProps = {};

type OwnProps = {};

type DispatchProps = {
  login: typeof requests.user.login;
};

type LoginScreenProps = OwnProps & StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  ({}) => ({}),
  (dispatch) =>
    bindActionCreators(
      {
        login: requests.user.login,
      },
      dispatch,
    ),
)(LoginScreen);
