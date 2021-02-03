# babel-plugin-react-element-info-index

> Babel plugin for exposing React element name and filename in DOM nodes

[![npm version](https://img.shields.io/npm/v/babel-plugin-react-element-info-index.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-react-element-info-index)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-react-element-info-index.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-react-element-info-index)
[![Build Status](https://travis-ci.org/und3f1ned/babel-plugin-react-element-info-index.svg?branch=master)](https://travis-ci.org/und3f1ned/babel-plugin-react-element-info-index)

[![Dependencies](https://img.shields.io/david/und3f1ned/babel-plugin-react-element-info-index.svg?style=flat-square)](https://david-dm.org/und3f1ned/babel-plugin-react-element-info-index)
[![DevDependencies](https://img.shields.io/david/dev/und3f1ned/babel-plugin-react-element-info-index.svg?style=flat-square)](https://david-dm.org/und3f1ned/babel-plugin-react-element-info-index#info=devDependencies&view=list)

## Installation

```sh
npm install --save-dev babel-plugin-react-element-info-index
```

## The problem solved

This is useful for auto-generating selectors to run selenium tests.

## Example

**In**

```myInputFile.js```
```js
class Foo extends React.Component {
  render() {
    return (
      <MyReactComponent>
        My component contents
      </MyReactComponent>
    );
  }
}
```

**Out**
```js
class Foo extends React.Component {
  render() {
    return (
      <MyReactComponent data-qa="elementName_MyReactComponent_Index">
        My component contents
      </MyReactComponent>
    );
  }
}
```

## Usage

#### Via `.babelrc` (Recommended)

**.babelrc**

without options:
```json
{
  "env": {
    "development": {
      "plugins": [
        "react-element-info-index"
      ]
    }
  }
}
```

with options. Prefix is the attribute prefix, defaulting to `qa` (`data-qa-*`). To get `data-test-prefix-*` attributes,  set prefix to `test-prefix`:
```json
{
  "env": {
    "development": {
      "plugins": [
        ["react-element-info-index", {"prefix": "test-prefix"}]
      ]
    }
  }
}
```

#### Via CLI

```sh
babel --plugins react-element-info script.js
```

#### Via Node API

without options:
```js
require('babel-core').transform('code', {
  plugins: [
    'react-element-info-index',
  ],
});
```

with options:
```js
require('babel-core').transform('code', {
  plugins: [
    ['react-element-info-index', {prefix: 'text-prefix'}],
  ],
});
```

## License

MIT
