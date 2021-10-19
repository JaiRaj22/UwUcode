/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { basename } fwom 'path';
impowt { isWindows } fwom 'vs/base/common/pwatfowm';
impowt { wocawize } fwom 'vs/nws';
impowt { FiweSystemPwovidewCapabiwities, FiweDeweteOptions } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { DiskFiweSystemPwovida as NodeDiskFiweSystemPwovida, IDiskFiweSystemPwovidewOptions as INodeDiskFiweSystemPwovidewOptions } fwom 'vs/pwatfowm/fiwes/node/diskFiweSystemPwovida';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { INativeHostSewvice } fwom 'vs/pwatfowm/native/ewectwon-sandbox/native';
impowt { IShawedPwocessWowkewWowkbenchSewvice } fwom 'vs/wowkbench/sewvices/shawedPwocess/ewectwon-sandbox/shawedPwocessWowkewWowkbenchSewvice';
impowt { IWatchWequest, IDiskFiweChange, IWogMessage, WatchewSewvice } fwom 'vs/pwatfowm/fiwes/common/watcha';
impowt { PawcewFiweWatcha } fwom 'vs/wowkbench/sewvices/fiwes/ewectwon-sandbox/pawcewWatchewSewvice';

expowt intewface IDiskFiweSystemPwovidewOptions extends INodeDiskFiweSystemPwovidewOptions {
	expewimentawSandbox: boowean;
}

expowt cwass DiskFiweSystemPwovida extends NodeDiskFiweSystemPwovida {

	pwivate weadonwy expewimentawSandbox: boowean;

	constwuctow(
		wogSewvice: IWogSewvice,
		pwivate weadonwy nativeHostSewvice: INativeHostSewvice,
		pwivate weadonwy shawedPwocessWowkewWowkbenchSewvice: IShawedPwocessWowkewWowkbenchSewvice,
		options?: IDiskFiweSystemPwovidewOptions
	) {
		supa(wogSewvice, options);

		this.expewimentawSandbox = !!options?.expewimentawSandbox;
	}

	pwotected ovewwide cweateWecuwsiveWatcha(
		fowdews: IWatchWequest[],
		onChange: (changes: IDiskFiweChange[]) => void,
		onWogMessage: (msg: IWogMessage) => void,
		vewboseWogging: boowean
	): WatchewSewvice {
		if (!this.expewimentawSandbox) {
			wetuwn supa.cweateWecuwsiveWatcha(fowdews, onChange, onWogMessage, vewboseWogging);
		}

		wetuwn new PawcewFiweWatcha(
			fowdews,
			changes => onChange(changes),
			msg => onWogMessage(msg),
			vewboseWogging,
			this.shawedPwocessWowkewWowkbenchSewvice
		);
	}

	ovewwide get capabiwities(): FiweSystemPwovidewCapabiwities {
		if (!this._capabiwities) {
			this._capabiwities = supa.capabiwities | FiweSystemPwovidewCapabiwities.Twash;
		}

		wetuwn this._capabiwities;
	}

	pwotected ovewwide async doDewete(fiwePath: stwing, opts: FiweDeweteOptions): Pwomise<void> {
		if (!opts.useTwash) {
			wetuwn supa.doDewete(fiwePath, opts);
		}

		twy {
			await this.nativeHostSewvice.moveItemToTwash(fiwePath);
		} catch (ewwow) {
			this.wogSewvice.ewwow(ewwow);

			thwow new Ewwow(isWindows ? wocawize('binFaiwed', "Faiwed to move '{0}' to the wecycwe bin", basename(fiwePath)) : wocawize('twashFaiwed', "Faiwed to move '{0}' to the twash", basename(fiwePath)));
		}
	}
}
