// TODO: Should use all types defined here in the same order
// https://github.com/reactjs/react-docgen#types

import React from 'react'
import PropTypes from 'prop-types'

type Address = {
  street: string,
  street2?: string,
  pincode: number
}

type Commit = {
  id: string,
  message: string
}

type Repo = {
  url: string,
  demoSite?: string,
  npm?: string,
  commits: Array<Commit>
}

type Person = {
  id: number,
  name: string,
  age: number,
  address: Address,
  family?: Array<number>,
  repos: Array<Repo>
}

type Props = {
  person: Person,
  onNameChange: (id: number, newName: string) => any,
  getFriend?: (person: Person) => Person
}

class MyComponent extends React.Component {
  props: Props

  render() {
    // ... do things with the props
  }
}

export default MyComponent
