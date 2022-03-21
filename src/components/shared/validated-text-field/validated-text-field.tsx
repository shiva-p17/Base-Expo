import React from 'react';
import { Platform, ReturnKeyType, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import styledNative from 'styled-components-native';
import {
  BLACK_COLOR,
  LABEL_TEXT_COLOR,
  MAIN_BLUE,
  RED_COLOR,
  TRANSPARENT_COLOR,
} from '../../../constants/colors';
import { ValidationRule } from '../../../types/validator-types';
import { validatorService } from '../../../services';
import { Icon, Input, InputProps } from 'react-native-elements';

export default class ValidatedTextField extends React.Component<
  ValidatedTextFieldProps,
  ValidatedTextFieldState
> {
  public error?: string;
  public state: ValidatedTextFieldState;

  private validationRules: ValidationRule = {};

  constructor(props: ValidatedTextFieldProps) {
    super(props);
    this.state = {
      hidePassword: true,
    };
  }

  private changePasswordType = () => {
    const { hidePassword } = this.state;
    this.setState({ hidePassword: !hidePassword });
  };

  public onValueUpdated(value: string) {
    const { onValueUpdated, name } = this.props;

    if ('function' === typeof onValueUpdated) {
      onValueUpdated(name!, value, !!this.error);
    }
  }

  public onChangeValue = (value: string) => {
    const { label, placeholder } = this.props;
    this.error = validatorService.validateField(
      (label as string) || placeholder || '',
      this.validationRules,
      value.trim(),
    );
    this.onValueUpdated(value);
  };

  public componentDidMount(): void {
    const {
      required,
      email,
      minValueLength,
      maxValueLength,
      isEqualTo,
      regExp,
      date,
      numbers,
      isPhone,
    } = this.props;
    this.validationRules = {
      required,
      email,
      minValueLength,
      maxValueLength,
      isEqualTo,
      regExp,
      date,
      numbers,
      isPhone,
    };
  }

  public render() {
    const { hasSecureTextEntry, returnKeyType } = this.props;
    const { hidePassword } = this.state;
    return (
      <InputWrapper>
        <StyledInput
          onChangeText={this.onChangeValue}
          selectionColor={LABEL_TEXT_COLOR}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
          errorMessage={this.error}
          secureTextEntry={hasSecureTextEntry !== undefined && hidePassword}
          textAlignVertical='top'
          {...this.props}
        />
        {hasSecureTextEntry !== undefined && (
          <PasswordIcon>
            <PasswordTouchable onPress={this.changePasswordType}>
              <View>
                <Icon
                  name={hidePassword ? 'eye-off' : 'eye'}
                  type={'feather'}
                  size={24}
                  tvParallaxProperties
                />
              </View>
            </PasswordTouchable>
          </PasswordIcon>
        )}
      </InputWrapper>
    );
  }
}

type OwnProps = {
  onValueUpdated?: (name: string, text: string, hasError: boolean) => void;
  name?: string;
  hasSecureTextEntry?: boolean;
  textColor?: string;
  borderColor?: string;
  errorColor?: string;
  inputBackgroundColor?: string;
  iconColor?: boolean;
  inputTextColor?: string;
  labelTextColor?: string;
  returnKeyType?: ReturnKeyType;
};

type ValidatedTextFieldProps = OwnProps & ValidationRule & InputProps;

type ValidatedTextFieldState = {
  hidePassword?: boolean;
};

const InputWrapper = styled(View)`
  margin-bottom: 20px;
  flex: 1;
`;

const PasswordIcon = styled(View)`
  position: absolute;
  top: 28px;
  right: 30px;
  width: 50px;
  height: 50px;
  justify-content: center;
`;

const PasswordTouchable = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  justify-content: center;
`;

const StyledInput = styledNative<StyledInputProps>((props) => (
  <Input {...props} />
))`
  .labelStyle {
    color: ${(props) => props.labelTextColor || MAIN_BLUE};
    font-weight: 400;
    padding-left: ${(props) => (props.iconColor ? '10px' : '0')};
    margin-bottom: 5px;
  }

  .inputStyle {
    color: ${(props) => props.inputTextColor || BLACK_COLOR};
    font-weight: 400;
    min-height: 40px;
    elevation: 0;
    margin-bottom: ${Platform.OS === 'android' ? '-15' : '0'};
  }

  .inputContainerStyle {
    border-bottom-color: ${(props) => {
      return props.errorMessage ? RED_COLOR : props!.borderColor || BLACK_COLOR;
    }};
    background-color: ${(props) =>
      props.inputBackgroundColor || TRANSPARENT_COLOR};
    padding: ${(props) => (props.iconColor ? '10px 40px 2px 10px' : '0')};
    padding-left: 5;
    height: ${Platform.OS === 'android' ? '50' : 'auto'};
  }
`;

type StyledInputProps = InputProps & {
  borderColor?: string;
  errorMessage?: string;
  textColor?: string;
  multiline?: boolean;
  textAlignVertical?: string;
  inputBackgroundColor?: string;
  iconColor?: boolean;
  inputTextColor?: string;
  labelTextColor?: string;
  returnKeyType?: string;
};
