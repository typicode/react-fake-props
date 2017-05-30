const fs = require('fs')
const React = require('react')
const reactDocs = require('react-docgen')

function getEnum(values) {
  return values[0].value
}

function getUnion(prefix, values) {
  const type = values[0]
  return getFakeProp(prefix, { type })
}

function getArrayOf(prefix, type) {
  return [getFakeProp(prefix, { type })]
}

function getObjectOf(prefix, type) {
  return { prop: getFakeProp(prefix, { type }) }
}

function getShape(prefix, object, opts) {
  const res = {}
  Object.keys(object).forEach(key => {
    const type = object[key]
    if (type.required || opts.optional) {
      res[key] = getFakeProp(`${prefix}.${key}`, { type })
    }
  })
  return res
}

function getFakeProp(prefix, prop, opts) {
  switch (prop.type.name) {
    case 'array':
      return []
    case 'bool':
      return true
    case 'func':
      return function fakeFunction() {}
    case 'number':
      return 1
    case 'object':
      return {}
    case 'string':
      return prefix
    case 'symbol':
      return Symbol()
    case 'node':
      return prefix
    case 'element':
      return React.createElement('div', [], `fake ${prefix} element`)
    case 'instanceOf':
      return `instanceOf type not supported, please set the correct value for ${prefix} prop`
    case 'enum':
      return getEnum(prop.type.value)
    case 'union':
      return getUnion(prefix, prop.type.value)
    case 'arrayOf':
      return getArrayOf(prefix, prop.type.value)
    case 'objectOf':
      return getObjectOf(prefix, prop.type.value)
    case 'shape':
      return getShape(prefix, prop.type.value, opts)
    case 'any':
      return 'any'
    case 'custom':
      return `custom type not supported, please set the correct value for ${prefix} prop`
    default:
      return 'Error, unknown type'
  }
}

module.exports = function fakeProps(file, { optional = false } = {}) {
  const source = fs.readFileSync(file)
  const componentInfo = reactDocs.parse(source)

  const { props } = componentInfo
  const result = {}

  Object.keys(props).forEach(key => {
    const prop = props[key]

    if (prop.required || optional) {
      result[key] = getFakeProp(key, prop, { optional })
    }
  })

  return result
}
