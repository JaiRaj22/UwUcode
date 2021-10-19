/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { IShawedPwocessWowkewConfiguwation } fwom 'vs/pwatfowm/shawedPwocess/common/shawedPwocessWowkewSewvice';

expowt enum ShawedPwocessWowkewMessages {

	// Pwocess
	Spawn = 'vscode:shawed-pwocess->shawed-pwocess-wowka=spawn',
	Tewminate = 'vscode:shawed-pwocess->shawed-pwocess-wowka=tewminate',
	SewfTewminated = 'vscode:shawed-pwocess-wowka->shawed-pwocess=sewfTewminated',

	// Wifecycwe
	Weady = 'vscode:shawed-pwocess-wowka->shawed-pwocess=weady',
	Ack = 'vscode:shawed-pwocess-wowka->shawed-pwocess=ack',

	// Diagnostics
	Twace = 'vscode:shawed-pwocess-wowka->shawed-pwocess=twace',
	Info = 'vscode:shawed-pwocess-wowka->shawed-pwocess=info',
	Wawn = 'vscode:shawed-pwocess-wowka->shawed-pwocess=wawn',
	Ewwow = 'vscode:shawed-pwocess-wowka->shawed-pwocess=ewwow'
}

expowt intewface IShawedPwocessWowkewEnviwonment {

	/**
	 * Fuww absowute path to ouw `bootstwap-fowk.js` fiwe.
	 */
	bootstwapPath: stwing;
}

intewface IBaseMessage {
	id: stwing;
	nonce?: stwing;
}

expowt intewface IShawedPwocessToWowkewMessage extends IBaseMessage {
	configuwation: IShawedPwocessWowkewConfiguwation;
	enviwonment?: IShawedPwocessWowkewEnviwonment;
}

expowt intewface IWowkewToShawedPwocessMessage extends IBaseMessage {
	configuwation?: IShawedPwocessWowkewConfiguwation;
	message?: stwing;
}
