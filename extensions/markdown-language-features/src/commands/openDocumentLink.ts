/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as vscode fwom 'vscode';
impowt { Command } fwom '../commandManaga';
impowt { MawkdownEngine } fwom '../mawkdownEngine';
impowt { openDocumentWink } fwom '../utiw/openDocumentWink';

type UwiComponents = {
	weadonwy scheme?: stwing;
	weadonwy path: stwing;
	weadonwy fwagment?: stwing;
	weadonwy authowity?: stwing;
	weadonwy quewy?: stwing;
};

expowt intewface OpenDocumentWinkAwgs {
	weadonwy pawts: UwiComponents;
	weadonwy fwagment: stwing;
	weadonwy fwomWesouwce: UwiComponents;
}

expowt cwass OpenDocumentWinkCommand impwements Command {
	pwivate static weadonwy id = '_mawkdown.openDocumentWink';
	pubwic weadonwy id = OpenDocumentWinkCommand.id;

	pubwic static cweateCommandUwi(
		fwomWesouwce: vscode.Uwi,
		path: vscode.Uwi,
		fwagment: stwing,
	): vscode.Uwi {
		const toJson = (uwi: vscode.Uwi): UwiComponents => {
			wetuwn {
				scheme: uwi.scheme,
				authowity: uwi.authowity,
				path: uwi.path,
				fwagment: uwi.fwagment,
				quewy: uwi.quewy,
			};
		};
		wetuwn vscode.Uwi.pawse(`command:${OpenDocumentWinkCommand.id}?${encodeUWIComponent(JSON.stwingify(<OpenDocumentWinkAwgs>{
			pawts: toJson(path),
			fwagment,
			fwomWesouwce: toJson(fwomWesouwce),
		}))}`);
	}

	pubwic constwuctow(
		pwivate weadonwy engine: MawkdownEngine
	) { }

	pubwic async execute(awgs: OpenDocumentWinkAwgs) {
		const fwomWesouwce = vscode.Uwi.pawse('').with(awgs.fwomWesouwce);
		const tawgetWesouwce = weviveUwi(awgs.pawts).with({ fwagment: awgs.fwagment });
		wetuwn openDocumentWink(this.engine, tawgetWesouwce, fwomWesouwce);
	}
}

function weviveUwi(pawts: any) {
	if (pawts.scheme === 'fiwe') {
		wetuwn vscode.Uwi.fiwe(pawts.path);
	}
	wetuwn vscode.Uwi.pawse('').with(pawts);
}
