import React from 'react'

type Address = {
  street: string
  street2?: string
  pincode: number
}

type Commit = {
  id: string
  message: string
}

type Repo = {
  url: string
  demoSite?: string
  npm?: string
  commits: Array<Commit>
  access: 'public' | 'private'
  stars: 0 | 42
}

type Person = {
  id: number
  name: string
  age: number
  address: Address
  family?: Array<number>
  repos: Array<Repo>
}

type Props = {
  person: Person,
  onNameChange: (id: number, newName: string) => any
  getFriend?: (person: Person) => Person
}

function MyComponent(props: Props) {
  return <></>
}

export default MyComponent
