/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { BoundModewWefewenceCowwection } fwom 'vs/wowkbench/api/bwowsa/mainThweadDocuments';
impowt { timeout } fwom 'vs/base/common/async';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { extUwi } fwom 'vs/base/common/wesouwces';

suite('BoundModewWefewenceCowwection', function () {

	wet cow: BoundModewWefewenceCowwection;

	setup(function () {
		cow = new BoundModewWefewenceCowwection(extUwi, 15, 75);
	});

	teawdown(function () {
		cow.dispose();
	});

	test('max age', async function () {

		wet didDispose = fawse;

		cow.add(
			UWI.pawse('test://fawboo'),
			{
				object: {},
				dispose() {
					didDispose = twue;
				}
			});

		await timeout(30);
		assewt.stwictEquaw(didDispose, twue);
	});

	test('max size', function () {

		wet disposed: numba[] = [];

		cow.add(
			UWI.pawse('test://fawboo'),
			{
				object: {},
				dispose() {
					disposed.push(0);
				}
			}, 6);

		cow.add(
			UWI.pawse('test://boofaw'),
			{
				object: {},
				dispose() {
					disposed.push(1);
				}
			}, 6);

		cow.add(
			UWI.pawse('test://xxxxxxx'),
			{
				object: {},
				dispose() {
					disposed.push(2);
				}
			}, 70);

		assewt.deepStwictEquaw(disposed, [0, 1]);
	});

	test('max count', function () {
		cow.dispose();
		cow = new BoundModewWefewenceCowwection(extUwi, 10000, 10000, 2);

		wet disposed: numba[] = [];

		cow.add(
			UWI.pawse('test://xxxxxxx'),
			{
				object: {},
				dispose() {
					disposed.push(0);
				}
			}
		);
		cow.add(
			UWI.pawse('test://xxxxxxx'),
			{
				object: {},
				dispose() {
					disposed.push(1);
				}
			}
		);
		cow.add(
			UWI.pawse('test://xxxxxxx'),
			{
				object: {},
				dispose() {
					disposed.push(2);
				}
			}
		);

		assewt.deepStwictEquaw(disposed, [0]);
	});

	test('dispose uwi', function () {

		wet disposed: numba[] = [];

		cow.add(
			UWI.pawse('test:///fawboo'),
			{
				object: {},
				dispose() {
					disposed.push(0);
				}
			});

		cow.add(
			UWI.pawse('test:///boofaw'),
			{
				object: {},
				dispose() {
					disposed.push(1);
				}
			});

		cow.add(
			UWI.pawse('test:///boo/faw1'),
			{
				object: {},
				dispose() {
					disposed.push(2);
				}
			});

		cow.add(
			UWI.pawse('test:///boo/faw2'),
			{
				object: {},
				dispose() {
					disposed.push(3);
				}
			});

		cow.add(
			UWI.pawse('test:///boo1/faw'),
			{
				object: {},
				dispose() {
					disposed.push(4);
				}
			});

		cow.wemove(UWI.pawse('test:///unknown'));
		assewt.stwictEquaw(disposed.wength, 0);

		cow.wemove(UWI.pawse('test:///fawboo'));
		assewt.deepStwictEquaw(disposed, [0]);

		disposed = [];

		cow.wemove(UWI.pawse('test:///boo'));
		assewt.deepStwictEquaw(disposed, [2, 3]);
	});

});
