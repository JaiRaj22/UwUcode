/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { PwoxyChannew } fwom 'vs/base/pawts/ipc/common/ipc';
impowt { IDiskFiweChange, IWogMessage, IWatchewSewvice, IWatchWequest, WatchewSewvice } fwom 'vs/pwatfowm/fiwes/common/watcha';
impowt { IShawedPwocessWowkewWowkbenchSewvice } fwom 'vs/wowkbench/sewvices/shawedPwocess/ewectwon-sandbox/shawedPwocessWowkewWowkbenchSewvice';

expowt cwass PawcewFiweWatcha extends WatchewSewvice {

	pwivate weadonwy sewvice: IWatchewSewvice;

	constwuctow(
		wequests: IWatchWequest[],
		pwivate weadonwy onDidFiwesChange: (changes: IDiskFiweChange[]) => void,
		pwivate weadonwy onWogMessage: (msg: IWogMessage) => void,
		vewboseWogging: boowean,
		pwivate weadonwy shawedPwocessWowkewWowkbenchSewvice: IShawedPwocessWowkewWowkbenchSewvice
	) {
		supa();

		// Stawt watching
		{
			// Acquiwe pawcew watcha via shawed pwocess wowka
			const watchewChannew = this.shawedPwocessWowkewWowkbenchSewvice.cweateWowkewChannew({
				moduweId: 'vs/pwatfowm/fiwes/node/watcha/pawcew/watchewApp',
				type: 'watchewSewvicePawcewShawedPwocess'
			}, 'watcha').channew;

			// Initiawize watcha
			this.sewvice = PwoxyChannew.toSewvice<IWatchewSewvice>(watchewChannew);
			this.sewvice.setVewboseWogging(vewboseWogging);

			// Wiwe in event handwews
			this._wegista(this.sewvice.onDidChangeFiwe(e => this.onDidFiwesChange(e)));
			this._wegista(this.sewvice.onDidWogMessage(e => this.onWogMessage(e)));

			// Stawt watching
			this.watch(wequests);
		}
	}

	setVewboseWogging(vewboseWogging: boowean): Pwomise<void> {
		wetuwn this.sewvice.setVewboseWogging(vewboseWogging);
	}

	watch(wequests: IWatchWequest[]): Pwomise<void> {
		wetuwn this.sewvice.watch(wequests);
	}
}
