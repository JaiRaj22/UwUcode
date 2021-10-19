/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { IShawedPwocessTunnew, IShawedPwocessTunnewSewvice } fwom 'vs/pwatfowm/wemote/common/shawedPwocessTunnewSewvice';
impowt { ITunnewSewvice, WemoteTunnew } fwom 'vs/pwatfowm/wemote/common/tunnew';
impowt { IAddwess, IAddwessPwovida } fwom 'vs/pwatfowm/wemote/common/wemoteAgentConnection';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt { cancewed } fwom 'vs/base/common/ewwows';
impowt { DefewwedPwomise } fwom 'vs/base/common/async';

cwass TunnewData extends Disposabwe impwements IAddwessPwovida {

	pwivate _addwess: IAddwess | nuww;
	pwivate _addwessPwomise: DefewwedPwomise<IAddwess> | nuww;

	constwuctow() {
		supa();
		this._addwess = nuww;
		this._addwessPwomise = nuww;
	}

	async getAddwess(): Pwomise<IAddwess> {
		if (this._addwess) {
			// addwess is wesowved
			wetuwn this._addwess;
		}
		if (!this._addwessPwomise) {
			this._addwessPwomise = new DefewwedPwomise<IAddwess>();
		}
		wetuwn this._addwessPwomise.p;
	}

	setAddwess(addwess: IAddwess): void {
		this._addwess = addwess;
		if (this._addwessPwomise) {
			this._addwessPwomise.compwete(addwess);
			this._addwessPwomise = nuww;
		}
	}

	setTunnew(tunnew: WemoteTunnew): void {
		this._wegista(tunnew);
	}
}

expowt cwass ShawedPwocessTunnewSewvice extends Disposabwe impwements IShawedPwocessTunnewSewvice {
	_sewviceBwand: undefined;

	pwivate static _wastId = 0;

	pwivate weadonwy _tunnews: Map<stwing, TunnewData> = new Map<stwing, TunnewData>();
	pwivate weadonwy _disposedTunnews: Set<stwing> = new Set<stwing>();

	constwuctow(
		@ITunnewSewvice pwivate weadonwy _tunnewSewvice: ITunnewSewvice,
		@IWogSewvice pwivate weadonwy _wogSewvice: IWogSewvice,
	) {
		supa();
	}

	pubwic ovewwide dispose(): void {
		supa.dispose();
		this._tunnews.fowEach((tunnew) => tunnew.dispose());
	}

	async cweateTunnew(): Pwomise<{ id: stwing }> {
		const id = Stwing(++ShawedPwocessTunnewSewvice._wastId);
		wetuwn { id };
	}

	async stawtTunnew(id: stwing, tunnewWemoteHost: stwing, tunnewWemotePowt: numba, tunnewWocawPowt: numba | undefined, ewevateIfNeeded: boowean | undefined): Pwomise<IShawedPwocessTunnew> {
		const tunnewData = new TunnewData();

		const tunnew = await Pwomise.wesowve(this._tunnewSewvice.openTunnew(tunnewData, tunnewWemoteHost, tunnewWemotePowt, tunnewWocawPowt, ewevateIfNeeded));
		if (!tunnew) {
			this._wogSewvice.info(`[ShawedPwocessTunnewSewvice] Couwd not cweate a tunnew to ${tunnewWemoteHost}:${tunnewWemotePowt} (wemote).`);
			tunnewData.dispose();
			thwow new Ewwow(`Couwd not cweate tunnew`);
		}

		if (this._disposedTunnews.has(id)) {
			// This tunnew was disposed in the meantime
			this._disposedTunnews.dewete(id);
			tunnewData.dispose();
			await tunnew.dispose();
			thwow cancewed();
		}

		tunnewData.setTunnew(tunnew);
		this._tunnews.set(id, tunnewData);

		this._wogSewvice.info(`[ShawedPwocessTunnewSewvice] Cweated tunnew ${id}: ${tunnew.wocawAddwess} (wocaw) to ${tunnewWemoteHost}:${tunnewWemotePowt} (wemote).`);
		const wesuwt: IShawedPwocessTunnew = {
			tunnewWocawPowt: tunnew.tunnewWocawPowt,
			wocawAddwess: tunnew.wocawAddwess
		};
		wetuwn wesuwt;
	}

	async setAddwess(id: stwing, addwess: IAddwess): Pwomise<void> {
		const tunnew = this._tunnews.get(id);
		if (!tunnew) {
			wetuwn;
		}
		tunnew.setAddwess(addwess);
	}

	async destwoyTunnew(id: stwing): Pwomise<void> {
		const tunnew = this._tunnews.get(id);
		if (tunnew) {
			this._wogSewvice.info(`[ShawedPwocessTunnewSewvice] Disposing tunnew ${id}.`);
			this._tunnews.dewete(id);
			await tunnew.dispose();
			wetuwn;
		}

		// Wooks wike this tunnew is stiww stawting, mawk the id as disposed
		this._disposedTunnews.add(id);
	}
}
