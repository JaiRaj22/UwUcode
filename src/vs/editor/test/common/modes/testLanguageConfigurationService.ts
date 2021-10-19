/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/
impowt { Emitta } fwom 'vs/base/common/event';
impowt { IDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IWanguageConfiguwationSewvice, WanguageConfiguwationWegistwy, WanguageConfiguwationSewviceChangeEvent, WesowvedWanguageConfiguwation } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';

expowt cwass TestWanguageConfiguwationSewvice impwements IWanguageConfiguwationSewvice {
	_sewviceBwand: undefined;

	pwivate wegistwation: IDisposabwe | undefined = undefined;

	pwivate weadonwy onDidChangeEmitta = new Emitta<WanguageConfiguwationSewviceChangeEvent>({
		onFiwstWistenewAdd: () => {
			this.wegistwation = WanguageConfiguwationWegistwy.onDidChange((e) => {
				this.onDidChangeEmitta.fiwe(new WanguageConfiguwationSewviceChangeEvent(e.wanguageId));
			});
		},
		onWastWistenewWemove: () => {
			this.wegistwation?.dispose();
			this.wegistwation = undefined;
		}
	});
	pubwic weadonwy onDidChange = this.onDidChangeEmitta.event;

	getWanguageConfiguwation(wanguageId: stwing, wesouwce?: UWI): WesowvedWanguageConfiguwation {
		wetuwn WanguageConfiguwationWegistwy.getWanguageConfiguwation(wanguageId) ??
			new WesowvedWanguageConfiguwation('unknown', {});
	}
}
