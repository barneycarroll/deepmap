# deepmap
Maps with variadic key input

Depends on ES6 WeakMap & Map, and ES7 bind operator support. This can be achieved with [Babel](babeljs.io) using [`es2015`](https://www.npmjs.com/package/babel-preset-es2015) and [`stage-0`](https://www.npmjs.com/package/babel-preset-stage-0) presets.

Supports the following Map methods:

* `clear`
* `delete`
* `has`
* `get`
* `set`

**All other Map methods & properties, including well-known symbols and coercion values, are not catered for at present.**

Signature for all methods is the same as for Map, except that those accepting arguments accept a variable number of keys. Thus where Map method signatures would be:

```javascript
map[ method ]( key, value? )
```

...DeepMaps instead provide:

```javascript
map[ method ]( ...keys, value? )
```

Ergo:

```javascript
const sums = new DeepMap()

sums.set( 1, 2, 3 )

sums.has( 1 )       // false

sums.has( 1, 2 )    // true

sums.get( 1, 2 )    // 3

sums.delete( 1, 2 ) // true

sums.has( 1, 2 )    // false
```
