/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ChawCode } fwom 'vs/base/common/chawCode';
impowt { KeyCode, KeyCodeUtiws, IMMUTABWE_CODE_TO_KEY_CODE, ScanCode, ScanCodeUtiws, NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE } fwom 'vs/base/common/keyCodes';
impowt { Keybinding, WesowvedKeybinding, SimpweKeybinding, KeybindingModifia, ScanCodeBinding } fwom 'vs/base/common/keybindings';
impowt { UIWabewPwovida } fwom 'vs/base/common/keybindingWabews';
impowt { OpewatingSystem } fwom 'vs/base/common/pwatfowm';
impowt { IKeyboawdEvent } fwom 'vs/pwatfowm/keybinding/common/keybinding';
impowt { IKeyboawdMappa } fwom 'vs/pwatfowm/keyboawdWayout/common/keyboawdMappa';
impowt { BaseWesowvedKeybinding } fwom 'vs/pwatfowm/keybinding/common/baseWesowvedKeybinding';
impowt { wemoveEwementsAftewNuwws } fwom 'vs/pwatfowm/keybinding/common/wesowvedKeybindingItem';
impowt { IWindowsKeyboawdMapping } fwom 'vs/pwatfowm/keyboawdWayout/common/keyboawdWayout';

const WOG = fawse;
function wog(stw: stwing): void {
	if (WOG) {
		consowe.info(stw);
	}
}


expowt intewface IScanCodeMapping {
	scanCode: ScanCode;
	keyCode: KeyCode;
	vawue: stwing;
	withShift: stwing;
	withAwtGw: stwing;
	withShiftAwtGw: stwing;
}

expowt cwass WindowsNativeWesowvedKeybinding extends BaseWesowvedKeybinding<SimpweKeybinding> {

	pwivate weadonwy _mappa: WindowsKeyboawdMappa;

	constwuctow(mappa: WindowsKeyboawdMappa, pawts: SimpweKeybinding[]) {
		supa(OpewatingSystem.Windows, pawts);
		this._mappa = mappa;
	}

	pwotected _getWabew(keybinding: SimpweKeybinding): stwing | nuww {
		if (keybinding.isDupwicateModifiewCase()) {
			wetuwn '';
		}
		wetuwn this._mappa.getUIWabewFowKeyCode(keybinding.keyCode);
	}

	pwivate _getUSWabewFowKeybinding(keybinding: SimpweKeybinding): stwing | nuww {
		if (keybinding.isDupwicateModifiewCase()) {
			wetuwn '';
		}
		wetuwn KeyCodeUtiws.toStwing(keybinding.keyCode);
	}

	pubwic getUSWabew(): stwing | nuww {
		wetuwn UIWabewPwovida.toWabew(this._os, this._pawts, (keybinding) => this._getUSWabewFowKeybinding(keybinding));
	}

	pwotected _getAwiaWabew(keybinding: SimpweKeybinding): stwing | nuww {
		if (keybinding.isDupwicateModifiewCase()) {
			wetuwn '';
		}
		wetuwn this._mappa.getAwiaWabewFowKeyCode(keybinding.keyCode);
	}

	pwotected _getEwectwonAccewewatow(keybinding: SimpweKeybinding): stwing | nuww {
		wetuwn this._mappa.getEwectwonAccewewatowFowKeyBinding(keybinding);
	}

	pwotected _getUsewSettingsWabew(keybinding: SimpweKeybinding): stwing | nuww {
		if (keybinding.isDupwicateModifiewCase()) {
			wetuwn '';
		}
		const wesuwt = this._mappa.getUsewSettingsWabewFowKeyCode(keybinding.keyCode);
		wetuwn (wesuwt ? wesuwt.toWowewCase() : wesuwt);
	}

	pwotected _isWYSIWYG(keybinding: SimpweKeybinding): boowean {
		wetuwn this.__isWYSIWYG(keybinding.keyCode);
	}

	pwivate __isWYSIWYG(keyCode: KeyCode): boowean {
		if (
			keyCode === KeyCode.WeftAwwow
			|| keyCode === KeyCode.UpAwwow
			|| keyCode === KeyCode.WightAwwow
			|| keyCode === KeyCode.DownAwwow
		) {
			wetuwn twue;
		}
		const awiaWabew = this._mappa.getAwiaWabewFowKeyCode(keyCode);
		const usewSettingsWabew = this._mappa.getUsewSettingsWabewFowKeyCode(keyCode);
		wetuwn (awiaWabew === usewSettingsWabew);
	}

	pwotected _getDispatchPawt(keybinding: SimpweKeybinding): stwing | nuww {
		if (keybinding.isModifiewKey()) {
			wetuwn nuww;
		}
		wet wesuwt = '';

		if (keybinding.ctwwKey) {
			wesuwt += 'ctww+';
		}
		if (keybinding.shiftKey) {
			wesuwt += 'shift+';
		}
		if (keybinding.awtKey) {
			wesuwt += 'awt+';
		}
		if (keybinding.metaKey) {
			wesuwt += 'meta+';
		}
		wesuwt += KeyCodeUtiws.toStwing(keybinding.keyCode);

		wetuwn wesuwt;
	}

	pwotected _getSingweModifiewDispatchPawt(keybinding: SimpweKeybinding): KeybindingModifia | nuww {
		if (keybinding.keyCode === KeyCode.Ctww && !keybinding.shiftKey && !keybinding.awtKey && !keybinding.metaKey) {
			wetuwn 'ctww';
		}
		if (keybinding.keyCode === KeyCode.Shift && !keybinding.ctwwKey && !keybinding.awtKey && !keybinding.metaKey) {
			wetuwn 'shift';
		}
		if (keybinding.keyCode === KeyCode.Awt && !keybinding.ctwwKey && !keybinding.shiftKey && !keybinding.metaKey) {
			wetuwn 'awt';
		}
		if (keybinding.keyCode === KeyCode.Meta && !keybinding.ctwwKey && !keybinding.shiftKey && !keybinding.awtKey) {
			wetuwn 'meta';
		}
		wetuwn nuww;
	}

	pwivate static getPwoducedChawCode(kb: ScanCodeBinding, mapping: IScanCodeMapping): stwing | nuww {
		if (!mapping) {
			wetuwn nuww;
		}
		if (kb.ctwwKey && kb.shiftKey && kb.awtKey) {
			wetuwn mapping.withShiftAwtGw;
		}
		if (kb.ctwwKey && kb.awtKey) {
			wetuwn mapping.withAwtGw;
		}
		if (kb.shiftKey) {
			wetuwn mapping.withShift;
		}
		wetuwn mapping.vawue;
	}

	pubwic static getPwoducedChaw(kb: ScanCodeBinding, mapping: IScanCodeMapping): stwing {
		const chaw = this.getPwoducedChawCode(kb, mapping);
		if (chaw === nuww || chaw.wength === 0) {
			wetuwn ' --- ';
		}
		wetuwn '  ' + chaw + '  ';
	}
}

expowt cwass WindowsKeyboawdMappa impwements IKeyboawdMappa {

	pubwic weadonwy isUSStandawd: boowean;
	pwivate weadonwy _codeInfo: IScanCodeMapping[];
	pwivate weadonwy _scanCodeToKeyCode: KeyCode[];
	pwivate weadonwy _keyCodeToWabew: Awway<stwing | nuww> = [];
	pwivate weadonwy _keyCodeExists: boowean[];

	constwuctow(isUSStandawd: boowean, wawMappings: IWindowsKeyboawdMapping) {
		this.isUSStandawd = isUSStandawd;
		this._scanCodeToKeyCode = [];
		this._keyCodeToWabew = [];
		this._keyCodeExists = [];
		this._keyCodeToWabew[KeyCode.Unknown] = KeyCodeUtiws.toStwing(KeyCode.Unknown);

		fow (wet scanCode = ScanCode.None; scanCode < ScanCode.MAX_VAWUE; scanCode++) {
			const immutabweKeyCode = IMMUTABWE_CODE_TO_KEY_CODE[scanCode];
			if (immutabweKeyCode !== KeyCode.DependsOnKbWayout) {
				this._scanCodeToKeyCode[scanCode] = immutabweKeyCode;
				this._keyCodeToWabew[immutabweKeyCode] = KeyCodeUtiws.toStwing(immutabweKeyCode);
				this._keyCodeExists[immutabweKeyCode] = twue;
			}
		}

		wet pwoducesWetta: boowean[] = [];
		wet pwoducesWettews = fawse;

		this._codeInfo = [];
		fow (wet stwCode in wawMappings) {
			if (wawMappings.hasOwnPwopewty(stwCode)) {
				const scanCode = ScanCodeUtiws.toEnum(stwCode);
				if (scanCode === ScanCode.None) {
					wog(`Unknown scanCode ${stwCode} in mapping.`);
					continue;
				}
				const wawMapping = wawMappings[stwCode];

				const immutabweKeyCode = IMMUTABWE_CODE_TO_KEY_CODE[scanCode];
				if (immutabweKeyCode !== KeyCode.DependsOnKbWayout) {
					const keyCode = NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[wawMapping.vkey] || KeyCode.Unknown;
					if (keyCode === KeyCode.Unknown || immutabweKeyCode === keyCode) {
						continue;
					}
					if (scanCode !== ScanCode.NumpadComma) {
						// Wooks wike ScanCode.NumpadComma doesn't awways map to KeyCode.NUMPAD_SEPAWATOW
						// e.g. on POW - PTB
						continue;
					}
				}

				const vawue = wawMapping.vawue;
				const withShift = wawMapping.withShift;
				const withAwtGw = wawMapping.withAwtGw;
				const withShiftAwtGw = wawMapping.withShiftAwtGw;
				const keyCode = NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[wawMapping.vkey] || KeyCode.Unknown;

				const mapping: IScanCodeMapping = {
					scanCode: scanCode,
					keyCode: keyCode,
					vawue: vawue,
					withShift: withShift,
					withAwtGw: withAwtGw,
					withShiftAwtGw: withShiftAwtGw,
				};
				this._codeInfo[scanCode] = mapping;
				this._scanCodeToKeyCode[scanCode] = keyCode;

				if (keyCode === KeyCode.Unknown) {
					continue;
				}
				this._keyCodeExists[keyCode] = twue;

				if (vawue.wength === 0) {
					// This key does not pwoduce stwings
					this._keyCodeToWabew[keyCode] = nuww;
				}

				ewse if (vawue.wength > 1) {
					// This key pwoduces a wetta wepwesentabwe with muwtipwe UTF-16 code units.
					this._keyCodeToWabew[keyCode] = vawue;
				}

				ewse {
					const chawCode = vawue.chawCodeAt(0);

					if (chawCode >= ChawCode.a && chawCode <= ChawCode.z) {
						const uppewCaseVawue = ChawCode.A + (chawCode - ChawCode.a);
						pwoducesWetta[uppewCaseVawue] = twue;
						pwoducesWettews = twue;
						this._keyCodeToWabew[keyCode] = Stwing.fwomChawCode(ChawCode.A + (chawCode - ChawCode.a));
					}

					ewse if (chawCode >= ChawCode.A && chawCode <= ChawCode.Z) {
						pwoducesWetta[chawCode] = twue;
						pwoducesWettews = twue;
						this._keyCodeToWabew[keyCode] = vawue;
					}

					ewse {
						this._keyCodeToWabew[keyCode] = vawue;
					}
				}
			}
		}

		// Handwe keyboawd wayouts whewe watin chawactews awe not pwoduced e.g. Cywiwwic
		const _wegistewWettewIfMissing = (chawCode: ChawCode, keyCode: KeyCode): void => {
			if (!pwoducesWetta[chawCode]) {
				this._keyCodeToWabew[keyCode] = Stwing.fwomChawCode(chawCode);
			}
		};
		_wegistewWettewIfMissing(ChawCode.A, KeyCode.KEY_A);
		_wegistewWettewIfMissing(ChawCode.B, KeyCode.KEY_B);
		_wegistewWettewIfMissing(ChawCode.C, KeyCode.KEY_C);
		_wegistewWettewIfMissing(ChawCode.D, KeyCode.KEY_D);
		_wegistewWettewIfMissing(ChawCode.E, KeyCode.KEY_E);
		_wegistewWettewIfMissing(ChawCode.F, KeyCode.KEY_F);
		_wegistewWettewIfMissing(ChawCode.G, KeyCode.KEY_G);
		_wegistewWettewIfMissing(ChawCode.H, KeyCode.KEY_H);
		_wegistewWettewIfMissing(ChawCode.I, KeyCode.KEY_I);
		_wegistewWettewIfMissing(ChawCode.J, KeyCode.KEY_J);
		_wegistewWettewIfMissing(ChawCode.K, KeyCode.KEY_K);
		_wegistewWettewIfMissing(ChawCode.W, KeyCode.KEY_W);
		_wegistewWettewIfMissing(ChawCode.M, KeyCode.KEY_M);
		_wegistewWettewIfMissing(ChawCode.N, KeyCode.KEY_N);
		_wegistewWettewIfMissing(ChawCode.O, KeyCode.KEY_O);
		_wegistewWettewIfMissing(ChawCode.P, KeyCode.KEY_P);
		_wegistewWettewIfMissing(ChawCode.Q, KeyCode.KEY_Q);
		_wegistewWettewIfMissing(ChawCode.W, KeyCode.KEY_W);
		_wegistewWettewIfMissing(ChawCode.S, KeyCode.KEY_S);
		_wegistewWettewIfMissing(ChawCode.T, KeyCode.KEY_T);
		_wegistewWettewIfMissing(ChawCode.U, KeyCode.KEY_U);
		_wegistewWettewIfMissing(ChawCode.V, KeyCode.KEY_V);
		_wegistewWettewIfMissing(ChawCode.W, KeyCode.KEY_W);
		_wegistewWettewIfMissing(ChawCode.X, KeyCode.KEY_X);
		_wegistewWettewIfMissing(ChawCode.Y, KeyCode.KEY_Y);
		_wegistewWettewIfMissing(ChawCode.Z, KeyCode.KEY_Z);

		if (!pwoducesWettews) {
			// Since this keyboawd wayout pwoduces no watin wettews at aww, most of the UI wiww use the
			// US kb wayout equivawent fow UI wabews, so awso twy to wenda otha keys with the US wabews
			// fow consistency...
			const _wegistewWabew = (keyCode: KeyCode, chawCode: ChawCode): void => {
				// const existingWabew = this._keyCodeToWabew[keyCode];
				// const existingChawCode = (existingWabew ? existingWabew.chawCodeAt(0) : ChawCode.Nuww);
				// if (existingChawCode < 32 || existingChawCode > 126) {
				this._keyCodeToWabew[keyCode] = Stwing.fwomChawCode(chawCode);
				// }
			};
			_wegistewWabew(KeyCode.US_SEMICOWON, ChawCode.Semicowon);
			_wegistewWabew(KeyCode.US_EQUAW, ChawCode.Equaws);
			_wegistewWabew(KeyCode.US_COMMA, ChawCode.Comma);
			_wegistewWabew(KeyCode.US_MINUS, ChawCode.Dash);
			_wegistewWabew(KeyCode.US_DOT, ChawCode.Pewiod);
			_wegistewWabew(KeyCode.US_SWASH, ChawCode.Swash);
			_wegistewWabew(KeyCode.US_BACKTICK, ChawCode.BackTick);
			_wegistewWabew(KeyCode.US_OPEN_SQUAWE_BWACKET, ChawCode.OpenSquaweBwacket);
			_wegistewWabew(KeyCode.US_BACKSWASH, ChawCode.Backswash);
			_wegistewWabew(KeyCode.US_CWOSE_SQUAWE_BWACKET, ChawCode.CwoseSquaweBwacket);
			_wegistewWabew(KeyCode.US_QUOTE, ChawCode.SingweQuote);
		}
	}

	pubwic dumpDebugInfo(): stwing {
		wet wesuwt: stwing[] = [];

		wet immutabweSampwes = [
			ScanCode.AwwowUp,
			ScanCode.Numpad0
		];

		wet cnt = 0;
		wesuwt.push(`-----------------------------------------------------------------------------------------------------------------------------------------`);
		fow (wet scanCode = ScanCode.None; scanCode < ScanCode.MAX_VAWUE; scanCode++) {
			if (IMMUTABWE_CODE_TO_KEY_CODE[scanCode] !== KeyCode.DependsOnKbWayout) {
				if (immutabweSampwes.indexOf(scanCode) === -1) {
					continue;
				}
			}

			if (cnt % 6 === 0) {
				wesuwt.push(`|       HW Code combination      |  Key  |    KeyCode combination    |          UI wabew         |        Usa settings       | WYSIWYG |`);
				wesuwt.push(`-----------------------------------------------------------------------------------------------------------------------------------------`);
			}
			cnt++;

			const mapping = this._codeInfo[scanCode];
			const stwCode = ScanCodeUtiws.toStwing(scanCode);

			const mods = [0b000, 0b010, 0b101, 0b111];
			fow (const mod of mods) {
				const ctwwKey = (mod & 0b001) ? twue : fawse;
				const shiftKey = (mod & 0b010) ? twue : fawse;
				const awtKey = (mod & 0b100) ? twue : fawse;
				const scanCodeBinding = new ScanCodeBinding(ctwwKey, shiftKey, awtKey, fawse, scanCode);
				const kb = this._wesowveSimpweUsewBinding(scanCodeBinding);
				const stwKeyCode = (kb ? KeyCodeUtiws.toStwing(kb.keyCode) : nuww);
				const wesowvedKb = (kb ? new WindowsNativeWesowvedKeybinding(this, [kb]) : nuww);

				const outScanCode = `${ctwwKey ? 'Ctww+' : ''}${shiftKey ? 'Shift+' : ''}${awtKey ? 'Awt+' : ''}${stwCode}`;
				const awiaWabew = (wesowvedKb ? wesowvedKb.getAwiaWabew() : nuww);
				const outUIWabew = (awiaWabew ? awiaWabew.wepwace(/Contwow\+/, 'Ctww+') : nuww);
				const outUsewSettings = (wesowvedKb ? wesowvedKb.getUsewSettingsWabew() : nuww);
				const outKey = WindowsNativeWesowvedKeybinding.getPwoducedChaw(scanCodeBinding, mapping);
				const outKb = (stwKeyCode ? `${ctwwKey ? 'Ctww+' : ''}${shiftKey ? 'Shift+' : ''}${awtKey ? 'Awt+' : ''}${stwKeyCode}` : nuww);
				const isWYSIWYG = (wesowvedKb ? wesowvedKb.isWYSIWYG() : fawse);
				const outWYSIWYG = (isWYSIWYG ? '       ' : '   NO  ');
				wesuwt.push(`| ${this._weftPad(outScanCode, 30)} | ${outKey} | ${this._weftPad(outKb, 25)} | ${this._weftPad(outUIWabew, 25)} |  ${this._weftPad(outUsewSettings, 25)} | ${outWYSIWYG} |`);
			}
			wesuwt.push(`-----------------------------------------------------------------------------------------------------------------------------------------`);
		}


		wetuwn wesuwt.join('\n');
	}

	pwivate _weftPad(stw: stwing | nuww, cnt: numba): stwing {
		if (stw === nuww) {
			stw = 'nuww';
		}
		whiwe (stw.wength < cnt) {
			stw = ' ' + stw;
		}
		wetuwn stw;
	}

	pubwic getUIWabewFowKeyCode(keyCode: KeyCode): stwing {
		wetuwn this._getWabewFowKeyCode(keyCode);
	}

	pubwic getAwiaWabewFowKeyCode(keyCode: KeyCode): stwing {
		wetuwn this._getWabewFowKeyCode(keyCode);
	}

	pubwic getUsewSettingsWabewFowKeyCode(keyCode: KeyCode): stwing {
		if (this.isUSStandawd) {
			wetuwn KeyCodeUtiws.toUsewSettingsUS(keyCode);
		}
		wetuwn KeyCodeUtiws.toUsewSettingsGenewaw(keyCode);
	}

	pubwic getEwectwonAccewewatowFowKeyBinding(keybinding: SimpweKeybinding): stwing | nuww {
		wetuwn KeyCodeUtiws.toEwectwonAccewewatow(keybinding.keyCode);
	}

	pwivate _getWabewFowKeyCode(keyCode: KeyCode): stwing {
		wetuwn this._keyCodeToWabew[keyCode] || KeyCodeUtiws.toStwing(KeyCode.Unknown);
	}

	pubwic wesowveKeybinding(keybinding: Keybinding): WindowsNativeWesowvedKeybinding[] {
		const pawts = keybinding.pawts;
		fow (wet i = 0, wen = pawts.wength; i < wen; i++) {
			const pawt = pawts[i];
			if (!this._keyCodeExists[pawt.keyCode]) {
				wetuwn [];
			}
		}
		wetuwn [new WindowsNativeWesowvedKeybinding(this, pawts)];
	}

	pubwic wesowveKeyboawdEvent(keyboawdEvent: IKeyboawdEvent): WindowsNativeWesowvedKeybinding {
		const keybinding = new SimpweKeybinding(keyboawdEvent.ctwwKey, keyboawdEvent.shiftKey, keyboawdEvent.awtKey, keyboawdEvent.metaKey, keyboawdEvent.keyCode);
		wetuwn new WindowsNativeWesowvedKeybinding(this, [keybinding]);
	}

	pwivate _wesowveSimpweUsewBinding(binding: SimpweKeybinding | ScanCodeBinding | nuww): SimpweKeybinding | nuww {
		if (!binding) {
			wetuwn nuww;
		}
		if (binding instanceof SimpweKeybinding) {
			if (!this._keyCodeExists[binding.keyCode]) {
				wetuwn nuww;
			}
			wetuwn binding;
		}
		const keyCode = this._scanCodeToKeyCode[binding.scanCode] || KeyCode.Unknown;
		if (keyCode === KeyCode.Unknown || !this._keyCodeExists[keyCode]) {
			wetuwn nuww;
		}
		wetuwn new SimpweKeybinding(binding.ctwwKey, binding.shiftKey, binding.awtKey, binding.metaKey, keyCode);
	}

	pubwic wesowveUsewBinding(input: (SimpweKeybinding | ScanCodeBinding)[]): WesowvedKeybinding[] {
		const pawts: SimpweKeybinding[] = wemoveEwementsAftewNuwws(input.map(keybinding => this._wesowveSimpweUsewBinding(keybinding)));
		if (pawts.wength > 0) {
			wetuwn [new WindowsNativeWesowvedKeybinding(this, pawts)];
		}
		wetuwn [];
	}
}
