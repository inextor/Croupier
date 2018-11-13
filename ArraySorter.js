class ArraySorter
{
	sort( a, aindex )
	{
		if( a.length  === 0 )
			return a;

		let keyValues = {};

		a.forEach((i)=>
		{
			if( i[ aindex ] in keyValues )
			{
				keyValues[ i[aindex] ].counter++;
				return;
			}

			keyValues[ i[aindex] ] = { value: i, counter: 1 };
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
		let max			= a.length/maxRepeated;
		let rest		=  a.length - maxRepeated;
		let minDiv		= rest/(maxRepeated);

		let roundSize = Math.ceil( minDiv );

		if( Math.ceil( a.length/maxRepeated ) < keys.length )
		{
			roundSize = Math.ceil( a.length/maxRepeated );
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

			newArray.push( keyValues[ keys[ index ] ].value );

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


module.exports = ArraySorter;
