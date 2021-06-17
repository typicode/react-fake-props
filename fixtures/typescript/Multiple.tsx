import React from 'react'

function connect(Component) {
  return <div><Component /></div>
}

type Props = {
  requiredString: string
}

function First(props: Props) {
  return <></>
}

export function Second() {
  return <div />
}

export default connect(First)