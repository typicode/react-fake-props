# react-fake-props [![Build Status](https://travis-ci.org/typicode/react-fake-props.svg?branch=master)](https://travis-ci.org/typicode/react-fake-props) [![npm](https://badge.fury.io/js/react-fake-props.svg)](https://www.npmjs.com/package/react-fake-props)

> Magically generate fake props for your React tests 🔮

`react-fake-props` parses your Component prop types using [react-docgen](https://github.com/reactjs/react-docgen) and generates fake props. Supports [Flow](https://flow.org) and [PropTypes](https://github.com/facebook/prop-types). Works great with [Jest](https://facebook.github.io/jest/) snapshots and [Enzyme](https://github.com/airbnb/enzyme).

## Install

```sh
yarn add react-fake-props --dev
```

```sh
npm install react-fake-props --save-dev
```

## Example

Assuming the following Component with Flow types:

```jsx
// @flow
type Props = {
  id: number,
  name: string
}

class Component extends React.Component<Props> {
  // ...
}
```

Or PropTypes:

```jsx
class Component extends React.Component {
  // ...
}

Component.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}
```

With `react-fake-props`, you can generate valid props based on your Component prop types:

```jsx
const props = fakeProps(componentPath)
/*
{
  id: 1,
  name: 'name'
}
*/
<Component {...props} />
```

## Usage

```js
import path from 'path'
import fakeProps from 'react-fake-props'

const componentPath = path.join(__dirname, './Component.jsx')
const props = fakeProps(componentPath)
```

To include optional props, pass `{ optional: true }`.

Please note:
- `custom` validators and `PropTypes.instanceOf` aren't supported, you'll still need to set them manually.
- `react-fake-props` requires the component path to be passed, instead of the component itself, to be able to support Flow and PropTypes.

## API

`fakeProps(componentPath[, { optional: false } ])`

## Tip

When checking for a value, use `props.A` rather than `'A'` as `react-fake-props` output may change.

```jsx
const wrapper = shallow(<Component {...props} />)

wrapper.text().to.contain('A') // bad
wrapper.text().to.contain(props.A) // good
```

## License

MIT - [Typicode :cactus:](https://github.com/typicode) - [Patreon](https://www.patreon.com/typicode)
