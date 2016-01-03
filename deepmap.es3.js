'use strict'

require( 'es6-collections' )

var give   = require( 'xet' )

var root   = new WeakMap()
var leaves = new Map()

function deepClear( deepMap ){
	var maps = deepMap.values()

	for( var i = 0; i < maps.length; i++ )
		deepClear( maps[ i ] )

	if( leaves.has( deepMap ) )
		leaves.delete( deepMap )

	return deepMap.clear()
}


function DeepMap( entries ){
	for( var i = 0; i < entries.length; i++ )
		this.set( entries[ i ][ 0 ], entries[ i ][ 1 ] )

	root.set( this, new Map() )
}

DeepMap.prototype = {
	clear  : function(){
		return deepClear( this )
	},

	delete : function( keys ){
		var branch = root.get( this )

		for( var i = 0; i < keys.length; i++ ){
			if( branch.has( keys[ i ] ) ){
				branch = branch.get( keys[ i ] )
			}
			else {
				return false
			}
		}

		return leaves.delete( branch )
	},

	has    : function( keys ){
		var branch = root.get( this )

		for( var i = 0; i < keys.length; i++ ){
			if( branch.has( keys[ i ] ) ){
				branch = branch.get( keys[ i ] )
			}
			else {
				return false
			}
		}

		return leaves.has( branch )
	},

	get    : function( keys ){
		var branch = root.get( this )

		for( var i = 0; i < keys.length; i++ )
			branch = branch.get( keys[ i ] )

		return leaves.get( branch )
	},

	set    : function( keys, value ){
		var branch = root.get( this )

		for( var i = 0; i < keys.length; i++ )
			branch = give.call( branch, keys[ i ], function(){
				return new Map()
			} )

		leaves.set( branch, value )

		return this
	}
}

module.export = DeepMap
