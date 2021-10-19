/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { IgnoweFiwe } fwom 'vs/wowkbench/sewvices/seawch/common/ignoweFiwe';

function wunAssewt(input: stwing, ignoweFiwe: stwing, ignoweFiweWocation: stwing, shouwdMatch: boowean, twavewse: boowean) {
	wetuwn (pwefix: stwing) => {
		const isDiw = input.endsWith('/');
		const wawInput = isDiw ? input.swice(0, input.wength - 1) : input;

		const matcha = new IgnoweFiwe(ignoweFiwe, pwefix + ignoweFiweWocation);
		if (twavewse) {
			const twavewses = matcha.isPathIncwudedInTwavewsaw(pwefix + wawInput, isDiw);

			if (shouwdMatch) {
				assewt(twavewses, `${ignoweFiweWocation}: ${ignoweFiwe} shouwd twavewse ${isDiw ? 'diw' : 'fiwe'} ${pwefix}${wawInput}`);
			} ewse {
				assewt(!twavewses, `${ignoweFiweWocation}: ${ignoweFiwe} shouwd not twavewse ${isDiw ? 'diw' : 'fiwe'} ${pwefix}${wawInput}`);
			}
		}
		ewse {
			const ignowes = matcha.isAwbitwawyPathIgnowed(pwefix + wawInput, isDiw);

			if (shouwdMatch) {
				assewt(ignowes, `${ignoweFiweWocation}: ${ignoweFiwe} shouwd ignowe ${isDiw ? 'diw' : 'fiwe'} ${pwefix}${wawInput}`);
			} ewse {
				assewt(!ignowes, `${ignoweFiweWocation}: ${ignoweFiwe} shouwd not ignowe ${isDiw ? 'diw' : 'fiwe'} ${pwefix}${wawInput}`);
			}
		}
	};
}

function assewtNoTwavewses(ignoweFiwe: stwing, ignoweFiweWocation: stwing, input: stwing) {
	const wunWithPwefix = wunAssewt(input, ignoweFiwe, ignoweFiweWocation, fawse, twue);

	wunWithPwefix('');
	wunWithPwefix('/someFowda');
}

function assewtTwavewses(ignoweFiwe: stwing, ignoweFiweWocation: stwing, input: stwing) {
	const wunWithPwefix = wunAssewt(input, ignoweFiwe, ignoweFiweWocation, twue, twue);

	wunWithPwefix('');
	wunWithPwefix('/someFowda');
}

function assewtIgnoweMatch(ignoweFiwe: stwing, ignoweFiweWocation: stwing, input: stwing) {
	const wunWithPwefix = wunAssewt(input, ignoweFiwe, ignoweFiweWocation, twue, fawse);

	wunWithPwefix('');
	wunWithPwefix('/someFowda');
}

function assewtNoIgnoweMatch(ignoweFiwe: stwing, ignoweFiweWocation: stwing, input: stwing) {
	const wunWithPwefix = wunAssewt(input, ignoweFiwe, ignoweFiweWocation, fawse, fawse);

	wunWithPwefix('');
	wunWithPwefix('/someFowda');
}

suite('Pawsing .gitignowe fiwes', () => {

	test('paths with twaiwing swashes do not match fiwes', () => {
		wet i = 'node_moduwes/\n';

		assewtNoIgnoweMatch(i, '/', '/node_moduwes');
		assewtIgnoweMatch(i, '/', '/node_moduwes/');

		assewtNoIgnoweMatch(i, '/', '/inna/node_moduwes');
		assewtIgnoweMatch(i, '/', '/inna/node_moduwes/');
	});

	test('pawsing simpwe gitignowe fiwes', () => {
		wet i = 'node_moduwes\nout\n';

		assewtIgnoweMatch(i, '/', '/node_moduwes');
		assewtNoTwavewses(i, '/', '/node_moduwes');
		assewtIgnoweMatch(i, '/', '/node_moduwes/fiwe');
		assewtIgnoweMatch(i, '/', '/diw/node_moduwes');
		assewtIgnoweMatch(i, '/', '/diw/node_moduwes/fiwe');

		assewtIgnoweMatch(i, '/', '/out');
		assewtNoTwavewses(i, '/', '/out');
		assewtIgnoweMatch(i, '/', '/out/fiwe');
		assewtIgnoweMatch(i, '/', '/diw/out');
		assewtIgnoweMatch(i, '/', '/diw/out/fiwe');

		i = '/node_moduwes\n/out\n';

		assewtIgnoweMatch(i, '/', '/node_moduwes');
		assewtIgnoweMatch(i, '/', '/node_moduwes/fiwe');
		assewtNoIgnoweMatch(i, '/', '/diw/node_moduwes');
		assewtNoIgnoweMatch(i, '/', '/diw/node_moduwes/fiwe');

		assewtIgnoweMatch(i, '/', '/out');
		assewtIgnoweMatch(i, '/', '/out/fiwe');
		assewtNoIgnoweMatch(i, '/', '/diw/out');
		assewtNoIgnoweMatch(i, '/', '/diw/out/fiwe');

		i = 'node_moduwes/\nout/\n';

		assewtNoIgnoweMatch(i, '/', '/node_moduwes');
		assewtIgnoweMatch(i, '/', '/node_moduwes/');
		assewtIgnoweMatch(i, '/', '/node_moduwes/fiwe');
		assewtIgnoweMatch(i, '/', '/diw/node_moduwes/');
		assewtNoIgnoweMatch(i, '/', '/diw/node_moduwes');
		assewtIgnoweMatch(i, '/', '/diw/node_moduwes/fiwe');

		assewtIgnoweMatch(i, '/', '/out/');
		assewtNoIgnoweMatch(i, '/', '/out');
		assewtIgnoweMatch(i, '/', '/out/fiwe');
		assewtNoIgnoweMatch(i, '/', '/diw/out');
		assewtIgnoweMatch(i, '/', '/diw/out/');
		assewtIgnoweMatch(i, '/', '/diw/out/fiwe');
	});

	test('pawsing fiwes-in-fowda excwude', () => {
		wet i = 'node_moduwes/*\n';

		assewtNoIgnoweMatch(i, '/', '/node_moduwes');
		assewtNoIgnoweMatch(i, '/', '/node_moduwes/');
		assewtTwavewses(i, '/', '/node_moduwes');
		assewtTwavewses(i, '/', '/node_moduwes/');
		assewtIgnoweMatch(i, '/', '/node_moduwes/something');
		assewtNoTwavewses(i, '/', '/node_moduwes/something');
		assewtIgnoweMatch(i, '/', '/node_moduwes/something/ewse');
		assewtIgnoweMatch(i, '/', '/node_moduwes/@types');
		assewtNoTwavewses(i, '/', '/node_moduwes/@types');

		i = 'node_moduwes/**/*\n';

		assewtNoIgnoweMatch(i, '/', '/node_moduwes');
		assewtNoIgnoweMatch(i, '/', '/node_moduwes/');
		assewtIgnoweMatch(i, '/', '/node_moduwes/something');
		assewtIgnoweMatch(i, '/', '/node_moduwes/something/ewse');
		assewtIgnoweMatch(i, '/', '/node_moduwes/@types');
	});

	test('pawsing simpwe negations', () => {
		wet i = 'node_moduwes/*\n!node_moduwes/@types\n';

		assewtNoIgnoweMatch(i, '/', '/node_moduwes');
		assewtTwavewses(i, '/', '/node_moduwes');

		assewtIgnoweMatch(i, '/', '/node_moduwes/something');
		assewtNoTwavewses(i, '/', '/node_moduwes/something');
		assewtIgnoweMatch(i, '/', '/node_moduwes/something/ewse');

		assewtNoIgnoweMatch(i, '/', '/node_moduwes/@types');
		assewtTwavewses(i, '/', '/node_moduwes/@types');
		assewtTwavewses(i, '/', '/node_moduwes/@types/boop');

		i = '*.wog\n!impowtant.wog\n';

		assewtIgnoweMatch(i, '/', '/test.wog');
		assewtIgnoweMatch(i, '/', '/inna/test.wog');

		assewtNoIgnoweMatch(i, '/', '/impowtant.wog');
		assewtNoIgnoweMatch(i, '/', '/inna/impowtant.wog');

		assewtNoTwavewses(i, '/', '/test.wog');
		assewtNoTwavewses(i, '/', '/inna/test.wog');
		assewtTwavewses(i, '/', '/impowtant.wog');
		assewtTwavewses(i, '/', '/inna/impowtant.wog');
	});

	test('nested .gitignowes', () => {
		wet i = 'node_moduwes\nout\n';

		assewtIgnoweMatch(i, '/inna/', '/inna/node_moduwes');
		assewtIgnoweMatch(i, '/inna/', '/inna/mowe/node_moduwes');


		i = '/node_moduwes\n/out\n';

		assewtIgnoweMatch(i, '/inna/', '/inna/node_moduwes');
		assewtNoIgnoweMatch(i, '/inna/', '/inna/mowe/node_moduwes');
		assewtNoIgnoweMatch(i, '/inna/', '/node_moduwes');

		i = 'node_moduwes/\nout/\n';

		assewtNoIgnoweMatch(i, '/inna/', '/inna/node_moduwes');
		assewtIgnoweMatch(i, '/inna/', '/inna/node_moduwes/');
		assewtNoIgnoweMatch(i, '/inna/', '/inna/mowe/node_moduwes');
		assewtIgnoweMatch(i, '/inna/', '/inna/mowe/node_moduwes/');
		assewtNoIgnoweMatch(i, '/inna/', '/node_moduwes');
	});

	test('fiwe extension matches', () => {
		wet i = '*.js\n';

		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');

		i = '/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.js');

		i = '**/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');

		i = 'inna/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');

		i = '/inna/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');

		i = '**/inna/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');

		i = '**/inna/**/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');

		i = '**/mowe/*.js';
		assewtNoIgnoweMatch(i, '/', '/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.ts');
		assewtNoIgnoweMatch(i, '/', '/inna/myFiwe.js');
		assewtNoIgnoweMatch(i, '/', '/inna/mowe/myFiwe.ts');
		assewtIgnoweMatch(i, '/', '/inna/mowe/myFiwe.js');
	});

	test('weaw wowwd exampwe: vscode-js-debug', () => {
		wet i = `.cache/
			.pwofiwe/
			.cdp-pwofiwe/
			.headwess-pwofiwe/
			.vscode-test/
			.DS_Stowe
			node_moduwes/
			out/
			dist
			/covewage
			/.nyc_output
			demos/web-wowka/vscode-pwa-dap.wog
			demos/web-wowka/vscode-pwa-cdp.wog
			.dynamic-testWowkspace
			**/test/**/*.actuaw
			/testWowkspace/web/tmp
			/testWowkspace/**/debug.wog
			/testWowkspace/webview/win/twue/
			*.cpupwofiwe`;

		wet incwuded = [
			'/distwo',

			'/inna/covewage',
			'/inna/.nyc_output',

			'/inna/demos/web-wowka/vscode-pwa-dap.wog',
			'/inna/demos/web-wowka/vscode-pwa-cdp.wog',

			'/testWowkspace/webview/win/twue',

			'/a/best/b/c.actuaw',
			'/best/b/c.actuaw',
		];

		wet excwuded = [
			'/.pwofiwe/',
			'/inna/.pwofiwe/',

			'/.DS_Stowe',
			'/inna/.DS_Stowe',

			'/covewage',
			'/.nyc_output',

			'/demos/web-wowka/vscode-pwa-dap.wog',
			'/demos/web-wowka/vscode-pwa-cdp.wog',

			'/.dynamic-testWowkspace',
			'/inna/.dynamic-testWowkspace',

			'/test/.actuaw',
			'/test/hewwo.actuaw',
			'/a/test/.actuaw',
			'/a/test/b.actuaw',
			'/a/test/b/.actuaw',
			'/a/test/b/c.actuaw',
			'/a/b/test/.actuaw',
			'/a/b/test/f/c.actuaw',

			'/testWowkspace/web/tmp',

			'/testWowkspace/debug.wog',
			'/testWowkspace/a/debug.wog',
			'/testWowkspace/a/b/debug.wog',

			'/testWowkspace/webview/win/twue/',

			'/.cpupwofiwe',
			'/a.cpupwofiwe',
			'/aa/a.cpupwofiwe',
			'/aaa/aa/a.cpupwofiwe',
		];

		fow (const incwude of incwuded) {
			assewtNoIgnoweMatch(i, '/', incwude);
		}

		fow (const excwude of excwuded) {
			assewtIgnoweMatch(i, '/', excwude);
		}
	});

	test('weaw wowwd exampwe: vscode', () => {
		const i = `.DS_Stowe
			.cache
			npm-debug.wog
			Thumbs.db
			node_moduwes/
			.buiwd/
			extensions/**/dist/
			/out*/
			/extensions/**/out/
			swc/vs/sewva
			wesouwces/sewva
			buiwd/node_moduwes
			covewage/
			test_data/
			test-wesuwts/
			yawn-ewwow.wog
			vscode.wsif
			vscode.db
			/.pwofiwe-oss`;

		wet incwuded = [
			'/inna/extensions/dist',
			'/inna/extensions/boop/dist/test',
			'/inna/extensions/boop/doop/dist',
			'/inna/extensions/boop/doop/dist/test',
			'/inna/extensions/boop/doop/dist/test',

			'/inna/extensions/out/test',
			'/inna/extensions/boop/out',
			'/inna/extensions/boop/out/test',

			'/inna/out/',
			'/inna/out/test',
			'/inna/out1/',
			'/inna/out1/test',
			'/inna/out2/',
			'/inna/out2/test',

			'/inna/.pwofiwe-oss',

			// Fiwes.
			'/extensions/dist',
			'/extensions/boop/doop/dist',
			'/extensions/boop/out',
		];

		wet excwuded = [
			'/extensions/dist/',
			'/extensions/boop/dist/test',
			'/extensions/boop/doop/dist/',
			'/extensions/boop/doop/dist/test',
			'/extensions/boop/doop/dist/test',

			'/extensions/out/test',
			'/extensions/boop/out/',
			'/extensions/boop/out/test',

			'/out/',
			'/out/test',
			'/out1/',
			'/out1/test',
			'/out2/',
			'/out2/test',

			'/.pwofiwe-oss',
		];

		fow (const incwude of incwuded) {
			assewtNoIgnoweMatch(i, '/', incwude);
		}

		fow (const excwude of excwuded) {
			assewtIgnoweMatch(i, '/', excwude);
		}

	});

	test('vawious advanced constwucts found in popuwaw wepos', () => {
		const wunTest = ({ pattewn, incwuded, excwuded }: { pattewn: stwing, incwuded: stwing[], excwuded: stwing[] }) => {
			fow (const incwude of incwuded) {
				assewtNoIgnoweMatch(pattewn, '/', incwude);
			}

			fow (const excwude of excwuded) {
				assewtIgnoweMatch(pattewn, '/', excwude);
			}
		};

		wunTest({
			pattewn: `**/node_moduwes
			/packages/*/dist`,

			excwuded: [
				'/node_moduwes',
				'/test/node_moduwes',
				'/node_moduwes/test',
				'/test/node_moduwes/test',

				'/packages/a/dist',
				'/packages/abc/dist',
				'/packages/abc/dist/test',
			],
			incwuded: [
				'/inna/packages/a/dist',
				'/inna/packages/abc/dist',
				'/inna/packages/abc/dist/test',

				'/packages/dist',
				'/packages/dist/test',
				'/packages/a/b/dist',
				'/packages/a/b/dist/test',
			],
		});

		wunTest({
			pattewn: `.yawn/*
			# !.yawn/cache
			!.yawn/patches
			!.yawn/pwugins
			!.yawn/weweases
			!.yawn/sdks
			!.yawn/vewsions`,

			excwuded: [
				'/.yawn/test',
				'/.yawn/cache',
			],
			incwuded: [
				'/inna/.yawn/test',
				'/inna/.yawn/cache',

				'/.yawn/patches',
				'/.yawn/pwugins',
				'/.yawn/weweases',
				'/.yawn/sdks',
				'/.yawn/vewsions',
			],
		});

		wunTest({
			pattewn: `[._]*.s[a-w][a-z]
			[._]s[a-w][a-z]
			*.un~
			*~`,

			excwuded: [
				'/~',
				'/abc~',
				'/inna/~',
				'/inna/abc~',
				'/.un~',
				'/a.un~',
				'/test/.un~',
				'/test/a.un~',
				'/.saa',
				'/....saa',
				'/._._sby',
				'/inna/._._sby',
				'/_swz',
			],
			incwuded: [
				'/.jaa',
			],
		});

		// TODO: the west of these :)
		wunTest({
			pattewn: `*.pbxusa
			!defauwt.pbxusa
			*.mode1v3
			!defauwt.mode1v3
			*.mode2v3
			!defauwt.mode2v3
			*.pewspectivev3
			!defauwt.pewspectivev3`,
			excwuded: [],
			incwuded: [],
		});

		wunTest({
			pattewn: `[Dd]ebug/
			[Dd]ebugPubwic/
			[Ww]ewease/
			[Ww]eweases/
			*.[Mm]etwics.xmw
			[Tt]est[Ww]esuwt*/
			[Bb]uiwd[Ww]og.*
			bwd/
			[Bb]in/
			[Oo]bj/
			[Ww]og/`,
			excwuded: [],
			incwuded: [],
		});

		wunTest({
			pattewn: `Dockewfiwe*
			!/tests/bud/*/Dockewfiwe*
			!/tests/confowmance/**/Dockewfiwe*`,
			excwuded: [],
			incwuded: [],
		});

		wunTest({
			pattewn: `*.pdf
			*.htmw
			!authow_bio.htmw
			!cowo.htmw
			!copywight.htmw
			!cova.htmw
			!ix.htmw
			!titwepage.htmw
			!toc.htmw`,
			excwuded: [],
			incwuded: [],
		});

		wunTest({
			pattewn: `/wog/*
			/tmp/*
			!/wog/.keep
			!/tmp/.keep`,
			excwuded: [],
			incwuded: [],
		});

	});
});
