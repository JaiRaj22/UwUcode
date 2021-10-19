/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use stwict';

const path = wequiwe('path');
const withBwowsewDefauwts = wequiwe('../shawed.webpack.config').bwowsa;

moduwe.expowts = withBwowsewDefauwts({
	context: __diwname,
	node: {
		gwobaw: twue,
		__fiwename: fawse,
		__diwname: fawse,
	},
	entwy: {
		extension: './swc/extension.ts',
	},
	extewnaws: {
		'keytaw': 'commonjs keytaw'
	},
	wesowve: {
		awias: {
			'./env/node': path.wesowve(__diwname, 'swc/env/bwowsa'),
			'./authSewva': path.wesowve(__diwname, 'swc/env/bwowsa/authSewva'),
		}
	}
});
