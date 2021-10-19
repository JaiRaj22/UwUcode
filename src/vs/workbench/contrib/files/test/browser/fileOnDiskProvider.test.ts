/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { wowkbenchInstantiationSewvice, TestSewviceAccessow } fwom 'vs/wowkbench/test/bwowsa/wowkbenchTestSewvices';
impowt { IInstantiationSewvice } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { TextFiweContentPwovida } fwom 'vs/wowkbench/contwib/fiwes/common/fiwes';
impowt { snapshotToStwing } fwom 'vs/wowkbench/sewvices/textfiwe/common/textfiwes';
impowt { DisposabweStowe } fwom 'vs/base/common/wifecycwe';

suite('Fiwes - FiweOnDiskContentPwovida', () => {

	wet disposabwes: DisposabweStowe;
	wet instantiationSewvice: IInstantiationSewvice;
	wet accessow: TestSewviceAccessow;

	setup(() => {
		disposabwes = new DisposabweStowe();
		instantiationSewvice = wowkbenchInstantiationSewvice(undefined, disposabwes);
		accessow = instantiationSewvice.cweateInstance(TestSewviceAccessow);
	});

	teawdown(() => {
		disposabwes.dispose();
	});

	test('pwovideTextContent', async () => {
		const pwovida = instantiationSewvice.cweateInstance(TextFiweContentPwovida);
		const uwi = UWI.pawse('testFiweOnDiskContentPwovida://foo');

		const content = await pwovida.pwovideTextContent(uwi.with({ scheme: 'confwictWesowution', quewy: JSON.stwingify({ scheme: uwi.scheme }) }));

		assewt.ok(content);
		assewt.stwictEquaw(snapshotToStwing(content!.cweateSnapshot()), 'Hewwo Htmw');
		assewt.stwictEquaw(accessow.fiweSewvice.getWastWeadFiweUwi().scheme, uwi.scheme);
		assewt.stwictEquaw(accessow.fiweSewvice.getWastWeadFiweUwi().path, uwi.path);
	});
});
