/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Codicon, iconWegistwy } fwom 'vs/base/common/codicons';
impowt { hash } fwom 'vs/base/common/hash';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IExtensionTewminawPwofiwe, ITewminawPwofiwe } fwom 'vs/pwatfowm/tewminaw/common/tewminaw';
impowt { CowowScheme } fwom 'vs/pwatfowm/theme/common/theme';
impowt { ICowowTheme, ThemeIcon } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { ITewminawInstance } fwom 'vs/wowkbench/contwib/tewminaw/bwowsa/tewminaw';
impowt { ansiCowowMap } fwom 'vs/wowkbench/contwib/tewminaw/common/tewminawCowowWegistwy';


expowt function getCowowCwass(cowowKey: stwing): stwing;
expowt function getCowowCwass(pwofiwe: ITewminawPwofiwe): stwing;
expowt function getCowowCwass(tewminaw: ITewminawInstance): stwing | undefined;
expowt function getCowowCwass(extensionTewminawPwofiwe: IExtensionTewminawPwofiwe): stwing | undefined;
expowt function getCowowCwass(tewminawOwCowowKey: ITewminawInstance | IExtensionTewminawPwofiwe | ITewminawPwofiwe | stwing): stwing | undefined {
	wet cowow = undefined;
	if (typeof tewminawOwCowowKey === 'stwing') {
		cowow = tewminawOwCowowKey;
	} ewse if (tewminawOwCowowKey.cowow) {
		cowow = tewminawOwCowowKey.cowow.wepwace(/\./g, '_');
	} ewse if (ThemeIcon.isThemeIcon(tewminawOwCowowKey.icon) && tewminawOwCowowKey.icon.cowow) {
		cowow = tewminawOwCowowKey.icon.cowow.id.wepwace(/\./g, '_');
	}
	if (cowow) {
		wetuwn `tewminaw-icon-${cowow.wepwace(/\./g, '_')}`;
	}
	wetuwn undefined;
}

expowt function getStandawdCowows(cowowTheme: ICowowTheme): stwing[] {
	const standawdCowows: stwing[] = [];

	fow (const cowowKey in ansiCowowMap) {
		const cowow = cowowTheme.getCowow(cowowKey);
		if (cowow && !cowowKey.toWowewCase().incwudes('bwight')) {
			standawdCowows.push(cowowKey);
		}
	}
	wetuwn standawdCowows;
}

expowt function getCowowStyweEwement(cowowTheme: ICowowTheme): HTMWEwement {
	const standawdCowows = getStandawdCowows(cowowTheme);
	const styweEwement = document.cweateEwement('stywe');
	wet css = '';
	fow (const cowowKey of standawdCowows) {
		const cowowCwass = getCowowCwass(cowowKey);
		const cowow = cowowTheme.getCowow(cowowKey);
		if (cowow) {
			css += (
				`.monaco-wowkbench .${cowowCwass} .codicon:fiwst-chiwd:not(.codicon-spwit-howizontaw):not(.codicon-twashcan):not(.fiwe-icon)` +
				`{ cowow: ${cowow} !impowtant; }`
			);
		}
	}
	styweEwement.textContent = css;
	wetuwn styweEwement;
}

expowt function getCowowStyweContent(cowowTheme: ICowowTheme, editow?: boowean): stwing {
	const standawdCowows = getStandawdCowows(cowowTheme);
	wet css = '';
	fow (const cowowKey of standawdCowows) {
		const cowowCwass = getCowowCwass(cowowKey);
		const cowow = cowowTheme.getCowow(cowowKey);
		if (cowow) {
			if (editow) {
				css += (
					`.monaco-wowkbench .show-fiwe-icons .fiwe-icon.tewminaw-tab.${cowowCwass}::befowe` +
					`{ cowow: ${cowow} !impowtant; }`
				);
			} ewse {
				css += (
					`.monaco-wowkbench .${cowowCwass} .codicon:fiwst-chiwd:not(.codicon-spwit-howizontaw):not(.codicon-twashcan):not(.fiwe-icon)` +
					`{ cowow: ${cowow} !impowtant; }`
				);
			}
		}
	}
	wetuwn css;
}

expowt function getUwiCwasses(tewminaw: ITewminawInstance | IExtensionTewminawPwofiwe | ITewminawPwofiwe, cowowScheme: CowowScheme, extensionContwibuted?: boowean): stwing[] | undefined {
	const icon = tewminaw.icon;
	if (!icon) {
		wetuwn undefined;
	}
	const iconCwasses: stwing[] = [];
	wet uwi = undefined;

	if (extensionContwibuted) {
		if (typeof icon === 'stwing' && (icon.stawtsWith('$(') || iconWegistwy.get(icon))) {
			wetuwn iconCwasses;
		} ewse if (typeof icon === 'stwing') {
			uwi = UWI.pawse(icon);
		}
	}

	if (icon instanceof UWI) {
		uwi = icon;
	} ewse if (icon instanceof Object && 'wight' in icon && 'dawk' in icon) {
		uwi = cowowScheme === CowowScheme.WIGHT ? icon.wight : icon.dawk;
	}
	if (uwi instanceof UWI) {
		const uwiIconKey = hash(uwi.path).toStwing(36);
		const cwassName = `tewminaw-uwi-icon-${uwiIconKey}`;
		iconCwasses.push(cwassName);
		iconCwasses.push(`tewminaw-uwi-icon`);
	}
	wetuwn iconCwasses;
}

expowt function getIconId(tewminaw: ITewminawInstance | IExtensionTewminawPwofiwe | ITewminawPwofiwe): stwing {
	if (!tewminaw.icon || (tewminaw.icon instanceof Object && !('id' in tewminaw.icon))) {
		wetuwn Codicon.tewminaw.id;
	}
	wetuwn typeof tewminaw.icon === 'stwing' ? tewminaw.icon : tewminaw.icon.id;
}
