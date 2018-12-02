import path from 'path'
import fakeProps from '../src'

const ComponentFile = path.join(
  __dirname,
  '../fixtures/propTypes/Component.jsx'
)
const SimpleFile = path.join(__dirname, '../fixtures/propTypes/Simple.jsx')
const NoProps = require.resolve('../fixtures/propTypes/NoProps.jsx')
const Multiple = require.resolve('../fixtures/propTypes/Multiple.jsx')

describe('fakeProps', () => {
  it('should return an object with no props (snapshot)', () => {
    expect(fakeProps(NoProps)).toMatchSnapshot()
  })

  it('should return an object with required props faked (snapshot)', () => {
    expect(fakeProps(ComponentFile)).toMatchSnapshot()
  })

  it('should return an object with all props faked (snapshot)', () => {
    expect(fakeProps(ComponentFile, { optional: true })).toMatchSnapshot()
  })

  it('should return more props with optional', () => {
    const allProps = fakeProps(ComponentFile, { optional: true })
    const requiredProps = fakeProps(ComponentFile)

    const allPropsLength = Object.keys(allProps).length
    const requiredPropsLength = Object.keys(requiredProps).length

    expect(allPropsLength).toBeGreaterThan(requiredPropsLength)
  })

  it('should return an object with shape props faked', () => {
    const props = fakeProps(SimpleFile)
    const { requiredString, requiredShape } = props

    expect(props).toEqual({
      requiredString,
      requiredShape: {
        requiredString: requiredShape.requiredString
      }
    })
  })

  it('should prefix shape props', () => {
    const props = fakeProps(SimpleFile)
    expect(props.requiredShape.requiredString).toBe(
      'requiredShape.requiredString'
    )
  })

  it('should work with multiple components', () => {
    const component = fakeProps(Multiple, { all: true }).find(
      ({ displayName }) => displayName === 'First'
    )
    expect(component.props.requiredString).toBe('requiredString')
  })
})
