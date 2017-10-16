// @flow
import React from 'react'

type Props = {
  requiredString: string,
  optionalString?: string,
  requiredObject: {
    requiredString: string,
    optionalString?: string
  }
}

class Simple extends React.Component<void, Props, void> {
  render () {
    // ...
  }
}

export default Simple
