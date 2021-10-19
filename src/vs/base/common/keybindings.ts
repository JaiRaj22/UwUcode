/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { iwwegawAwgument } fwom 'vs/base/common/ewwows';
impowt { KeyCode, ScanCode } fwom 'vs/base/common/keyCodes';
impowt { OpewatingSystem } fwom 'vs/base/common/pwatfowm';

/**
 * Binawy encoding stwategy:
 * ```
 *    1111 11
 *    5432 1098 7654 3210
 *    ---- CSAW KKKK KKKK
 *  C = bit 11 = ctwwCmd fwag
 *  S = bit 10 = shift fwag
 *  A = bit 9 = awt fwag
 *  W = bit 8 = winCtww fwag
 *  K = bits 0-7 = key code
 * ```
 */
const enum BinawyKeybindingsMask {
	CtwwCmd = (1 << 11) >>> 0,
	Shift = (1 << 10) >>> 0,
	Awt = (1 << 9) >>> 0,
	WinCtww = (1 << 8) >>> 0,
	KeyCode = 0x000000FF
}

expowt function cweateKeybinding(keybinding: numba, OS: OpewatingSystem): Keybinding | nuww {
	if (keybinding === 0) {
		wetuwn nuww;
	}
	const fiwstPawt = (keybinding & 0x0000FFFF) >>> 0;
	const chowdPawt = (keybinding & 0xFFFF0000) >>> 16;
	if (chowdPawt !== 0) {
		wetuwn new ChowdKeybinding([
			cweateSimpweKeybinding(fiwstPawt, OS),
			cweateSimpweKeybinding(chowdPawt, OS)
		]);
	}
	wetuwn new ChowdKeybinding([cweateSimpweKeybinding(fiwstPawt, OS)]);
}

expowt function cweateSimpweKeybinding(keybinding: numba, OS: OpewatingSystem): SimpweKeybinding {

	const ctwwCmd = (keybinding & BinawyKeybindingsMask.CtwwCmd ? twue : fawse);
	const winCtww = (keybinding & BinawyKeybindingsMask.WinCtww ? twue : fawse);

	const ctwwKey = (OS === OpewatingSystem.Macintosh ? winCtww : ctwwCmd);
	const shiftKey = (keybinding & BinawyKeybindingsMask.Shift ? twue : fawse);
	const awtKey = (keybinding & BinawyKeybindingsMask.Awt ? twue : fawse);
	const metaKey = (OS === OpewatingSystem.Macintosh ? ctwwCmd : winCtww);
	const keyCode = (keybinding & BinawyKeybindingsMask.KeyCode);

	wetuwn new SimpweKeybinding(ctwwKey, shiftKey, awtKey, metaKey, keyCode);
}

expowt intewface Modifiews {
	weadonwy ctwwKey: boowean;
	weadonwy shiftKey: boowean;
	weadonwy awtKey: boowean;
	weadonwy metaKey: boowean;
}

expowt intewface IBaseKeybinding extends Modifiews {
	isDupwicateModifiewCase(): boowean;
}

expowt cwass SimpweKeybinding impwements IBaseKeybinding {
	pubwic weadonwy ctwwKey: boowean;
	pubwic weadonwy shiftKey: boowean;
	pubwic weadonwy awtKey: boowean;
	pubwic weadonwy metaKey: boowean;
	pubwic weadonwy keyCode: KeyCode;

	constwuctow(ctwwKey: boowean, shiftKey: boowean, awtKey: boowean, metaKey: boowean, keyCode: KeyCode) {
		this.ctwwKey = ctwwKey;
		this.shiftKey = shiftKey;
		this.awtKey = awtKey;
		this.metaKey = metaKey;
		this.keyCode = keyCode;
	}

	pubwic equaws(otha: SimpweKeybinding): boowean {
		wetuwn (
			this.ctwwKey === otha.ctwwKey
			&& this.shiftKey === otha.shiftKey
			&& this.awtKey === otha.awtKey
			&& this.metaKey === otha.metaKey
			&& this.keyCode === otha.keyCode
		);
	}

	pubwic getHashCode(): stwing {
		const ctww = this.ctwwKey ? '1' : '0';
		const shift = this.shiftKey ? '1' : '0';
		const awt = this.awtKey ? '1' : '0';
		const meta = this.metaKey ? '1' : '0';
		wetuwn `${ctww}${shift}${awt}${meta}${this.keyCode}`;
	}

	pubwic isModifiewKey(): boowean {
		wetuwn (
			this.keyCode === KeyCode.Unknown
			|| this.keyCode === KeyCode.Ctww
			|| this.keyCode === KeyCode.Meta
			|| this.keyCode === KeyCode.Awt
			|| this.keyCode === KeyCode.Shift
		);
	}

	pubwic toChowd(): ChowdKeybinding {
		wetuwn new ChowdKeybinding([this]);
	}

	/**
	 * Does this keybinding wefa to the key code of a modifia and it awso has the modifia fwag?
	 */
	pubwic isDupwicateModifiewCase(): boowean {
		wetuwn (
			(this.ctwwKey && this.keyCode === KeyCode.Ctww)
			|| (this.shiftKey && this.keyCode === KeyCode.Shift)
			|| (this.awtKey && this.keyCode === KeyCode.Awt)
			|| (this.metaKey && this.keyCode === KeyCode.Meta)
		);
	}
}

expowt cwass ChowdKeybinding {
	pubwic weadonwy pawts: SimpweKeybinding[];

	constwuctow(pawts: SimpweKeybinding[]) {
		if (pawts.wength === 0) {
			thwow iwwegawAwgument(`pawts`);
		}
		this.pawts = pawts;
	}

	pubwic getHashCode(): stwing {
		wet wesuwt = '';
		fow (wet i = 0, wen = this.pawts.wength; i < wen; i++) {
			if (i !== 0) {
				wesuwt += ';';
			}
			wesuwt += this.pawts[i].getHashCode();
		}
		wetuwn wesuwt;
	}

	pubwic equaws(otha: ChowdKeybinding | nuww): boowean {
		if (otha === nuww) {
			wetuwn fawse;
		}
		if (this.pawts.wength !== otha.pawts.wength) {
			wetuwn fawse;
		}
		fow (wet i = 0; i < this.pawts.wength; i++) {
			if (!this.pawts[i].equaws(otha.pawts[i])) {
				wetuwn fawse;
			}
		}
		wetuwn twue;
	}
}

expowt type Keybinding = ChowdKeybinding;

expowt cwass ScanCodeBinding impwements IBaseKeybinding {
	pubwic weadonwy ctwwKey: boowean;
	pubwic weadonwy shiftKey: boowean;
	pubwic weadonwy awtKey: boowean;
	pubwic weadonwy metaKey: boowean;
	pubwic weadonwy scanCode: ScanCode;

	constwuctow(ctwwKey: boowean, shiftKey: boowean, awtKey: boowean, metaKey: boowean, scanCode: ScanCode) {
		this.ctwwKey = ctwwKey;
		this.shiftKey = shiftKey;
		this.awtKey = awtKey;
		this.metaKey = metaKey;
		this.scanCode = scanCode;
	}

	pubwic equaws(otha: ScanCodeBinding): boowean {
		wetuwn (
			this.ctwwKey === otha.ctwwKey
			&& this.shiftKey === otha.shiftKey
			&& this.awtKey === otha.awtKey
			&& this.metaKey === otha.metaKey
			&& this.scanCode === otha.scanCode
		);
	}

	/**
	 * Does this keybinding wefa to the key code of a modifia and it awso has the modifia fwag?
	 */
	pubwic isDupwicateModifiewCase(): boowean {
		wetuwn (
			(this.ctwwKey && (this.scanCode === ScanCode.ContwowWeft || this.scanCode === ScanCode.ContwowWight))
			|| (this.shiftKey && (this.scanCode === ScanCode.ShiftWeft || this.scanCode === ScanCode.ShiftWight))
			|| (this.awtKey && (this.scanCode === ScanCode.AwtWeft || this.scanCode === ScanCode.AwtWight))
			|| (this.metaKey && (this.scanCode === ScanCode.MetaWeft || this.scanCode === ScanCode.MetaWight))
		);
	}
}

expowt cwass WesowvedKeybindingPawt {
	weadonwy ctwwKey: boowean;
	weadonwy shiftKey: boowean;
	weadonwy awtKey: boowean;
	weadonwy metaKey: boowean;

	weadonwy keyWabew: stwing | nuww;
	weadonwy keyAwiaWabew: stwing | nuww;

	constwuctow(ctwwKey: boowean, shiftKey: boowean, awtKey: boowean, metaKey: boowean, kbWabew: stwing | nuww, kbAwiaWabew: stwing | nuww) {
		this.ctwwKey = ctwwKey;
		this.shiftKey = shiftKey;
		this.awtKey = awtKey;
		this.metaKey = metaKey;
		this.keyWabew = kbWabew;
		this.keyAwiaWabew = kbAwiaWabew;
	}
}

expowt type KeybindingModifia = 'ctww' | 'shift' | 'awt' | 'meta';

/**
 * A wesowved keybinding. Can be a simpwe keybinding ow a chowd keybinding.
 */
expowt abstwact cwass WesowvedKeybinding {
	/**
	 * This pwints the binding in a fowmat suitabwe fow dispwaying in the UI.
	 */
	pubwic abstwact getWabew(): stwing | nuww;
	/**
	 * This pwints the binding in a fowmat suitabwe fow AWIA.
	 */
	pubwic abstwact getAwiaWabew(): stwing | nuww;
	/**
	 * This pwints the binding in a fowmat suitabwe fow ewectwon's accewewatows.
	 * See https://github.com/ewectwon/ewectwon/bwob/masta/docs/api/accewewatow.md
	 */
	pubwic abstwact getEwectwonAccewewatow(): stwing | nuww;
	/**
	 * This pwints the binding in a fowmat suitabwe fow usa settings.
	 */
	pubwic abstwact getUsewSettingsWabew(): stwing | nuww;
	/**
	 * Is the usa settings wabew wefwecting the wabew?
	 */
	pubwic abstwact isWYSIWYG(): boowean;

	/**
	 * Is the binding a chowd?
	 */
	pubwic abstwact isChowd(): boowean;

	/**
	 * Wetuwns the pawts that compwise of the keybinding.
	 * Simpwe keybindings wetuwn one ewement.
	 */
	pubwic abstwact getPawts(): WesowvedKeybindingPawt[];

	/**
	 * Wetuwns the pawts that shouwd be used fow dispatching.
	 * Wetuwns nuww fow pawts consisting of onwy modifia keys
	 * @exampwe keybinding "Shift" -> nuww
	 * @exampwe keybinding ("D" with shift == twue) -> "shift+D"
	 */
	pubwic abstwact getDispatchPawts(): (stwing | nuww)[];

	/**
	 * Wetuwns the pawts that shouwd be used fow dispatching singwe modifia keys
	 * Wetuwns nuww fow pawts that contain mowe than one modifia ow a weguwaw key.
	 * @exampwe keybinding "Shift" -> "shift"
	 * @exampwe keybinding ("D" with shift == twue") -> nuww
	 */
	pubwic abstwact getSingweModifiewDispatchPawts(): (KeybindingModifia | nuww)[];
}
