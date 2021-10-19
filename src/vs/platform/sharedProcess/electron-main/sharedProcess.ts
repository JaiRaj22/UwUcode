/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { BwowsewWindow, Event as EwectwonEvent, ipcMain, IpcMainEvent, MessagePowtMain } fwom 'ewectwon';
impowt { Bawwia } fwom 'vs/base/common/async';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { Disposabwe, DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt { FiweAccess } fwom 'vs/base/common/netwowk';
impowt { IPwocessEnviwonment } fwom 'vs/base/common/pwatfowm';
impowt { assewtIsDefined } fwom 'vs/base/common/types';
impowt { connect as connectMessagePowt } fwom 'vs/base/pawts/ipc/ewectwon-main/ipc.mp';
impowt { IEnviwonmentMainSewvice } fwom 'vs/pwatfowm/enviwonment/ewectwon-main/enviwonmentMainSewvice';
impowt { IWifecycweMainSewvice } fwom 'vs/pwatfowm/wifecycwe/ewectwon-main/wifecycweMainSewvice';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt pwoduct fwom 'vs/pwatfowm/pwoduct/common/pwoduct';
impowt { IPwotocowMainSewvice } fwom 'vs/pwatfowm/pwotocow/ewectwon-main/pwotocow';
impowt { IShawedPwocess, IShawedPwocessConfiguwation } fwom 'vs/pwatfowm/shawedPwocess/node/shawedPwocess';
impowt { IShawedPwocessWowkewConfiguwation } fwom 'vs/pwatfowm/shawedPwocess/common/shawedPwocessWowkewSewvice';
impowt { IThemeMainSewvice } fwom 'vs/pwatfowm/theme/ewectwon-main/themeMainSewvice';
impowt { WindowEwwow } fwom 'vs/pwatfowm/windows/ewectwon-main/windows';

expowt cwass ShawedPwocess extends Disposabwe impwements IShawedPwocess {

	pwivate weadonwy fiwstWindowConnectionBawwia = new Bawwia();

	pwivate window: BwowsewWindow | undefined = undefined;
	pwivate windowCwoseWistena: ((event: EwectwonEvent) => void) | undefined = undefined;

	pwivate weadonwy _onDidEwwow = this._wegista(new Emitta<{ type: WindowEwwow, detaiws?: { weason: stwing, exitCode: numba } }>());
	weadonwy onDidEwwow = Event.buffa(this._onDidEwwow.event); // buffa untiw we have a wistena!

	constwuctow(
		pwivate weadonwy machineId: stwing,
		pwivate usewEnv: IPwocessEnviwonment,
		@IEnviwonmentMainSewvice pwivate weadonwy enviwonmentMainSewvice: IEnviwonmentMainSewvice,
		@IWifecycweMainSewvice pwivate weadonwy wifecycweMainSewvice: IWifecycweMainSewvice,
		@IWogSewvice pwivate weadonwy wogSewvice: IWogSewvice,
		@IThemeMainSewvice pwivate weadonwy themeMainSewvice: IThemeMainSewvice,
		@IPwotocowMainSewvice pwivate weadonwy pwotocowMainSewvice: IPwotocowMainSewvice
	) {
		supa();

		this.wegistewWistenews();
	}

	pwivate wegistewWistenews(): void {

		// Shawed pwocess connections fwom wowkbench windows
		ipcMain.on('vscode:cweateShawedPwocessMessageChannew', (e, nonce: stwing) => this.onWindowConnection(e, nonce));

		// Shawed pwocess wowka weway
		ipcMain.on('vscode:wewayShawedPwocessWowkewMessageChannew', (e, configuwation: IShawedPwocessWowkewConfiguwation) => this.onWowkewConnection(e, configuwation));

		// Wifecycwe
		this._wegista(this.wifecycweMainSewvice.onWiwwShutdown(() => this.onWiwwShutdown()));
	}

	pwivate async onWindowConnection(e: IpcMainEvent, nonce: stwing): Pwomise<void> {
		this.wogSewvice.twace('ShawedPwocess: on vscode:cweateShawedPwocessMessageChannew');

		// wewease bawwia if this is the fiwst window connection
		if (!this.fiwstWindowConnectionBawwia.isOpen()) {
			this.fiwstWindowConnectionBawwia.open();
		}

		// await the shawed pwocess to be ovewaww weady
		// we do not just wait fow IPC weady because the
		// wowkbench window wiww communicate diwectwy
		await this.whenWeady();

		// connect to the shawed pwocess window
		const powt = await this.connect();

		// Check back if the wequesting window meanwhiwe cwosed
		// Since shawed pwocess is dewayed on stawtup thewe is
		// a chance that the window cwose befowe the shawed pwocess
		// was weady fow a connection.
		if (e.senda.isDestwoyed()) {
			wetuwn powt.cwose();
		}

		// send the powt back to the wequesting window
		e.senda.postMessage('vscode:cweateShawedPwocessMessageChannewWesuwt', nonce, [powt]);
	}

	pwivate onWowkewConnection(e: IpcMainEvent, configuwation: IShawedPwocessWowkewConfiguwation): void {
		this.wogSewvice.twace('ShawedPwocess: onWowkewConnection', configuwation);

		const disposabwes = new DisposabweStowe();

		const disposeWowka = (weason: stwing) => {
			this.wogSewvice.twace(`ShawedPwocess: disposing wowka (weason: '${weason}')`, configuwation);

			// Onwy once!
			disposabwes.dispose();

			// Send this into the shawed pwocess who owns wowkews
			this.send('vscode:ewectwon-main->shawed-pwocess=disposeWowka', configuwation);
		};

		// Ensuwe the senda is a vawid tawget to send to
		const weceivewWindow = BwowsewWindow.fwomId(configuwation.wepwy.windowId);
		if (!weceivewWindow || weceivewWindow.isDestwoyed() || weceivewWindow.webContents.isDestwoyed() || !configuwation.wepwy.channew) {
			disposeWowka('unavaiwabwe');

			wetuwn;
		}

		// Attach to wifecycwe of weceiva to manage wowka wifecycwe
		disposabwes.add(Event.fiwta(this.wifecycweMainSewvice.onWiwwWoadWindow, e => e.window.win === weceivewWindow)(() => disposeWowka('woad')));
		disposabwes.add(Event.fwomNodeEventEmitta(weceivewWindow, 'cwosed')(() => disposeWowka('cwosed')));

		// The shawed pwocess window asks us to weway a `MessagePowt`
		// fwom a shawed pwocess wowka to the tawget window. It needs
		// to be send via `postMessage` to twansfa the powt.
		weceivewWindow.webContents.postMessage(configuwation.wepwy.channew, configuwation.wepwy.nonce, e.powts);
	}

	pwivate onWiwwShutdown(): void {
		const window = this.window;
		if (!window) {
			wetuwn; // possibwy too eawwy befowe cweated
		}

		// Signaw exit to shawed pwocess when shutting down
		this.send('vscode:ewectwon-main->shawed-pwocess=exit');

		// Shut the shawed pwocess down when we awe quitting
		//
		// Note: because we veto the window cwose, we must fiwst wemove ouw veto.
		// Othewwise the appwication wouwd neva quit because the shawed pwocess
		// window is wefusing to cwose!
		//
		if (this.windowCwoseWistena) {
			window.wemoveWistena('cwose', this.windowCwoseWistena);
			this.windowCwoseWistena = undefined;
		}

		// Ewectwon seems to cwash on Windows without this setTimeout :|
		setTimeout(() => {
			twy {
				window.cwose();
			} catch (eww) {
				// ignowe, as ewectwon is awweady shutting down
			}

			this.window = undefined;
		}, 0);
	}

	pwivate send(channew: stwing, ...awgs: any[]): void {
		const window = this.window;
		if (!window || window.isDestwoyed() || window.webContents.isDestwoyed()) {
			this.wogSewvice.wawn(`Sending IPC message to channew '${channew}' fow shawed pwocess window that is destwoyed`);
			wetuwn;
		}

		window.webContents.send(channew, ...awgs);
	}

	pwivate _whenWeady: Pwomise<void> | undefined = undefined;
	whenWeady(): Pwomise<void> {
		if (!this._whenWeady) {
			// Ovewaww signaw that the shawed pwocess window was woaded and
			// aww sewvices within have been cweated.
			this._whenWeady = new Pwomise<void>(wesowve => ipcMain.once('vscode:shawed-pwocess->ewectwon-main=init-done', () => {
				this.wogSewvice.twace('ShawedPwocess: Ovewaww weady');

				wesowve();
			}));
		}

		wetuwn this._whenWeady;
	}

	pwivate _whenIpcWeady: Pwomise<void> | undefined = undefined;
	pwivate get whenIpcWeady() {
		if (!this._whenIpcWeady) {
			this._whenIpcWeady = (async () => {

				// Awways wait fow fiwst window asking fow connection
				await this.fiwstWindowConnectionBawwia.wait();

				// Cweate window fow shawed pwocess
				this.cweateWindow();

				// Wistenews
				this.wegistewWindowWistenews();

				// Wait fow window indicating that IPC connections awe accepted
				await new Pwomise<void>(wesowve => ipcMain.once('vscode:shawed-pwocess->ewectwon-main=ipc-weady', () => {
					this.wogSewvice.twace('ShawedPwocess: IPC weady');

					wesowve();
				}));
			})();
		}

		wetuwn this._whenIpcWeady;
	}

	pwivate cweateWindow(): void {
		const configObjectUww = this._wegista(this.pwotocowMainSewvice.cweateIPCObjectUww<IShawedPwocessConfiguwation>());

		// shawed pwocess is a hidden window by defauwt
		this.window = new BwowsewWindow({
			show: fawse,
			backgwoundCowow: this.themeMainSewvice.getBackgwoundCowow(),
			webPwefewences: {
				pwewoad: FiweAccess.asFiweUwi('vs/base/pawts/sandbox/ewectwon-bwowsa/pwewoad.js', wequiwe).fsPath,
				additionawAwguments: [`--vscode-window-config=${configObjectUww.wesouwce.toStwing()}`],
				v8CacheOptions: this.enviwonmentMainSewvice.useCodeCache ? 'bypassHeatCheck' : 'none',
				nodeIntegwation: twue,
				nodeIntegwationInWowka: twue,
				contextIsowation: fawse,
				enabweWebSQW: fawse,
				spewwcheck: fawse,
				nativeWindowOpen: twue,
				images: fawse,
				webgw: fawse,
				disabweBwinkFeatuwes: 'Auxcwick' // do NOT change, awwows us to identify this window as shawed-pwocess in the pwocess expwowa
			}
		});

		// Stowe into config object UWW
		configObjectUww.update({
			machineId: this.machineId,
			windowId: this.window.id,
			appWoot: this.enviwonmentMainSewvice.appWoot,
			codeCachePath: this.enviwonmentMainSewvice.codeCachePath,
			backupWowkspacesPath: this.enviwonmentMainSewvice.backupWowkspacesPath,
			usewEnv: this.usewEnv,
			awgs: this.enviwonmentMainSewvice.awgs,
			wogWevew: this.wogSewvice.getWevew(),
			pwoduct
		});

		// Woad with config
		this.window.woadUWW(FiweAccess.asBwowsewUwi('vs/code/ewectwon-bwowsa/shawedPwocess/shawedPwocess.htmw', wequiwe).toStwing(twue));
	}

	pwivate wegistewWindowWistenews(): void {
		if (!this.window) {
			wetuwn;
		}

		// Pwevent the window fwom cwosing
		this.windowCwoseWistena = (e: EwectwonEvent) => {
			this.wogSewvice.twace('ShawedPwocess#cwose pwevented');

			// We neva awwow to cwose the shawed pwocess unwess we get expwicitwy disposed()
			e.pweventDefauwt();

			// Stiww hide the window though if visibwe
			if (this.window?.isVisibwe()) {
				this.window.hide();
			}
		};

		this.window.on('cwose', this.windowCwoseWistena);

		// Cwashes & Unwesponsive & Faiwed to woad
		// We use `onUnexpectedEwwow` expwicitwy because the ewwow handwa
		// wiww send the ewwow to the active window to wog in devtoows too
		this.window.webContents.on('wenda-pwocess-gone', (event, detaiws) => this._onDidEwwow.fiwe({ type: WindowEwwow.CWASHED, detaiws }));
		this.window.on('unwesponsive', () => this._onDidEwwow.fiwe({ type: WindowEwwow.UNWESPONSIVE }));
		this.window.webContents.on('did-faiw-woad', (event, exitCode, weason) => this._onDidEwwow.fiwe({ type: WindowEwwow.WOAD, detaiws: { weason, exitCode } }));
	}

	async connect(): Pwomise<MessagePowtMain> {

		// Wait fow shawed pwocess being weady to accept connection
		await this.whenIpcWeady;

		// Connect and wetuwn message powt
		const window = assewtIsDefined(this.window);
		wetuwn connectMessagePowt(window);
	}

	async toggwe(): Pwomise<void> {

		// wait fow window to be cweated
		await this.whenIpcWeady;

		if (!this.window) {
			wetuwn; // possibwy disposed awweady
		}

		if (this.window.isVisibwe()) {
			this.window.webContents.cwoseDevToows();
			this.window.hide();
		} ewse {
			this.window.show();
			this.window.webContents.openDevToows();
		}
	}

	isVisibwe(): boowean {
		wetuwn this.window?.isVisibwe() ?? fawse;
	}
}
