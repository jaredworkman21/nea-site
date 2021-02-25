import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import stripe from 'tipsi-stripe'
import Spoiler from '../components/Spoiler'
import Button from '../components/Button'

import {connect} from 'react-redux';

class CustomCardScreen extends PureComponent {
  static title = 'Custom Card'

  state = {
    loading: false,
    token: null,
    error: null,
    params: {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 24,
      cvc: '223',
      name: 'Test User',
      currency: 'usd',
      addressLine1: '123 Test Street',
      addressLine2: 'Apt. 5',
      addressCity: 'Test City',
      addressState: 'Test State',
      addressCountry: 'Test Country',
      addressZip: '55555',
    },
    errorParams: {
      number: '4242424242424241',
      expMonth: 12,
      expYear: 24,
      cvc: '223',
      name: 'Test User',
      currency: 'usd',
      addressLine1: '123 Test Street',
      addressLine2: 'Apt. 5',
      addressCity: 'Test City',
      addressState: 'Test State',
      addressCountry: 'Test Country',
      addressZip: '55555',
    },
  }

  handleCustomPayPress = async (shouldPass = true) => {
    try {
      this.setState({ loading: true, token: null, error: null })

      const params = shouldPass ? this.state.params : this.state.errorParams
      const token = await stripe.createTokenWithCard(params)
      this.setState({ loading: false, error: undefined, token })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  renderMandatoryFields = params => (
    <div style={styles.params}>
      <div style={styles.param}>Number: {params.number}</div>
      <div style={styles.param}>Month: {params.expMonth}</div>
      <div style={styles.param}>Year: {params.expYear}</div>
    </div>
  )

  render() {
    const { loading, token, error, params, errorParams } = this.state

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          Custom Card Params Example
        </div>
        <Spoiler title="Mandatory Fields">
          {this.renderMandatoryFields(params)}
        </Spoiler>
        <Spoiler title="Mandatory Fields - Error" defaultOpen={false}>
          {this.renderMandatoryFields(errorParams)}
        </Spoiler>
        <Spoiler title="Optional Fields" defaultOpen={false}>
          <div style={styles.params}>
            <div style={styles.param}>CVC: {params.cvc}</div>
            <div style={styles.param}>Name: {params.name}</div>
            <div style={styles.param}>Currency: {params.currency}</div>
            <div style={styles.param}>Address Line 1: {params.addressLine1}</div>
            <div style={styles.param}>Address Line 2: {params.addressLine2}</div>
            <div style={styles.param}>Address City: {params.addressCity}</div>
            <div style={styles.param}>Address State: {params.addressState}</div>
            <div style={styles.param}>Address Country: {params.addressCountry}</div>
            <div style={styles.param}>Address Zip: {params.addressZip}</div>
          </div>
        </Spoiler>
        <div style={styles.instruction}>Click button to get token based on params.</div>
        <Button
          text="Pay with custom params"
          loading={loading}
          onClick={this.handleCustomPayPress}
          {...testID('customCardButton')}
        />
        <Button
          text="Pay with custom params - error"
          loading={loading}
          onClick={() => this.handleCustomPayPress(false)}
          {...testID('customCardErrorButton')}
        />
        {token &&
          <div style={styles.token} {...testID('customCardToken')}>
            <div style={styles.instruction}>Token: {token.tokenId}</div>
          </div>
        }
        {error &&
          <div style={styles.token} {...testID('customCardTokenError')}>
            <div style={styles.instruction}>Error: {JSON.stringify(error.message)}</div>
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
    backgroundColor: '#fff',
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

export default connect(mapStateToProps)(CustomCardScreen);