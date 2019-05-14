import PropTypes from 'prop-types'

function NestedShape () {
  return <div />
}

NestedShape.propTypes = {
  requiredString: PropTypes.string.isRequired,
  requiredShape: PropTypes.shape({
    optionalString: PropTypes.string,
    nestedRequiredShape: PropTypes.shape({
      optionalString: PropTypes.string
    })
  }).isRequired
}

export default NestedShape
