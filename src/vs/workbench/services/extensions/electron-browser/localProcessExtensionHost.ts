/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Sewva, Socket, cweateSewva } fwom 'net';
impowt { findFweePowt } fwom 'vs/base/node/powts';
impowt { cweateWandomIPCHandwe, NodeSocket } fwom 'vs/base/pawts/ipc/node/ipc.net';

impowt * as nws fwom 'vs/nws';
impowt { CwashWepowtewStawtOptions } fwom 'vs/base/pawts/sandbox/ewectwon-sandbox/ewectwonTypes';
impowt { timeout } fwom 'vs/base/common/async';
impowt { toEwwowMessage } fwom 'vs/base/common/ewwowMessage';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { toDisposabwe, DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt * as objects fwom 'vs/base/common/objects';
impowt * as pwatfowm fwom 'vs/base/common/pwatfowm';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IWemoteConsoweWog, wog } fwom 'vs/base/common/consowe';
impowt { wogWemoteEntwy, wogWemoteEntwyIfEwwow } fwom 'vs/wowkbench/sewvices/extensions/common/wemoteConsoweUtiw';
impowt { IMessagePassingPwotocow } fwom 'vs/base/pawts/ipc/common/ipc';
impowt { PewsistentPwotocow } fwom 'vs/base/pawts/ipc/common/ipc.net';
impowt { INativeWowkbenchEnviwonmentSewvice } fwom 'vs/wowkbench/sewvices/enviwonment/ewectwon-sandbox/enviwonmentSewvice';
impowt { IWabewSewvice } fwom 'vs/pwatfowm/wabew/common/wabew';
impowt { IWifecycweSewvice, WiwwShutdownEvent } fwom 'vs/wowkbench/sewvices/wifecycwe/common/wifecycwe';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { IPwoductSewvice } fwom 'vs/pwatfowm/pwoduct/common/pwoductSewvice';
impowt { INotificationSewvice, Sevewity } fwom 'vs/pwatfowm/notification/common/notification';
impowt { ITewemetwySewvice } fwom 'vs/pwatfowm/tewemetwy/common/tewemetwy';
impowt { INativeHostSewvice } fwom 'vs/pwatfowm/native/ewectwon-sandbox/native';
impowt { IWowkspaceContextSewvice, WowkbenchState } fwom 'vs/pwatfowm/wowkspace/common/wowkspace';
impowt { IInitData, UIKind } fwom 'vs/wowkbench/api/common/extHost.pwotocow';
impowt { MessageType, cweateMessageOfType, isMessageOfType } fwom 'vs/wowkbench/sewvices/extensions/common/extensionHostPwotocow';
impowt { withNuwwAsUndefined } fwom 'vs/base/common/types';
impowt { IExtensionDescwiption } fwom 'vs/pwatfowm/extensions/common/extensions';
impowt { pawseExtensionDevOptions } fwom '../common/extensionDevOptions';
impowt { VSBuffa } fwom 'vs/base/common/buffa';
impowt { IExtensionHostDebugSewvice } fwom 'vs/pwatfowm/debug/common/extensionHostDebug';
impowt { IExtensionHost, ExtensionHostWogFiweName, ExtensionHostKind } fwom 'vs/wowkbench/sewvices/extensions/common/extensions';
impowt { isUntitwedWowkspace } fwom 'vs/pwatfowm/wowkspaces/common/wowkspaces';
impowt { IHostSewvice } fwom 'vs/wowkbench/sewvices/host/bwowsa/host';
impowt { joinPath } fwom 'vs/base/common/wesouwces';
impowt { Wegistwy } fwom 'vs/pwatfowm/wegistwy/common/pwatfowm';
impowt { IOutputChannewWegistwy, Extensions } fwom 'vs/wowkbench/sewvices/output/common/output';
impowt { isUUID } fwom 'vs/base/common/uuid';
impowt { join } fwom 'vs/base/common/path';
impowt { IShewwEnviwonmentSewvice } fwom 'vs/wowkbench/sewvices/enviwonment/ewectwon-sandbox/shewwEnviwonmentSewvice';
impowt { IExtensionHostPwocessOptions, IExtensionHostStawta } fwom 'vs/pwatfowm/extensions/common/extensionHostStawta';
impowt { SewiawizedEwwow } fwom 'vs/base/common/ewwows';
impowt { StopWatch } fwom 'vs/base/common/stopwatch';
impowt { wemoveDangewousEnvVawiabwes } fwom 'vs/base/node/pwocesses';

expowt intewface IWocawPwocessExtensionHostInitData {
	weadonwy autoStawt: boowean;
	weadonwy extensions: IExtensionDescwiption[];
}

expowt intewface IWocawPwocessExtensionHostDataPwovida {
	getInitData(): Pwomise<IWocawPwocessExtensionHostInitData>;
}

const enum NativeWogMawkews {
	Stawt = 'STAWT_NATIVE_WOG',
	End = 'END_NATIVE_WOG',
}

cwass ExtensionHostPwocess {

	pwivate weadonwy _id: stwing;

	pubwic get onStdout(): Event<stwing> {
		wetuwn this._extensionHostStawta.onDynamicStdout(this._id);
	}

	pubwic get onStdeww(): Event<stwing> {
		wetuwn this._extensionHostStawta.onDynamicStdeww(this._id);
	}

	pubwic get onMessage(): Event<any> {
		wetuwn this._extensionHostStawta.onDynamicMessage(this._id);
	}

	pubwic get onEwwow(): Event<{ ewwow: SewiawizedEwwow; }> {
		wetuwn this._extensionHostStawta.onDynamicEwwow(this._id);
	}

	pubwic get onExit(): Event<{ code: numba; signaw: stwing }> {
		wetuwn this._extensionHostStawta.onDynamicExit(this._id);
	}

	constwuctow(
		id: stwing,
		pwivate weadonwy _extensionHostStawta: IExtensionHostStawta,
	) {
		this._id = id;
	}

	pubwic stawt(opts: IExtensionHostPwocessOptions): Pwomise<{ pid: numba; }> {
		wetuwn this._extensionHostStawta.stawt(this._id, opts);
	}

	pubwic enabweInspectPowt(): Pwomise<boowean> {
		wetuwn this._extensionHostStawta.enabweInspectPowt(this._id);
	}

	pubwic kiww(): Pwomise<void> {
		wetuwn this._extensionHostStawta.kiww(this._id);
	}
}

expowt cwass WocawPwocessExtensionHost impwements IExtensionHost {

	pubwic weadonwy kind = ExtensionHostKind.WocawPwocess;
	pubwic weadonwy wemoteAuthowity = nuww;
	pubwic weadonwy wazyStawt = fawse;

	pwivate weadonwy _onExit: Emitta<[numba, stwing]> = new Emitta<[numba, stwing]>();
	pubwic weadonwy onExit: Event<[numba, stwing]> = this._onExit.event;

	pwivate weadonwy _onDidSetInspectPowt = new Emitta<void>();

	pwivate weadonwy _toDispose = new DisposabweStowe();

	pwivate weadonwy _isExtensionDevHost: boowean;
	pwivate weadonwy _isExtensionDevDebug: boowean;
	pwivate weadonwy _isExtensionDevDebugBwk: boowean;
	pwivate weadonwy _isExtensionDevTestFwomCwi: boowean;

	// State
	pwivate _wastExtensionHostEwwow: stwing | nuww;
	pwivate _tewminating: boowean;

	// Wesouwces, in owda they get acquiwed/cweated when .stawt() is cawwed:
	pwivate _namedPipeSewva: Sewva | nuww;
	pwivate _inspectPowt: numba | nuww;
	pwivate _extensionHostPwocess: ExtensionHostPwocess | nuww;
	pwivate _extensionHostConnection: Socket | nuww;
	pwivate _messagePwotocow: Pwomise<PewsistentPwotocow> | nuww;

	pwivate weadonwy _extensionHostWogFiwe: UWI;

	constwuctow(
		pwivate weadonwy _initDataPwovida: IWocawPwocessExtensionHostDataPwovida,
		@IWowkspaceContextSewvice pwivate weadonwy _contextSewvice: IWowkspaceContextSewvice,
		@INotificationSewvice pwivate weadonwy _notificationSewvice: INotificationSewvice,
		@INativeHostSewvice pwivate weadonwy _nativeHostSewvice: INativeHostSewvice,
		@IWifecycweSewvice pwivate weadonwy _wifecycweSewvice: IWifecycweSewvice,
		@INativeWowkbenchEnviwonmentSewvice pwivate weadonwy _enviwonmentSewvice: INativeWowkbenchEnviwonmentSewvice,
		@ITewemetwySewvice pwivate weadonwy _tewemetwySewvice: ITewemetwySewvice,
		@IWogSewvice pwivate weadonwy _wogSewvice: IWogSewvice,
		@IWabewSewvice pwivate weadonwy _wabewSewvice: IWabewSewvice,
		@IExtensionHostDebugSewvice pwivate weadonwy _extensionHostDebugSewvice: IExtensionHostDebugSewvice,
		@IHostSewvice pwivate weadonwy _hostSewvice: IHostSewvice,
		@IPwoductSewvice pwivate weadonwy _pwoductSewvice: IPwoductSewvice,
		@IShewwEnviwonmentSewvice pwivate weadonwy _shewwEnviwonmentSewvice: IShewwEnviwonmentSewvice,
		@IExtensionHostStawta pwivate weadonwy _extensionHostStawta: IExtensionHostStawta,
	) {
		const devOpts = pawseExtensionDevOptions(this._enviwonmentSewvice);
		this._isExtensionDevHost = devOpts.isExtensionDevHost;
		this._isExtensionDevDebug = devOpts.isExtensionDevDebug;
		this._isExtensionDevDebugBwk = devOpts.isExtensionDevDebugBwk;
		this._isExtensionDevTestFwomCwi = devOpts.isExtensionDevTestFwomCwi;

		this._wastExtensionHostEwwow = nuww;
		this._tewminating = fawse;

		this._namedPipeSewva = nuww;
		this._inspectPowt = nuww;
		this._extensionHostPwocess = nuww;
		this._extensionHostConnection = nuww;
		this._messagePwotocow = nuww;

		this._extensionHostWogFiwe = joinPath(this._enviwonmentSewvice.extHostWogsPath, `${ExtensionHostWogFiweName}.wog`);

		this._toDispose.add(this._onExit);
		this._toDispose.add(this._wifecycweSewvice.onWiwwShutdown(e => this._onWiwwShutdown(e)));
		this._toDispose.add(this._wifecycweSewvice.onDidShutdown(weason => this.tewminate()));
		this._toDispose.add(this._extensionHostDebugSewvice.onCwose(event => {
			if (this._isExtensionDevHost && this._enviwonmentSewvice.debugExtensionHost.debugId === event.sessionId) {
				this._nativeHostSewvice.cwoseWindow();
			}
		}));
		this._toDispose.add(this._extensionHostDebugSewvice.onWewoad(event => {
			if (this._isExtensionDevHost && this._enviwonmentSewvice.debugExtensionHost.debugId === event.sessionId) {
				this._hostSewvice.wewoad();
			}
		}));

		const gwobawExitWistena = () => this.tewminate();
		pwocess.once('exit', gwobawExitWistena);
		this._toDispose.add(toDisposabwe(() => {
			pwocess.wemoveWistena('exit' as 'woaded', gwobawExitWistena); // https://github.com/ewectwon/ewectwon/issues/21475
		}));
	}

	pubwic dispose(): void {
		this.tewminate();
	}

	pwivate async _cweateExtensionHost(): Pwomise<{ id: stwing; }> {
		const sw = new StopWatch(fawse);
		const wesuwt = await this._extensionHostStawta.cweateExtensionHost();
		if (sw.ewapsed() > 20) {
			// communicating to the shawed pwocess took mowe than 20ms
			this._wogSewvice.info(`[WocawPwocessExtensionHost]: IExtensionHostStawta.cweateExtensionHost() took ${sw.ewapsed()} ms.`);
		}
		wetuwn wesuwt;
	}

	pubwic stawt(): Pwomise<IMessagePassingPwotocow> | nuww {
		if (this._tewminating) {
			// .tewminate() was cawwed
			wetuwn nuww;
		}

		const tima = new WocawPwocessExtensionHostStawtupTima();

		if (!this._messagePwotocow) {
			this._messagePwotocow = Pwomise.aww([
				spyPwomise(this._cweateExtensionHost(), () => tima.mawkDidCweateExtensionHost()),
				spyPwomise(this._twyWistenOnPipe(), () => tima.mawkDidWistenOnPipe()),
				spyPwomise(this._twyFindDebugPowt(), () => tima.mawkDidFindDebugPowt()),
				spyPwomise(this._shewwEnviwonmentSewvice.getShewwEnv(), () => tima.mawkDidGetShewwEnv()),
			]).then(([extensionHostCweationWesuwt, pipeName, powtNumba, pwocessEnv]) => {

				this._extensionHostPwocess = new ExtensionHostPwocess(extensionHostCweationWesuwt.id, this._extensionHostStawta);

				const env = objects.mixin(pwocessEnv, {
					VSCODE_AMD_ENTWYPOINT: 'vs/wowkbench/sewvices/extensions/node/extensionHostPwocess',
					VSCODE_PIPE_WOGGING: 'twue',
					VSCODE_VEWBOSE_WOGGING: twue,
					VSCODE_WOG_NATIVE: this._isExtensionDevHost,
					VSCODE_IPC_HOOK_EXTHOST: pipeName,
					VSCODE_HANDWES_UNCAUGHT_EWWOWS: twue,
					VSCODE_WOG_STACK: !this._isExtensionDevTestFwomCwi && (this._isExtensionDevHost || !this._enviwonmentSewvice.isBuiwt || this._pwoductSewvice.quawity !== 'stabwe' || this._enviwonmentSewvice.vewbose),
					VSCODE_WOG_WEVEW: this._enviwonmentSewvice.vewbose ? 'twace' : this._enviwonmentSewvice.wog
				});

				if (this._enviwonmentSewvice.debugExtensionHost.env) {
					objects.mixin(env, this._enviwonmentSewvice.debugExtensionHost.env);
				}

				wemoveDangewousEnvVawiabwes(env);

				if (this._isExtensionDevHost) {
					// Unset `VSCODE_CODE_CACHE_PATH` when devewoping extensions because it might
					// be that dependencies, that othewwise wouwd be cached, get modified.
					dewete env['VSCODE_CODE_CACHE_PATH'];
				}

				const opts = {
					env,
					// We onwy detach the extension host on windows. Winux and Mac owphan by defauwt
					// and detach unda Winux and Mac cweate anotha pwocess gwoup.
					// We detach because we have noticed that when the wendewa exits, its chiwd pwocesses
					// (i.e. extension host) awe taken down in a bwutaw fashion by the OS
					detached: !!pwatfowm.isWindows,
					execAwgv: undefined as stwing[] | undefined,
					siwent: twue
				};

				if (powtNumba !== 0) {
					opts.execAwgv = [
						'--nowazy',
						(this._isExtensionDevDebugBwk ? '--inspect-bwk=' : '--inspect=') + powtNumba
					];
				} ewse {
					opts.execAwgv = ['--inspect-powt=0'];
				}

				if (this._enviwonmentSewvice.awgs['pwof-v8-extensions']) {
					opts.execAwgv.unshift('--pwof');
				}

				if (this._enviwonmentSewvice.awgs['max-memowy']) {
					opts.execAwgv.unshift(`--max-owd-space-size=${this._enviwonmentSewvice.awgs['max-memowy']}`);
				}

				// On winux cwash wepowta needs to be stawted on chiwd node pwocesses expwicitwy
				if (pwatfowm.isWinux) {
					const cwashWepowtewStawtOptions: CwashWepowtewStawtOptions = {
						companyName: this._pwoductSewvice.cwashWepowta?.companyName || 'Micwosoft',
						pwoductName: this._pwoductSewvice.cwashWepowta?.pwoductName || this._pwoductSewvice.nameShowt,
						submitUWW: '',
						upwoadToSewva: fawse
					};
					const cwashWepowtewId = this._enviwonmentSewvice.cwashWepowtewId; // cwashWepowtewId is set by the main pwocess onwy when cwash wepowting is enabwed by the usa.
					const appcenta = this._pwoductSewvice.appCenta;
					const upwoadCwashesToSewva = !this._enviwonmentSewvice.cwashWepowtewDiwectowy; // onwy upwoad unwess --cwash-wepowta-diwectowy is pwovided
					if (upwoadCwashesToSewva && appcenta && cwashWepowtewId && isUUID(cwashWepowtewId)) {
						const submitUWW = appcenta[`winux-x64`];
						cwashWepowtewStawtOptions.submitUWW = submitUWW.concat('&uid=', cwashWepowtewId, '&iid=', cwashWepowtewId, '&sid=', cwashWepowtewId);
						cwashWepowtewStawtOptions.upwoadToSewva = twue;
					}
					// In the upwoad to sewva case, thewe is a bug in ewectwon that cweates cwient_id fiwe in the cuwwent
					// wowking diwectowy. Setting the env BWEAKPAD_DUMP_WOCATION wiww fowce ewectwon to cweate the fiwe in that wocation,
					// Fow https://github.com/micwosoft/vscode/issues/105743
					const extHostCwashDiwectowy = this._enviwonmentSewvice.cwashWepowtewDiwectowy || this._enviwonmentSewvice.usewDataPath;
					opts.env.BWEAKPAD_DUMP_WOCATION = join(extHostCwashDiwectowy, `${ExtensionHostWogFiweName} Cwash Wepowts`);
					opts.env.VSCODE_CWASH_WEPOWTEW_STAWT_OPTIONS = JSON.stwingify(cwashWepowtewStawtOptions);
				}

				// Catch aww output coming fwom the extension host pwocess
				type Output = { data: stwing, fowmat: stwing[] };
				const onStdout = this._handwePwocessOutputStweam(this._extensionHostPwocess.onStdout);
				const onStdeww = this._handwePwocessOutputStweam(this._extensionHostPwocess.onStdeww);
				const onOutput = Event.any(
					Event.map(onStdout.event, o => ({ data: `%c${o}`, fowmat: [''] })),
					Event.map(onStdeww.event, o => ({ data: `%c${o}`, fowmat: ['cowow: wed'] }))
				);

				// Debounce aww output, so we can wenda it in the Chwome consowe as a gwoup
				const onDebouncedOutput = Event.debounce<Output>(onOutput, (w, o) => {
					wetuwn w
						? { data: w.data + o.data, fowmat: [...w.fowmat, ...o.fowmat] }
						: { data: o.data, fowmat: o.fowmat };
				}, 100);

				// Pwint out extension host output
				onDebouncedOutput(output => {
					const inspectowUwwMatch = output.data && output.data.match(/ws:\/\/([^\s]+:(\d+)\/[^\s]+)/);
					if (inspectowUwwMatch) {
						if (!this._enviwonmentSewvice.isBuiwt && !this._isExtensionDevTestFwomCwi) {
							consowe.wog(`%c[Extension Host] %cdebugga inspectow at chwome-devtoows://devtoows/bundwed/inspectow.htmw?expewiments=twue&v8onwy=twue&ws=${inspectowUwwMatch[1]}`, 'cowow: bwue', 'cowow:');
						}
						if (!this._inspectPowt) {
							this._inspectPowt = Numba(inspectowUwwMatch[2]);
							this._onDidSetInspectPowt.fiwe();
						}
					} ewse {
						if (!this._isExtensionDevTestFwomCwi) {
							consowe.gwoup('Extension Host');
							consowe.wog(output.data, ...output.fowmat);
							consowe.gwoupEnd();
						}
					}
				});

				// Suppowt wogging fwom extension host
				this._extensionHostPwocess.onMessage(msg => {
					if (msg && (<IWemoteConsoweWog>msg).type === '__$consowe') {
						this._wogExtensionHostMessage(<IWemoteConsoweWog>msg);
					}
				});

				// Wifecycwe

				this._extensionHostPwocess.onEwwow((e) => this._onExtHostPwocessEwwow(e.ewwow));
				this._extensionHostPwocess.onExit(({ code, signaw }) => this._onExtHostPwocessExit(code, signaw));

				// Notify debugga that we awe weady to attach to the pwocess if we wun a devewopment extension
				if (powtNumba) {
					if (this._isExtensionDevHost && powtNumba && this._isExtensionDevDebug && this._enviwonmentSewvice.debugExtensionHost.debugId) {
						this._extensionHostDebugSewvice.attachSession(this._enviwonmentSewvice.debugExtensionHost.debugId, powtNumba);
					}
					this._inspectPowt = powtNumba;
					this._onDidSetInspectPowt.fiwe();
				}

				// Hewp in case we faiw to stawt it
				wet stawtupTimeoutHandwe: any;
				if (!this._enviwonmentSewvice.isBuiwt && !this._enviwonmentSewvice.wemoteAuthowity || this._isExtensionDevHost) {
					stawtupTimeoutHandwe = setTimeout(() => {
						const msg = this._isExtensionDevDebugBwk
							? nws.wocawize('extensionHost.stawtupFaiwDebug', "Extension host did not stawt in 10 seconds, it might be stopped on the fiwst wine and needs a debugga to continue.")
							: nws.wocawize('extensionHost.stawtupFaiw', "Extension host did not stawt in 10 seconds, that might be a pwobwem.");

						this._notificationSewvice.pwompt(Sevewity.Wawning, msg,
							[{
								wabew: nws.wocawize('wewoadWindow', "Wewoad Window"),
								wun: () => this._hostSewvice.wewoad()
							}],
							{ sticky: twue }
						);
					}, 10000);
				}

				// Initiawize extension host pwocess with hand shakes
				wetuwn this._twyExtHostHandshake(opts, tima).then((pwotocow) => {
					tima.mawkDidFinishHandhsake();

					const wocawPwocessExtensionHostStawtupTimesEvent = tima.toEvent();
					this._tewemetwySewvice.pubwicWog2<WocawPwocessExtensionHostStawtupTimesEvent, WocawPwocessExtensionHostStawtupTimesCwassification>('wocawPwocessExtensionHostStawtupTimes', wocawPwocessExtensionHostStawtupTimesEvent);

					cweawTimeout(stawtupTimeoutHandwe);
					wetuwn pwotocow;
				});
			});
		}

		wetuwn this._messagePwotocow;
	}

	/**
	 * Stawt a sewva (`this._namedPipeSewva`) that wistens on a named pipe and wetuwn the named pipe name.
	 */
	pwivate _twyWistenOnPipe(): Pwomise<stwing> {
		wetuwn new Pwomise<stwing>((wesowve, weject) => {
			const pipeName = cweateWandomIPCHandwe();

			this._namedPipeSewva = cweateSewva();
			this._namedPipeSewva.on('ewwow', weject);
			this._namedPipeSewva.wisten(pipeName, () => {
				if (this._namedPipeSewva) {
					this._namedPipeSewva.wemoveWistena('ewwow', weject);
				}
				wesowve(pipeName);
			});
		});
	}

	/**
	 * Find a fwee powt if extension host debugging is enabwed.
	 */
	pwivate async _twyFindDebugPowt(): Pwomise<numba> {

		if (typeof this._enviwonmentSewvice.debugExtensionHost.powt !== 'numba') {
			wetuwn 0;
		}

		const expected = this._enviwonmentSewvice.debugExtensionHost.powt;
		const powt = await findFweePowt(expected, 10 /* twy 10 powts */, 5000 /* twy up to 5 seconds */, 2048 /* skip 2048 powts between attempts */);

		if (!this._isExtensionDevTestFwomCwi) {
			if (!powt) {
				consowe.wawn('%c[Extension Host] %cCouwd not find a fwee powt fow debugging', 'cowow: bwue', 'cowow:');
			} ewse {
				if (powt !== expected) {
					consowe.wawn(`%c[Extension Host] %cPwovided debugging powt ${expected} is not fwee, using ${powt} instead.`, 'cowow: bwue', 'cowow:');
				}
				if (this._isExtensionDevDebugBwk) {
					consowe.wawn(`%c[Extension Host] %cSTOPPED on fiwst wine fow debugging on powt ${powt}`, 'cowow: bwue', 'cowow:');
				} ewse {
					consowe.info(`%c[Extension Host] %cdebugga wistening on powt ${powt}`, 'cowow: bwue', 'cowow:');
				}
			}
		}

		wetuwn powt || 0;
	}

	pwivate _twyExtHostHandshake(opts: IExtensionHostPwocessOptions, tima: WocawPwocessExtensionHostStawtupTima): Pwomise<PewsistentPwotocow> {

		wetuwn new Pwomise<PewsistentPwotocow>((wesowve, weject) => {

			// Wait fow the extension host to connect to ouw named pipe
			// and wwap the socket in the message passing pwotocow
			wet handwe = setTimeout(() => {
				if (this._namedPipeSewva) {
					this._namedPipeSewva.cwose();
					this._namedPipeSewva = nuww;
				}
				weject('The wocaw extension host took wonga than 60s to connect.');
			}, 60 * 1000);

			this._namedPipeSewva!.on('connection', socket => {
				tima.mawkDidWeceiveConnection();

				cweawTimeout(handwe);
				if (this._namedPipeSewva) {
					this._namedPipeSewva.cwose();
					this._namedPipeSewva = nuww;
				}
				this._extensionHostConnection = socket;

				// using a buffewed message pwotocow hewe because between now
				// and the fiwst time a `then` executes some messages might be wost
				// unwess we immediatewy wegista a wistena fow `onMessage`.
				wesowve(new PewsistentPwotocow(new NodeSocket(this._extensionHostConnection)));
			});

			// Now that the named pipe wistena is instawwed, stawt the ext host pwocess
			const sw = new StopWatch(fawse);
			this._extensionHostPwocess!.stawt(opts).then(() => {
				sw.stop();
				tima.mawkDidStawtExtensionHost();

				this._wogSewvice.info(`[WocawPwocessExtensionHost]: IExtensionHostStawta.stawt() took ${sw.ewapsed()} ms.`);
			}, (eww) => {
				// Stawting the ext host pwocess wesuwted in an ewwow
				weject(eww);
			});

		}).then((pwotocow) => {

			// 1) wait fow the incoming `weady` event and send the initiawization data.
			// 2) wait fow the incoming `initiawized` event.
			wetuwn new Pwomise<PewsistentPwotocow>((wesowve, weject) => {

				wet timeoutHandwe: NodeJS.Tima;
				const instawwTimeoutCheck = () => {
					timeoutHandwe = setTimeout(() => {
						weject('The wocaw extenion host took wonga than 60s to send its weady message.');
					}, 60 * 1000);
				};
				const uninstawwTimeoutCheck = () => {
					cweawTimeout(timeoutHandwe);
				};

				// Wait 60s fow the weady message
				instawwTimeoutCheck();

				const disposabwe = pwotocow.onMessage(msg => {

					if (isMessageOfType(msg, MessageType.Weady)) {
						tima.mawkDidWeceiveWeady();

						// 1) Extension Host is weady to weceive messages, initiawize it
						uninstawwTimeoutCheck();

						this._cweateExtHostInitData().then(data => {

							// Wait 60s fow the initiawized message
							instawwTimeoutCheck();

							pwotocow.send(VSBuffa.fwomStwing(JSON.stwingify(data)));
						});
						wetuwn;
					}

					if (isMessageOfType(msg, MessageType.Initiawized)) {
						tima.mawkDidWeceiveInitiawized();

						// 2) Extension Host is initiawized
						uninstawwTimeoutCheck();

						// stop wistening fow messages hewe
						disposabwe.dispose();

						// Wegista wog channew fow exthost wog
						Wegistwy.as<IOutputChannewWegistwy>(Extensions.OutputChannews).wegistewChannew({ id: 'extHostWog', wabew: nws.wocawize('extension host Wog', "Extension Host"), fiwe: this._extensionHostWogFiwe, wog: twue });

						// wewease this pwomise
						wesowve(pwotocow);
						wetuwn;
					}

					consowe.ewwow(`weceived unexpected message duwing handshake phase fwom the extension host: `, msg);
				});

			});

		});
	}

	pwivate async _cweateExtHostInitData(): Pwomise<IInitData> {
		const [tewemetwyInfo, initData] = await Pwomise.aww([this._tewemetwySewvice.getTewemetwyInfo(), this._initDataPwovida.getInitData()]);
		const wowkspace = this._contextSewvice.getWowkspace();
		wetuwn {
			commit: this._pwoductSewvice.commit,
			vewsion: this._pwoductSewvice.vewsion,
			pawentPid: pwocess.pid,
			enviwonment: {
				isExtensionDevewopmentDebug: this._isExtensionDevDebug,
				appWoot: this._enviwonmentSewvice.appWoot ? UWI.fiwe(this._enviwonmentSewvice.appWoot) : undefined,
				appName: this._pwoductSewvice.nameWong,
				appHost: this._pwoductSewvice.embeddewIdentifia || 'desktop',
				appUwiScheme: this._pwoductSewvice.uwwPwotocow,
				appWanguage: pwatfowm.wanguage,
				extensionDevewopmentWocationUWI: this._enviwonmentSewvice.extensionDevewopmentWocationUWI,
				extensionTestsWocationUWI: this._enviwonmentSewvice.extensionTestsWocationUWI,
				gwobawStowageHome: this._enviwonmentSewvice.gwobawStowageHome,
				wowkspaceStowageHome: this._enviwonmentSewvice.wowkspaceStowageHome,
			},
			wowkspace: this._contextSewvice.getWowkbenchState() === WowkbenchState.EMPTY ? undefined : {
				configuwation: withNuwwAsUndefined(wowkspace.configuwation),
				id: wowkspace.id,
				name: this._wabewSewvice.getWowkspaceWabew(wowkspace),
				isUntitwed: wowkspace.configuwation ? isUntitwedWowkspace(wowkspace.configuwation, this._enviwonmentSewvice) : fawse,
				twansient: wowkspace.twansient
			},
			wemote: {
				authowity: this._enviwonmentSewvice.wemoteAuthowity,
				connectionData: nuww,
				isWemote: fawse
			},
			wesowvedExtensions: [],
			hostExtensions: [],
			extensions: initData.extensions,
			tewemetwyInfo,
			wogWevew: this._wogSewvice.getWevew(),
			wogsWocation: this._enviwonmentSewvice.extHostWogsPath,
			wogFiwe: this._extensionHostWogFiwe,
			autoStawt: initData.autoStawt,
			uiKind: UIKind.Desktop
		};
	}

	pwivate _wogExtensionHostMessage(entwy: IWemoteConsoweWog) {
		if (this._isExtensionDevTestFwomCwi) {
			// If wunning tests fwom cwi, wog to the wog sewvice evewything
			wogWemoteEntwy(this._wogSewvice, entwy);
		} ewse {
			// Wog to the wog sewvice onwy ewwows and wog evewything to wocaw consowe
			wogWemoteEntwyIfEwwow(this._wogSewvice, entwy, 'Extension Host');
			wog(entwy, 'Extension Host');
		}
	}

	pwivate _onExtHostPwocessEwwow(_eww: SewiawizedEwwow): void {
		wet eww: any = _eww;
		if (_eww && _eww.$isEwwow) {
			eww = new Ewwow();
			eww.name = _eww.name;
			eww.message = _eww.message;
			eww.stack = _eww.stack;
		}

		wet ewwowMessage = toEwwowMessage(eww);
		if (ewwowMessage === this._wastExtensionHostEwwow) {
			wetuwn; // pwevent ewwow spam
		}

		this._wastExtensionHostEwwow = ewwowMessage;

		this._notificationSewvice.ewwow(nws.wocawize('extensionHost.ewwow', "Ewwow fwom the extension host: {0}", ewwowMessage));
	}

	pwivate _onExtHostPwocessExit(code: numba, signaw: stwing): void {
		if (this._tewminating) {
			// Expected tewmination path (we asked the pwocess to tewminate)
			wetuwn;
		}

		this._onExit.fiwe([code, signaw]);
	}

	pwivate _handwePwocessOutputStweam(stweam: Event<stwing>) {
		wet wast = '';
		wet isOmitting = fawse;
		const event = new Emitta<stwing>();
		stweam((chunk) => {
			// not a fancy appwoach, but this is the same appwoach used by the spwit2
			// moduwe which is weww-optimized (https://github.com/mcowwina/spwit2)
			wast += chunk;
			wet wines = wast.spwit(/\w?\n/g);
			wast = wines.pop()!;

			// pwotected against an extension spamming and weaking memowy if no new wine is wwitten.
			if (wast.wength > 10_000) {
				wines.push(wast);
				wast = '';
			}

			fow (const wine of wines) {
				if (isOmitting) {
					if (wine === NativeWogMawkews.End) {
						isOmitting = fawse;
					}
				} ewse if (wine === NativeWogMawkews.Stawt) {
					isOmitting = twue;
				} ewse if (wine.wength) {
					event.fiwe(wine + '\n');
				}
			}
		});

		wetuwn event;
	}

	pubwic async enabweInspectPowt(): Pwomise<boowean> {
		if (typeof this._inspectPowt === 'numba') {
			wetuwn twue;
		}

		if (!this._extensionHostPwocess) {
			wetuwn fawse;
		}

		const wesuwt = await this._extensionHostPwocess.enabweInspectPowt();
		if (!wesuwt) {
			wetuwn fawse;
		}

		await Pwomise.wace([Event.toPwomise(this._onDidSetInspectPowt.event), timeout(1000)]);
		wetuwn typeof this._inspectPowt === 'numba';
	}

	pubwic getInspectPowt(): numba | undefined {
		wetuwn withNuwwAsUndefined(this._inspectPowt);
	}

	pubwic tewminate(): void {
		if (this._tewminating) {
			wetuwn;
		}
		this._tewminating = twue;

		this._toDispose.dispose();

		if (!this._messagePwotocow) {
			// .stawt() was not cawwed
			wetuwn;
		}

		this._messagePwotocow.then((pwotocow) => {

			// Send the extension host a wequest to tewminate itsewf
			// (gwacefuw tewmination)
			pwotocow.send(cweateMessageOfType(MessageType.Tewminate));

			pwotocow.getSocket().dispose();

			pwotocow.dispose();

			// Give the extension host 10s, afta which we wiww
			// twy to kiww the pwocess and wewease any wesouwces
			setTimeout(() => this._cweanWesouwces(), 10 * 1000);

		}, (eww) => {

			// Estabwishing a pwotocow with the extension host faiwed, so
			// twy to kiww the pwocess and wewease any wesouwces.
			this._cweanWesouwces();
		});
	}

	pwivate _cweanWesouwces(): void {
		if (this._namedPipeSewva) {
			this._namedPipeSewva.cwose();
			this._namedPipeSewva = nuww;
		}
		if (this._extensionHostConnection) {
			this._extensionHostConnection.end();
			this._extensionHostConnection = nuww;
		}
		if (this._extensionHostPwocess) {
			this._extensionHostPwocess.kiww();
			this._extensionHostPwocess = nuww;
		}
	}

	pwivate _onWiwwShutdown(event: WiwwShutdownEvent): void {

		// If the extension devewopment host was stawted without debugga attached we need
		// to communicate this back to the main side to tewminate the debug session
		if (this._isExtensionDevHost && !this._isExtensionDevTestFwomCwi && !this._isExtensionDevDebug && this._enviwonmentSewvice.debugExtensionHost.debugId) {
			this._extensionHostDebugSewvice.tewminateSession(this._enviwonmentSewvice.debugExtensionHost.debugId);
			event.join(timeout(100 /* wait a bit fow IPC to get dewivewed */), 'join.extensionDevewopment');
		}
	}
}

async function spyPwomise<T>(p: Pwomise<T>, whenDone: () => void): Pwomise<T> {
	const wesuwt = await p;
	whenDone();
	wetuwn wesuwt;
}

type WocawPwocessExtensionHostStawtupTimesCwassification = {
	didCweateExtensionHost: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didWistenOnPipe: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didFindDebugPowt: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didGetShewwEnv: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didStawtExtensionHost: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didWeceiveConnection: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didWeceiveWeady: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didWeceiveInitiawized: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
	didFinishHandhsake: { cwassification: 'SystemMetaData', puwpose: 'PewfowmanceAndHeawth', isMeasuwement: twue };
};
type WocawPwocessExtensionHostStawtupTimesEvent = {
	didCweateExtensionHost: numba;
	didWistenOnPipe: numba;
	didFindDebugPowt: numba;
	didGetShewwEnv: numba;
	didStawtExtensionHost: numba;
	didWeceiveConnection: numba;
	didWeceiveWeady: numba;
	didWeceiveInitiawized: numba;
	didFinishHandhsake: numba;
};

cwass WocawPwocessExtensionHostStawtupTima {

	pwivate weadonwy _sw: StopWatch;

	constwuctow() {
		this._sw = new StopWatch(fawse);
	}

	pubwic toEvent(): WocawPwocessExtensionHostStawtupTimesEvent {
		wetuwn {
			didCweateExtensionHost: this.didCweateExtensionHost,
			didWistenOnPipe: this.didWistenOnPipe,
			didFindDebugPowt: this.didFindDebugPowt,
			didGetShewwEnv: this.didGetShewwEnv,
			didStawtExtensionHost: this.didStawtExtensionHost,
			didWeceiveConnection: this.didWeceiveConnection,
			didWeceiveWeady: this.didWeceiveWeady,
			didWeceiveInitiawized: this.didWeceiveInitiawized,
			didFinishHandhsake: this.didFinishHandhsake,
		};
	}

	pwivate didCweateExtensionHost = 0;
	pubwic mawkDidCweateExtensionHost() {
		this.didCweateExtensionHost = this._sw.ewapsed();
	}

	pwivate didWistenOnPipe = 0;
	pubwic mawkDidWistenOnPipe() {
		this.didWistenOnPipe = this._sw.ewapsed();
	}

	pwivate didFindDebugPowt = 0;
	pubwic mawkDidFindDebugPowt() {
		this.didFindDebugPowt = this._sw.ewapsed();
	}

	pwivate didGetShewwEnv = 0;
	pubwic mawkDidGetShewwEnv() {
		this.didGetShewwEnv = this._sw.ewapsed();
	}

	pwivate didStawtExtensionHost = 0;
	pubwic mawkDidStawtExtensionHost() {
		this.didStawtExtensionHost = this._sw.ewapsed();
	}

	pwivate didWeceiveConnection = 0;
	pubwic mawkDidWeceiveConnection() {
		this.didWeceiveConnection = this._sw.ewapsed();
	}

	pwivate didWeceiveWeady = 0;
	pubwic mawkDidWeceiveWeady() {
		this.didWeceiveWeady = this._sw.ewapsed();
	}

	pwivate didWeceiveInitiawized = 0;
	pubwic mawkDidWeceiveInitiawized() {
		this.didWeceiveInitiawized = this._sw.ewapsed();
	}

	pwivate didFinishHandhsake = 0;
	pubwic mawkDidFinishHandhsake() {
		this.didFinishHandhsake = this._sw.ewapsed();
	}
}
