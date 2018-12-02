// @flow
import React from 'react'

function connect(Component) {
  return <div><Component /></div>
}

type Props = {
  requiredString: string
}

class First extends React.Component<void, Props, void> {
  render () {
    // ...
  }
}

export function Second() {
  return <div />
}

export default connect(First)