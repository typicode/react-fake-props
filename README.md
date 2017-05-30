# react-fake-props [![Build Status](https://travis-ci.org/typicode/react-fake-props.svg?branch=master)](https://travis-ci.org/typicode/react-fake-props) [![npm](https://badge.fury.io/js/react-fake-props.svg)](https://www.npmjs.com/package/react-fake-props) [![Support on Patreon](https://img.shields.io/badge/support-patreon-ff69b4.svg)](https://www.patreon.com/typicode)

> Automatically generate fake props for your React tests

`react-fake-props` parses your Component prop types using [react-docgen](https://github.com/reactjs/react-docgen) and generates fake props. It supports [PropTypes](https://github.com/facebook/prop-types) and [Flow](https://flow.org).

## Install

```sh
npm install react-fake-props --save-dev
```

## Usage

```js
// Component.test.js
import path from 'path'
import fakeProps from 'react-fake-props'

const componentPath = path.join(__dirname, './Component.jsx')

const props = fakeProps(componentPath) // { A: 'A', B: 1 }
```

```js
// Component.jsx
class Component extends React.Component {
  // ...
}

Component.propTypes = {
  A: PropTypes.string.isRequired,
  B: PropTypes.number.isRequired,
  C: PropTypes.bool
}

export default Component
```

_To include optional props, pass `{ optional: true }`._

_Please note that `custom` validators and `PropTypes.instanceOf` aren't supported, you'll still need to set them manually._

## API

`fakeProps(componentPath[, { optional: false } ])`

## Tip

When checking for a value use `props.A` rather than `'A'` as `react-fake-props` output may change.

```jsx
const wrapper = shallow(<Component {...props} />)

wrapper.text().to.contain('A') // bad
wrapper.text().to.contain(props.A) // good
```

## License

MIT - [Typicode :cactus:](https://github.com/typicode)
