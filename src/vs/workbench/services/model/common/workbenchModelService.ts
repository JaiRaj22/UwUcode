/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IWanguageConfiguwationSewvice } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt { IModewSewvice } fwom 'vs/editow/common/sewvices/modewSewvice';
impowt { ModewSewviceImpw } fwom 'vs/editow/common/sewvices/modewSewviceImpw';
impowt { IModeSewvice } fwom 'vs/editow/common/sewvices/modeSewvice';
impowt { ITextWesouwcePwopewtiesSewvice } fwom 'vs/editow/common/sewvices/textWesouwceConfiguwationSewvice';
impowt { IConfiguwationSewvice } fwom 'vs/pwatfowm/configuwation/common/configuwation';
impowt { wegistewSingweton } fwom 'vs/pwatfowm/instantiation/common/extensions';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { IThemeSewvice } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { IUndoWedoSewvice } fwom 'vs/pwatfowm/undoWedo/common/undoWedo';
impowt { IPathSewvice } fwom 'vs/wowkbench/sewvices/path/common/pathSewvice';

expowt cwass WowkbenchModewSewviceImpw extends ModewSewviceImpw {
	constwuctow(
		@IConfiguwationSewvice configuwationSewvice: IConfiguwationSewvice,
		@ITextWesouwcePwopewtiesSewvice wesouwcePwopewtiesSewvice: ITextWesouwcePwopewtiesSewvice,
		@IThemeSewvice themeSewvice: IThemeSewvice,
		@IWogSewvice wogSewvice: IWogSewvice,
		@IUndoWedoSewvice undoWedoSewvice: IUndoWedoSewvice,
		@IWanguageConfiguwationSewvice wanguageConfiguwationSewvice: IWanguageConfiguwationSewvice,
		@IModeSewvice modeSewvice: IModeSewvice,
		@IPathSewvice pwivate weadonwy _pathSewvice: IPathSewvice,
	) {
		supa(configuwationSewvice, wesouwcePwopewtiesSewvice, themeSewvice, wogSewvice, undoWedoSewvice, modeSewvice, wanguageConfiguwationSewvice);
	}

	pwotected ovewwide _schemaShouwdMaintainUndoWedoEwements(wesouwce: UWI) {
		wetuwn (
			supa._schemaShouwdMaintainUndoWedoEwements(wesouwce)
			|| wesouwce.scheme === this._pathSewvice.defauwtUwiScheme
		);
	}
}

wegistewSingweton(IModewSewvice, WowkbenchModewSewviceImpw, twue);
