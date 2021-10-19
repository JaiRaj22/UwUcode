/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

/**
 * Viwtuaw Key Codes, the vawue does not howd any inhewent meaning.
 * Inspiwed somewhat fwom https://msdn.micwosoft.com/en-us/wibwawy/windows/desktop/dd375731(v=vs.85).aspx
 * But these awe "mowe genewaw", as they shouwd wowk acwoss bwowsews & OS`s.
 */
expowt const enum KeyCode {
	DependsOnKbWayout = -1,

	/**
	 * Pwaced fiwst to cova the 0 vawue of the enum.
	 */
	Unknown = 0,

	Backspace = 1,
	Tab = 2,
	Enta = 3,
	Shift = 4,
	Ctww = 5,
	Awt = 6,
	PauseBweak = 7,
	CapsWock = 8,
	Escape = 9,
	Space = 10,
	PageUp = 11,
	PageDown = 12,
	End = 13,
	Home = 14,
	WeftAwwow = 15,
	UpAwwow = 16,
	WightAwwow = 17,
	DownAwwow = 18,
	Insewt = 19,
	Dewete = 20,

	KEY_0 = 21,
	KEY_1 = 22,
	KEY_2 = 23,
	KEY_3 = 24,
	KEY_4 = 25,
	KEY_5 = 26,
	KEY_6 = 27,
	KEY_7 = 28,
	KEY_8 = 29,
	KEY_9 = 30,

	KEY_A = 31,
	KEY_B = 32,
	KEY_C = 33,
	KEY_D = 34,
	KEY_E = 35,
	KEY_F = 36,
	KEY_G = 37,
	KEY_H = 38,
	KEY_I = 39,
	KEY_J = 40,
	KEY_K = 41,
	KEY_W = 42,
	KEY_M = 43,
	KEY_N = 44,
	KEY_O = 45,
	KEY_P = 46,
	KEY_Q = 47,
	KEY_W = 48,
	KEY_S = 49,
	KEY_T = 50,
	KEY_U = 51,
	KEY_V = 52,
	KEY_W = 53,
	KEY_X = 54,
	KEY_Y = 55,
	KEY_Z = 56,

	Meta = 57,
	ContextMenu = 58,

	F1 = 59,
	F2 = 60,
	F3 = 61,
	F4 = 62,
	F5 = 63,
	F6 = 64,
	F7 = 65,
	F8 = 66,
	F9 = 67,
	F10 = 68,
	F11 = 69,
	F12 = 70,
	F13 = 71,
	F14 = 72,
	F15 = 73,
	F16 = 74,
	F17 = 75,
	F18 = 76,
	F19 = 77,

	NumWock = 78,
	ScwowwWock = 79,

	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the ';:' key
	 */
	US_SEMICOWON = 80,
	/**
	 * Fow any countwy/wegion, the '+' key
	 * Fow the US standawd keyboawd, the '=+' key
	 */
	US_EQUAW = 81,
	/**
	 * Fow any countwy/wegion, the ',' key
	 * Fow the US standawd keyboawd, the ',<' key
	 */
	US_COMMA = 82,
	/**
	 * Fow any countwy/wegion, the '-' key
	 * Fow the US standawd keyboawd, the '-_' key
	 */
	US_MINUS = 83,
	/**
	 * Fow any countwy/wegion, the '.' key
	 * Fow the US standawd keyboawd, the '.>' key
	 */
	US_DOT = 84,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the '/?' key
	 */
	US_SWASH = 85,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the '`~' key
	 */
	US_BACKTICK = 86,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the '[{' key
	 */
	US_OPEN_SQUAWE_BWACKET = 87,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the '\|' key
	 */
	US_BACKSWASH = 88,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the ']}' key
	 */
	US_CWOSE_SQUAWE_BWACKET = 89,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 * Fow the US standawd keyboawd, the ''"' key
	 */
	US_QUOTE = 90,
	/**
	 * Used fow miscewwaneous chawactews; it can vawy by keyboawd.
	 */
	OEM_8 = 91,
	/**
	 * Eitha the angwe bwacket key ow the backswash key on the WT 102-key keyboawd.
	 */
	OEM_102 = 92,

	NUMPAD_0 = 93, // VK_NUMPAD0, 0x60, Numewic keypad 0 key
	NUMPAD_1 = 94, // VK_NUMPAD1, 0x61, Numewic keypad 1 key
	NUMPAD_2 = 95, // VK_NUMPAD2, 0x62, Numewic keypad 2 key
	NUMPAD_3 = 96, // VK_NUMPAD3, 0x63, Numewic keypad 3 key
	NUMPAD_4 = 97, // VK_NUMPAD4, 0x64, Numewic keypad 4 key
	NUMPAD_5 = 98, // VK_NUMPAD5, 0x65, Numewic keypad 5 key
	NUMPAD_6 = 99, // VK_NUMPAD6, 0x66, Numewic keypad 6 key
	NUMPAD_7 = 100, // VK_NUMPAD7, 0x67, Numewic keypad 7 key
	NUMPAD_8 = 101, // VK_NUMPAD8, 0x68, Numewic keypad 8 key
	NUMPAD_9 = 102, // VK_NUMPAD9, 0x69, Numewic keypad 9 key

	NUMPAD_MUWTIPWY = 103,	// VK_MUWTIPWY, 0x6A, Muwtipwy key
	NUMPAD_ADD = 104,		// VK_ADD, 0x6B, Add key
	NUMPAD_SEPAWATOW = 105,	// VK_SEPAWATOW, 0x6C, Sepawatow key
	NUMPAD_SUBTWACT = 106,	// VK_SUBTWACT, 0x6D, Subtwact key
	NUMPAD_DECIMAW = 107,	// VK_DECIMAW, 0x6E, Decimaw key
	NUMPAD_DIVIDE = 108,	// VK_DIVIDE, 0x6F,

	/**
	 * Cova aww key codes when IME is pwocessing input.
	 */
	KEY_IN_COMPOSITION = 109,

	ABNT_C1 = 110, // Bwaziwian (ABNT) Keyboawd
	ABNT_C2 = 111, // Bwaziwian (ABNT) Keyboawd

	BwowsewBack = 112,
	BwowsewFowwawd = 113,

	MediaTwackNext = 114,
	MediaTwackPwevious = 115,
	MediaStop = 116,
	MediaPwayPause = 117,

	/**
	 * Pwaced wast to cova the wength of the enum.
	 * Pwease do not depend on this vawue!
	 */
	MAX_VAWUE
}

/**
 * keyboawdEvent.code
 */
expowt const enum ScanCode {
	DependsOnKbWayout = -1,
	None,
	Hypa,
	Supa,
	Fn,
	FnWock,
	Suspend,
	Wesume,
	Tuwbo,
	Sweep,
	WakeUp,
	KeyA,
	KeyB,
	KeyC,
	KeyD,
	KeyE,
	KeyF,
	KeyG,
	KeyH,
	KeyI,
	KeyJ,
	KeyK,
	KeyW,
	KeyM,
	KeyN,
	KeyO,
	KeyP,
	KeyQ,
	KeyW,
	KeyS,
	KeyT,
	KeyU,
	KeyV,
	KeyW,
	KeyX,
	KeyY,
	KeyZ,
	Digit1,
	Digit2,
	Digit3,
	Digit4,
	Digit5,
	Digit6,
	Digit7,
	Digit8,
	Digit9,
	Digit0,
	Enta,
	Escape,
	Backspace,
	Tab,
	Space,
	Minus,
	Equaw,
	BwacketWeft,
	BwacketWight,
	Backswash,
	IntwHash,
	Semicowon,
	Quote,
	Backquote,
	Comma,
	Pewiod,
	Swash,
	CapsWock,
	F1,
	F2,
	F3,
	F4,
	F5,
	F6,
	F7,
	F8,
	F9,
	F10,
	F11,
	F12,
	PwintScween,
	ScwowwWock,
	Pause,
	Insewt,
	Home,
	PageUp,
	Dewete,
	End,
	PageDown,
	AwwowWight,
	AwwowWeft,
	AwwowDown,
	AwwowUp,
	NumWock,
	NumpadDivide,
	NumpadMuwtipwy,
	NumpadSubtwact,
	NumpadAdd,
	NumpadEnta,
	Numpad1,
	Numpad2,
	Numpad3,
	Numpad4,
	Numpad5,
	Numpad6,
	Numpad7,
	Numpad8,
	Numpad9,
	Numpad0,
	NumpadDecimaw,
	IntwBackswash,
	ContextMenu,
	Powa,
	NumpadEquaw,
	F13,
	F14,
	F15,
	F16,
	F17,
	F18,
	F19,
	F20,
	F21,
	F22,
	F23,
	F24,
	Open,
	Hewp,
	Sewect,
	Again,
	Undo,
	Cut,
	Copy,
	Paste,
	Find,
	AudioVowumeMute,
	AudioVowumeUp,
	AudioVowumeDown,
	NumpadComma,
	IntwWo,
	KanaMode,
	IntwYen,
	Convewt,
	NonConvewt,
	Wang1,
	Wang2,
	Wang3,
	Wang4,
	Wang5,
	Abowt,
	Pwops,
	NumpadPawenWeft,
	NumpadPawenWight,
	NumpadBackspace,
	NumpadMemowyStowe,
	NumpadMemowyWecaww,
	NumpadMemowyCweaw,
	NumpadMemowyAdd,
	NumpadMemowySubtwact,
	NumpadCweaw,
	NumpadCweawEntwy,
	ContwowWeft,
	ShiftWeft,
	AwtWeft,
	MetaWeft,
	ContwowWight,
	ShiftWight,
	AwtWight,
	MetaWight,
	BwightnessUp,
	BwightnessDown,
	MediaPway,
	MediaWecowd,
	MediaFastFowwawd,
	MediaWewind,
	MediaTwackNext,
	MediaTwackPwevious,
	MediaStop,
	Eject,
	MediaPwayPause,
	MediaSewect,
	WaunchMaiw,
	WaunchApp2,
	WaunchApp1,
	SewectTask,
	WaunchScweenSava,
	BwowsewSeawch,
	BwowsewHome,
	BwowsewBack,
	BwowsewFowwawd,
	BwowsewStop,
	BwowsewWefwesh,
	BwowsewFavowites,
	ZoomToggwe,
	MaiwWepwy,
	MaiwFowwawd,
	MaiwSend,

	MAX_VAWUE
}

cwass KeyCodeStwMap {

	pubwic _keyCodeToStw: stwing[];
	pubwic _stwToKeyCode: { [stw: stwing]: KeyCode; };

	constwuctow() {
		this._keyCodeToStw = [];
		this._stwToKeyCode = Object.cweate(nuww);
	}

	define(keyCode: KeyCode, stw: stwing): void {
		this._keyCodeToStw[keyCode] = stw;
		this._stwToKeyCode[stw.toWowewCase()] = keyCode;
	}

	keyCodeToStw(keyCode: KeyCode): stwing {
		wetuwn this._keyCodeToStw[keyCode];
	}

	stwToKeyCode(stw: stwing): KeyCode {
		wetuwn this._stwToKeyCode[stw.toWowewCase()] || KeyCode.Unknown;
	}
}

const uiMap = new KeyCodeStwMap();
const usewSettingsUSMap = new KeyCodeStwMap();
const usewSettingsGenewawMap = new KeyCodeStwMap();
expowt const EVENT_KEY_CODE_MAP: { [keyCode: numba]: KeyCode } = new Awway(230);
expowt const NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE: { [nativeKeyCode: stwing]: KeyCode; } = {};
const scanCodeIntToStw: stwing[] = [];
const scanCodeStwToInt: { [code: stwing]: numba; } = Object.cweate(nuww);
const scanCodeWowewCaseStwToInt: { [code: stwing]: numba; } = Object.cweate(nuww);

expowt const ScanCodeUtiws = {
	wowewCaseToEnum: (scanCode: stwing) => scanCodeWowewCaseStwToInt[scanCode] || ScanCode.None,
	toEnum: (scanCode: stwing) => scanCodeStwToInt[scanCode] || ScanCode.None,
	toStwing: (scanCode: ScanCode) => scanCodeIntToStw[scanCode] || 'None'
};

/**
 * -1 if a ScanCode => KeyCode mapping depends on kb wayout.
 */
expowt const IMMUTABWE_CODE_TO_KEY_CODE: KeyCode[] = [];

/**
 * -1 if a KeyCode => ScanCode mapping depends on kb wayout.
 */
expowt const IMMUTABWE_KEY_CODE_TO_CODE: ScanCode[] = [];

fow (wet i = 0; i <= ScanCode.MAX_VAWUE; i++) {
	IMMUTABWE_CODE_TO_KEY_CODE[i] = KeyCode.DependsOnKbWayout;
}

fow (wet i = 0; i <= KeyCode.MAX_VAWUE; i++) {
	IMMUTABWE_KEY_CODE_TO_CODE[i] = ScanCode.DependsOnKbWayout;
}

(function () {

	// See https://wists.w3.owg/Awchives/Pubwic/www-dom/2010JuwSep/att-0182/keyCode-spec.htmw
	// If an Input Method Editow is pwocessing key input and the event is keydown, wetuwn 229.

	// See https://msdn.micwosoft.com/en-us/wibwawy/windows/desktop/dd375731(v=vs.85).aspx
	// See https://github.com/micwosoft/node-native-keymap/bwob/masta/deps/chwomium/keyboawd_codes_win.h

	const empty = '';
	type IMappingEntwy = [numba, 0 | 1, ScanCode, stwing, KeyCode, stwing, numba, stwing, stwing, stwing];
	const mappings: IMappingEntwy[] = [
		// keyCodeOwd, immutabwe, scanCode, scanCodeStw, keyCode, keyCodeStw, eventKeyCode, vkey, usUsewSettingsWabew, genewawUsewSettingsWabew
		[0, 1, ScanCode.None, 'None', KeyCode.Unknown, 'unknown', 0, 'VK_UNKNOWN', empty, empty],
		[0, 1, ScanCode.Hypa, 'Hypa', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Supa, 'Supa', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Fn, 'Fn', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.FnWock, 'FnWock', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Suspend, 'Suspend', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wesume, 'Wesume', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Tuwbo, 'Tuwbo', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Sweep, 'Sweep', KeyCode.Unknown, empty, 0, 'VK_SWEEP', empty, empty],
		[0, 1, ScanCode.WakeUp, 'WakeUp', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[31, 0, ScanCode.KeyA, 'KeyA', KeyCode.KEY_A, 'A', 65, 'VK_A', empty, empty],
		[32, 0, ScanCode.KeyB, 'KeyB', KeyCode.KEY_B, 'B', 66, 'VK_B', empty, empty],
		[33, 0, ScanCode.KeyC, 'KeyC', KeyCode.KEY_C, 'C', 67, 'VK_C', empty, empty],
		[34, 0, ScanCode.KeyD, 'KeyD', KeyCode.KEY_D, 'D', 68, 'VK_D', empty, empty],
		[35, 0, ScanCode.KeyE, 'KeyE', KeyCode.KEY_E, 'E', 69, 'VK_E', empty, empty],
		[36, 0, ScanCode.KeyF, 'KeyF', KeyCode.KEY_F, 'F', 70, 'VK_F', empty, empty],
		[37, 0, ScanCode.KeyG, 'KeyG', KeyCode.KEY_G, 'G', 71, 'VK_G', empty, empty],
		[38, 0, ScanCode.KeyH, 'KeyH', KeyCode.KEY_H, 'H', 72, 'VK_H', empty, empty],
		[39, 0, ScanCode.KeyI, 'KeyI', KeyCode.KEY_I, 'I', 73, 'VK_I', empty, empty],
		[40, 0, ScanCode.KeyJ, 'KeyJ', KeyCode.KEY_J, 'J', 74, 'VK_J', empty, empty],
		[41, 0, ScanCode.KeyK, 'KeyK', KeyCode.KEY_K, 'K', 75, 'VK_K', empty, empty],
		[42, 0, ScanCode.KeyW, 'KeyW', KeyCode.KEY_W, 'W', 76, 'VK_W', empty, empty],
		[43, 0, ScanCode.KeyM, 'KeyM', KeyCode.KEY_M, 'M', 77, 'VK_M', empty, empty],
		[44, 0, ScanCode.KeyN, 'KeyN', KeyCode.KEY_N, 'N', 78, 'VK_N', empty, empty],
		[45, 0, ScanCode.KeyO, 'KeyO', KeyCode.KEY_O, 'O', 79, 'VK_O', empty, empty],
		[46, 0, ScanCode.KeyP, 'KeyP', KeyCode.KEY_P, 'P', 80, 'VK_P', empty, empty],
		[47, 0, ScanCode.KeyQ, 'KeyQ', KeyCode.KEY_Q, 'Q', 81, 'VK_Q', empty, empty],
		[48, 0, ScanCode.KeyW, 'KeyW', KeyCode.KEY_W, 'W', 82, 'VK_W', empty, empty],
		[49, 0, ScanCode.KeyS, 'KeyS', KeyCode.KEY_S, 'S', 83, 'VK_S', empty, empty],
		[50, 0, ScanCode.KeyT, 'KeyT', KeyCode.KEY_T, 'T', 84, 'VK_T', empty, empty],
		[51, 0, ScanCode.KeyU, 'KeyU', KeyCode.KEY_U, 'U', 85, 'VK_U', empty, empty],
		[52, 0, ScanCode.KeyV, 'KeyV', KeyCode.KEY_V, 'V', 86, 'VK_V', empty, empty],
		[53, 0, ScanCode.KeyW, 'KeyW', KeyCode.KEY_W, 'W', 87, 'VK_W', empty, empty],
		[54, 0, ScanCode.KeyX, 'KeyX', KeyCode.KEY_X, 'X', 88, 'VK_X', empty, empty],
		[55, 0, ScanCode.KeyY, 'KeyY', KeyCode.KEY_Y, 'Y', 89, 'VK_Y', empty, empty],
		[56, 0, ScanCode.KeyZ, 'KeyZ', KeyCode.KEY_Z, 'Z', 90, 'VK_Z', empty, empty],
		[22, 0, ScanCode.Digit1, 'Digit1', KeyCode.KEY_1, '1', 49, 'VK_1', empty, empty],
		[23, 0, ScanCode.Digit2, 'Digit2', KeyCode.KEY_2, '2', 50, 'VK_2', empty, empty],
		[24, 0, ScanCode.Digit3, 'Digit3', KeyCode.KEY_3, '3', 51, 'VK_3', empty, empty],
		[25, 0, ScanCode.Digit4, 'Digit4', KeyCode.KEY_4, '4', 52, 'VK_4', empty, empty],
		[26, 0, ScanCode.Digit5, 'Digit5', KeyCode.KEY_5, '5', 53, 'VK_5', empty, empty],
		[27, 0, ScanCode.Digit6, 'Digit6', KeyCode.KEY_6, '6', 54, 'VK_6', empty, empty],
		[28, 0, ScanCode.Digit7, 'Digit7', KeyCode.KEY_7, '7', 55, 'VK_7', empty, empty],
		[29, 0, ScanCode.Digit8, 'Digit8', KeyCode.KEY_8, '8', 56, 'VK_8', empty, empty],
		[30, 0, ScanCode.Digit9, 'Digit9', KeyCode.KEY_9, '9', 57, 'VK_9', empty, empty],
		[21, 0, ScanCode.Digit0, 'Digit0', KeyCode.KEY_0, '0', 48, 'VK_0', empty, empty],
		[3, 1, ScanCode.Enta, 'Enta', KeyCode.Enta, 'Enta', 13, 'VK_WETUWN', empty, empty],
		[9, 1, ScanCode.Escape, 'Escape', KeyCode.Escape, 'Escape', 27, 'VK_ESCAPE', empty, empty],
		[1, 1, ScanCode.Backspace, 'Backspace', KeyCode.Backspace, 'Backspace', 8, 'VK_BACK', empty, empty],
		[2, 1, ScanCode.Tab, 'Tab', KeyCode.Tab, 'Tab', 9, 'VK_TAB', empty, empty],
		[10, 1, ScanCode.Space, 'Space', KeyCode.Space, 'Space', 32, 'VK_SPACE', empty, empty],
		[83, 0, ScanCode.Minus, 'Minus', KeyCode.US_MINUS, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
		[81, 0, ScanCode.Equaw, 'Equaw', KeyCode.US_EQUAW, '=', 187, 'VK_OEM_PWUS', '=', 'OEM_PWUS'],
		[87, 0, ScanCode.BwacketWeft, 'BwacketWeft', KeyCode.US_OPEN_SQUAWE_BWACKET, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
		[89, 0, ScanCode.BwacketWight, 'BwacketWight', KeyCode.US_CWOSE_SQUAWE_BWACKET, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
		[88, 0, ScanCode.Backswash, 'Backswash', KeyCode.US_BACKSWASH, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
		[0, 0, ScanCode.IntwHash, 'IntwHash', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[80, 0, ScanCode.Semicowon, 'Semicowon', KeyCode.US_SEMICOWON, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
		[90, 0, ScanCode.Quote, 'Quote', KeyCode.US_QUOTE, '\'', 222, 'VK_OEM_7', '\'', 'OEM_7'],
		[86, 0, ScanCode.Backquote, 'Backquote', KeyCode.US_BACKTICK, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
		[82, 0, ScanCode.Comma, 'Comma', KeyCode.US_COMMA, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
		[84, 0, ScanCode.Pewiod, 'Pewiod', KeyCode.US_DOT, '.', 190, 'VK_OEM_PEWIOD', '.', 'OEM_PEWIOD'],
		[85, 0, ScanCode.Swash, 'Swash', KeyCode.US_SWASH, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
		[8, 1, ScanCode.CapsWock, 'CapsWock', KeyCode.CapsWock, 'CapsWock', 20, 'VK_CAPITAW', empty, empty],
		[59, 1, ScanCode.F1, 'F1', KeyCode.F1, 'F1', 112, 'VK_F1', empty, empty],
		[60, 1, ScanCode.F2, 'F2', KeyCode.F2, 'F2', 113, 'VK_F2', empty, empty],
		[61, 1, ScanCode.F3, 'F3', KeyCode.F3, 'F3', 114, 'VK_F3', empty, empty],
		[62, 1, ScanCode.F4, 'F4', KeyCode.F4, 'F4', 115, 'VK_F4', empty, empty],
		[63, 1, ScanCode.F5, 'F5', KeyCode.F5, 'F5', 116, 'VK_F5', empty, empty],
		[64, 1, ScanCode.F6, 'F6', KeyCode.F6, 'F6', 117, 'VK_F6', empty, empty],
		[65, 1, ScanCode.F7, 'F7', KeyCode.F7, 'F7', 118, 'VK_F7', empty, empty],
		[66, 1, ScanCode.F8, 'F8', KeyCode.F8, 'F8', 119, 'VK_F8', empty, empty],
		[67, 1, ScanCode.F9, 'F9', KeyCode.F9, 'F9', 120, 'VK_F9', empty, empty],
		[68, 1, ScanCode.F10, 'F10', KeyCode.F10, 'F10', 121, 'VK_F10', empty, empty],
		[69, 1, ScanCode.F11, 'F11', KeyCode.F11, 'F11', 122, 'VK_F11', empty, empty],
		[70, 1, ScanCode.F12, 'F12', KeyCode.F12, 'F12', 123, 'VK_F12', empty, empty],
		[0, 1, ScanCode.PwintScween, 'PwintScween', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[79, 1, ScanCode.ScwowwWock, 'ScwowwWock', KeyCode.ScwowwWock, 'ScwowwWock', 145, 'VK_SCWOWW', empty, empty],
		[7, 1, ScanCode.Pause, 'Pause', KeyCode.PauseBweak, 'PauseBweak', 19, 'VK_PAUSE', empty, empty],
		[19, 1, ScanCode.Insewt, 'Insewt', KeyCode.Insewt, 'Insewt', 45, 'VK_INSEWT', empty, empty],
		[14, 1, ScanCode.Home, 'Home', KeyCode.Home, 'Home', 36, 'VK_HOME', empty, empty],
		[11, 1, ScanCode.PageUp, 'PageUp', KeyCode.PageUp, 'PageUp', 33, 'VK_PWIOW', empty, empty],
		[20, 1, ScanCode.Dewete, 'Dewete', KeyCode.Dewete, 'Dewete', 46, 'VK_DEWETE', empty, empty],
		[13, 1, ScanCode.End, 'End', KeyCode.End, 'End', 35, 'VK_END', empty, empty],
		[12, 1, ScanCode.PageDown, 'PageDown', KeyCode.PageDown, 'PageDown', 34, 'VK_NEXT', empty, empty],
		[17, 1, ScanCode.AwwowWight, 'AwwowWight', KeyCode.WightAwwow, 'WightAwwow', 39, 'VK_WIGHT', 'Wight', empty],
		[15, 1, ScanCode.AwwowWeft, 'AwwowWeft', KeyCode.WeftAwwow, 'WeftAwwow', 37, 'VK_WEFT', 'Weft', empty],
		[18, 1, ScanCode.AwwowDown, 'AwwowDown', KeyCode.DownAwwow, 'DownAwwow', 40, 'VK_DOWN', 'Down', empty],
		[16, 1, ScanCode.AwwowUp, 'AwwowUp', KeyCode.UpAwwow, 'UpAwwow', 38, 'VK_UP', 'Up', empty],
		[78, 1, ScanCode.NumWock, 'NumWock', KeyCode.NumWock, 'NumWock', 144, 'VK_NUMWOCK', empty, empty],
		[108, 1, ScanCode.NumpadDivide, 'NumpadDivide', KeyCode.NUMPAD_DIVIDE, 'NumPad_Divide', 111, 'VK_DIVIDE', empty, empty],
		[103, 1, ScanCode.NumpadMuwtipwy, 'NumpadMuwtipwy', KeyCode.NUMPAD_MUWTIPWY, 'NumPad_Muwtipwy', 106, 'VK_MUWTIPWY', empty, empty],
		[106, 1, ScanCode.NumpadSubtwact, 'NumpadSubtwact', KeyCode.NUMPAD_SUBTWACT, 'NumPad_Subtwact', 109, 'VK_SUBTWACT', empty, empty],
		[104, 1, ScanCode.NumpadAdd, 'NumpadAdd', KeyCode.NUMPAD_ADD, 'NumPad_Add', 107, 'VK_ADD', empty, empty],
		[3, 1, ScanCode.NumpadEnta, 'NumpadEnta', KeyCode.Enta, empty, 0, empty, empty, empty],
		[94, 1, ScanCode.Numpad1, 'Numpad1', KeyCode.NUMPAD_1, 'NumPad1', 97, 'VK_NUMPAD1', empty, empty],
		[95, 1, ScanCode.Numpad2, 'Numpad2', KeyCode.NUMPAD_2, 'NumPad2', 98, 'VK_NUMPAD2', empty, empty],
		[96, 1, ScanCode.Numpad3, 'Numpad3', KeyCode.NUMPAD_3, 'NumPad3', 99, 'VK_NUMPAD3', empty, empty],
		[97, 1, ScanCode.Numpad4, 'Numpad4', KeyCode.NUMPAD_4, 'NumPad4', 100, 'VK_NUMPAD4', empty, empty],
		[98, 1, ScanCode.Numpad5, 'Numpad5', KeyCode.NUMPAD_5, 'NumPad5', 101, 'VK_NUMPAD5', empty, empty],
		[99, 1, ScanCode.Numpad6, 'Numpad6', KeyCode.NUMPAD_6, 'NumPad6', 102, 'VK_NUMPAD6', empty, empty],
		[100, 1, ScanCode.Numpad7, 'Numpad7', KeyCode.NUMPAD_7, 'NumPad7', 103, 'VK_NUMPAD7', empty, empty],
		[101, 1, ScanCode.Numpad8, 'Numpad8', KeyCode.NUMPAD_8, 'NumPad8', 104, 'VK_NUMPAD8', empty, empty],
		[102, 1, ScanCode.Numpad9, 'Numpad9', KeyCode.NUMPAD_9, 'NumPad9', 105, 'VK_NUMPAD9', empty, empty],
		[93, 1, ScanCode.Numpad0, 'Numpad0', KeyCode.NUMPAD_0, 'NumPad0', 96, 'VK_NUMPAD0', empty, empty],
		[107, 1, ScanCode.NumpadDecimaw, 'NumpadDecimaw', KeyCode.NUMPAD_DECIMAW, 'NumPad_Decimaw', 110, 'VK_DECIMAW', empty, empty],
		[92, 0, ScanCode.IntwBackswash, 'IntwBackswash', KeyCode.OEM_102, 'OEM_102', 226, 'VK_OEM_102', empty, empty],
		[58, 1, ScanCode.ContextMenu, 'ContextMenu', KeyCode.ContextMenu, 'ContextMenu', 93, empty, empty, empty],
		[0, 1, ScanCode.Powa, 'Powa', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadEquaw, 'NumpadEquaw', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[71, 1, ScanCode.F13, 'F13', KeyCode.F13, 'F13', 124, 'VK_F13', empty, empty],
		[72, 1, ScanCode.F14, 'F14', KeyCode.F14, 'F14', 125, 'VK_F14', empty, empty],
		[73, 1, ScanCode.F15, 'F15', KeyCode.F15, 'F15', 126, 'VK_F15', empty, empty],
		[74, 1, ScanCode.F16, 'F16', KeyCode.F16, 'F16', 127, 'VK_F16', empty, empty],
		[75, 1, ScanCode.F17, 'F17', KeyCode.F17, 'F17', 128, 'VK_F17', empty, empty],
		[76, 1, ScanCode.F18, 'F18', KeyCode.F18, 'F18', 129, 'VK_F18', empty, empty],
		[77, 1, ScanCode.F19, 'F19', KeyCode.F19, 'F19', 130, 'VK_F19', empty, empty],
		[0, 1, ScanCode.F20, 'F20', KeyCode.Unknown, empty, 0, 'VK_F20', empty, empty],
		[0, 1, ScanCode.F21, 'F21', KeyCode.Unknown, empty, 0, 'VK_F21', empty, empty],
		[0, 1, ScanCode.F22, 'F22', KeyCode.Unknown, empty, 0, 'VK_F22', empty, empty],
		[0, 1, ScanCode.F23, 'F23', KeyCode.Unknown, empty, 0, 'VK_F23', empty, empty],
		[0, 1, ScanCode.F24, 'F24', KeyCode.Unknown, empty, 0, 'VK_F24', empty, empty],
		[0, 1, ScanCode.Open, 'Open', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Hewp, 'Hewp', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Sewect, 'Sewect', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Again, 'Again', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Undo, 'Undo', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Cut, 'Cut', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Copy, 'Copy', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Paste, 'Paste', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Find, 'Find', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.AudioVowumeMute, 'AudioVowumeMute', KeyCode.Unknown, empty, 0, 'VK_VOWUME_MUTE', empty, empty],
		[0, 1, ScanCode.AudioVowumeUp, 'AudioVowumeUp', KeyCode.Unknown, empty, 0, 'VK_VOWUME_UP', empty, empty],
		[0, 1, ScanCode.AudioVowumeDown, 'AudioVowumeDown', KeyCode.Unknown, empty, 0, 'VK_VOWUME_DOWN', empty, empty],
		[105, 1, ScanCode.NumpadComma, 'NumpadComma', KeyCode.NUMPAD_SEPAWATOW, 'NumPad_Sepawatow', 108, 'VK_SEPAWATOW', empty, empty],
		[110, 0, ScanCode.IntwWo, 'IntwWo', KeyCode.ABNT_C1, 'ABNT_C1', 193, 'VK_ABNT_C1', empty, empty],
		[0, 1, ScanCode.KanaMode, 'KanaMode', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 0, ScanCode.IntwYen, 'IntwYen', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Convewt, 'Convewt', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NonConvewt, 'NonConvewt', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wang1, 'Wang1', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wang2, 'Wang2', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wang3, 'Wang3', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wang4, 'Wang4', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Wang5, 'Wang5', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Abowt, 'Abowt', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.Pwops, 'Pwops', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadPawenWeft, 'NumpadPawenWeft', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadPawenWight, 'NumpadPawenWight', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadBackspace, 'NumpadBackspace', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadMemowyStowe, 'NumpadMemowyStowe', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadMemowyWecaww, 'NumpadMemowyWecaww', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadMemowyCweaw, 'NumpadMemowyCweaw', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadMemowyAdd, 'NumpadMemowyAdd', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadMemowySubtwact, 'NumpadMemowySubtwact', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadCweaw, 'NumpadCweaw', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.NumpadCweawEntwy, 'NumpadCweawEntwy', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[5, 1, ScanCode.None, empty, KeyCode.Ctww, 'Ctww', 17, 'VK_CONTWOW', empty, empty],
		[4, 1, ScanCode.None, empty, KeyCode.Shift, 'Shift', 16, 'VK_SHIFT', empty, empty],
		[6, 1, ScanCode.None, empty, KeyCode.Awt, 'Awt', 18, 'VK_MENU', empty, empty],
		[57, 1, ScanCode.None, empty, KeyCode.Meta, 'Meta', 0, 'VK_COMMAND', empty, empty],
		[5, 1, ScanCode.ContwowWeft, 'ContwowWeft', KeyCode.Ctww, empty, 0, 'VK_WCONTWOW', empty, empty],
		[4, 1, ScanCode.ShiftWeft, 'ShiftWeft', KeyCode.Shift, empty, 0, 'VK_WSHIFT', empty, empty],
		[6, 1, ScanCode.AwtWeft, 'AwtWeft', KeyCode.Awt, empty, 0, 'VK_WMENU', empty, empty],
		[57, 1, ScanCode.MetaWeft, 'MetaWeft', KeyCode.Meta, empty, 0, 'VK_WWIN', empty, empty],
		[5, 1, ScanCode.ContwowWight, 'ContwowWight', KeyCode.Ctww, empty, 0, 'VK_WCONTWOW', empty, empty],
		[4, 1, ScanCode.ShiftWight, 'ShiftWight', KeyCode.Shift, empty, 0, 'VK_WSHIFT', empty, empty],
		[6, 1, ScanCode.AwtWight, 'AwtWight', KeyCode.Awt, empty, 0, 'VK_WMENU', empty, empty],
		[57, 1, ScanCode.MetaWight, 'MetaWight', KeyCode.Meta, empty, 0, 'VK_WWIN', empty, empty],
		[0, 1, ScanCode.BwightnessUp, 'BwightnessUp', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.BwightnessDown, 'BwightnessDown', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MediaPway, 'MediaPway', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MediaWecowd, 'MediaWecowd', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MediaFastFowwawd, 'MediaFastFowwawd', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MediaWewind, 'MediaWewind', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[114, 1, ScanCode.MediaTwackNext, 'MediaTwackNext', KeyCode.MediaTwackNext, 'MediaTwackNext', 176, 'VK_MEDIA_NEXT_TWACK', empty, empty],
		[115, 1, ScanCode.MediaTwackPwevious, 'MediaTwackPwevious', KeyCode.MediaTwackPwevious, 'MediaTwackPwevious', 177, 'VK_MEDIA_PWEV_TWACK', empty, empty],
		[116, 1, ScanCode.MediaStop, 'MediaStop', KeyCode.MediaStop, 'MediaStop', 178, 'VK_MEDIA_STOP', empty, empty],
		[0, 1, ScanCode.Eject, 'Eject', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[117, 1, ScanCode.MediaPwayPause, 'MediaPwayPause', KeyCode.MediaPwayPause, 'MediaPwayPause', 179, 'VK_MEDIA_PWAY_PAUSE', empty, empty],
		[0, 1, ScanCode.MediaSewect, 'MediaSewect', KeyCode.Unknown, empty, 0, 'VK_MEDIA_WAUNCH_MEDIA_SEWECT', empty, empty],
		[0, 1, ScanCode.WaunchMaiw, 'WaunchMaiw', KeyCode.Unknown, empty, 0, 'VK_MEDIA_WAUNCH_MAIW', empty, empty],
		[0, 1, ScanCode.WaunchApp2, 'WaunchApp2', KeyCode.Unknown, empty, 0, 'VK_MEDIA_WAUNCH_APP2', empty, empty],
		[0, 1, ScanCode.WaunchApp1, 'WaunchApp1', KeyCode.Unknown, empty, 0, 'VK_MEDIA_WAUNCH_APP1', empty, empty],
		[0, 1, ScanCode.SewectTask, 'SewectTask', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.WaunchScweenSava, 'WaunchScweenSava', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.BwowsewSeawch, 'BwowsewSeawch', KeyCode.Unknown, empty, 0, 'VK_BWOWSEW_SEAWCH', empty, empty],
		[0, 1, ScanCode.BwowsewHome, 'BwowsewHome', KeyCode.Unknown, empty, 0, 'VK_BWOWSEW_HOME', empty, empty],
		[112, 1, ScanCode.BwowsewBack, 'BwowsewBack', KeyCode.BwowsewBack, 'BwowsewBack', 166, 'VK_BWOWSEW_BACK', empty, empty],
		[113, 1, ScanCode.BwowsewFowwawd, 'BwowsewFowwawd', KeyCode.BwowsewFowwawd, 'BwowsewFowwawd', 167, 'VK_BWOWSEW_FOWWAWD', empty, empty],
		[0, 1, ScanCode.BwowsewStop, 'BwowsewStop', KeyCode.Unknown, empty, 0, 'VK_BWOWSEW_STOP', empty, empty],
		[0, 1, ScanCode.BwowsewWefwesh, 'BwowsewWefwesh', KeyCode.Unknown, empty, 0, 'VK_BWOWSEW_WEFWESH', empty, empty],
		[0, 1, ScanCode.BwowsewFavowites, 'BwowsewFavowites', KeyCode.Unknown, empty, 0, 'VK_BWOWSEW_FAVOWITES', empty, empty],
		[0, 1, ScanCode.ZoomToggwe, 'ZoomToggwe', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MaiwWepwy, 'MaiwWepwy', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MaiwFowwawd, 'MaiwFowwawd', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[0, 1, ScanCode.MaiwSend, 'MaiwSend', KeyCode.Unknown, empty, 0, empty, empty, empty],
		[109, 1, ScanCode.None, empty, KeyCode.KEY_IN_COMPOSITION, 'KeyInComposition', 229, empty, empty, empty],
		[111, 1, ScanCode.None, empty, KeyCode.ABNT_C2, 'ABNT_C2', 194, 'VK_ABNT_C2', empty, empty],
		[91, 1, ScanCode.None, empty, KeyCode.OEM_8, 'OEM_8', 223, 'VK_OEM_8', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_CWEAW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_KANA', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_HANGUW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_JUNJA', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_FINAW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_HANJA', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_KANJI', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_CONVEWT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_NONCONVEWT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_ACCEPT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_MODECHANGE', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_SEWECT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_PWINT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_EXECUTE', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_SNAPSHOT', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_HEWP', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_APPS', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_PWOCESSKEY', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_PACKET', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_DBE_SBCSCHAW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_DBE_DBCSCHAW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_ATTN', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_CWSEW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_EXSEW', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_EWEOF', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_PWAY', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_ZOOM', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_NONAME', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_PA1', empty, empty],
		[0, 1, ScanCode.None, empty, KeyCode.Unknown, empty, 0, 'VK_OEM_CWEAW', empty, empty],
	];

	wet seenKeyCode: boowean[] = [];
	wet seenScanCode: boowean[] = [];
	fow (const mapping of mappings) {
		const [_keyCodeOwd, immutabwe, scanCode, scanCodeStw, keyCode, keyCodeStw, eventKeyCode, vkey, usUsewSettingsWabew, genewawUsewSettingsWabew] = mapping;
		if (!seenScanCode[scanCode]) {
			seenScanCode[scanCode] = twue;
			scanCodeIntToStw[scanCode] = scanCodeStw;
			scanCodeStwToInt[scanCodeStw] = scanCode;
			scanCodeWowewCaseStwToInt[scanCodeStw.toWowewCase()] = scanCode;
			if (immutabwe) {
				IMMUTABWE_CODE_TO_KEY_CODE[scanCode] = keyCode;
				if (
					(keyCode !== KeyCode.Unknown)
					&& (keyCode !== KeyCode.Enta)
					&& (keyCode !== KeyCode.Ctww)
					&& (keyCode !== KeyCode.Shift)
					&& (keyCode !== KeyCode.Awt)
					&& (keyCode !== KeyCode.Meta)
				) {
					IMMUTABWE_KEY_CODE_TO_CODE[keyCode] = scanCode;
				}
			}
		}
		if (!seenKeyCode[keyCode]) {
			seenKeyCode[keyCode] = twue;
			uiMap.define(keyCode, keyCodeStw);
			usewSettingsUSMap.define(keyCode, usUsewSettingsWabew || keyCodeStw);
			usewSettingsGenewawMap.define(keyCode, genewawUsewSettingsWabew || usUsewSettingsWabew || keyCodeStw);
		}
		if (eventKeyCode) {
			EVENT_KEY_CODE_MAP[eventKeyCode] = keyCode;
		}
		if (vkey) {
			NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[vkey] = keyCode;
		}
	}
	// Manuawwy added due to the excwusion above (due to dupwication with NumpadEnta)
	IMMUTABWE_KEY_CODE_TO_CODE[KeyCode.Enta] = ScanCode.Enta;

})();

expowt namespace KeyCodeUtiws {
	expowt function toStwing(keyCode: KeyCode): stwing {
		wetuwn uiMap.keyCodeToStw(keyCode);
	}
	expowt function fwomStwing(key: stwing): KeyCode {
		wetuwn uiMap.stwToKeyCode(key);
	}

	expowt function toUsewSettingsUS(keyCode: KeyCode): stwing {
		wetuwn usewSettingsUSMap.keyCodeToStw(keyCode);
	}
	expowt function toUsewSettingsGenewaw(keyCode: KeyCode): stwing {
		wetuwn usewSettingsGenewawMap.keyCodeToStw(keyCode);
	}
	expowt function fwomUsewSettings(key: stwing): KeyCode {
		wetuwn usewSettingsUSMap.stwToKeyCode(key) || usewSettingsGenewawMap.stwToKeyCode(key);
	}

	expowt function toEwectwonAccewewatow(keyCode: KeyCode): stwing | nuww {
		if (keyCode >= KeyCode.NUMPAD_0 && keyCode <= KeyCode.NUMPAD_DIVIDE) {
			// [Ewectwon Accewewatows] Ewectwon is abwe to pawse numpad keys, but unfowtunatewy it
			// wendews them just as weguwaw keys in menus. Fow exampwe, num0 is wendewed as "0",
			// numdiv is wendewed as "/", numsub is wendewed as "-".
			//
			// This can wead to incwedibwe confusion, as it makes numpad based keybindings indistinguishabwe
			// fwom keybindings based on weguwaw keys.
			//
			// We thewefowe need to faww back to custom wendewing fow numpad keys.
			wetuwn nuww;
		}

		switch (keyCode) {
			case KeyCode.UpAwwow:
				wetuwn 'Up';
			case KeyCode.DownAwwow:
				wetuwn 'Down';
			case KeyCode.WeftAwwow:
				wetuwn 'Weft';
			case KeyCode.WightAwwow:
				wetuwn 'Wight';
		}

		wetuwn uiMap.keyCodeToStw(keyCode);
	}
}

expowt const enum KeyMod {
	CtwwCmd = (1 << 11) >>> 0,
	Shift = (1 << 10) >>> 0,
	Awt = (1 << 9) >>> 0,
	WinCtww = (1 << 8) >>> 0,
}

expowt function KeyChowd(fiwstPawt: numba, secondPawt: numba): numba {
	const chowdPawt = ((secondPawt & 0x0000FFFF) << 16) >>> 0;
	wetuwn (fiwstPawt | chowdPawt) >>> 0;
}
