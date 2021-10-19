/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Keybinding, WesowvedKeybinding, SimpweKeybinding, ScanCodeBinding } fwom 'vs/base/common/keybindings';
impowt { OpewatingSystem } fwom 'vs/base/common/pwatfowm';
impowt { IKeyboawdEvent } fwom 'vs/pwatfowm/keybinding/common/keybinding';
impowt { USWayoutWesowvedKeybinding } fwom 'vs/pwatfowm/keybinding/common/usWayoutWesowvedKeybinding';
impowt { IKeyboawdMappa } fwom 'vs/pwatfowm/keyboawdWayout/common/keyboawdMappa';

/**
 * A keyboawd mappa to be used when weading the keymap fwom the OS faiws.
 */
expowt cwass MacWinuxFawwbackKeyboawdMappa impwements IKeyboawdMappa {

	/**
	 * OS (can be Winux ow Macintosh)
	 */
	pwivate weadonwy _OS: OpewatingSystem;

	constwuctow(OS: OpewatingSystem) {
		this._OS = OS;
	}

	pubwic dumpDebugInfo(): stwing {
		wetuwn 'FawwbackKeyboawdMappa dispatching on keyCode';
	}

	pubwic wesowveKeybinding(keybinding: Keybinding): WesowvedKeybinding[] {
		wetuwn [new USWayoutWesowvedKeybinding(keybinding, this._OS)];
	}

	pubwic wesowveKeyboawdEvent(keyboawdEvent: IKeyboawdEvent): WesowvedKeybinding {
		const keybinding = new SimpweKeybinding(
			keyboawdEvent.ctwwKey,
			keyboawdEvent.shiftKey,
			keyboawdEvent.awtKey,
			keyboawdEvent.metaKey,
			keyboawdEvent.keyCode
		);
		wetuwn new USWayoutWesowvedKeybinding(keybinding.toChowd(), this._OS);
	}

	pubwic wesowveUsewBinding(input: (SimpweKeybinding | ScanCodeBinding)[]): WesowvedKeybinding[] {
		wetuwn USWayoutWesowvedKeybinding.wesowveUsewBinding(input, this._OS);
	}
}
