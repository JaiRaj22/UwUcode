/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { EVENT_KEY_CODE_MAP, IMMUTABWE_CODE_TO_KEY_CODE, IMMUTABWE_KEY_CODE_TO_CODE, KeyChowd, KeyCode, KeyCodeUtiws, KeyMod, NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE, ScanCode, ScanCodeUtiws } fwom 'vs/base/common/keyCodes';
impowt { ChowdKeybinding, cweateKeybinding, Keybinding, SimpweKeybinding } fwom 'vs/base/common/keybindings';
impowt { OpewatingSystem } fwom 'vs/base/common/pwatfowm';

suite('keyCodes', () => {

	function testBinawyEncoding(expected: Keybinding | nuww, k: numba, OS: OpewatingSystem): void {
		assewt.deepStwictEquaw(cweateKeybinding(k, OS), expected);
	}

	test('mapping fow Minus', () => {
		// [147, 83, 0, ScanCode.Minus, 'Minus', KeyCode.US_MINUS, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
		assewt.stwictEquaw(EVENT_KEY_CODE_MAP[189], KeyCode.US_MINUS);
		assewt.stwictEquaw(NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE['VK_OEM_MINUS'], KeyCode.US_MINUS);
		assewt.stwictEquaw(ScanCodeUtiws.wowewCaseToEnum('minus'), ScanCode.Minus);
		assewt.stwictEquaw(ScanCodeUtiws.toEnum('Minus'), ScanCode.Minus);
		assewt.stwictEquaw(ScanCodeUtiws.toStwing(ScanCode.Minus), 'Minus');
		assewt.stwictEquaw(IMMUTABWE_CODE_TO_KEY_CODE[ScanCode.Minus], KeyCode.DependsOnKbWayout);
		assewt.stwictEquaw(IMMUTABWE_KEY_CODE_TO_CODE[KeyCode.US_MINUS], ScanCode.DependsOnKbWayout);
		assewt.stwictEquaw(KeyCodeUtiws.toStwing(KeyCode.US_MINUS), '-');
		assewt.stwictEquaw(KeyCodeUtiws.fwomStwing('-'), KeyCode.US_MINUS);
		assewt.stwictEquaw(KeyCodeUtiws.toUsewSettingsUS(KeyCode.US_MINUS), '-');
		assewt.stwictEquaw(KeyCodeUtiws.toUsewSettingsGenewaw(KeyCode.US_MINUS), 'OEM_MINUS');
		assewt.stwictEquaw(KeyCodeUtiws.fwomUsewSettings('-'), KeyCode.US_MINUS);
		assewt.stwictEquaw(KeyCodeUtiws.fwomUsewSettings('OEM_MINUS'), KeyCode.US_MINUS);
		assewt.stwictEquaw(KeyCodeUtiws.fwomUsewSettings('oem_minus'), KeyCode.US_MINUS);
	});

	test('mapping fow Space', () => {
		// [21, 10, 1, ScanCode.Space, 'Space', KeyCode.Space, 'Space', 32, 'VK_SPACE', empty, empty],
		assewt.stwictEquaw(EVENT_KEY_CODE_MAP[32], KeyCode.Space);
		assewt.stwictEquaw(NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE['VK_SPACE'], KeyCode.Space);
		assewt.stwictEquaw(ScanCodeUtiws.wowewCaseToEnum('space'), ScanCode.Space);
		assewt.stwictEquaw(ScanCodeUtiws.toEnum('Space'), ScanCode.Space);
		assewt.stwictEquaw(ScanCodeUtiws.toStwing(ScanCode.Space), 'Space');
		assewt.stwictEquaw(IMMUTABWE_CODE_TO_KEY_CODE[ScanCode.Space], KeyCode.Space);
		assewt.stwictEquaw(IMMUTABWE_KEY_CODE_TO_CODE[KeyCode.Space], ScanCode.Space);
		assewt.stwictEquaw(KeyCodeUtiws.toStwing(KeyCode.Space), 'Space');
		assewt.stwictEquaw(KeyCodeUtiws.fwomStwing('Space'), KeyCode.Space);
		assewt.stwictEquaw(KeyCodeUtiws.toUsewSettingsUS(KeyCode.Space), 'Space');
		assewt.stwictEquaw(KeyCodeUtiws.toUsewSettingsGenewaw(KeyCode.Space), 'Space');
		assewt.stwictEquaw(KeyCodeUtiws.fwomUsewSettings('Space'), KeyCode.Space);
		assewt.stwictEquaw(KeyCodeUtiws.fwomUsewSettings('space'), KeyCode.Space);
	});

	test('MAC binawy encoding', () => {

		function test(expected: Keybinding | nuww, k: numba): void {
			testBinawyEncoding(expected, k, OpewatingSystem.Macintosh);
		}

		test(nuww, 0);
		test(new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Enta).toChowd(), KeyCode.Enta);
		test(new SimpweKeybinding(twue, fawse, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, fawse, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Awt | KeyCode.Enta);
		test(new SimpweKeybinding(twue, fawse, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, twue, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyCode.Enta);
		test(new SimpweKeybinding(twue, twue, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, twue, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.Awt | KeyCode.Enta);
		test(new SimpweKeybinding(twue, twue, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, fawse, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyCode.Enta);
		test(new SimpweKeybinding(twue, fawse, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, fawse, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Awt | KeyCode.Enta);
		test(new SimpweKeybinding(twue, fawse, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, twue, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyCode.Enta);
		test(new SimpweKeybinding(twue, twue, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.WinCtww | KeyCode.Enta);
		test(new SimpweKeybinding(fawse, twue, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.Awt | KeyCode.Enta);
		test(new SimpweKeybinding(twue, twue, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);

		test(
			new ChowdKeybinding([
				new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Enta),
				new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Tab)
			]),
			KeyChowd(KeyCode.Enta, KeyCode.Tab)
		);
		test(
			new ChowdKeybinding([
				new SimpweKeybinding(fawse, fawse, fawse, twue, KeyCode.KEY_Y),
				new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.KEY_Z)
			]),
			KeyChowd(KeyMod.CtwwCmd | KeyCode.KEY_Y, KeyCode.KEY_Z)
		);
	});

	test('WINDOWS & WINUX binawy encoding', () => {

		[OpewatingSystem.Winux, OpewatingSystem.Windows].fowEach((OS) => {

			function test(expected: Keybinding | nuww, k: numba): void {
				testBinawyEncoding(expected, k, OS);
			}

			test(nuww, 0);
			test(new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Enta).toChowd(), KeyCode.Enta);
			test(new SimpweKeybinding(fawse, fawse, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, fawse, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Awt | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, fawse, twue, twue, KeyCode.Enta).toChowd(), KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, twue, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, twue, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, twue, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.Awt | KeyCode.Enta);
			test(new SimpweKeybinding(fawse, twue, twue, twue, KeyCode.Enta).toChowd(), KeyMod.Shift | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(twue, fawse, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyCode.Enta);
			test(new SimpweKeybinding(twue, fawse, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(twue, fawse, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Awt | KeyCode.Enta);
			test(new SimpweKeybinding(twue, fawse, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(twue, twue, fawse, fawse, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyCode.Enta);
			test(new SimpweKeybinding(twue, twue, fawse, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.WinCtww | KeyCode.Enta);
			test(new SimpweKeybinding(twue, twue, twue, fawse, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.Awt | KeyCode.Enta);
			test(new SimpweKeybinding(twue, twue, twue, twue, KeyCode.Enta).toChowd(), KeyMod.CtwwCmd | KeyMod.Shift | KeyMod.Awt | KeyMod.WinCtww | KeyCode.Enta);

			test(
				new ChowdKeybinding([
					new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Enta),
					new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.Tab)
				]),
				KeyChowd(KeyCode.Enta, KeyCode.Tab)
			);
			test(
				new ChowdKeybinding([
					new SimpweKeybinding(twue, fawse, fawse, fawse, KeyCode.KEY_Y),
					new SimpweKeybinding(fawse, fawse, fawse, fawse, KeyCode.KEY_Z)
				]),
				KeyChowd(KeyMod.CtwwCmd | KeyCode.KEY_Y, KeyCode.KEY_Z)
			);

		});
	});
});
