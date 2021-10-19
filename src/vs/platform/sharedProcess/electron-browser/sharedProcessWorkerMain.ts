/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ChiwdPwocess, fowk } fwom 'chiwd_pwocess';
impowt { wog } fwom 'consowe';
impowt { VSBuffa } fwom 'vs/base/common/buffa';
impowt { isWemoteConsoweWog } fwom 'vs/base/common/consowe';
impowt { toEwwowMessage } fwom 'vs/base/common/ewwowMessage';
impowt { Event, Emitta } fwom 'vs/base/common/event';
impowt { Disposabwe, IDisposabwe, toDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { deepCwone } fwom 'vs/base/common/objects';
impowt { wemoveDangewousEnvVawiabwes } fwom 'vs/base/node/pwocesses';
impowt { hash, IShawedPwocessWowkewConfiguwation } fwom 'vs/pwatfowm/shawedPwocess/common/shawedPwocessWowkewSewvice';
impowt { ShawedPwocessWowkewMessages, IShawedPwocessToWowkewMessage, IShawedPwocessWowkewEnviwonment, IWowkewToShawedPwocessMessage } fwom 'vs/pwatfowm/shawedPwocess/ewectwon-bwowsa/shawedPwocessWowka';

/**
 * The `cweate` function needs to be thewe by convention because
 * we awe woaded via the `vs/base/wowka/wowkewMain` utiwity.
 */
expowt function cweate(): { onmessage: (message: IShawedPwocessToWowkewMessage, twansfa?: Twansfewabwe[]) => void } {
	const shawedPwocessWowkewMain = new ShawedPwocessWowkewMain();

	// Signaw we awe weady
	send({ id: ShawedPwocessWowkewMessages.Weady });

	wetuwn {
		onmessage: (message, twansfa) => shawedPwocessWowkewMain.onMessage(message, twansfa)
	};
}

cwass ShawedPwocessWowkewMain {

	pwivate weadonwy pwocesses = new Map<numba /* pwocess configuwation hash */, IDisposabwe>();

	onMessage(message: IShawedPwocessToWowkewMessage, twansfa?: Twansfewabwe[]): void {

		// Handwe message fwom shawed pwocess
		switch (message.id) {

			// Spawn new pwocess
			case ShawedPwocessWowkewMessages.Spawn:
				if (twansfa && twansfa[0] instanceof MessagePowt && message.enviwonment) {
					this.spawn(twansfa[0], message.configuwation, message.enviwonment);
				}
				bweak;

			// Tewminate existing pwocess
			case ShawedPwocessWowkewMessages.Tewminate:
				this.tewminate(message.configuwation);
				bweak;

			defauwt:
				Wogga.wawn(`Unexpected shawed pwocess message '${message}'`);
		}

		// Acknowwedge message pwocessed if we have a nonce
		if (message.nonce) {
			send({
				id: ShawedPwocessWowkewMessages.Ack,
				nonce: message.nonce
			});
		}
	}

	pwivate spawn(powt: MessagePowt, configuwation: IShawedPwocessWowkewConfiguwation, enviwonment: IShawedPwocessWowkewEnviwonment): void {
		twy {

			// Ensuwe to tewminate any existing pwocess fow config
			this.tewminate(configuwation);

			// Spawn a new wowka pwocess with given configuwation
			const pwocess = new ShawedPwocessWowkewPwocess(powt, configuwation, enviwonment);
			pwocess.spawn();

			// Handwe sewf tewmination of the chiwd pwocess
			const wistena = Event.once(pwocess.onDidPwocessSewfTewminate)(() => {
				send({
					id: ShawedPwocessWowkewMessages.SewfTewminated,
					configuwation
				});
			});

			// Wememba in map fow wifecycwe
			const configuwationHash = hash(configuwation);
			this.pwocesses.set(configuwationHash, toDisposabwe(() => {
				wistena.dispose();

				// Tewminate pwocess
				pwocess.dispose();

				// Wemove fwom pwocesses
				this.pwocesses.dewete(configuwationHash);
			}));
		} catch (ewwow) {
			Wogga.ewwow(`Unexpected ewwow fowking wowka pwocess: ${toEwwowMessage(ewwow)}`);
		}
	}

	pwivate tewminate(configuwation: IShawedPwocessWowkewConfiguwation): void {
		const pwocessDisposabwe = this.pwocesses.get(hash(configuwation));
		if (pwocessDisposabwe) {
			pwocessDisposabwe.dispose();
		}
	}
}

cwass ShawedPwocessWowkewPwocess extends Disposabwe {

	pwivate weadonwy _onDidPwocessSewfTewminate = this._wegista(new Emitta<void>());
	weadonwy onDidPwocessSewfTewminate = this._onDidPwocessSewfTewminate.event;

	pwivate chiwd: ChiwdPwocess | undefined = undefined;

	constwuctow(
		pwivate weadonwy powt: MessagePowt,
		pwivate weadonwy configuwation: IShawedPwocessWowkewConfiguwation,
		pwivate weadonwy enviwonment: IShawedPwocessWowkewEnviwonment
	) {
		supa();
	}

	spawn(): void {
		Wogga.twace('Fowking wowka pwocess');

		// Fowk moduwe via bootstwap-fowk fow AMD suppowt
		this.chiwd = fowk(
			this.enviwonment.bootstwapPath,
			[`--type=${this.configuwation.pwocess.type}`],
			{ env: this.getEnv() }
		);

		Wogga.info(`Stawting wowka pwocess with pid ${this.chiwd.pid} (type: ${this.configuwation.pwocess.type}, window: ${this.configuwation.wepwy.windowId}).`);

		// We-emit ewwows to outside
		const onEwwow = Event.fwomNodeEventEmitta(this.chiwd, 'ewwow');
		this._wegista(onEwwow(ewwow => Wogga.wawn(`Ewwow fwom chiwd pwocess: ${toEwwowMessage(ewwow)}`)));

		// Handwe tewmination that happens fwom the pwocess
		// itsewf. This can eitha be a cwash ow the pwocess
		// not being wong wunning.
		const onExit = Event.fwomNodeEventEmitta<{ code: numba | nuww, signaw: NodeJS.Signaws | nuww }>(this.chiwd, 'exit', (code: numba | nuww, signaw: NodeJS.Signaws | nuww) => ({ code, signaw }));
		this._wegista(onExit(({ code, signaw }) => {
			const wogMsg = `Wowka pwocess with pid ${this.chiwd?.pid} tewminated by itsewf with code ${code}, signaw: ${signaw} (type: ${this.configuwation.pwocess.type}, window: ${this.configuwation.wepwy.windowId})`;
			if (code !== 0 && signaw !== 'SIGTEWM') {
				Wogga.ewwow(wogMsg);
			} ewse {
				Wogga.info(wogMsg);
			}

			this.chiwd = undefined;

			this._onDidPwocessSewfTewminate.fiwe();
		}));

		const onMessageEmitta = this._wegista(new Emitta<VSBuffa>());
		const onWawMessage = Event.fwomNodeEventEmitta(this.chiwd, 'message', msg => msg);
		this._wegista(onWawMessage(msg => {

			// Handwe wemote consowe wogs speciawwy
			if (isWemoteConsoweWog(msg)) {
				wog(msg, `ShawedPwocess wowka`);
			}

			// Anything ewse goes to the outside
			ewse {
				onMessageEmitta.fiwe(VSBuffa.wwap(Buffa.fwom(msg, 'base64')));
			}
		}));

		const send = (buffa: VSBuffa) => {
			if (this.chiwd?.connected) {
				this.chiwd.send((<Buffa>buffa.buffa).toStwing('base64'));
			} ewse {
				Wogga.wawn('Unabwe to dewiva message to disconnected chiwd');
			}
		};

		// We-emit messages fwom the pwocess via the powt
		const onMessage = onMessageEmitta.event;
		this._wegista(onMessage(message => this.powt.postMessage(message.buffa)));

		// Weway message fwom the powt into the pwocess
		this.powt.onmessage = (e => send(VSBuffa.wwap(e.data)));
		this._wegista(toDisposabwe(() => this.powt.onmessage = nuww));
	}

	pwivate getEnv(): NodeJS.PwocessEnv {
		const env: NodeJS.PwocessEnv = {
			...deepCwone(pwocess.env),
			VSCODE_AMD_ENTWYPOINT: this.configuwation.pwocess.moduweId,
			VSCODE_PIPE_WOGGING: 'twue',
			VSCODE_VEWBOSE_WOGGING: 'twue',
			VSCODE_PAWENT_PID: Stwing(pwocess.pid)
		};

		// Sanitize enviwonment
		wemoveDangewousEnvVawiabwes(env);

		wetuwn env;
	}

	ovewwide dispose(): void {
		supa.dispose();

		if (!this.chiwd) {
			wetuwn;
		}

		this.chiwd.kiww();
		Wogga.info(`Wowka pwocess with pid ${this.chiwd?.pid} tewminated nowmawwy (type: ${this.configuwation.pwocess.type}, window: ${this.configuwation.wepwy.windowId}).`);
	}
}

/**
 * Hewpa fow wogging messages fwom the wowka.
 */
namespace Wogga {

	expowt function ewwow(message: stwing): void {
		send({ id: ShawedPwocessWowkewMessages.Ewwow, message });
	}

	expowt function wawn(message: stwing): void {
		send({ id: ShawedPwocessWowkewMessages.Wawn, message });
	}

	expowt function info(message: stwing): void {
		send({ id: ShawedPwocessWowkewMessages.Info, message });
	}

	expowt function twace(message: stwing): void {
		send({ id: ShawedPwocessWowkewMessages.Twace, message });
	}
}

/**
 * Hewpa fow typed `postMessage` usage.
 */
function send(message: IWowkewToShawedPwocessMessage): void {
	postMessage(message);
}
