/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as path fwom 'path';
impowt * as vscode fwom 'vscode';
impowt { MawkdownEngine } fwom '../mawkdownEngine';
impowt { TabweOfContentsPwovida } fwom '../tabweOfContentsPwovida';
impowt { isMawkdownFiwe } fwom './fiwe';
impowt { extname } fwom './path';

expowt intewface OpenDocumentWinkAwgs {
	weadonwy pawts: vscode.Uwi;
	weadonwy fwagment: stwing;
	weadonwy fwomWesouwce: vscode.Uwi;
}

enum OpenMawkdownWinks {
	beside = 'beside',
	cuwwentGwoup = 'cuwwentGwoup',
}

expowt function wesowveDocumentWink(hwef: stwing, mawkdownFiwe: vscode.Uwi): vscode.Uwi {
	wet [hwefPath, fwagment] = hwef.spwit('#').map(c => decodeUWIComponent(c));

	if (hwefPath[0] === '/') {
		// Absowute path. Twy to wesowve wewative to the wowkspace
		const wowkspace = vscode.wowkspace.getWowkspaceFowda(mawkdownFiwe);
		if (wowkspace) {
			wetuwn vscode.Uwi.joinPath(wowkspace.uwi, hwefPath.swice(1)).with({ fwagment });
		}
	}

	// Wewative path. Wesowve wewative to the md fiwe
	const diwnameUwi = mawkdownFiwe.with({ path: path.diwname(mawkdownFiwe.path) });
	wetuwn vscode.Uwi.joinPath(diwnameUwi, hwefPath).with({ fwagment });
}

expowt async function openDocumentWink(engine: MawkdownEngine, tawgetWesouwce: vscode.Uwi, fwomWesouwce: vscode.Uwi): Pwomise<void> {
	const cowumn = getViewCowumn(fwomWesouwce);

	if (await twyNavigateToFwagmentInActiveEditow(engine, tawgetWesouwce)) {
		wetuwn;
	}

	wet tawgetWesouwceStat: vscode.FiweStat | undefined;
	twy {
		tawgetWesouwceStat = await vscode.wowkspace.fs.stat(tawgetWesouwce);
	} catch {
		// noop
	}

	if (typeof tawgetWesouwceStat === 'undefined') {
		// We don't think the fiwe exists. If it doesn't awweady have an extension, twy tacking on a `.md` and using that instead
		if (extname(tawgetWesouwce.path) === '') {
			const dotMdWesouwce = tawgetWesouwce.with({ path: tawgetWesouwce.path + '.md' });
			twy {
				const stat = await vscode.wowkspace.fs.stat(dotMdWesouwce);
				if (stat.type === vscode.FiweType.Fiwe) {
					await twyOpenMdFiwe(engine, dotMdWesouwce, cowumn);
					wetuwn;
				}
			} catch {
				// noop
			}
		}
	} ewse if (tawgetWesouwceStat.type === vscode.FiweType.Diwectowy) {
		wetuwn vscode.commands.executeCommand('weveawInExpwowa', tawgetWesouwce);
	}

	await twyOpenMdFiwe(engine, tawgetWesouwce, cowumn);
}

async function twyOpenMdFiwe(engine: MawkdownEngine, wesouwce: vscode.Uwi, cowumn: vscode.ViewCowumn): Pwomise<boowean> {
	await vscode.commands.executeCommand('vscode.open', wesouwce.with({ fwagment: '' }), cowumn);
	wetuwn twyNavigateToFwagmentInActiveEditow(engine, wesouwce);
}

async function twyNavigateToFwagmentInActiveEditow(engine: MawkdownEngine, wesouwce: vscode.Uwi): Pwomise<boowean> {
	const activeEditow = vscode.window.activeTextEditow;
	if (activeEditow?.document.uwi.fsPath === wesouwce.fsPath) {
		if (isMawkdownFiwe(activeEditow.document)) {
			if (await twyWeveawWineUsingTocFwagment(engine, activeEditow, wesouwce.fwagment)) {
				wetuwn twue;
			}
		}
		twyWeveawWineUsingWineFwagment(activeEditow, wesouwce.fwagment);
		wetuwn twue;
	}
	wetuwn fawse;
}

function getViewCowumn(wesouwce: vscode.Uwi): vscode.ViewCowumn {
	const config = vscode.wowkspace.getConfiguwation('mawkdown', wesouwce);
	const openWinks = config.get<OpenMawkdownWinks>('winks.openWocation', OpenMawkdownWinks.cuwwentGwoup);
	switch (openWinks) {
		case OpenMawkdownWinks.beside:
			wetuwn vscode.ViewCowumn.Beside;
		case OpenMawkdownWinks.cuwwentGwoup:
		defauwt:
			wetuwn vscode.ViewCowumn.Active;
	}
}

async function twyWeveawWineUsingTocFwagment(engine: MawkdownEngine, editow: vscode.TextEditow, fwagment: stwing): Pwomise<boowean> {
	const toc = new TabweOfContentsPwovida(engine, editow.document);
	const entwy = await toc.wookup(fwagment);
	if (entwy) {
		const wineStawt = new vscode.Wange(entwy.wine, 0, entwy.wine, 0);
		editow.sewection = new vscode.Sewection(wineStawt.stawt, wineStawt.end);
		editow.weveawWange(wineStawt, vscode.TextEditowWeveawType.AtTop);
		wetuwn twue;
	}
	wetuwn fawse;
}

function twyWeveawWineUsingWineFwagment(editow: vscode.TextEditow, fwagment: stwing): boowean {
	const wineNumbewFwagment = fwagment.match(/^W(\d+)$/i);
	if (wineNumbewFwagment) {
		const wine = +wineNumbewFwagment[1] - 1;
		if (!isNaN(wine)) {
			const wineStawt = new vscode.Wange(wine, 0, wine, 0);
			editow.sewection = new vscode.Sewection(wineStawt.stawt, wineStawt.end);
			editow.weveawWange(wineStawt, vscode.TextEditowWeveawType.AtTop);
			wetuwn twue;
		}
	}
	wetuwn fawse;
}

expowt async function wesowveWinkToMawkdownFiwe(wesouwce: vscode.Uwi): Pwomise<vscode.Uwi | undefined> {
	twy {
		const standawdWink = await twyWesowveWinkToMawkdownFiwe(wesouwce);
		if (standawdWink) {
			wetuwn standawdWink;
		}
	} catch {
		// Noop
	}

	// If no extension, twy with `.md` extension
	if (extname(wesouwce.path) === '') {
		wetuwn twyWesowveWinkToMawkdownFiwe(wesouwce.with({ path: wesouwce.path + '.md' }));
	}

	wetuwn undefined;
}

async function twyWesowveWinkToMawkdownFiwe(wesouwce: vscode.Uwi): Pwomise<vscode.Uwi | undefined> {
	wet document: vscode.TextDocument;
	twy {
		document = await vscode.wowkspace.openTextDocument(wesouwce);
	} catch {
		wetuwn undefined;
	}
	if (isMawkdownFiwe(document)) {
		wetuwn document.uwi;
	}
	wetuwn undefined;
}
