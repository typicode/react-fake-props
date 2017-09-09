// TODO: Should use all types defined here in the same order
// https://github.com/reactjs/react-docgen#types

import React from 'react'
import PropTypes from 'prop-types'

type Address = {
  street: string,
  street2?: string,
  pincode: number
}

type Repo = {
  url: string,
  demoSite?: string,
  npm?: string
}

type Person = {
  id: number,
  name: string,
  age: number,
  address: Address,
  family?: Array<number>,
  repos: Array<Repo>
}

type Props = Person

class MyComponent extends React.Component {
  props: Props

  render() {
    // ... do things with the props
  }
}

export default MyComponent
