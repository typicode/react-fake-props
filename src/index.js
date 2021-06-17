const fs = require('fs')
const React = require('react')
const reactDocs = require('react-docgen')

function isFlow (prop) {
  return prop.flowType
}

function isTs (prop) {
  return prop.tsType
}

function getEnum (values) {
  return values[0].value
}

function getUnion (prefix, values, opts) {
  const type = values[0]
  return getFakeProp(prefix, { type }, opts)
}

function getArrayOf (prefix, type, opts) {
  return [getFakeProp(prefix, { type }, opts)]
}

function getObjectOf (prefix, type, opts) {
  return { prop: getFakeProp(prefix, { type }, opts) }
}

function getShape (prefix, object, opts) {
  const res = {}

  Object.keys(object).forEach(key => {
    const type = object[key]
    if (type.required || opts.optional) {
      res[key] = getFakeProp(`${prefix}.${key}`, { type }, opts)
    }
  })

  return res
}

function fakeString (prefix) {
  return prefix
}

function fakeBool () {
  return true
}

function fakeArray () {
  return []
}

function fakeNumber () {
  return 1
}

function fakeObject () {
  return {}
}

function fakeSymbol () {
  return Symbol('fake symbol')
}

function fakeNode (prefix) {
  return prefix
}

function fakeElement (prefix) {
  return React.createElement('div', [], `fake ${prefix} element`)
}

function fakeInstanceOf (prefix) {
  return `instanceOf type not supported, please set the correct value for ${prefix} prop`
}

function fakeAny () {
  return 'any'
}

function fakeCustom (prefix) {
  return `custom type not supported, please set the correct value for ${prefix} prop`
}

function fakeFunction () {
  return function fakeFunction () {}
}

function getFakePropType (prefix, prop, opts) {
  switch (prop.type.name) {
    case 'array':
      return fakeArray()
    case 'bool':
      return fakeBool()
    case 'func':
      return fakeFunction()
    case 'number':
      return fakeNumber()
    case 'object':
      return fakeObject()
    case 'string':
      return fakeString(prefix)
    case 'symbol':
      return fakeSymbol()
    case 'node':
      return fakeNode(prefix)
    case 'element':
      return fakeElement(prefix)
    case 'instanceOf':
      return fakeInstanceOf(prefix)
    case 'enum':
      return getEnum(prop.type.value)
    case 'union':
      return getUnion(prefix, prop.type.value, opts)
    case 'arrayOf':
      return getArrayOf(prefix, prop.type.value, opts)
    case 'objectOf':
      return getObjectOf(prefix, prop.type.value, opts)
    case 'shape':
      return getShape(prefix, prop.type.value, opts)
    case 'any':
      return fakeAny()
    case 'custom':
      return fakeCustom(prefix)
    default:
      return 'Error, unknown type'
  }
}

function fakeTypedFunction (prefix, type, opts) {
  if (type.signature) {
    return Function.apply(
      null,
      type.signature.arguments
        .map(arg => arg.name)
        .concat(
          'return ' +
            JSON.stringify(getFakeTyped(prefix, type.signature.return, opts))
        )
    )
  } else {
    return fakeFunction()
  }
}

function fakeSignature (prefix, type, opts) {
  switch (type.type) {
    case 'function':
      return fakeTypedFunction(prefix, type, opts)
    case 'object':
      // structure:
      // {
      //   signature: {
      //     properties: [
      //       {
      //         key: 'name',
      //         value: {
      //           name: 'string',
      //           required: true
      //         }
      //       },
      //       {
      //         key: 'count',
      //         value: {
      //           name: 'number',
      //           required: false
      //         }
      //       }
      //     ]
      //   }
      // }
      if (type.signature.properties) {
        return type.signature.properties
          .filter(prop => prop.value.required || opts.optional)
          .reduce((acc, prop) => {
            return Object.assign({}, acc, {
              [prop.key]: getFakeTyped(
                prefix + '.' + prop.key,
                prop.value,
                opts
              )
            })
          }, {})
      } else {
        return 'Error: unknown signature'
      }
    default:
      return 'Error, unknown signature'
  }
}

function typed (prefix, prop, opts) {
  return getFakeTyped(prefix, prop.flowType || prop.tsType, opts)
}

function getFakeTyped (prefix, type, opts) {
  switch (type.name) {
    case 'boolean':
      return fakeBool()
    case 'tuple':
      return fakeArray()
    case 'string':
      return fakeString(prefix)
    case 'number':
      return fakeNumber()
    case 'Function':
      return fakeFunction()
    case 'object':
    case 'Object':
      return fakeObject()
    case 'Array':
      // structure:
      // {
      //   name: 'Array',
      //   elements: [
      //     {
      //       name: 'Object'
      //     }
      //   ],
      //   raw: 'Array<Object>'
      // }
      if (type.elements) {
        return type.elements.map(prop => {
          return getFakeTyped(prefix, prop, opts)
        })
      } else {
        return fakeArray()
      }
    case 'signature':
      return fakeSignature(prefix, type, opts)
    case 'unknown':
      return 'unknown'
    default:
      return 'Error, unknown type'
  }
}

function getFakeProp (prefix, prop, opts) {
  return isFlow(prop) || isTs(prop)
    ? typed(prefix, prop, opts)
    : getFakePropType(prefix, prop, opts)
}

function fakeDataForProps (props = {}, { optional = false } = {}) {
  return Object.keys(props).reduce((acc, key) => {
    const prop = props[key]
    if (prop.required || optional) {
      return Object.assign({}, acc, {
        [key]: getFakeProp(key, prop, { optional })
      })
    } else {
      return acc
    }
  }, {})
}

module.exports = function (file, { optional = false, all = false } = {}) {
  const source = fs.readFileSync(file)
  const isTsFile = file.match(/^.*\.(ts|tsx)$/)
  const options = { filename: isTsFile ? file : undefined }

  if (all) {
    // Parse using findAllComponentDefinitions resolver
    const componentInfoArray = reactDocs.parse(
      source,
      reactDocs.resolver.findAllComponentDefinitions,
      null,
      options
    )

    // Get fake props for each component
    return componentInfoArray.map(componentInfo => ({
      displayName: componentInfo.displayName,
      props: fakeDataForProps(componentInfo.props, { optional })
    }))
  } else {
    // Parse
    const componentInfo = reactDocs.parse(source, null, null, options)

    // Get fake props
    return fakeDataForProps(componentInfo.props, { optional })
  }
}
