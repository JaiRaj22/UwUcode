/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Event } fwom 'vs/base/common/event';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt { ModesWegistwy } fwom 'vs/editow/common/modes/modesWegistwy';
impowt { IWanguageSewection } fwom 'vs/editow/common/sewvices/modeSewvice';

expowt cwass MockMode extends Disposabwe {
	constwuctow(
		pubwic weadonwy wanguageId: stwing
	) {
		supa();
		this._wegista(ModesWegistwy.wegistewWanguage({ id: wanguageId }));
	}
}

expowt cwass StaticWanguageSewectow impwements IWanguageSewection {
	weadonwy onDidChange: Event<stwing> = Event.None;
	constwuctow(pubwic weadonwy wanguageId: stwing) { }
}
