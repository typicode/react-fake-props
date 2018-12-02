import PropTypes from 'prop-types'

function connect (Component) {
  return <div><Component /></div>
}

function First () {
  return <div />
}

First.propTypes = {
  requiredString: PropTypes.string.isRequired
}

export function Second () {
  return <div />
}

export default connect(First)
