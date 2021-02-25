import React from 'react'
import { Text, Button, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function MenuItem({ title, active, onClick, ...rest }) {
  return (
    <Button
      style={[styles.container, active && styles.active]}
      onClick={onClick}
      {...rest}>
      <div
        style={[styles.title, active && styles.activeTitle]}>
        {title}
      </div>
    </Button>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

MenuItem.defaultProps = {
  active: false,
}

const styles = {
  container: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  active: {
    backgroundColor: '#e8e8e8',
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  activeTitle: {
    color: '#0084ff',
  },
})
