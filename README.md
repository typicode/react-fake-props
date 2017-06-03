# react-fake-props [![Build Status](https://travis-ci.org/typicode/react-fake-props.svg?branch=master)](https://travis-ci.org/typicode/react-fake-props) [![npm](https://badge.fury.io/js/react-fake-props.svg)](https://www.npmjs.com/package/react-fake-props)

> Simplify your React tests by automatically generating fake props

`react-fake-props` parses your Component prop types using [react-docgen](https://github.com/reactjs/react-docgen) and generates fake props. It supports [PropTypes](https://github.com/facebook/prop-types) and [Flow](https://flow.org).

## Install

```sh
yarn add react-fake-props --dev
```

```sh
npm install react-fake-props --save-dev
```

## Why?

Assuming the following component definition:

```js
// Component.jsx
class Component extends React.Component {
  // ...
}

Component.propTypes = {
  stringA: PropTypes.string.isRequired,
  stringB: PropTypes.string.isRequired,
  stringC: PropTypes.string.isRequired,
  stringD: PropTypes.string.isRequired,
  stringE: PropTypes.string.isRequired,
  number: PropTypes.number,
  boolean: PropTypes.bool
}

export default Component
```

### Before

Without `react-fake-props`, if you want to test your component you have to define manually all your props. So you may have something like this:

```jsx
const props = {
  stringA: 'some value',
  stringB: 'some value',
  stringC: 'some value',
  stringD: 'some value',
  stringE: 'some value',
}
<Component {...props} />
```

### After

With `react-fake-props`, you can remove all the previous lines and generate valid props based on your Component prop types:

```jsx
const props = fakeProps(componentPath)
<Component {...props} />
```

## Usage

```js
// Component.test.js
import path from 'path'
import fakeProps from 'react-fake-props'

const componentPath = path.join(__dirname, './Component.jsx')
const props = fakeProps(componentPath) // { stringA: 'stringA', stringB: 'stringB', ... }
```

_To include optional props, pass `{ optional: true }`._

_Please note that `custom` validators and `PropTypes.instanceOf` aren't supported, you'll still need to set them manually._

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
