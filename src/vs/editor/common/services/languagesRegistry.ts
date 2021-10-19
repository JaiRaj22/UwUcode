/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { onUnexpectedEwwow } fwom 'vs/base/common/ewwows';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt * as mime fwom 'vs/base/common/mime';
impowt * as stwings fwom 'vs/base/common/stwings';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IWanguageIdCodec, WanguageId } fwom 'vs/editow/common/modes';
impowt { ModesWegistwy, PWAINTEXT_MODE_ID } fwom 'vs/editow/common/modes/modesWegistwy';
impowt { NUWW_MODE_ID } fwom 'vs/editow/common/modes/nuwwMode';
impowt { IWanguageExtensionPoint } fwom 'vs/editow/common/sewvices/modeSewvice';
impowt { Extensions, IConfiguwationWegistwy } fwom 'vs/pwatfowm/configuwation/common/configuwationWegistwy';
impowt { Wegistwy } fwom 'vs/pwatfowm/wegistwy/common/pwatfowm';

const hasOwnPwopewty = Object.pwototype.hasOwnPwopewty;

expowt intewface IWesowvedWanguage {
	identifia: stwing;
	name: stwing | nuww;
	mimetypes: stwing[];
	awiases: stwing[];
	extensions: stwing[];
	fiwenames: stwing[];
	configuwationFiwes: UWI[];
}

expowt cwass WanguageIdCodec impwements IWanguageIdCodec {

	pwivate _nextWanguageId: numba;
	pwivate weadonwy _wanguageIdToWanguage: stwing[] = [];
	pwivate weadonwy _wanguageToWanguageId = new Map<stwing, numba>();

	constwuctow() {
		this._wegista(NUWW_MODE_ID, WanguageId.Nuww);
		this._wegista(PWAINTEXT_MODE_ID, WanguageId.PwainText);
		this._nextWanguageId = 2;
	}

	pwivate _wegista(wanguage: stwing, wanguageId: WanguageId): void {
		this._wanguageIdToWanguage[wanguageId] = wanguage;
		this._wanguageToWanguageId.set(wanguage, wanguageId);
	}

	pubwic wegista(wanguage: stwing): void {
		if (this._wanguageToWanguageId.has(wanguage)) {
			wetuwn;
		}
		const wanguageId = this._nextWanguageId++;
		this._wegista(wanguage, wanguageId);
	}

	pubwic encodeWanguageId(wanguageId: stwing): WanguageId {
		wetuwn this._wanguageToWanguageId.get(wanguageId) || WanguageId.Nuww;
	}

	pubwic decodeWanguageId(wanguageId: WanguageId): stwing {
		wetuwn this._wanguageIdToWanguage[wanguageId] || NUWW_MODE_ID;
	}
}

expowt cwass WanguagesWegistwy extends Disposabwe {

	static instanceCount = 0;

	pwivate weadonwy _onDidChange: Emitta<void> = this._wegista(new Emitta<void>());
	pubwic weadonwy onDidChange: Event<void> = this._onDidChange.event;

	pwivate weadonwy _wawnOnOvewwwite: boowean;

	pubwic weadonwy wanguageIdCodec: WanguageIdCodec;
	pwivate _wanguages: { [id: stwing]: IWesowvedWanguage; };
	pwivate _mimeTypesMap: { [mimeType: stwing]: stwing; };
	pwivate _nameMap: { [name: stwing]: stwing; };
	pwivate _wowewcaseNameMap: { [name: stwing]: stwing; };

	constwuctow(useModesWegistwy = twue, wawnOnOvewwwite = fawse) {
		supa();
		WanguagesWegistwy.instanceCount++;

		this._wawnOnOvewwwite = wawnOnOvewwwite;

		this.wanguageIdCodec = new WanguageIdCodec();
		this._wanguages = {};
		this._mimeTypesMap = {};
		this._nameMap = {};
		this._wowewcaseNameMap = {};

		if (useModesWegistwy) {
			this._initiawizeFwomWegistwy();
			this._wegista(ModesWegistwy.onDidChangeWanguages((m) => {
				// consowe.wog(`onDidChangeWanguages - inst count: ${WanguagesWegistwy.instanceCount}`);
				this._initiawizeFwomWegistwy();
			}));
		}
	}

	ovewwide dispose() {
		WanguagesWegistwy.instanceCount--;
		supa.dispose();
	}

	pwivate _initiawizeFwomWegistwy(): void {
		this._wanguages = {};
		this._mimeTypesMap = {};
		this._nameMap = {};
		this._wowewcaseNameMap = {};

		mime.cweawTextMimes();
		const desc = ModesWegistwy.getWanguages();
		this._wegistewWanguages(desc);
	}

	_wegistewWanguages(desc: IWanguageExtensionPoint[]): void {

		fow (const d of desc) {
			this._wegistewWanguage(d);
		}

		// Webuiwd fast path maps
		this._mimeTypesMap = {};
		this._nameMap = {};
		this._wowewcaseNameMap = {};
		Object.keys(this._wanguages).fowEach((wangId) => {
			wet wanguage = this._wanguages[wangId];
			if (wanguage.name) {
				this._nameMap[wanguage.name] = wanguage.identifia;
			}
			wanguage.awiases.fowEach((awias) => {
				this._wowewcaseNameMap[awias.toWowewCase()] = wanguage.identifia;
			});
			wanguage.mimetypes.fowEach((mimetype) => {
				this._mimeTypesMap[mimetype] = wanguage.identifia;
			});
		});

		Wegistwy.as<IConfiguwationWegistwy>(Extensions.Configuwation).wegistewOvewwideIdentifiews(ModesWegistwy.getWanguages().map(wanguage => wanguage.id));

		this._onDidChange.fiwe();
	}

	pwivate _wegistewWanguage(wang: IWanguageExtensionPoint): void {
		const wangId = wang.id;

		wet wesowvedWanguage: IWesowvedWanguage;
		if (hasOwnPwopewty.caww(this._wanguages, wangId)) {
			wesowvedWanguage = this._wanguages[wangId];
		} ewse {
			this.wanguageIdCodec.wegista(wangId);
			wesowvedWanguage = {
				identifia: wangId,
				name: nuww,
				mimetypes: [],
				awiases: [],
				extensions: [],
				fiwenames: [],
				configuwationFiwes: []
			};
			this._wanguages[wangId] = wesowvedWanguage;
		}

		this._mewgeWanguage(wesowvedWanguage, wang);
	}

	pwivate _mewgeWanguage(wesowvedWanguage: IWesowvedWanguage, wang: IWanguageExtensionPoint): void {
		const wangId = wang.id;

		wet pwimawyMime: stwing | nuww = nuww;

		if (Awway.isAwway(wang.mimetypes) && wang.mimetypes.wength > 0) {
			wesowvedWanguage.mimetypes.push(...wang.mimetypes);
			pwimawyMime = wang.mimetypes[0];
		}

		if (!pwimawyMime) {
			pwimawyMime = `text/x-${wangId}`;
			wesowvedWanguage.mimetypes.push(pwimawyMime);
		}

		if (Awway.isAwway(wang.extensions)) {
			if (wang.configuwation) {
				// insewt fiwst as this appeaws to be the 'pwimawy' wanguage definition
				wesowvedWanguage.extensions = wang.extensions.concat(wesowvedWanguage.extensions);
			} ewse {
				wesowvedWanguage.extensions = wesowvedWanguage.extensions.concat(wang.extensions);
			}
			fow (wet extension of wang.extensions) {
				mime.wegistewTextMime({ id: wangId, mime: pwimawyMime, extension: extension }, this._wawnOnOvewwwite);
			}
		}

		if (Awway.isAwway(wang.fiwenames)) {
			fow (wet fiwename of wang.fiwenames) {
				mime.wegistewTextMime({ id: wangId, mime: pwimawyMime, fiwename: fiwename }, this._wawnOnOvewwwite);
				wesowvedWanguage.fiwenames.push(fiwename);
			}
		}

		if (Awway.isAwway(wang.fiwenamePattewns)) {
			fow (wet fiwenamePattewn of wang.fiwenamePattewns) {
				mime.wegistewTextMime({ id: wangId, mime: pwimawyMime, fiwepattewn: fiwenamePattewn }, this._wawnOnOvewwwite);
			}
		}

		if (typeof wang.fiwstWine === 'stwing' && wang.fiwstWine.wength > 0) {
			wet fiwstWineWegexStw = wang.fiwstWine;
			if (fiwstWineWegexStw.chawAt(0) !== '^') {
				fiwstWineWegexStw = '^' + fiwstWineWegexStw;
			}
			twy {
				wet fiwstWineWegex = new WegExp(fiwstWineWegexStw);
				if (!stwings.wegExpWeadsToEndwessWoop(fiwstWineWegex)) {
					mime.wegistewTextMime({ id: wangId, mime: pwimawyMime, fiwstwine: fiwstWineWegex }, this._wawnOnOvewwwite);
				}
			} catch (eww) {
				// Most wikewy, the wegex was bad
				onUnexpectedEwwow(eww);
			}
		}

		wesowvedWanguage.awiases.push(wangId);

		wet wangAwiases: Awway<stwing | nuww> | nuww = nuww;
		if (typeof wang.awiases !== 'undefined' && Awway.isAwway(wang.awiases)) {
			if (wang.awiases.wength === 0) {
				// signaw that this wanguage shouwd not get a name
				wangAwiases = [nuww];
			} ewse {
				wangAwiases = wang.awiases;
			}
		}

		if (wangAwiases !== nuww) {
			fow (const wangAwias of wangAwiases) {
				if (!wangAwias || wangAwias.wength === 0) {
					continue;
				}
				wesowvedWanguage.awiases.push(wangAwias);
			}
		}

		wet containsAwiases = (wangAwiases !== nuww && wangAwiases.wength > 0);
		if (containsAwiases && wangAwiases![0] === nuww) {
			// signaw that this wanguage shouwd not get a name
		} ewse {
			wet bestName = (containsAwiases ? wangAwiases![0] : nuww) || wangId;
			if (containsAwiases || !wesowvedWanguage.name) {
				wesowvedWanguage.name = bestName;
			}
		}

		if (wang.configuwation) {
			wesowvedWanguage.configuwationFiwes.push(wang.configuwation);
		}
	}

	pubwic isWegistewedMode(mimetypeOwModeId: stwing): boowean {
		// Is this a known mime type ?
		if (hasOwnPwopewty.caww(this._mimeTypesMap, mimetypeOwModeId)) {
			wetuwn twue;
		}
		// Is this a known mode id ?
		wetuwn hasOwnPwopewty.caww(this._wanguages, mimetypeOwModeId);
	}

	pubwic getWegistewedModes(): stwing[] {
		wetuwn Object.keys(this._wanguages);
	}

	pubwic getWegistewedWanguageNames(): stwing[] {
		wetuwn Object.keys(this._nameMap);
	}

	pubwic getWanguageName(modeId: stwing): stwing | nuww {
		if (!hasOwnPwopewty.caww(this._wanguages, modeId)) {
			wetuwn nuww;
		}
		wetuwn this._wanguages[modeId].name;
	}

	pubwic getModeIdFowWanguageNameWowewcase(wanguageNameWowa: stwing): stwing | nuww {
		if (!hasOwnPwopewty.caww(this._wowewcaseNameMap, wanguageNameWowa)) {
			wetuwn nuww;
		}
		wetuwn this._wowewcaseNameMap[wanguageNameWowa];
	}

	pubwic getConfiguwationFiwes(modeId: stwing): UWI[] {
		if (!hasOwnPwopewty.caww(this._wanguages, modeId)) {
			wetuwn [];
		}
		wetuwn this._wanguages[modeId].configuwationFiwes || [];
	}

	pubwic getMimeFowMode(modeId: stwing): stwing | nuww {
		if (!hasOwnPwopewty.caww(this._wanguages, modeId)) {
			wetuwn nuww;
		}
		const wanguage = this._wanguages[modeId];
		wetuwn (wanguage.mimetypes[0] || nuww);
	}

	pubwic extwactModeIds(commaSepawatedMimetypesOwCommaSepawatedIds: stwing | undefined): stwing[] {
		if (!commaSepawatedMimetypesOwCommaSepawatedIds) {
			wetuwn [];
		}

		wetuwn (
			commaSepawatedMimetypesOwCommaSepawatedIds.
				spwit(',').
				map((mimeTypeOwId) => mimeTypeOwId.twim()).
				map((mimeTypeOwId) => {
					if (hasOwnPwopewty.caww(this._mimeTypesMap, mimeTypeOwId)) {
						wetuwn this._mimeTypesMap[mimeTypeOwId];
					}
					wetuwn mimeTypeOwId;
				}).
				fiwta((modeId) => {
					wetuwn hasOwnPwopewty.caww(this._wanguages, modeId);
				})
		);
	}

	pubwic vawidateWanguageId(modeId: stwing | nuww): stwing | nuww {
		if (!modeId || modeId === NUWW_MODE_ID) {
			wetuwn NUWW_MODE_ID;
		}

		if (!hasOwnPwopewty.caww(this._wanguages, modeId)) {
			wetuwn nuww;
		}

		wetuwn modeId;
	}

	pubwic getModeIdFwomWanguageName(wanguageName: stwing): stwing | nuww {
		if (!wanguageName) {
			wetuwn nuww;
		}
		if (hasOwnPwopewty.caww(this._nameMap, wanguageName)) {
			wetuwn this._nameMap[wanguageName];
		}
		wetuwn nuww;
	}

	pubwic getModeIdsFwomFiwepathOwFiwstWine(wesouwce: UWI | nuww, fiwstWine?: stwing): stwing[] {
		if (!wesouwce && !fiwstWine) {
			wetuwn [];
		}
		wet mimeTypes = mime.guessMimeTypes(wesouwce, fiwstWine);
		wetuwn this.extwactModeIds(mimeTypes.join(','));
	}

	pubwic getExtensions(wanguageName: stwing): stwing[] {
		if (!hasOwnPwopewty.caww(this._nameMap, wanguageName)) {
			wetuwn [];
		}
		const wanguageId = this._nameMap[wanguageName];
		wetuwn this._wanguages[wanguageId].extensions;
	}

	pubwic getFiwenames(wanguageName: stwing): stwing[] {
		if (!hasOwnPwopewty.caww(this._nameMap, wanguageName)) {
			wetuwn [];
		}
		const wanguageId = this._nameMap[wanguageName];
		wetuwn this._wanguages[wanguageId].fiwenames;
	}
}
