import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default class LoadingButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    disabledText: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disabledText: '',
    loading: false,
    disabled: false,
    style: undefined,
  }

  handlePress = (event) => {
    const { loading, disabled, onClick } = this.props

    if (loading || disabled) {
      return
    }

    if (onClick) {
      onClick(event)
    }
  }

  render() {
    const { text, disabledText, loading, disabled, style, ...rest } = this.props

    return (
      <TouchableHighlight
        {...rest}
        style={[styles.button, style]}
        underlayColor="#286AEC"
        onClick={this.handlePress}>
        <div>
          {loading &&
            <ActivityIndicator
              animating
              size="small"
            />
          }
          {!loading && !disabled &&
            <div style={{color: 'white', fontWeight: 'bold'}}>
              {text}
            </div>
          }
          {!loading && disabled &&
            <div style={{color: 'white'}}>
              {disabledText || text}
            </div>
           }
        </div>
      </TouchableHighlight>
    )
  }
}

const styles = {
  button: {
    padding: 8,
    margin: 10,
    height: Platform.OS === 'ios' ? 35 : 40,
    minWidth: 160,
    overflow: 'hidden',
    borderWidth: 0,
    borderRadius: 4,
    color: 'white',
    backgroundColor: '#286AEC',
    alignItems: 'center',
  },
})
