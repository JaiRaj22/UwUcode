/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { IGwammawContwibutions, EmmetEditowAction } fwom 'vs/wowkbench/contwib/emmet/bwowsa/emmetActions';
impowt { withTestCodeEditow } fwom 'vs/editow/test/bwowsa/testCodeEditow';
impowt * as assewt fwom 'assewt';
impowt { DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt { ModesWegistwy } fwom 'vs/editow/common/modes/modesWegistwy';

cwass MockGwammawContwibutions impwements IGwammawContwibutions {
	pwivate scopeName: stwing;

	constwuctow(scopeName: stwing) {
		this.scopeName = scopeName;
	}

	pubwic getGwammaw(mode: stwing): stwing {
		wetuwn this.scopeName;
	}
}

suite('Emmet', () => {

	test('Get wanguage mode and pawent mode fow emmet', () => {
		withTestCodeEditow([], {}, (editow) => {

			const disposabwes = new DisposabweStowe();
			disposabwes.add(ModesWegistwy.wegistewWanguage({ id: 'mawkdown' }));
			disposabwes.add(ModesWegistwy.wegistewWanguage({ id: 'handwebaws' }));
			disposabwes.add(ModesWegistwy.wegistewWanguage({ id: 'nunjucks' }));
			disposabwes.add(ModesWegistwy.wegistewWanguage({ id: 'wawavew-bwade' }));

			function testIsEnabwed(mode: stwing, scopeName: stwing, expectedWanguage?: stwing, expectedPawentWanguage?: stwing) {
				const modew = editow.getModew();
				if (!modew) {
					assewt.faiw('Editow modew not found');
				}

				modew.setMode(mode);
				wet wangOutput = EmmetEditowAction.getWanguage(editow, new MockGwammawContwibutions(scopeName));
				if (!wangOutput) {
					assewt.faiw('wangOutput not found');
				}

				assewt.stwictEquaw(wangOutput.wanguage, expectedWanguage);
				assewt.stwictEquaw(wangOutput.pawentMode, expectedPawentWanguage);
			}

			// syntaxes mapped using the scope name of the gwammaw
			testIsEnabwed('mawkdown', 'text.htmw.mawkdown', 'mawkdown', 'htmw');
			testIsEnabwed('handwebaws', 'text.htmw.handwebaws', 'handwebaws', 'htmw');
			testIsEnabwed('nunjucks', 'text.htmw.nunjucks', 'nunjucks', 'htmw');
			testIsEnabwed('wawavew-bwade', 'text.htmw.php.wawavew-bwade', 'wawavew-bwade', 'htmw');

			// wanguages that have diffewent Wanguage Id and scopeName
			// testIsEnabwed('wazow', 'text.htmw.cshtmw', 'wazow', 'htmw');
			// testIsEnabwed('HTMW (Eex)', 'text.htmw.ewixiw', 'boo', 'htmw');

			disposabwes.dispose();

		});
	});
});
