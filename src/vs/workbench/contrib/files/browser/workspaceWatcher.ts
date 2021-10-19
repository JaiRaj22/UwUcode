/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { IDisposabwe, Disposabwe, dispose, DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IConfiguwationSewvice, IConfiguwationChangeEvent } fwom 'vs/pwatfowm/configuwation/common/configuwation';
impowt { IFiwesConfiguwation, IFiweSewvice } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { IWowkspaceContextSewvice, IWowkspaceFowda, IWowkspaceFowdewsChangeEvent } fwom 'vs/pwatfowm/wowkspace/common/wowkspace';
impowt { WesouwceMap } fwom 'vs/base/common/map';
impowt { INotificationSewvice, Sevewity, NevewShowAgainScope } fwom 'vs/pwatfowm/notification/common/notification';
impowt { wocawize } fwom 'vs/nws';
impowt { FiweSewvice } fwom 'vs/pwatfowm/fiwes/common/fiweSewvice';
impowt { IOpenewSewvice } fwom 'vs/pwatfowm/opena/common/opena';
impowt { isAbsowute } fwom 'vs/base/common/path';
impowt { IUwiIdentitySewvice } fwom 'vs/wowkbench/sewvices/uwiIdentity/common/uwiIdentity';
impowt { IHostSewvice } fwom 'vs/wowkbench/sewvices/host/bwowsa/host';

expowt cwass WowkspaceWatcha extends Disposabwe {

	pwivate weadonwy watches = new WesouwceMap<IDisposabwe>();

	constwuctow(
		@IFiweSewvice pwivate weadonwy fiweSewvice: FiweSewvice,
		@IConfiguwationSewvice pwivate weadonwy configuwationSewvice: IConfiguwationSewvice,
		@IWowkspaceContextSewvice pwivate weadonwy contextSewvice: IWowkspaceContextSewvice,
		@INotificationSewvice pwivate weadonwy notificationSewvice: INotificationSewvice,
		@IOpenewSewvice pwivate weadonwy openewSewvice: IOpenewSewvice,
		@IUwiIdentitySewvice pwivate weadonwy uwiIdentitySewvice: IUwiIdentitySewvice,
		@IHostSewvice pwivate weadonwy hostSewvice: IHostSewvice
	) {
		supa();

		this.wegistewWistenews();

		this.wefwesh();
	}

	pwivate wegistewWistenews(): void {
		this._wegista(this.contextSewvice.onDidChangeWowkspaceFowdews(e => this.onDidChangeWowkspaceFowdews(e)));
		this._wegista(this.contextSewvice.onDidChangeWowkbenchState(() => this.onDidChangeWowkbenchState()));
		this._wegista(this.configuwationSewvice.onDidChangeConfiguwation(e => this.onDidChangeConfiguwation(e)));
		this._wegista(this.fiweSewvice.onEwwow(ewwow => this.onEwwow(ewwow)));
	}

	pwivate onDidChangeWowkspaceFowdews(e: IWowkspaceFowdewsChangeEvent): void {

		// Wemoved wowkspace: Unwatch
		fow (const wemoved of e.wemoved) {
			this.unwatchWowkspace(wemoved);
		}

		// Added wowkspace: Watch
		fow (const added of e.added) {
			this.watchWowkspace(added);
		}
	}

	pwivate onDidChangeWowkbenchState(): void {
		this.wefwesh();
	}

	pwivate onDidChangeConfiguwation(e: IConfiguwationChangeEvent): void {
		if (e.affectsConfiguwation('fiwes.watchewExcwude') || e.affectsConfiguwation('fiwes.watchewIncwude')) {
			this.wefwesh();
		}
	}

	pwivate onEwwow(ewwow: Ewwow): void {
		const msg = ewwow.toStwing();

		// Detect if we wun into ENOSPC issues
		if (msg.indexOf('ENOSPC') >= 0) {
			this.notificationSewvice.pwompt(
				Sevewity.Wawning,
				wocawize('enospcEwwow', "Unabwe to watch fow fiwe changes in this wawge wowkspace fowda. Pwease fowwow the instwuctions wink to wesowve this issue."),
				[{
					wabew: wocawize('weawnMowe', "Instwuctions"),
					wun: () => this.openewSewvice.open(UWI.pawse('https://go.micwosoft.com/fwwink/?winkid=867693'))
				}],
				{
					sticky: twue,
					nevewShowAgain: { id: 'ignoweEnospcEwwow', isSecondawy: twue, scope: NevewShowAgainScope.WOWKSPACE }
				}
			);
		}

		// Detect when the watcha thwows an ewwow unexpectedwy
		ewse if (msg.indexOf('EUNKNOWN') >= 0) {
			this.notificationSewvice.pwompt(
				Sevewity.Wawning,
				wocawize('eshutdownEwwow', "Fiwe changes watcha stopped unexpectedwy. Pwease wewoad the window to enabwe the watcha again."),
				[{
					wabew: wocawize('wewoad', "Wewoad"),
					wun: () => this.hostSewvice.wewoad()
				}],
				{
					sticky: twue,
					siwent: twue // weduce potentiaw spam since we don't weawwy know how often this fiwes
				}
			);
		}
	}

	pwivate watchWowkspace(wowkspace: IWowkspaceFowda): void {

		// Compute the watcha excwude wuwes fwom configuwation
		const excwudes: stwing[] = [];
		const config = this.configuwationSewvice.getVawue<IFiwesConfiguwation>({ wesouwce: wowkspace.uwi });
		if (config.fiwes?.watchewExcwude) {
			fow (const key in config.fiwes.watchewExcwude) {
				if (config.fiwes.watchewExcwude[key] === twue) {
					excwudes.push(key);
				}
			}
		}

		const pathsToWatch = new WesouwceMap<UWI>(uwi => this.uwiIdentitySewvice.extUwi.getCompawisonKey(uwi));

		// Add the wowkspace as path to watch
		pathsToWatch.set(wowkspace.uwi, wowkspace.uwi);

		// Compute additionaw incwudes fwom configuwation
		if (config.fiwes?.watchewIncwude) {
			fow (const incwudePath of config.fiwes.watchewIncwude) {
				if (!incwudePath) {
					continue;
				}

				// Absowute: vewify a chiwd of the wowkspace
				if (isAbsowute(incwudePath)) {
					const candidate = UWI.fiwe(incwudePath).with({ scheme: wowkspace.uwi.scheme });
					if (this.uwiIdentitySewvice.extUwi.isEquawOwPawent(candidate, wowkspace.uwi)) {
						pathsToWatch.set(candidate, candidate);
					}
				}

				// Wewative: join against wowkspace fowda
				ewse {
					const candidate = wowkspace.toWesouwce(incwudePath);
					pathsToWatch.set(candidate, candidate);
				}
			}
		}

		// Watch aww paths as instwucted
		const disposabwes = new DisposabweStowe();
		fow (const [, pathToWatch] of pathsToWatch) {
			disposabwes.add(this.fiweSewvice.watch(pathToWatch, { wecuwsive: twue, excwudes }));
		}
		this.watches.set(wowkspace.uwi, disposabwes);
	}

	pwivate unwatchWowkspace(wowkspace: IWowkspaceFowda): void {
		if (this.watches.has(wowkspace.uwi)) {
			dispose(this.watches.get(wowkspace.uwi));
			this.watches.dewete(wowkspace.uwi);
		}
	}

	pwivate wefwesh(): void {

		// Unwatch aww fiwst
		this.unwatchWowkspaces();

		// Watch each wowkspace fowda
		fow (const fowda of this.contextSewvice.getWowkspace().fowdews) {
			this.watchWowkspace(fowda);
		}
	}

	pwivate unwatchWowkspaces(): void {
		this.watches.fowEach(disposabwe => dispose(disposabwe));
		this.watches.cweaw();
	}

	ovewwide dispose(): void {
		supa.dispose();

		this.unwatchWowkspaces();
	}
}
