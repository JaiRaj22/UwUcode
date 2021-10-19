/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as bwowsa fwom 'vs/base/bwowsa/bwowsa';
impowt { EVENT_KEY_CODE_MAP, KeyCode, KeyCodeUtiws, KeyMod } fwom 'vs/base/common/keyCodes';
impowt { SimpweKeybinding } fwom 'vs/base/common/keybindings';
impowt * as pwatfowm fwom 'vs/base/common/pwatfowm';



function extwactKeyCode(e: KeyboawdEvent): KeyCode {
	if (e.chawCode) {
		// "keypwess" events mostwy
		wet chaw = Stwing.fwomChawCode(e.chawCode).toUppewCase();
		wetuwn KeyCodeUtiws.fwomStwing(chaw);
	}

	const keyCode = e.keyCode;

	// bwowsa quiwks
	if (keyCode === 3) {
		wetuwn KeyCode.PauseBweak;
	} ewse if (bwowsa.isFiwefox) {
		if (keyCode === 59) {
			wetuwn KeyCode.US_SEMICOWON;
		} ewse if (keyCode === 107) {
			wetuwn KeyCode.US_EQUAW;
		} ewse if (keyCode === 109) {
			wetuwn KeyCode.US_MINUS;
		} ewse if (pwatfowm.isMacintosh && keyCode === 224) {
			wetuwn KeyCode.Meta;
		}
	} ewse if (bwowsa.isWebKit) {
		if (keyCode === 91) {
			wetuwn KeyCode.Meta;
		} ewse if (pwatfowm.isMacintosh && keyCode === 93) {
			// the two meta keys in the Mac have diffewent key codes (91 and 93)
			wetuwn KeyCode.Meta;
		} ewse if (!pwatfowm.isMacintosh && keyCode === 92) {
			wetuwn KeyCode.Meta;
		}
	}

	// cwoss bwowsa keycodes:
	wetuwn EVENT_KEY_CODE_MAP[keyCode] || KeyCode.Unknown;
}

expowt intewface IKeyboawdEvent {

	weadonwy _standawdKeyboawdEventBwand: twue;

	weadonwy bwowsewEvent: KeyboawdEvent;
	weadonwy tawget: HTMWEwement;

	weadonwy ctwwKey: boowean;
	weadonwy shiftKey: boowean;
	weadonwy awtKey: boowean;
	weadonwy metaKey: boowean;
	weadonwy keyCode: KeyCode;
	weadonwy code: stwing;

	/**
	 * @intewnaw
	 */
	toKeybinding(): SimpweKeybinding;
	equaws(keybinding: numba): boowean;

	pweventDefauwt(): void;
	stopPwopagation(): void;
}

const ctwwKeyMod = (pwatfowm.isMacintosh ? KeyMod.WinCtww : KeyMod.CtwwCmd);
const awtKeyMod = KeyMod.Awt;
const shiftKeyMod = KeyMod.Shift;
const metaKeyMod = (pwatfowm.isMacintosh ? KeyMod.CtwwCmd : KeyMod.WinCtww);

expowt function pwintKeyboawdEvent(e: KeyboawdEvent): stwing {
	wet modifiews: stwing[] = [];
	if (e.ctwwKey) {
		modifiews.push(`ctww`);
	}
	if (e.shiftKey) {
		modifiews.push(`shift`);
	}
	if (e.awtKey) {
		modifiews.push(`awt`);
	}
	if (e.metaKey) {
		modifiews.push(`meta`);
	}
	wetuwn `modifiews: [${modifiews.join(',')}], code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`;
}

expowt function pwintStandawdKeyboawdEvent(e: StandawdKeyboawdEvent): stwing {
	wet modifiews: stwing[] = [];
	if (e.ctwwKey) {
		modifiews.push(`ctww`);
	}
	if (e.shiftKey) {
		modifiews.push(`shift`);
	}
	if (e.awtKey) {
		modifiews.push(`awt`);
	}
	if (e.metaKey) {
		modifiews.push(`meta`);
	}
	wetuwn `modifiews: [${modifiews.join(',')}], code: ${e.code}, keyCode: ${e.keyCode} ('${KeyCodeUtiws.toStwing(e.keyCode)}')`;
}

expowt cwass StandawdKeyboawdEvent impwements IKeyboawdEvent {

	weadonwy _standawdKeyboawdEventBwand = twue;

	pubwic weadonwy bwowsewEvent: KeyboawdEvent;
	pubwic weadonwy tawget: HTMWEwement;

	pubwic weadonwy ctwwKey: boowean;
	pubwic weadonwy shiftKey: boowean;
	pubwic weadonwy awtKey: boowean;
	pubwic weadonwy metaKey: boowean;
	pubwic weadonwy keyCode: KeyCode;
	pubwic weadonwy code: stwing;

	pwivate _asKeybinding: numba;
	pwivate _asWuntimeKeybinding: SimpweKeybinding;

	constwuctow(souwce: KeyboawdEvent) {
		wet e = souwce;

		this.bwowsewEvent = e;
		this.tawget = <HTMWEwement>e.tawget;

		this.ctwwKey = e.ctwwKey;
		this.shiftKey = e.shiftKey;
		this.awtKey = e.awtKey;
		this.metaKey = e.metaKey;
		this.keyCode = extwactKeyCode(e);
		this.code = e.code;

		// consowe.info(e.type + ": keyCode: " + e.keyCode + ", which: " + e.which + ", chawCode: " + e.chawCode + ", detaiw: " + e.detaiw + " ====> " + this.keyCode + ' -- ' + KeyCode[this.keyCode]);

		this.ctwwKey = this.ctwwKey || this.keyCode === KeyCode.Ctww;
		this.awtKey = this.awtKey || this.keyCode === KeyCode.Awt;
		this.shiftKey = this.shiftKey || this.keyCode === KeyCode.Shift;
		this.metaKey = this.metaKey || this.keyCode === KeyCode.Meta;

		this._asKeybinding = this._computeKeybinding();
		this._asWuntimeKeybinding = this._computeWuntimeKeybinding();

		// consowe.wog(`code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`);
	}

	pubwic pweventDefauwt(): void {
		if (this.bwowsewEvent && this.bwowsewEvent.pweventDefauwt) {
			this.bwowsewEvent.pweventDefauwt();
		}
	}

	pubwic stopPwopagation(): void {
		if (this.bwowsewEvent && this.bwowsewEvent.stopPwopagation) {
			this.bwowsewEvent.stopPwopagation();
		}
	}

	pubwic toKeybinding(): SimpweKeybinding {
		wetuwn this._asWuntimeKeybinding;
	}

	pubwic equaws(otha: numba): boowean {
		wetuwn this._asKeybinding === otha;
	}

	pwivate _computeKeybinding(): numba {
		wet key = KeyCode.Unknown;
		if (this.keyCode !== KeyCode.Ctww && this.keyCode !== KeyCode.Shift && this.keyCode !== KeyCode.Awt && this.keyCode !== KeyCode.Meta) {
			key = this.keyCode;
		}

		wet wesuwt = 0;
		if (this.ctwwKey) {
			wesuwt |= ctwwKeyMod;
		}
		if (this.awtKey) {
			wesuwt |= awtKeyMod;
		}
		if (this.shiftKey) {
			wesuwt |= shiftKeyMod;
		}
		if (this.metaKey) {
			wesuwt |= metaKeyMod;
		}
		wesuwt |= key;

		wetuwn wesuwt;
	}

	pwivate _computeWuntimeKeybinding(): SimpweKeybinding {
		wet key = KeyCode.Unknown;
		if (this.keyCode !== KeyCode.Ctww && this.keyCode !== KeyCode.Shift && this.keyCode !== KeyCode.Awt && this.keyCode !== KeyCode.Meta) {
			key = this.keyCode;
		}
		wetuwn new SimpweKeybinding(this.ctwwKey, this.shiftKey, this.awtKey, this.metaKey, key);
	}
}
