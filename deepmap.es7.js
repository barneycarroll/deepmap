import give from 'xet'

const root   = new WeakMap()
const leaves = new Map()

export class DeepMap {
	constructor( input ){
		input.forEach( this.set )

		root.set( this, new Map() )
	}

	clear(){
		root.get( this )::( function wipe(){
			if( leaves.has( this ) )
				leaves.delete( this )

			this.values().forEach( map => map::wipe() )

			this.clear()
		} )

		return this
	}

	delete( ...keys ){
		let branch  = root.get( this )

		for( let key of keys ){
			if( branch.has( key ) ){
				branch = branch.get( key )
			}
			else {
				return false
			}
		}

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

		return leaves.has( branch )
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
