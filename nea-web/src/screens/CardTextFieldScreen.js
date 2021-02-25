import React, { PureComponent } from 'react'
import { KeyboardAvoidingView, View, Text, Platform, StyleSheet } from 'react-native'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
// import { PaymentCardTextField } from 'tipsi-stripe'
import Spoiler from '../components/Spoiler'

import {connect} from 'react-redux';

const ContainerView = Platform.select({
  ios: KeyboardAvoidingView,
  android: View,
})

class CardTextFieldScreen extends PureComponent {
  static title = 'Card Text Field'

  state = {
    valid: false,
    params: {
      number: '',
      expMonth: 0,
      expYear: 0,
      cvc: '',
    },
  }

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid,
      params,
    })
  }

  render() {
    const { valid, params } = this.state

    return (
      <ContainerView
        behavior="padding"
        style={styles.container}
        onResponderGrant={dismissKeyboard}
        onStartShouldSetResponder={() => true}>
        <div>
          <div style={styles.header}>
            PaymentCardTextField Example
          </div>
          <PaymentCardTextField
            accessible={false}
            style={styles.field}
            onParamsChange={this.handleFieldParamsChange}
            numberPlaceholder="XXXX XXXX XXXX XXXX"
            expirationPlaceholder="MM/YY"
            cvcPlaceholder="CVC"
            {...testID('cardTextField')}
          />
          <Spoiler title="Params" style={styles.spoiler}>
            <div
              style={styles.params}>
              <div
                style={styles.instruction}
                {...testID('paramValid')}>
                Valid: {String(valid)}
              </div>
              <div
                style={styles.instruction}
                {...testID('paramNumber')}>
                Number: {params.number || '-'}
              </div>
              <div
                style={styles.instruction}
                {...testID('paramExpMonth')}>
                Month: {params.expMonth || '-'}
              </div>
              <div
                style={styles.instruction}
                {...testID('paramExpYear')}>
                Year: {params.expYear || '-'}
              </div>
              <div
                style={styles.instruction}
                {...testID('paramCVC')}>
                CVC: {params.cvc || '-'}
              </div>
            </div>
          </Spoiler>
        </div>
      </ContainerView>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  spoiler: {
    width: 300,
  },
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
})

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
};

export default connect(mapStateToProps)(CardTextFieldScreen);