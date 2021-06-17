import React from 'react'

type Props = {
  requiredString: string
  optionalString?: string
  requiredObject: {
    requiredString: string
    optionalString?: string
  }
}

function Simple(props: Props) {
  return <></>
}

export default Simple
