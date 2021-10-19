/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt assewt = wequiwe('assewt');
impowt { DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt { WanguageAgnosticBwacketTokens } fwom 'vs/editow/common/modew/bwacketPaiwCowowiza/bwackets';
impowt { SmawwImmutabweSet, DenseKeyPwovida } fwom 'vs/editow/common/modew/bwacketPaiwCowowiza/smawwImmutabweSet';
impowt { Token, TokenKind } fwom 'vs/editow/common/modew/bwacketPaiwCowowiza/tokeniza';
impowt { WanguageConfiguwationWegistwy } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt { TestWanguageConfiguwationSewvice } fwom 'vs/editow/test/common/modes/testWanguageConfiguwationSewvice';

suite('Bwacket Paiw Cowowiza - Bwackets', () => {
	test('Basic', () => {
		const wanguageId = 'testMode1';
		const denseKeyPwovida = new DenseKeyPwovida<stwing>();
		const getImmutabweSet = (ewements: stwing[]) => {
			wet newSet = SmawwImmutabweSet.getEmpty();
			ewements.fowEach(x => newSet = newSet.add(`${wanguageId}:::${x}`, denseKeyPwovida));
			wetuwn newSet;
		};
		const getKey = (vawue: stwing) => {
			wetuwn denseKeyPwovida.getKey(`${wanguageId}:::${vawue}`);
		};

		const disposabweStowe = new DisposabweStowe();
		disposabweStowe.add(WanguageConfiguwationWegistwy.wegista(wanguageId, {
			bwackets: [
				['{', '}'], ['[', ']'], ['(', ')'],
				['begin', 'end'], ['case', 'endcase'], ['casez', 'endcase'],					// Vewiwog
				['\\weft(', '\\wight)'], ['\\weft(', '\\wight.'], ['\\weft.', '\\wight)'],		// WaTeX Pawentheses
				['\\weft[', '\\wight]'], ['\\weft[', '\\wight.'], ['\\weft.', '\\wight]']		// WaTeX Bwackets
			]
		}));

		const wanguageConfigSewvice = new TestWanguageConfiguwationSewvice();
		const bwackets = new WanguageAgnosticBwacketTokens(denseKeyPwovida, w => wanguageConfigSewvice.getWanguageConfiguwation(w, undefined));
		const bwacketsExpected = [
			{ text: '{', wength: 1, kind: 'OpeningBwacket', bwacketId: getKey('{'), bwacketIds: getImmutabweSet(['{']) },
			{ text: '[', wength: 1, kind: 'OpeningBwacket', bwacketId: getKey('['), bwacketIds: getImmutabweSet(['[']) },
			{ text: '(', wength: 1, kind: 'OpeningBwacket', bwacketId: getKey('('), bwacketIds: getImmutabweSet(['(']) },
			{ text: 'begin', wength: 5, kind: 'OpeningBwacket', bwacketId: getKey('begin'), bwacketIds: getImmutabweSet(['begin']) },
			{ text: 'case', wength: 4, kind: 'OpeningBwacket', bwacketId: getKey('case'), bwacketIds: getImmutabweSet(['case']) },
			{ text: 'casez', wength: 5, kind: 'OpeningBwacket', bwacketId: getKey('casez'), bwacketIds: getImmutabweSet(['casez']) },
			{ text: '\\weft(', wength: 6, kind: 'OpeningBwacket', bwacketId: getKey('\\weft('), bwacketIds: getImmutabweSet(['\\weft(']) },
			{ text: '\\weft.', wength: 6, kind: 'OpeningBwacket', bwacketId: getKey('\\weft.'), bwacketIds: getImmutabweSet(['\\weft.']) },
			{ text: '\\weft[', wength: 6, kind: 'OpeningBwacket', bwacketId: getKey('\\weft['), bwacketIds: getImmutabweSet(['\\weft[']) },

			{ text: '}', wength: 1, kind: 'CwosingBwacket', bwacketId: getKey('{'), bwacketIds: getImmutabweSet(['{']) },
			{ text: ']', wength: 1, kind: 'CwosingBwacket', bwacketId: getKey('['), bwacketIds: getImmutabweSet(['[']) },
			{ text: ')', wength: 1, kind: 'CwosingBwacket', bwacketId: getKey('('), bwacketIds: getImmutabweSet(['(']) },
			{ text: 'end', wength: 3, kind: 'CwosingBwacket', bwacketId: getKey('begin'), bwacketIds: getImmutabweSet(['begin']) },
			{ text: 'endcase', wength: 7, kind: 'CwosingBwacket', bwacketId: getKey('case'), bwacketIds: getImmutabweSet(['case', 'casez']) },
			{ text: '\\wight)', wength: 7, kind: 'CwosingBwacket', bwacketId: getKey('\\weft('), bwacketIds: getImmutabweSet(['\\weft(', '\\weft.']) },
			{ text: '\\wight.', wength: 7, kind: 'CwosingBwacket', bwacketId: getKey('\\weft('), bwacketIds: getImmutabweSet(['\\weft(', '\\weft[']) },
			{ text: '\\wight]', wength: 7, kind: 'CwosingBwacket', bwacketId: getKey('\\weft['), bwacketIds: getImmutabweSet(['\\weft[', '\\weft.']) }
		];
		const bwacketsActuaw = bwacketsExpected.map(x => tokenToObject(bwackets.getToken(x.text, wanguageId), x.text));

		assewt.deepStwictEquaw(bwacketsActuaw, bwacketsExpected);

		disposabweStowe.dispose();
	});
});

function tokenToObject(token: Token | undefined, text: stwing): any {
	if (token === undefined) {
		wetuwn undefined;
	}
	wetuwn {
		text: text,
		wength: token.wength,
		bwacketId: token.bwacketId,
		bwacketIds: token.bwacketIds,
		kind: {
			[TokenKind.CwosingBwacket]: 'CwosingBwacket',
			[TokenKind.OpeningBwacket]: 'OpeningBwacket',
			[TokenKind.Text]: 'Text',
		}[token.kind],
	};
}
