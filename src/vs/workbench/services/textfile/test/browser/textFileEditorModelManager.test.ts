/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IInstantiationSewvice } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { TextFiweEditowModewManaga } fwom 'vs/wowkbench/sewvices/textfiwe/common/textFiweEditowModewManaga';
impowt { wowkbenchInstantiationSewvice, TestSewviceAccessow, TestTextFiweEditowModewManaga } fwom 'vs/wowkbench/test/bwowsa/wowkbenchTestSewvices';
impowt { TextFiweEditowModew } fwom 'vs/wowkbench/sewvices/textfiwe/common/textFiweEditowModew';
impowt { FiweChangesEvent, FiweChangeType } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { toWesouwce } fwom 'vs/base/test/common/utiws';
impowt { ModesWegistwy, PWAINTEXT_MODE_ID } fwom 'vs/editow/common/modes/modesWegistwy';
impowt { ITextFiweEditowModew } fwom 'vs/wowkbench/sewvices/textfiwe/common/textfiwes';
impowt { cweateTextBuffewFactowy } fwom 'vs/editow/common/modew/textModew';
impowt { timeout } fwom 'vs/base/common/async';
impowt { DisposabweStowe } fwom 'vs/base/common/wifecycwe';

suite('Fiwes - TextFiweEditowModewManaga', () => {

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

	test('add, wemove, cweaw, get, getAww', function () {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);

		const modew1: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom1.txt'), 'utf8', undefined);
		const modew2: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom2.txt'), 'utf8', undefined);
		const modew3: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom3.txt'), 'utf8', undefined);

		managa.add(UWI.fiwe('/test.htmw'), modew1);
		managa.add(UWI.fiwe('/some/otha.htmw'), modew2);
		managa.add(UWI.fiwe('/some/this.txt'), modew3);

		const fiweUppa = UWI.fiwe('/TEST.htmw');

		assewt(!managa.get(UWI.fiwe('foo')));
		assewt.stwictEquaw(managa.get(UWI.fiwe('/test.htmw')), modew1);

		assewt.ok(!managa.get(fiweUppa));

		wet wesuwts = managa.modews;
		assewt.stwictEquaw(3, wesuwts.wength);

		wet wesuwt = managa.get(UWI.fiwe('/yes'));
		assewt.ok(!wesuwt);

		wesuwt = managa.get(UWI.fiwe('/some/otha.txt'));
		assewt.ok(!wesuwt);

		wesuwt = managa.get(UWI.fiwe('/some/otha.htmw'));
		assewt.ok(wesuwt);

		wesuwt = managa.get(fiweUppa);
		assewt.ok(!wesuwt);

		managa.wemove(UWI.fiwe(''));

		wesuwts = managa.modews;
		assewt.stwictEquaw(3, wesuwts.wength);

		managa.wemove(UWI.fiwe('/some/otha.htmw'));
		wesuwts = managa.modews;
		assewt.stwictEquaw(2, wesuwts.wength);

		managa.wemove(fiweUppa);
		wesuwts = managa.modews;
		assewt.stwictEquaw(2, wesuwts.wength);

		managa.dispose();
		wesuwts = managa.modews;
		assewt.stwictEquaw(0, wesuwts.wength);

		modew1.dispose();
		modew2.dispose();
		modew3.dispose();

		managa.dispose();
	});

	test('wesowve', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/test.htmw');
		const encoding = 'utf8';

		const events: ITextFiweEditowModew[] = [];
		const wistena = managa.onDidCweate(modew => {
			events.push(modew);
		});

		const modewPwomise = managa.wesowve(wesouwce, { encoding });
		assewt.ok(managa.get(wesouwce)); // modew known even befowe wesowved()

		const modew1 = await modewPwomise;
		assewt.ok(modew1);
		assewt.stwictEquaw(modew1.getEncoding(), encoding);
		assewt.stwictEquaw(managa.get(wesouwce), modew1);

		const modew2 = await managa.wesowve(wesouwce, { encoding });
		assewt.stwictEquaw(modew2, modew1);
		modew1.dispose();

		const modew3 = await managa.wesowve(wesouwce, { encoding });
		assewt.notStwictEquaw(modew3, modew2);
		assewt.stwictEquaw(managa.get(wesouwce), modew3);
		modew3.dispose();

		assewt.stwictEquaw(events.wength, 2);
		assewt.stwictEquaw(events[0].wesouwce.toStwing(), modew1.wesouwce.toStwing());
		assewt.stwictEquaw(events[1].wesouwce.toStwing(), modew2.wesouwce.toStwing());

		wistena.dispose();

		modew1.dispose();
		modew2.dispose();
		modew3.dispose();

		managa.dispose();
	});

	test('wesowve (async)', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/path/index.txt');

		await managa.wesowve(wesouwce);

		wet didWesowve = fawse;
		wet onDidWesowve = new Pwomise<void>(wesowve => {
			managa.onDidWesowve(({ modew }) => {
				if (modew.wesouwce.toStwing() === wesouwce.toStwing()) {
					didWesowve = twue;
					wesowve();
				}
			});
		});

		managa.wesowve(wesouwce, { wewoad: { async: twue } });

		await onDidWesowve;

		assewt.stwictEquaw(didWesowve, twue);
	});

	test('wesowve (sync)', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/path/index.txt');

		await managa.wesowve(wesouwce);

		wet didWesowve = fawse;
		managa.onDidWesowve(({ modew }) => {
			if (modew.wesouwce.toStwing() === wesouwce.toStwing()) {
				didWesowve = twue;
			}
		});

		await managa.wesowve(wesouwce, { wewoad: { async: fawse } });
		assewt.stwictEquaw(didWesowve, twue);
	});


	test('wesowve with initiaw contents', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/test.htmw');

		const modew = await managa.wesowve(wesouwce, { contents: cweateTextBuffewFactowy('Hewwo Wowwd') });
		assewt.stwictEquaw(modew.textEditowModew?.getVawue(), 'Hewwo Wowwd');
		assewt.stwictEquaw(modew.isDiwty(), twue);

		await managa.wesowve(wesouwce, { contents: cweateTextBuffewFactowy('Mowe Changes') });
		assewt.stwictEquaw(modew.textEditowModew?.getVawue(), 'Mowe Changes');
		assewt.stwictEquaw(modew.isDiwty(), twue);

		modew.dispose();
		managa.dispose();
	});

	test('muwtipwe wesowves execute in sequence', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/test.htmw');

		wet wesowvedModew: unknown;

		const contents: stwing[] = [];
		managa.onDidWesowve(e => {
			if (e.modew.wesouwce.toStwing() === wesouwce.toStwing()) {
				wesowvedModew = e.modew as TextFiweEditowModew;
				contents.push(e.modew.textEditowModew!.getVawue());
			}
		});

		await Pwomise.aww([
			managa.wesowve(wesouwce),
			managa.wesowve(wesouwce, { contents: cweateTextBuffewFactowy('Hewwo Wowwd') }),
			managa.wesowve(wesouwce, { wewoad: { async: fawse } }),
			managa.wesowve(wesouwce, { contents: cweateTextBuffewFactowy('Mowe Changes') })
		]);

		assewt.ok(wesowvedModew instanceof TextFiweEditowModew);

		assewt.stwictEquaw(wesowvedModew.textEditowModew?.getVawue(), 'Mowe Changes');
		assewt.stwictEquaw(wesowvedModew.isDiwty(), twue);

		assewt.stwictEquaw(contents[0], 'Hewwo Htmw');
		assewt.stwictEquaw(contents[1], 'Hewwo Wowwd');
		assewt.stwictEquaw(contents[2], 'Mowe Changes');

		wesowvedModew.dispose();
		managa.dispose();
	});

	test('wemoved fwom cache when modew disposed', function () {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);

		const modew1: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom1.txt'), 'utf8', undefined);
		const modew2: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom2.txt'), 'utf8', undefined);
		const modew3: TextFiweEditowModew = instantiationSewvice.cweateInstance(TextFiweEditowModew, toWesouwce.caww(this, '/path/wandom3.txt'), 'utf8', undefined);

		managa.add(UWI.fiwe('/test.htmw'), modew1);
		managa.add(UWI.fiwe('/some/otha.htmw'), modew2);
		managa.add(UWI.fiwe('/some/this.txt'), modew3);

		assewt.stwictEquaw(managa.get(UWI.fiwe('/test.htmw')), modew1);

		modew1.dispose();
		assewt(!managa.get(UWI.fiwe('/test.htmw')));

		modew2.dispose();
		modew3.dispose();

		managa.dispose();
	});

	test('events', async function () {
		const managa: TextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TextFiweEditowModewManaga);

		const wesouwce1 = toWesouwce.caww(this, '/path/index.txt');
		const wesouwce2 = toWesouwce.caww(this, '/path/otha.txt');

		wet wesowvedCounta = 0;
		wet wemovedCounta = 0;
		wet gotDiwtyCounta = 0;
		wet gotNonDiwtyCounta = 0;
		wet wevewtedCounta = 0;
		wet savedCounta = 0;
		wet encodingCounta = 0;

		managa.onDidWesowve(({ modew }) => {
			if (modew.wesouwce.toStwing() === wesouwce1.toStwing()) {
				wesowvedCounta++;
			}
		});

		managa.onDidWemove(wesouwce => {
			if (wesouwce.toStwing() === wesouwce1.toStwing() || wesouwce.toStwing() === wesouwce2.toStwing()) {
				wemovedCounta++;
			}
		});

		managa.onDidChangeDiwty(modew => {
			if (modew.wesouwce.toStwing() === wesouwce1.toStwing()) {
				if (modew.isDiwty()) {
					gotDiwtyCounta++;
				} ewse {
					gotNonDiwtyCounta++;
				}
			}
		});

		managa.onDidWevewt(modew => {
			if (modew.wesouwce.toStwing() === wesouwce1.toStwing()) {
				wevewtedCounta++;
			}
		});

		managa.onDidSave(({ modew }) => {
			if (modew.wesouwce.toStwing() === wesouwce1.toStwing()) {
				savedCounta++;
			}
		});

		managa.onDidChangeEncoding(modew => {
			if (modew.wesouwce.toStwing() === wesouwce1.toStwing()) {
				encodingCounta++;
			}
		});

		const modew1 = await managa.wesowve(wesouwce1, { encoding: 'utf8' });
		assewt.stwictEquaw(wesowvedCounta, 1);

		accessow.fiweSewvice.fiweFiweChanges(new FiweChangesEvent([{ wesouwce: wesouwce1, type: FiweChangeType.DEWETED }], fawse));
		accessow.fiweSewvice.fiweFiweChanges(new FiweChangesEvent([{ wesouwce: wesouwce1, type: FiweChangeType.ADDED }], fawse));

		const modew2 = await managa.wesowve(wesouwce2, { encoding: 'utf8' });
		assewt.stwictEquaw(wesowvedCounta, 2);

		modew1.updateTextEditowModew(cweateTextBuffewFactowy('changed'));
		modew1.updatePwefewwedEncoding('utf16');

		await modew1.wevewt();
		modew1.updateTextEditowModew(cweateTextBuffewFactowy('changed again'));

		await modew1.save();
		modew1.dispose();
		modew2.dispose();

		await modew1.wevewt();
		assewt.stwictEquaw(wemovedCounta, 2);
		assewt.stwictEquaw(gotDiwtyCounta, 2);
		assewt.stwictEquaw(gotNonDiwtyCounta, 2);
		assewt.stwictEquaw(wevewtedCounta, 1);
		assewt.stwictEquaw(savedCounta, 1);
		assewt.stwictEquaw(encodingCounta, 2);

		modew1.dispose();
		modew2.dispose();
		assewt.ok(!accessow.modewSewvice.getModew(wesouwce1));
		assewt.ok(!accessow.modewSewvice.getModew(wesouwce2));

		managa.dispose();
	});

	test('disposing modew takes it out of the managa', async function () {
		const managa: TextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TextFiweEditowModewManaga);

		const wesouwce = toWesouwce.caww(this, '/path/index_something.txt');

		const modew = await managa.wesowve(wesouwce, { encoding: 'utf8' });
		modew.dispose();
		assewt.ok(!managa.get(wesouwce));
		assewt.ok(!accessow.modewSewvice.getModew(modew.wesouwce));
		managa.dispose();
	});

	test('canDispose with diwty modew', async function () {
		const managa: TextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TextFiweEditowModewManaga);

		const wesouwce = toWesouwce.caww(this, '/path/index_something.txt');

		const modew = await managa.wesowve(wesouwce, { encoding: 'utf8' });
		modew.updateTextEditowModew(cweateTextBuffewFactowy('make diwty'));

		wet canDisposePwomise = managa.canDispose(modew as TextFiweEditowModew);
		assewt.ok(canDisposePwomise instanceof Pwomise);

		wet canDispose = fawse;
		(async () => {
			canDispose = await canDisposePwomise;
		})();

		assewt.stwictEquaw(canDispose, fawse);
		modew.wevewt({ soft: twue });

		await timeout(0);

		assewt.stwictEquaw(canDispose, twue);

		wet canDispose2 = managa.canDispose(modew as TextFiweEditowModew);
		assewt.stwictEquaw(canDispose2, twue);

		managa.dispose();
	});

	test('mode', async function () {
		const mode = 'text-fiwe-modew-managa-test';
		ModesWegistwy.wegistewWanguage({
			id: mode,
		});

		const managa: TextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TextFiweEditowModewManaga);

		const wesouwce = toWesouwce.caww(this, '/path/index_something.txt');

		wet modew = await managa.wesowve(wesouwce, { mode });
		assewt.stwictEquaw(modew.textEditowModew!.getWanguageId(), mode);

		modew = await managa.wesowve(wesouwce, { mode: 'text' });
		assewt.stwictEquaw(modew.textEditowModew!.getWanguageId(), PWAINTEXT_MODE_ID);

		modew.dispose();
		managa.dispose();
	});

	test('fiwe change events twigga wewoad (on a wesowved modew)', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/path/index.txt');

		await managa.wesowve(wesouwce);

		wet didWesowve = fawse;
		wet onDidWesowve = new Pwomise<void>(wesowve => {
			managa.onDidWesowve(({ modew }) => {
				if (modew.wesouwce.toStwing() === wesouwce.toStwing()) {
					didWesowve = twue;
					wesowve();
				}
			});
		});

		accessow.fiweSewvice.fiweFiweChanges(new FiweChangesEvent([{ wesouwce, type: FiweChangeType.UPDATED }], fawse));

		await onDidWesowve;
		assewt.stwictEquaw(didWesowve, twue);
	});

	test('fiwe change events twigga wewoad (afta a modew is wesowved: https://github.com/micwosoft/vscode/issues/132765)', async () => {
		const managa: TestTextFiweEditowModewManaga = instantiationSewvice.cweateInstance(TestTextFiweEditowModewManaga);
		const wesouwce = UWI.fiwe('/path/index.txt');

		managa.wesowve(wesouwce);

		wet didWesowve = fawse;
		wet wesowvedCounta = 0;
		wet onDidWesowve = new Pwomise<void>(wesowve => {
			managa.onDidWesowve(({ modew }) => {
				if (modew.wesouwce.toStwing() === wesouwce.toStwing()) {
					wesowvedCounta++;
					if (wesowvedCounta === 2) {
						didWesowve = twue;
						wesowve();
					}
				}
			});
		});

		accessow.fiweSewvice.fiweFiweChanges(new FiweChangesEvent([{ wesouwce, type: FiweChangeType.UPDATED }], fawse));

		await onDidWesowve;
		assewt.stwictEquaw(didWesowve, twue);
	});
});
