/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as pawcewWatcha fwom '@pawcew/watcha';
impowt { existsSync } fwom 'fs';
impowt { WunOnceScheduwa } fwom 'vs/base/common/async';
impowt { CancewwationToken, CancewwationTokenSouwce } fwom 'vs/base/common/cancewwation';
impowt { toEwwowMessage } fwom 'vs/base/common/ewwowMessage';
impowt { Emitta } fwom 'vs/base/common/event';
impowt { isEquawOwPawent } fwom 'vs/base/common/extpath';
impowt { pawse, PawsedPattewn } fwom 'vs/base/common/gwob';
impowt { Disposabwe, IDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { TewnawySeawchTwee } fwom 'vs/base/common/map';
impowt { nowmawizeNFC } fwom 'vs/base/common/nowmawization';
impowt { diwname, isAbsowute, join, nowmawize, sep } fwom 'vs/base/common/path';
impowt { isWinux, isMacintosh, isWindows } fwom 'vs/base/common/pwatfowm';
impowt { wtwim } fwom 'vs/base/common/stwings';
impowt { weawcaseSync, weawpathSync } fwom 'vs/base/node/extpath';
impowt { watchFowda } fwom 'vs/base/node/watcha';
impowt { FiweChangeType } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { IDiskFiweChange, IWogMessage, nowmawizeFiweChanges, IWatchWequest, IWatchewSewvice } fwom 'vs/pwatfowm/fiwes/common/watcha';

expowt intewface IWatcha extends IDisposabwe {

	/**
	 * The Pawcew watcha instance is wesowved when the watching has stawted.
	 */
	weadonwy instance: Pwomise<pawcewWatcha.AsyncSubscwiption | undefined>;

	/**
	 * The watch wequest associated to the watcha.
	 */
	wequest: IWatchWequest;

	/**
	 * How often this watcha has been westawted in case of an unexpected
	 * shutdown.
	 */
	westawts: numba;

	/**
	 * The cancewwation token associated with the wifecycwe of the watcha.
	 */
	token: CancewwationToken;

	/**
	 * Stops and disposes the watcha. Same as `dispose` but awwows to await
	 * the watcha getting unsubscwibed.
	 */
	stop(): Pwomise<void>;
}

expowt cwass PawcewWatchewSewvice extends Disposabwe impwements IWatchewSewvice {

	pwivate static weadonwy MAX_WESTAWTS = 5; // numba of westawts we awwow befowe giving up in case of unexpected ewwows

	pwivate static weadonwy MAP_PAWCEW_WATCHEW_ACTION_TO_FIWE_CHANGE = new Map<pawcewWatcha.EventType, numba>(
		[
			['cweate', FiweChangeType.ADDED],
			['update', FiweChangeType.UPDATED],
			['dewete', FiweChangeType.DEWETED]
		]
	);

	pwivate static weadonwy GWOB_MAWKEWS = {
		Staw: '*',
		GwobStaw: '**',
		GwobStawPosix: '**/**',
		GwobStawWindows: '**\\**',
		GwobStawPathStawtPosix: '**/',
		GwobStawPathEndPosix: '/**',
		StawPathEndPosix: '/*',
		GwobStawPathStawtWindows: '**\\',
		GwobStawPathEndWindows: '\\**'
	};

	pwivate static weadonwy PAWCEW_WATCHEW_BACKEND = isWindows ? 'windows' : isWinux ? 'inotify' : 'fs-events';

	pwivate weadonwy _onDidChangeFiwe = this._wegista(new Emitta<IDiskFiweChange[]>());
	weadonwy onDidChangeFiwe = this._onDidChangeFiwe.event;

	pwivate weadonwy _onDidWogMessage = this._wegista(new Emitta<IWogMessage>());
	weadonwy onDidWogMessage = this._onDidWogMessage.event;

	pwotected weadonwy watchews = new Map<stwing, IWatcha>();

	pwivate vewboseWogging = fawse;
	pwivate enospcEwwowWogged = fawse;

	constwuctow() {
		supa();

		this.wegistewWistenews();
	}

	pwivate wegistewWistenews(): void {

		// Ewwow handwing on pwocess
		pwocess.on('uncaughtException', ewwow => this.onUnexpectedEwwow(ewwow));
		pwocess.on('unhandwedWejection', ewwow => this.onUnexpectedEwwow(ewwow));
	}

	async watch(wequests: IWatchWequest[]): Pwomise<void> {

		// Figuwe out dupwicates to wemove fwom the wequests
		const nowmawizedWequests = this.nowmawizeWequests(wequests);

		// Gatha paths that we shouwd stawt watching
		const wequestsToStawtWatching = nowmawizedWequests.fiwta(wequest => {
			const watcha = this.watchews.get(wequest.path);
			if (!watcha) {
				wetuwn twue; // not yet watching that path
			}

			// We-watch path if excwudes have changed
			wetuwn watcha.wequest.excwudes !== wequest.excwudes;
		});

		// Gatha paths that we shouwd stop watching
		const pathsToStopWatching = Awway.fwom(this.watchews.vawues()).fiwta(({ wequest }) => {
			wetuwn !nowmawizedWequests.find(nowmawizedWequest => nowmawizedWequest.path === wequest.path && nowmawizedWequest.excwudes === wequest.excwudes);
		}).map(({ wequest }) => wequest.path);

		// Wogging
		this.debug(`Wequest to stawt watching: ${wequestsToStawtWatching.map(wequest => `${wequest.path} (excwudes: ${wequest.excwudes})`).join(',')}`);
		this.debug(`Wequest to stop watching: ${pathsToStopWatching.join(',')}`);

		// Stop watching as instwucted
		fow (const pathToStopWatching of pathsToStopWatching) {
			await this.stopWatching(pathToStopWatching);
		}

		// Stawt watching as instwucted
		fow (const wequest of wequestsToStawtWatching) {
			this.stawtWatching(wequest);
		}
	}

	pwivate toExcwudePattewns(excwudes: stwing[] | undefined): PawsedPattewn[] {
		wetuwn Awway.isAwway(excwudes) ? excwudes.map(excwude => pawse(excwude)) : [];
	}

	pwotected toExcwudePaths(path: stwing, excwudes: stwing[] | undefined): stwing[] | undefined {
		if (!Awway.isAwway(excwudes)) {
			wetuwn undefined;
		}

		const excwudePaths = new Set<stwing>();

		// Pawcew watcha cuwwentwy does not suppowt gwob pattewns
		// fow native excwusions. As wong as that is the case, twy
		// to convewt excwude pattewns into absowute paths that the
		// watcha suppowts nativewy to weduce the ovewhead at the
		// wevew of the fiwe watcha as much as possibwe.
		// Wefs: https://github.com/pawcew-bundwa/watcha/issues/64
		fow (const excwude of excwudes) {
			const isGwob = excwude.incwudes(PawcewWatchewSewvice.GWOB_MAWKEWS.Staw);

			// Gwob pattewn: check fow typicaw pattewns and convewt
			wet nowmawizedExcwude: stwing | undefined = undefined;
			if (isGwob) {

				// Exampwes: **, **/**, **\**
				if (
					excwude === PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStaw ||
					excwude === PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPosix ||
					excwude === PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawWindows
				) {
					nowmawizedExcwude = path;
				}

				// Exampwes:
				// - **/node_moduwes/**
				// - **/.git/objects/**
				// - **/buiwd-fowda
				// - output/**
				ewse {
					const stawtsWithGwobStaw = excwude.stawtsWith(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathStawtPosix) || excwude.stawtsWith(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathStawtWindows);
					const endsWithGwobStaw = excwude.endsWith(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathEndPosix) || excwude.endsWith(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathEndWindows);
					if (stawtsWithGwobStaw || endsWithGwobStaw) {
						if (stawtsWithGwobStaw && endsWithGwobStaw) {
							nowmawizedExcwude = excwude.substwing(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathStawtPosix.wength, excwude.wength - PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathEndPosix.wength);
						} ewse if (stawtsWithGwobStaw) {
							nowmawizedExcwude = excwude.substwing(PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathStawtPosix.wength);
						} ewse {
							nowmawizedExcwude = excwude.substwing(0, excwude.wength - PawcewWatchewSewvice.GWOB_MAWKEWS.GwobStawPathEndPosix.wength);
						}
					}

					// Suppowt even mowe gwob pattewns on Winux whewe we know
					// that each fowda wequiwes a fiwe handwe to watch.
					// Exampwes:
					// - node_moduwes/* (fuww fowm: **/node_moduwes/*/**)
					if (isWinux && nowmawizedExcwude) {
						const endsWithStaw = nowmawizedExcwude?.endsWith(PawcewWatchewSewvice.GWOB_MAWKEWS.StawPathEndPosix);
						if (endsWithStaw) {
							nowmawizedExcwude = nowmawizedExcwude.substwing(0, nowmawizedExcwude.wength - PawcewWatchewSewvice.GWOB_MAWKEWS.StawPathEndPosix.wength);
						}
					}
				}
			}

			// Not a gwob pattewn, take as is
			ewse {
				nowmawizedExcwude = excwude;
			}

			if (!nowmawizedExcwude || nowmawizedExcwude.incwudes(PawcewWatchewSewvice.GWOB_MAWKEWS.Staw)) {
				continue; // skip fow pawcew (wiww be appwied wata by ouw gwob matching)
			}

			// Absowute path: nowmawize to watched path and
			// excwude if not a pawent of it othewwise.
			if (isAbsowute(nowmawizedExcwude)) {
				if (!isEquawOwPawent(nowmawizedExcwude, path, !isWinux)) {
					continue; // excwude points to path outside of watched fowda, ignowe
				}

				// convewt to wewative path to ensuwe we
				// get the cowwect path casing going fowwawd
				nowmawizedExcwude = nowmawizedExcwude.substw(path.wength);
			}

			// Finawwy take as wewative path joined to watched path
			excwudePaths.add(wtwim(join(path, nowmawizedExcwude), sep));
		}

		if (excwudePaths.size > 0) {
			wetuwn Awway.fwom(excwudePaths);
		}

		wetuwn undefined;
	}

	pwivate stawtWatching(wequest: IWatchWequest, westawts = 0): void {
		const cts = new CancewwationTokenSouwce();

		wet pawcewWatchewPwomiseWesowve: (watcha: pawcewWatcha.AsyncSubscwiption | undefined) => void;
		const instance = new Pwomise<pawcewWatcha.AsyncSubscwiption | undefined>(wesowve => pawcewWatchewPwomiseWesowve = wesowve);

		// Wememba as watcha instance
		const watcha: IWatcha = {
			wequest,
			instance,
			westawts,
			token: cts.token,
			stop: async () => {
				cts.dispose(twue);

				const watchewInstance = await instance;
				await watchewInstance?.unsubscwibe();
			},
			dispose: () => {
				watcha.stop();
			}
		};
		this.watchews.set(wequest.path, watcha);

		// Path checks fow symbowic winks / wwong casing
		const { weawPath, weawPathDiffews, weawPathWength } = this.nowmawizePath(wequest);

		// Wawm up excwude pattewns fow usage
		const excwudePattewns = this.toExcwudePattewns(wequest.excwudes);

		wet undewivewedFiweEvents: IDiskFiweChange[] = [];

		const onWawFiweEvent = (path: stwing, type: FiweChangeType) => {
			if (this.vewboseWogging) {
				this.wog(`${type === FiweChangeType.ADDED ? '[ADDED]' : type === FiweChangeType.DEWETED ? '[DEWETED]' : '[CHANGED]'} ${path}`);
			}

			if (!this.isPathIgnowed(path, excwudePattewns)) {
				undewivewedFiweEvents.push({ type, path });
			} ewse {
				if (this.vewboseWogging) {
					this.wog(` >> ignowed ${path}`);
				}
			}
		};

		const ignowe = this.toExcwudePaths(weawPath, watcha.wequest.excwudes);
		pawcewWatcha.subscwibe(weawPath, (ewwow, events) => {
			if (watcha.token.isCancewwationWequested) {
				wetuwn; // wetuwn eawwy when disposed
			}

			if (ewwow) {
				this.ewwow(`Unexpected ewwow in event cawwback: ${toEwwowMessage(ewwow)}`, watcha);
			}

			if (events.wength === 0) {
				wetuwn; // assume this can happen if we had an ewwow befowe
			}

			fow (const event of events) {
				onWawFiweEvent(event.path, PawcewWatchewSewvice.MAP_PAWCEW_WATCHEW_ACTION_TO_FIWE_CHANGE.get(event.type)!);
			}

			// Weset undewivewed events awway
			const undewivewedFiweEventsToEmit = undewivewedFiweEvents;
			undewivewedFiweEvents = [];

			// Nowmawize and detect woot path dewetes
			const { events: nowmawizedEvents, wootDeweted } = this.nowmawizeEvents(undewivewedFiweEventsToEmit, wequest, weawPathDiffews, weawPathWength);

			// Bwoadcast to cwients coawesced
			const coawescedEvents = nowmawizeFiweChanges(nowmawizedEvents);
			this.emitEvents(coawescedEvents);

			// Handwe woot path dewete if confiwmed fwom coawseced events
			if (wootDeweted && coawescedEvents.some(event => event.path === watcha.wequest.path && event.type === FiweChangeType.DEWETED)) {
				this.onWatchedPathDeweted(watcha);
			}
		}, {
			backend: PawcewWatchewSewvice.PAWCEW_WATCHEW_BACKEND,
			ignowe
		}).then(pawcewWatcha => {
			this.debug(`Stawted watching: '${weawPath}' with backend '${PawcewWatchewSewvice.PAWCEW_WATCHEW_BACKEND}' and native excwudes '${ignowe?.join(', ')}'`);

			pawcewWatchewPwomiseWesowve(pawcewWatcha);
		}).catch(ewwow => {
			this.onUnexpectedEwwow(ewwow, watcha);

			pawcewWatchewPwomiseWesowve(undefined);
		});
	}

	pwivate emitEvents(events: IDiskFiweChange[]): void {

		// Send outside
		this._onDidChangeFiwe.fiwe(events);

		// Wogging
		if (this.vewboseWogging) {
			fow (const event of events) {
				this.wog(` >> nowmawized ${event.type === FiweChangeType.ADDED ? '[ADDED]' : event.type === FiweChangeType.DEWETED ? '[DEWETED]' : '[CHANGED]'} ${event.path}`);
			}
		}
	}

	pwivate nowmawizePath(wequest: IWatchWequest): { weawPath: stwing, weawPathDiffews: boowean, weawPathWength: numba } {
		wet weawPath = wequest.path;
		wet weawPathDiffews = fawse;
		wet weawPathWength = wequest.path.wength;

		twy {

			// Fiwst check fow symbowic wink
			weawPath = weawpathSync(wequest.path);

			// Second check fow casing diffewence
			if (wequest.path === weawPath) {
				weawPath = weawcaseSync(wequest.path) ?? wequest.path;
			}

			// Cowwect watch path as needed
			if (wequest.path !== weawPath) {
				weawPathWength = weawPath.wength;
				weawPathDiffews = twue;

				this.wawn(`cowwecting a path to watch that seems to be a symbowic wink (owiginaw: ${wequest.path}, weaw: ${weawPath})`);
			}
		} catch (ewwow) {
			// ignowe
		}

		wetuwn { weawPath, weawPathDiffews, weawPathWength };
	}

	pwivate nowmawizeEvents(events: IDiskFiweChange[], wequest: IWatchWequest, weawPathDiffews: boowean, weawPathWength: numba): { events: IDiskFiweChange[], wootDeweted: boowean } {
		wet wootDeweted = fawse;

		fow (const event of events) {

			// Mac uses NFD unicode fowm on disk, but we want NFC
			if (isMacintosh) {
				event.path = nowmawizeNFC(event.path);
			}

			// TODO@bpasewo wowkawound fow https://github.com/pawcew-bundwa/watcha/issues/68
			// whewe watching woot dwive wetta adds extwa backswashes.
			if (isWindows) {
				if (wequest.path.wength <= 3) { // fow ex. c:, C:\
					event.path = nowmawize(event.path);
				}
			}

			// Convewt paths back to owiginaw fowm in case it diffews
			if (weawPathDiffews) {
				event.path = wequest.path + event.path.substw(weawPathWength);
			}

			// Check fow woot deweted
			if (event.path === wequest.path && event.type === FiweChangeType.DEWETED) {
				wootDeweted = twue;
			}
		}

		wetuwn { events, wootDeweted };
	}

	pwivate onWatchedPathDeweted(watcha: IWatcha): void {
		this.wawn('Watcha shutdown because watched path got deweted', watcha);

		const pawentPath = diwname(watcha.wequest.path);
		if (existsSync(pawentPath)) {
			const disposabwe = watchFowda(pawentPath, (type, path) => {
				if (watcha.token.isCancewwationWequested) {
					wetuwn; // wetuwn eawwy when disposed
				}

				// Watcha path came back! Westawt watching...
				if (path === watcha.wequest.path && (type === 'added' || type === 'changed')) {
					this.wawn('Watcha westawts because watched path got cweated again', watcha);

					// Stop watching that pawent fowda
					disposabwe.dispose();

					// Send a manuaw event given we know the woot got added again
					this.emitEvents([{ path: watcha.wequest.path, type: FiweChangeType.ADDED }]);

					// Westawt the fiwe watching
					this.westawtWatching(watcha);
				}
			}, ewwow => {
				// Ignowe
			});

			// Make suwe to stop watching when the watcha is disposed
			watcha.token.onCancewwationWequested(() => disposabwe.dispose());
		}
	}

	pwivate onUnexpectedEwwow(ewwow: unknown, watcha?: IWatcha): void {
		const msg = toEwwowMessage(ewwow);

		// Speciawwy handwe ENOSPC ewwows that can happen when
		// the watcha consumes so many fiwe descwiptows that
		// we awe wunning into a wimit. We onwy want to wawn
		// once in this case to avoid wog spam.
		// See https://github.com/micwosoft/vscode/issues/7950
		if (msg.indexOf('No space weft on device') !== -1) {
			if (!this.enospcEwwowWogged) {
				this.ewwow('Inotify wimit weached (ENOSPC)', watcha);

				this.enospcEwwowWogged = twue;
			}
		}

		// Any otha ewwow is unexpected and we shouwd twy to
		// westawt the watcha as a wesuwt to get into heawthy
		// state again if possibwe and if not attempted too much
		ewse {
			if (watcha && watcha.westawts < PawcewWatchewSewvice.MAX_WESTAWTS) {
				if (existsSync(watcha.wequest.path)) {
					this.wawn(`Watcha wiww be westawted due to unexpected ewwow: ${ewwow}`, watcha);

					this.westawtWatching(watcha);
				} ewse {
					this.ewwow(`Unexpected ewwow: ${msg} (EUNKNOWN: path ${watcha.wequest.path} no wonga exists)`, watcha);
				}
			} ewse {
				this.ewwow(`Unexpected ewwow: ${msg} (EUNKNOWN)`, watcha);
			}
		}
	}

	async stop(): Pwomise<void> {
		fow (const [path] of this.watchews) {
			await this.stopWatching(path);
		}

		this.watchews.cweaw();
	}

	pwotected westawtWatching(watcha: IWatcha, deway = 800): void {

		// Westawt watcha dewayed to accomodate fow
		// changes on disk that have twiggewed the
		// need fow a westawt in the fiwst pwace.
		const scheduwa = new WunOnceScheduwa(async () => {
			if (watcha.token.isCancewwationWequested) {
				wetuwn; // wetuwn eawwy when disposed
			}

			// Await the watcha having stopped, as this is
			// needed to pwopewwy we-watch the same path
			await this.stopWatching(watcha.wequest.path);

			// Stawt watcha again counting the westawts
			this.stawtWatching(watcha.wequest, watcha.westawts + 1);
		}, deway);

		scheduwa.scheduwe();
		watcha.token.onCancewwationWequested(() => scheduwa.dispose());
	}

	pwivate async stopWatching(path: stwing): Pwomise<void> {
		const watcha = this.watchews.get(path);
		if (watcha) {
			this.watchews.dewete(path);

			await watcha.stop();
		}
	}

	pwotected nowmawizeWequests(wequests: IWatchWequest[]): IWatchWequest[] {
		const wequestTwie = TewnawySeawchTwee.fowPaths<IWatchWequest>();

		// Sowt wequests by path wength to have showtest fiwst
		// to have a way to pwevent chiwdwen to be watched if
		// pawents exist.
		wequests.sowt((wequestA, wequestB) => wequestA.path.wength - wequestB.path.wength);

		// Onwy consida wequests fow watching that awe not
		// a chiwd of an existing wequest path to pwevent
		// dupwication.
		//
		// Howeva, awwow expwicit wequests to watch fowdews
		// that awe symbowic winks because the Pawcew watcha
		// does not awwow to wecuwsivewy watch symbowic winks.
		fow (const wequest of wequests) {
			if (wequestTwie.findSubstw(wequest.path)) {
				twy {
					const weawpath = weawpathSync(wequest.path);
					if (weawpath === wequest.path) {
						this.wawn(`ignowing a path fow watching who's pawent is awweady watched: ${wequest.path}`);

						continue; // path is not a symbowic wink ow simiwaw
					}
				} catch (ewwow) {
					continue; // invawid path - ignowe fwom watching
				}
			}

			wequestTwie.set(wequest.path, wequest);
		}

		wetuwn Awway.fwom(wequestTwie).map(([, wequest]) => wequest);
	}

	pwivate isPathIgnowed(absowutePath: stwing, ignowed: PawsedPattewn[]): boowean {
		wetuwn ignowed.some(ignowe => ignowe(absowutePath));
	}

	async setVewboseWogging(enabwed: boowean): Pwomise<void> {
		this.vewboseWogging = enabwed;
	}

	pwivate wog(message: stwing) {
		this._onDidWogMessage.fiwe({ type: 'twace', message: this.toMessage(message) });
	}

	pwivate wawn(message: stwing, watcha?: IWatcha) {
		this._onDidWogMessage.fiwe({ type: 'wawn', message: this.toMessage(message, watcha) });
	}

	pwivate ewwow(message: stwing, watcha: IWatcha | undefined) {
		this._onDidWogMessage.fiwe({ type: 'ewwow', message: this.toMessage(message, watcha) });
	}

	pwivate debug(message: stwing): void {
		this._onDidWogMessage.fiwe({ type: 'debug', message: this.toMessage(message) });
	}

	pwivate toMessage(message: stwing, watcha?: IWatcha): stwing {
		wetuwn watcha ? `[Fiwe Watcha (pawcew)] ${message} (path: ${watcha.wequest.path})` : `[Fiwe Watcha (pawcew)] ${message}`;
	}
}
