# react-fake-props [![Build Status](https://travis-ci.org/typicode/react-fake-props.svg?branch=master)](https://travis-ci.org/typicode/react-fake-props) [![npm](https://badge.fury.io/js/react-fake-props.svg)](https://www.npmjs.com/package/react-fake-props)

> Magically generate fake props for your React tests 🔮

`react-fake-props` parses your Component prop types using [react-docgen](https://github.com/reactjs/react-docgen) and generates fake props. Supports [TypeScript](https://www.typescriptlang.org/), [Flow](https://flow.org) and [PropTypes](https://github.com/facebook/prop-types). Works great with [Jest](https://facebook.github.io/jest/) snapshots and [Enzyme](https://github.com/airbnb/enzyme).

<a href="https://www.patreon.com/typicode">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Install

```sh
npm install react-fake-props --save-dev
```

```sh
yarn add react-fake-props --dev
```

## Example

Assuming the following Component with TypeScript:

```jsx
type Props = {
  id: number
  name: string
}

class Component extends React.Component<Props> {
  // ...
}
```

Or Flow types:

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
- `react-fake-props` requires the component path to be passed, instead of the component itself, to be able to support TypeScript, Flow and PropTypes.

### For multiple components in single file

By passing `{ all: true }`, `fakeProps` will return an array of all components found in `componentPath` with corresponding fake props. Works even for the ones that aren't exported.

```js
// Pick the component you want to get fake props using displayName
const components = fakeProps(componentPath, { all: true })
const { props } = components.find({ displayName } => displayName === 'SomeComponent')
```

## API

`fakeProps(componentPath[, { optional: false, all: false } ])`

## Tip

When checking for a value, use `props.A` rather than `'A'` as `react-fake-props` output may change.

```jsx
const wrapper = shallow(<Component {...props} />)

wrapper.text().to.contain('A') // bad
wrapper.text().to.contain(props.A) // good
```

## See also

* [react-lodash](https://github.com/typicode/react-lodash) - Lodash as React components

## License

MIT - [Typicode :cactus:](https://github.com/typicode) - [Patreon](https://www.patreon.com/typicode)
