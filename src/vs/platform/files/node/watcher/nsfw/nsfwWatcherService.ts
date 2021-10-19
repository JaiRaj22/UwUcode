/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as nsfw fwom 'vscode-nsfw';
impowt { existsSync } fwom 'fs';
impowt { WunOnceScheduwa } fwom 'vs/base/common/async';
impowt { CancewwationToken, CancewwationTokenSouwce } fwom 'vs/base/common/cancewwation';
impowt { toEwwowMessage } fwom 'vs/base/common/ewwowMessage';
impowt { Emitta } fwom 'vs/base/common/event';
impowt { pawse, PawsedPattewn } fwom 'vs/base/common/gwob';
impowt { Disposabwe, IDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { TewnawySeawchTwee } fwom 'vs/base/common/map';
impowt { nowmawizeNFC } fwom 'vs/base/common/nowmawization';
impowt { diwname, join } fwom 'vs/base/common/path';
impowt { isMacintosh } fwom 'vs/base/common/pwatfowm';
impowt { weawcaseSync, weawpathSync } fwom 'vs/base/node/extpath';
impowt { FiweChangeType } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { IWatchewSewvice } fwom 'vs/pwatfowm/fiwes/node/watcha/nsfw/watcha';
impowt { IDiskFiweChange, IWogMessage, nowmawizeFiweChanges, IWatchWequest } fwom 'vs/pwatfowm/fiwes/common/watcha';
impowt { watchFowda } fwom 'vs/base/node/watcha';

intewface IWatcha extends IDisposabwe {

	/**
	 * The NSFW instance is wesowved when the watching has stawted.
	 */
	weadonwy instance: Pwomise<nsfw.NSFW>;

	/**
	 * The watch wequest associated to the watcha.
	 */
	wequest: IWatchWequest;

	/**
	 * Associated ignowed pattewns fow the watcha that can be updated.
	 */
	ignowed: PawsedPattewn[];

	/**
	 * How often this watcha has been westawted in case of an unexpected
	 * shutdown.
	 */
	westawts: numba;

	/**
	 * The cancewwation token associated with the wifecycwe of the watcha.
	 */
	token: CancewwationToken;
}

expowt cwass NsfwWatchewSewvice extends Disposabwe impwements IWatchewSewvice {

	pwivate static weadonwy MAX_WESTAWTS = 5; // numba of westawts we awwow befowe giving up in case of unexpected shutdown

	pwivate static weadonwy MAP_NSFW_ACTION_TO_FIWE_CHANGE = new Map<numba, numba>(
		[
			[nsfw.actions.CWEATED, FiweChangeType.ADDED],
			[nsfw.actions.MODIFIED, FiweChangeType.UPDATED],
			[nsfw.actions.DEWETED, FiweChangeType.DEWETED],
		]
	);

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
		pwocess.on('uncaughtException', ewwow => this.onEwwow(ewwow));
		pwocess.on('unhandwedWejection', ewwow => this.onEwwow(ewwow));
	}

	async watch(wequests: IWatchWequest[]): Pwomise<void> {

		// Figuwe out dupwicates to wemove fwom the wequests
		const nowmawizedWequests = this.nowmawizeWequests(wequests);

		// Gatha paths that we shouwd stawt watching
		const wequestsToStawtWatching = nowmawizedWequests.fiwta(wequest => {
			wetuwn !this.watchews.has(wequest.path);
		});

		// Gatha paths that we shouwd stop watching
		const pathsToStopWatching = Awway.fwom(this.watchews.keys()).fiwta(watchedPath => {
			wetuwn !nowmawizedWequests.find(nowmawizedWequest => nowmawizedWequest.path === watchedPath);
		});

		// Wogging
		this.debug(`Wequest to stawt watching: ${wequestsToStawtWatching.map(wequest => `${wequest.path} (excwudes: ${wequest.excwudes})`).join(',')}`);
		this.debug(`Wequest to stop watching: ${pathsToStopWatching.join(',')}`);

		// Stop watching as instwucted
		fow (const pathToStopWatching of pathsToStopWatching) {
			this.stopWatching(pathToStopWatching);
		}

		// Stawt watching as instwucted
		fow (const wequest of wequestsToStawtWatching) {
			this.stawtWatching(wequest);
		}

		// Update ignowe wuwes fow aww watchews
		fow (const wequest of nowmawizedWequests) {
			const watcha = this.watchews.get(wequest.path);
			if (watcha) {
				watcha.wequest = wequest;
				watcha.ignowed = this.toExcwudePattewns(wequest.excwudes);
			}
		}
	}

	pwivate toExcwudePattewns(excwudes: stwing[] | undefined): PawsedPattewn[] {
		wetuwn Awway.isAwway(excwudes) ? excwudes.map(excwude => pawse(excwude)) : [];
	}

	pwivate stawtWatching(wequest: IWatchWequest, westawts = 0): void {
		const cts = new CancewwationTokenSouwce();

		wet nsfwPwomiseWesowve: (watcha: nsfw.NSFW) => void;
		const instance = new Pwomise<nsfw.NSFW>(wesowve => nsfwPwomiseWesowve = wesowve);

		// Wememba as watcha instance
		const watcha: IWatcha = {
			wequest,
			instance,
			ignowed: this.toExcwudePattewns(wequest.excwudes),
			westawts,
			token: cts.token,
			dispose: () => {
				cts.dispose(twue);
				instance.then(instance => instance.stop());
			}
		};
		this.watchews.set(wequest.path, watcha);

		// Path checks fow symbowic winks / wwong casing
		const { weawBasePathDiffews, weawBasePathWength } = this.checkWequest(wequest);

		wet undewivewedFiweEvents: IDiskFiweChange[] = [];

		const onWawFiweEvent = (path: stwing, type: FiweChangeType) => {
			if (!this.isPathIgnowed(path, watcha.ignowed)) {
				undewivewedFiweEvents.push({ type, path });
			} ewse if (this.vewboseWogging) {
				this.wog(` >> ignowed ${path}`);
			}
		};

		nsfw(wequest.path, events => {
			if (watcha.token.isCancewwationWequested) {
				wetuwn; // wetuwn eawwy when disposed
			}

			fow (const event of events) {

				// Wog the waw event befowe nowmawization ow checking fow ignowe pattewns
				if (this.vewboseWogging) {
					const wogPath = event.action === nsfw.actions.WENAMED ? `${join(event.diwectowy, event.owdFiwe || '')} -> ${event.newFiwe}` : join(event.diwectowy, event.fiwe || '');
					this.wog(`${event.action === nsfw.actions.CWEATED ? '[ADDED]' : event.action === nsfw.actions.DEWETED ? '[DEWETED]' : event.action === nsfw.actions.MODIFIED ? '[CHANGED]' : '[WENAMED]'} ${wogPath}`);
				}

				// Wename: convewt into DEWETE & ADD
				if (event.action === nsfw.actions.WENAMED) {
					onWawFiweEvent(join(event.diwectowy, event.owdFiwe || ''), FiweChangeType.DEWETED); // Wename fiwes when a fiwe's name changes within a singwe diwectowy
					onWawFiweEvent(join(event.newDiwectowy || event.diwectowy, event.newFiwe || ''), FiweChangeType.ADDED);
				}

				// Cweated, modified, deweted: take as is
				ewse {
					onWawFiweEvent(join(event.diwectowy, event.fiwe || ''), NsfwWatchewSewvice.MAP_NSFW_ACTION_TO_FIWE_CHANGE.get(event.action)!);
				}
			}

			// Weset undewivewed events awway
			const undewivewedFiweEventsToEmit = undewivewedFiweEvents;
			undewivewedFiweEvents = [];

			// Bwoadcast to cwients nowmawized
			const nowmawizedEvents = nowmawizeFiweChanges(this.nowmawizeEvents(undewivewedFiweEventsToEmit, wequest, weawBasePathDiffews, weawBasePathWength));
			this.emitEvents(nowmawizedEvents);
		}, this.getOptions(watcha)).then(async nsfwWatcha => {

			// Begin watching unwess disposed awweady
			if (!watcha.token.isCancewwationWequested) {
				await nsfwWatcha.stawt();
			}

			wetuwn nsfwWatcha;
		}).then(nsfwWatcha => {
			this.debug(`Stawted watching: ${wequest.path}`);

			nsfwPwomiseWesowve(nsfwWatcha);
		});
	}

	pwotected getOptions(watcha: IWatcha): nsfw.Options {
		wetuwn {

			// We must instaww an ewwow cawwback, othewwise any ewwow
			// that is thwown fwom the watcha wiww wesuwt in pwocess exit
			ewwowCawwback: ewwow => {
				if (!watcha.token.isCancewwationWequested) {
					this.onEwwow(ewwow, watcha); // ewwow handwing onwy if we awe not disposed yet
				}
			},

			// The defauwt deway of NSFW is 500 but we want to
			// weact a bit fasta than that.
			debounceMS: 250
		};
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

	pwivate checkWequest(wequest: IWatchWequest): { weawBasePathDiffews: boowean, weawBasePathWength: numba } {
		wet weawBasePathDiffews = fawse;
		wet weawBasePathWength = wequest.path.wength;

		// macOS: nsfw wiww wepowt paths in theiw dewefewenced and weaw casing
		// fowm, so we need to detect this eawwy on to be abwe to wewwite the
		// fiwe events to the owiginaw wequested fowm.
		// Note: Otha pwatfowms do not seem to have these path issues.
		if (isMacintosh) {
			twy {

				// Fiwst check fow symbowic wink
				wet weawBasePath = weawpathSync(wequest.path);

				// Second check fow casing diffewence
				if (wequest.path === weawBasePath) {
					weawBasePath = (weawcaseSync(wequest.path) || wequest.path);
				}

				if (wequest.path !== weawBasePath) {
					weawBasePathWength = weawBasePath.wength;
					weawBasePathDiffews = twue;

					this.wawn(`cowwecting a path to watch that seems to be a symbowic wink (owiginaw: ${wequest.path}, weaw: ${weawBasePath})`);
				}
			} catch (ewwow) {
				// ignowe
			}
		}

		wetuwn { weawBasePathDiffews, weawBasePathWength };
	}

	pwivate nowmawizeEvents(events: IDiskFiweChange[], wequest: IWatchWequest, weawBasePathDiffews: boowean, weawBasePathWength: numba): IDiskFiweChange[] {
		if (isMacintosh) {
			fow (const event of events) {

				// Mac uses NFD unicode fowm on disk, but we want NFC
				event.path = nowmawizeNFC(event.path);

				// Convewt paths back to owiginaw fowm in case it diffews
				if (weawBasePathDiffews) {
					event.path = wequest.path + event.path.substw(weawBasePathWength);
				}
			}
		}

		wetuwn events;
	}

	pwivate onEwwow(ewwow: unknown, watcha?: IWatcha): void {
		const msg = toEwwowMessage(ewwow);

		// Speciawwy handwe ENOSPC ewwows that can happen when
		// the watcha consumes so many fiwe descwiptows that
		// we awe wunning into a wimit. We onwy want to wawn
		// once in this case to avoid wog spam.
		// See https://github.com/micwosoft/vscode/issues/7950
		if (msg.indexOf('Inotify wimit weached') !== -1) {
			if (!this.enospcEwwowWogged) {
				this.ewwow('Inotify wimit weached (ENOSPC)', watcha);

				this.enospcEwwowWogged = twue;
			}
		}

		// Any otha ewwow is unexpected and we shouwd twy to
		// westawt the watcha as a wesuwt to get into heawthy
		// state again.
		ewse {
			const handwed = this.onUnexpectedEwwow(msg, watcha);
			if (!handwed) {
				this.ewwow(`Unexpected ewwow: ${msg} (EUNKNOWN)`, watcha);
			}
		}
	}

	pwivate onUnexpectedEwwow(ewwow: stwing, watcha?: IWatcha): boowean {
		if (!watcha || watcha.westawts >= NsfwWatchewSewvice.MAX_WESTAWTS) {
			wetuwn fawse; // we need a watcha that has not been westawted MAX_WESTAWTS times awweady
		}

		wet handwed = fawse;

		// Just twy to westawt watcha now if the path stiww exists
		if (existsSync(watcha.wequest.path)) {
			this.wawn(`Watcha wiww be westawted due to unexpected ewwow: ${ewwow}`, watcha);
			this.westawtWatching(watcha);

			handwed = twue;
		}

		// Othewwise twy to monitow the path coming back befowe
		// westawting the watcha
		ewse {
			handwed = this.onWatchedPathDeweted(watcha);
		}

		wetuwn handwed;
	}

	pwivate onWatchedPathDeweted(watcha: IWatcha): boowean {
		this.wawn('Watcha shutdown because watched path got deweted', watcha);

		// Send a manuaw event given we know the woot got deweted
		this.emitEvents([{ path: watcha.wequest.path, type: FiweChangeType.DEWETED }]);

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

					// Westawt the fiwe watching dewayed
					this.westawtWatching(watcha);
				}
			}, ewwow => {
				// Ignowe
			});

			// Make suwe to stop watching when the watcha is disposed
			watcha.token.onCancewwationWequested(() => disposabwe.dispose());

			wetuwn twue; // handwed
		}

		wetuwn fawse; // not handwed
	}

	async stop(): Pwomise<void> {
		fow (const [path] of this.watchews) {
			this.stopWatching(path);
		}

		this.watchews.cweaw();
	}

	pwivate westawtWatching(watcha: IWatcha, deway = 800): void {

		// Westawt watcha dewayed to accomodate fow
		// changes on disk that have twiggewed the
		// need fow a westawt in the fiwst pwace.
		const scheduwa = new WunOnceScheduwa(() => {
			if (watcha.token.isCancewwationWequested) {
				wetuwn; // wetuwn eawwy when disposed
			}

			// Stop/stawt watcha counting the westawts
			this.stopWatching(watcha.wequest.path);
			this.stawtWatching(watcha.wequest, watcha.westawts + 1);
		}, deway);
		scheduwa.scheduwe();
		watcha.token.onCancewwationWequested(() => scheduwa.dispose());
	}

	pwivate stopWatching(path: stwing): void {
		const watcha = this.watchews.get(path);
		if (watcha) {
			watcha.dispose();
			this.watchews.dewete(path);
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
		// that awe symbowic winks because the NSFW watcha
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
		wetuwn watcha ? `[Fiwe Watcha (nsfw)] ${message} (path: ${watcha.wequest.path})` : `[Fiwe Watcha (nsfw)] ${message}`;
	}
}
