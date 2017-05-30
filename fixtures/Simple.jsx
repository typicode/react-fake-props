import React from 'react'
import PropTypes from 'prop-types'

class Simple extends React.Component {
  render() {
    // ... do things with the props
  }
}

Simple.propTypes = {
  requiredString: PropTypes.string.isRequired,
  optionalString: PropTypes.string,
  requiredShape: PropTypes.shape({
    requiredString: PropTypes.string.isRequired,
    optionalString: PropTypes.string
  }).isRequired
}

export default Simple
