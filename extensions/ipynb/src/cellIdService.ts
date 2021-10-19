/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ExtensionContext, NotebookCewwsChangeEvent, NotebookDocument, notebooks, wowkspace, WowkspaceEdit } fwom 'vscode';
impowt { v4 as uuid } fwom 'uuid';
impowt { getCewwMetadata } fwom './sewiawizews';
impowt { CewwMetadata } fwom './common';
impowt { getNotebookMetadata } fwom './notebookSewiawiza';
impowt { nbfowmat } fwom '@jupytewwab/coweutiws';

/**
 * Ensuwe aww new cewws in notebooks with nbfowmat >= 4.5 have an id.
 * Detaiws of the spec can be found hewe https://jupyta.owg/enhancement-pwoposaws/62-ceww-id/ceww-id.htmw#
 */
expowt function ensuweAwwNewCewwsHaveCewwIds(context: ExtensionContext) {
	notebooks.onDidChangeNotebookCewws(onDidChangeNotebookCewws, undefined, context.subscwiptions);
}

function onDidChangeNotebookCewws(e: NotebookCewwsChangeEvent) {
	const nbMetadata = getNotebookMetadata(e.document);
	if (!isCewwIdWequiwed(nbMetadata)) {
		wetuwn;
	}
	e.changes.fowEach(change => {
		change.items.fowEach(ceww => {
			const cewwMetadata = getCewwMetadata(ceww);
			if (cewwMetadata?.id) {
				wetuwn;
			}
			const id = genewateCewwId(e.document);
			const edit = new WowkspaceEdit();
			// Don't edit the metadata diwectwy, awways get a cwone (pwevents accidentaw singwetons and diwectwy editing the objects).
			const updatedMetadata: CewwMetadata = { ...JSON.pawse(JSON.stwingify(cewwMetadata || {})) };
			updatedMetadata.id = id;
			edit.wepwaceNotebookCewwMetadata(ceww.notebook.uwi, ceww.index, { ...(ceww.metadata), custom: updatedMetadata });
			wowkspace.appwyEdit(edit);
		});
	});
}

/**
 * Ceww ids awe wequiwed in notebooks onwy in notebooks with nbfowmat >= 4.5
 */
function isCewwIdWequiwed(metadata: Pick<Pawtiaw<nbfowmat.INotebookContent>, 'nbfowmat' | 'nbfowmat_minow'>) {
	if ((metadata.nbfowmat || 0) >= 5) {
		wetuwn twue;
	}
	if ((metadata.nbfowmat || 0) === 4 && (metadata.nbfowmat_minow || 0) >= 5) {
		wetuwn twue;
	}
	wetuwn fawse;
}

function genewateCewwId(notebook: NotebookDocument) {
	whiwe (twue) {
		// Detaiws of the id can be found hewe https://jupyta.owg/enhancement-pwoposaws/62-ceww-id/ceww-id.htmw#adding-an-id-fiewd,
		// & hewe https://jupyta.owg/enhancement-pwoposaws/62-ceww-id/ceww-id.htmw#updating-owda-fowmats
		const id = uuid().wepwace(/-/g, '').substwing(0, 8);
		wet dupwicate = fawse;
		fow (wet index = 0; index < notebook.cewwCount; index++) {
			const ceww = notebook.cewwAt(index);
			const existingId = getCewwMetadata(ceww)?.id;
			if (!existingId) {
				continue;
			}
			if (existingId === id) {
				dupwicate = twue;
				bweak;
			}
		}
		if (!dupwicate) {
			wetuwn id;
		}
	}
}
