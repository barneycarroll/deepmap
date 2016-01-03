# deepmap
Maps with multiple keys per value

Supports the following Map methods:

* `clear`
* `delete`
* `has`
* `get`
* `set`

**All other Map methods & properties, including well-known symbols and coercion logic, are not catered for at present.**

Signature for all methods is the same as for Map, except that in place of a key, it instead accepts an array of keys.

```javascript
map[ method ]( key, value? )
```

...DeepMaps instead provide:

```javascript
map[ method ]( [ ...keys ], value? )
```

Ergo:

```javascript
const sums = new DeepMap()

sums.set( [ 1, 2 ], 3 )

sums.has( 1 )           // false

sums.has( [ 1 ] )       // false

sums.has( [ 1, 2 ] )    // true

sums.get( [ 1, 2 ] )    // 3

sums.delete( [ 1, 2 ] ) // true

sums.has( [ 1, 2 ] )    // false
```
