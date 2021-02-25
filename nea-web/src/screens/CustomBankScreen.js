import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import stripe from 'tipsi-stripe'
import Spoiler from '../components/Spoiler'
import Button from '../components/Button'

import {connect} from 'react-redux';

class CustomBankScreen extends PureComponent {
  static title = 'Custom Bank'

  state = {
    loading: false,
    token: null,
    error: null,
    params: {
      accountNumber: '000123456789', // required field
      countryCode: 'us', // required field
      currency: 'usd', // required field
      routingNumber: '110000000', // 9 digits
      accountHolderName: 'Test holder name',
      accountHolderType: 'company',
    },
    errorParams: {
      accountNumber: '000123456789', // required field
      countryCode: 'us', // required field
      currency: 'abc', // required field
      routingNumber: '110000000', // 9 digits
      accountHolderName: 'Test holder name',
      accountHolderType: 'company',
    },
  }

  handleBankAccountPayPress = async (shouldPass = true) => {
    try {
      this.setState({ loading: true, error: null, token: null })
      const params = shouldPass ? this.state.params : this.state.errorParams
      const token = await stripe.createTokenWithBankAccount(params)
      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  renderMandatoryFields = params => (
    <div style={styles.params}>
      <div style={styles.param}>
        Routing Number: {params.routingNumber}
      </div>
      <div style={styles.param}>
        Account Number: {params.accountNumber}
      </div>
      <div style={styles.param}>
        Country Code: {params.countryCode}
      </div>
      <div style={styles.param}>
        Currency: {params.currency}
      </div>
    </div>
  )

  render() {
    const { loading, token, params, errorParams, error } = this.state

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          Custom Account Params Example
        </div>
        <Spoiler title="Mandatory Fields">
          {this.renderMandatoryFields(params)}
        </Spoiler>
        <Spoiler title="Mandatory Fields - Error case" defaultOpen={false}>
          {this.renderMandatoryFields(errorParams)}
        </Spoiler>
        <Spoiler title="Optional Fields" defaultOpen={false}>
          <div style={styles.params}>
            <div style={styles.param}>
              Account Type: {params.accountType}
            </div>
            <div style={styles.param}>
              Account HolderType: {params.accountHolderType}
            </div>
            <div style={styles.param}>
              Account Holder Name: {params.accountHolderName}
            </div>
            <div style={styles.param}>
              Fingerprint: {params.fingerprint}
            </div>
            <div style={styles.param}>
              Bank name: {params.bankName}
            </div>
            <div style={styles.param}>
              Last4: {params.last4}
            </div>
          </div>
        </Spoiler>
        <div style={styles.instruction}>
          Click button to get token based on params.
        </div>
        <Button
          text="Pay with custom params"
          loading={loading}
          onClick={this.handleBankAccountPayPress}
          {...testID('customAccountButton')}
        />
        <Button
          text="Pay with error custom params"
          loading={loading}
          onClick={() => this.handleBankAccountPayPress(false)}
          {...testID('customAccountErrorButton')}
        />
        {token &&
          <div
            style={styles.token}
            {...testID('customAccountToken')}>
            <div style={styles.instruction}>
              Token: {token.tokenId}
            </div>
          </div>
        }
        {error &&
          <div
            style={styles.token}
            {...testID('customAccountTokenError')}>
            <div style={styles.instruction}>
              Error: {JSON.stringify(error.message)}
            </div>
          </div>
        }
      </div>
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
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  params: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    margin: 5,
  },
  param: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
};

export default connect(mapStateToProps)(CustomBankScreen);