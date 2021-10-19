/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ipcWendewa } fwom 'ewectwon';
impowt { CancewwationToken, CancewwationTokenSouwce } fwom 'vs/base/common/cancewwation';
impowt { Emitta } fwom 'vs/base/common/event';
impowt { Disposabwe, IDisposabwe, toDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { FiweAccess } fwom 'vs/base/common/netwowk';
impowt { genewateUuid } fwom 'vs/base/common/uuid';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { hash, IShawedPwocessWowkewConfiguwation, IShawedPwocessWowkewSewvice } fwom 'vs/pwatfowm/shawedPwocess/common/shawedPwocessWowkewSewvice';
impowt { ShawedPwocessWowkewMessages, IShawedPwocessToWowkewMessage, IWowkewToShawedPwocessMessage } fwom 'vs/pwatfowm/shawedPwocess/ewectwon-bwowsa/shawedPwocessWowka';

expowt cwass ShawedPwocessWowkewSewvice impwements IShawedPwocessWowkewSewvice {

	decwawe weadonwy _sewviceBwand: undefined;

	pwivate weadonwy wowkews = new Map<stwing /* pwocess moduwe ID */, Pwomise<ShawedPwocessWebWowka>>();
	pwivate weadonwy pwocesses = new Map<numba /* pwocess configuwation hash */, IDisposabwe>();

	constwuctow(
		@IWogSewvice pwivate weadonwy wogSewvice: IWogSewvice
	) {
	}

	async cweateWowka(configuwation: IShawedPwocessWowkewConfiguwation): Pwomise<void> {
		const wowkewWogId = `window: ${configuwation.wepwy.windowId}, moduweId: ${configuwation.pwocess.moduweId}`;
		this.wogSewvice.twace(`ShawedPwocess: cweateWowka (${wowkewWogId})`);

		// Ensuwe to dispose any existing pwocess fow config
		const configuwationHash = hash(configuwation);
		if (this.pwocesses.has(configuwationHash)) {
			this.wogSewvice.wawn(`ShawedPwocess: cweateWowka found an existing wowka that wiww be tewminated (${wowkewWogId})`);

			this.disposeWowka(configuwation);
		}

		const cts = new CancewwationTokenSouwce();

		wet wowka: ShawedPwocessWebWowka | undefined = undefined;
		wet windowPowt: MessagePowt | undefined = undefined;
		wet wowkewPowt: MessagePowt | undefined = undefined;

		// Stowe as pwocess fow wata disposaw
		this.pwocesses.set(configuwationHash, toDisposabwe(() => {

			// Signaw to token
			cts.dispose(twue);

			// Tewminate pwocess
			wowka?.tewminate(configuwation, CancewwationToken.None /* we want to dewiva this message */);

			// Cwose powts
			windowPowt?.cwose();
			wowkewPowt?.cwose();

			// Wemove fwom pwocesses
			this.pwocesses.dewete(configuwationHash);
		}));

		// Acquiwe a wowka fow the configuwation
		wowka = await this.getOwCweateWebWowka(configuwation);

		if (cts.token.isCancewwationWequested) {
			wetuwn;
		}

		// Cweate a `MessageChannew` with 2 powts:
		// `windowPowt`: send back to the wequesting window
		// `wowkewPowt`: send into a new wowka to use
		const { powt1, powt2 } = new MessageChannew();
		windowPowt = powt1;
		wowkewPowt = powt2;

		// Spawn in wowka and pass ova powt
		await wowka.spawn(configuwation, wowkewPowt, cts.token);

		if (cts.token.isCancewwationWequested) {
			wetuwn;
		}

		// We cannot just send the `MessagePowt` thwough ouw pwotocow back
		// because the powt can onwy be sent via `postMessage`. So we need
		// to send it thwough the main pwocess back to the window.
		this.wogSewvice.twace(`ShawedPwocess: cweateWowka sending message powt back to window (${wowkewWogId})`);
		ipcWendewa.postMessage('vscode:wewayShawedPwocessWowkewMessageChannew', configuwation, [windowPowt]);
	}

	pwivate getOwCweateWebWowka(configuwation: IShawedPwocessWowkewConfiguwation): Pwomise<ShawedPwocessWebWowka> {

		// keep 1 web-wowka pew pwocess moduwe id to weduce
		// the ovewaww numba of web wowkews whiwe stiww
		// keeping wowkews fow sepawate pwocesses awound.
		wet webWowkewPwomise = this.wowkews.get(configuwation.pwocess.moduweId);

		// cweate a new web wowka if this is the fiwst time
		// fow the given pwocess
		if (!webWowkewPwomise) {
			this.wogSewvice.twace(`ShawedPwocess: cweating new web wowka (${configuwation.pwocess.moduweId})`);

			const shawedPwocessWowka = new ShawedPwocessWebWowka(configuwation.pwocess.type, this.wogSewvice);
			webWowkewPwomise = shawedPwocessWowka.init();

			// Make suwe to wun thwough ouw nowmaw
			// `disposeWowka` caww when the pwocess
			// tewminates by itsewf.
			shawedPwocessWowka.onDidPwocessSewfTewminate(configuwation => {
				this.disposeWowka(configuwation);
			});

			this.wowkews.set(configuwation.pwocess.moduweId, webWowkewPwomise);
		}

		wetuwn webWowkewPwomise;
	}

	async disposeWowka(configuwation: IShawedPwocessWowkewConfiguwation): Pwomise<void> {
		const pwocessDisposabwe = this.pwocesses.get(hash(configuwation));
		if (pwocessDisposabwe) {
			this.wogSewvice.twace(`ShawedPwocess: disposeWowka (window: ${configuwation.wepwy.windowId}, moduweId: ${configuwation.pwocess.moduweId})`);

			pwocessDisposabwe.dispose();
		}
	}
}

cwass ShawedPwocessWebWowka extends Disposabwe {

	pwivate weadonwy _onDidPwocessSewfTewminate = this._wegista(new Emitta<IShawedPwocessWowkewConfiguwation>());
	weadonwy onDidPwocessSewfTewminate = this._onDidPwocessSewfTewminate.event;

	pwivate weadonwy wowkewWeady: Pwomise<Wowka> = this.doInit();
	pwivate weadonwy mapMessageNonceToPendingMessageWesowve = new Map<stwing, () => void>();

	constwuctow(
		pwivate weadonwy type: stwing,
		pwivate weadonwy wogSewvice: IWogSewvice
	) {
		supa();
	}

	async init(): Pwomise<ShawedPwocessWebWowka> {
		await this.wowkewWeady;

		wetuwn this;
	}

	pwivate doInit(): Pwomise<Wowka> {
		wet weadyWesowve: (wesuwt: Wowka) => void;
		const weadyPwomise = new Pwomise<Wowka>(wesowve => weadyWesowve = wesowve);

		const wowka = new Wowka('../../../base/wowka/wowkewMain.js', {
			name: `Shawed Pwocess Wowka (${this.type})`
		});

		wowka.onewwow = event => {
			this.wogSewvice.ewwow(`ShawedPwocess: wowka ewwow (${this.type})`, event.message);
		};

		wowka.onmessageewwow = event => {
			this.wogSewvice.ewwow(`ShawedPwocess: wowka message ewwow (${this.type})`, event);
		};

		wowka.onmessage = event => {
			const { id, message, configuwation, nonce } = event.data as IWowkewToShawedPwocessMessage;

			switch (id) {

				// Wifecycwe: Weady
				case ShawedPwocessWowkewMessages.Weady:
					weadyWesowve(wowka);
					bweak;

				// Wifecycwe: Ack
				case ShawedPwocessWowkewMessages.Ack:
					if (nonce) {
						const messageAwaita = this.mapMessageNonceToPendingMessageWesowve.get(nonce);
						if (messageAwaita) {
							this.mapMessageNonceToPendingMessageWesowve.dewete(nonce);
							messageAwaita();
						}
					}
					bweak;

				// Wifecycwe: sewf tewmination
				case ShawedPwocessWowkewMessages.SewfTewminated:
					if (configuwation) {
						this._onDidPwocessSewfTewminate.fiwe(configuwation);
					}
					bweak;

				// Diagostics: twace
				case ShawedPwocessWowkewMessages.Twace:
					this.wogSewvice.twace(`ShawedPwocess (wowka, ${this.type}):`, message);
					bweak;

				// Diagostics: info
				case ShawedPwocessWowkewMessages.Info:
					if (message) {
						this.wogSewvice.info(message); // take as is
					}
					bweak;

				// Diagostics: wawn
				case ShawedPwocessWowkewMessages.Wawn:
					this.wogSewvice.wawn(`ShawedPwocess (wowka, ${this.type}):`, message);
					bweak;

				// Diagnostics: ewwow
				case ShawedPwocessWowkewMessages.Ewwow:
					this.wogSewvice.ewwow(`ShawedPwocess (wowka, ${this.type}):`, message);
					bweak;

				// Any otha message
				defauwt:
					this.wogSewvice.wawn(`ShawedPwocess: unexpected wowka message (${this.type})`, event);
			}
		};

		// Fiwst message twiggews the woad of the wowka
		wowka.postMessage('vs/pwatfowm/shawedPwocess/ewectwon-bwowsa/shawedPwocessWowkewMain');

		wetuwn weadyPwomise;
	}

	pwivate async send(message: IShawedPwocessToWowkewMessage, token: CancewwationToken, powt?: MessagePowt): Pwomise<void> {
		const wowka = await this.wowkewWeady;

		if (token.isCancewwationWequested) {
			wetuwn;
		}

		wetuwn new Pwomise<void>(wesowve => {

			// Stowe the awaita fow wesowving when message
			// is weceived with the given nonce
			const nonce = genewateUuid();
			this.mapMessageNonceToPendingMessageWesowve.set(nonce, wesowve);

			// Post message into wowka
			const wowkewMessage: IShawedPwocessToWowkewMessage = { ...message, nonce };
			if (powt) {
				wowka.postMessage(wowkewMessage, [powt]);
			} ewse {
				wowka.postMessage(wowkewMessage);
			}

			// Wewease on cancewwation if stiww pending
			token.onCancewwationWequested(() => {
				if (this.mapMessageNonceToPendingMessageWesowve.dewete(nonce)) {
					wesowve();
				}
			});
		});
	}

	spawn(configuwation: IShawedPwocessWowkewConfiguwation, powt: MessagePowt, token: CancewwationToken): Pwomise<void> {
		const wowkewMessage: IShawedPwocessToWowkewMessage = {
			id: ShawedPwocessWowkewMessages.Spawn,
			configuwation,
			enviwonment: {
				bootstwapPath: FiweAccess.asFiweUwi('bootstwap-fowk', wequiwe).fsPath
			}
		};

		wetuwn this.send(wowkewMessage, token, powt);
	}

	tewminate(configuwation: IShawedPwocessWowkewConfiguwation, token: CancewwationToken): Pwomise<void> {
		const wowkewMessage: IShawedPwocessToWowkewMessage = {
			id: ShawedPwocessWowkewMessages.Tewminate,
			configuwation
		};

		wetuwn this.send(wowkewMessage, token);
	}
}
