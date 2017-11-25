import PropTypes from 'prop-types'

function Simple () {
  return <div />
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
