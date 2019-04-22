export default class ArraySorter
{
	sort( o_array, aindex )
	{
		if( o_array.length  === 0 )
			return o_array;

		let keyValues = {};

		o_array.forEach((i,index)=>
		{
			if( i[ aindex ] in keyValues )
			{
				keyValues[ i[aindex] ].counter++;
				keyValues[ i[aindex] ].indexes.push( index );
				return;
			}

			keyValues[ i[aindex] ] = { value: i, counter: 1, indexes: [index] };
		});

		let keys = Object.keys( keyValues );

		let sorter = (a,b)=>
		{
			if( keyValues[ a ].counter === keyValues[ b ].counter )
				return 0;

			return keyValues[ a ].counter > keyValues[ b ].counter ? -1: 1;
		};

		keys.sort( sorter );

		let maxRepeated = keyValues[ keys[0] ].counter;
		let max			= o_array.length/maxRepeated;
		let rest		=  o_array.length - maxRepeated;
		let minDiv		= rest/(maxRepeated);

		let roundSize = Math.ceil( minDiv );

		if( Math.ceil( o_array.length/maxRepeated ) < keys.length )
		{
			roundSize = Math.ceil( o_array.length/maxRepeated );
		}

		if( roundSize > keys.length )
		{
			roundSize = keys.length;
		}

		if( roundSize > max )
		{
			roundSize = Math.floor( max );
		}

		if( roundSize < 2 )
		{
			roundSize = 2;
		}

		let index = 0;
		let counter = 0;
		let newArray = [];
		let last 	= keys[ keys.length -1 ];

		while( keys.length )
		{
			if( counter === (roundSize) || index> keys.length-1 )
			{
				counter = 0;
				index = 0;

				let someBiggerOrEqual = keys.some((i,index)=>
				{
					if( i === last )
						return false;

					return keyValues[ i ].counter > keyValues[ last ].counter;
				});

				if( someBiggerOrEqual  )
				{
					keys.sort( sorter );
				}
			}

			last = keys[ index ];

			newArray.push( o_array[ keyValues[ keys[ index ] ].indexes.shift() ]);

			keyValues[ keys[ index ] ].counter--;

			if( keyValues[ keys[ index ] ].counter === 0 )
			{
				keys.splice( index, 1 );
			}

			index++;

			counter++;
		}

		return newArray;
	}
}
