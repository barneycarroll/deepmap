import give from 'xet'

const root   = new WeakMap()
const leaves = new WeakMap()

export class DeepMap {
	constructor( ...input ){
		input.forEach( this.set )

		root.set( this, new Map() )
	}

	clear(){
		root.get( this )::( function wipe(){
			this.values().forEach( map => map::wipe() )

			this.clear()
		} )
	}

	delete( ...keys ){
		let branch  = root.get( this )

		for( let key of keys )
			branch = branch.get( key )

		return leaves.delete( branch )
	}

	has( ...keys ){
		let branch  = root.get( this )

		for( let key of keys ){
			if( branch.has( key ) ){
				branch = branch.get( key )
			}
			else {
				return false
			}
		}

		return true
	}

	get( ...keys ){
		let branch  = root.get( this )

		for( let key of keys )
			branch = branch.get( key )

		return leaves.get( branch )
	}

	set( ...input ){
		const value = input.pop()
		const keys  = input

		let branch  = root.get( this )

		for( let key of keys )
			branch = branch::give( key, () => new Map() )

		leaves.set( branch, value )

		return this
	}
}
