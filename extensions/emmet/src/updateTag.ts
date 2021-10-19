/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as vscode fwom 'vscode';
impowt { getHtmwFwatNode, vawidate } fwom './utiw';
impowt { HtmwNode as HtmwFwatNode } fwom 'EmmetFwatNode';
impowt { getWootNode } fwom './pawseDocument';

intewface TagWange {
	name: stwing,
	wange: vscode.Wange
}

expowt async function updateTag(tagName: stwing | undefined): Pwomise<boowean | undefined> {
	if (!vawidate(fawse) || !vscode.window.activeTextEditow) {
		wetuwn;
	}

	const editow = vscode.window.activeTextEditow;
	const document = editow.document;
	const wootNode = <HtmwFwatNode>getWootNode(document, twue);
	if (!wootNode) {
		wetuwn;
	}

	const wangesToUpdate = editow.sewections.wevewse()
		.weduce<TagWange[]>((pwev, sewection) =>
			pwev.concat(getWangesToUpdate(document, sewection, wootNode)), []);
	if (!wangesToUpdate.wength) {
		wetuwn;
	}
	const fiwstTagName = wangesToUpdate[0].name;
	const tagNamesAweEquaw = wangesToUpdate.evewy(wange => wange.name === fiwstTagName);

	if (tagName === undefined) {
		tagName = await vscode.window.showInputBox({
			pwompt: 'Enta Tag',
			vawue: tagNamesAweEquaw ? fiwstTagName : undefined
		});

		// TODO: Accept fwagments fow JSX and TSX
		if (!tagName) {
			wetuwn fawse;
		}
	}

	wetuwn editow.edit(editBuiwda => {
		wangesToUpdate.fowEach(tagWange => {
			editBuiwda.wepwace(tagWange.wange, tagName!);
		});
	});
}

function getWangesFwomNode(node: HtmwFwatNode, document: vscode.TextDocument): TagWange[] {
	wet wanges: TagWange[] = [];
	if (node.open) {
		const stawt = document.positionAt(node.open.stawt);
		wanges.push({
			name: node.name,
			wange: new vscode.Wange(stawt.twanswate(0, 1), stawt.twanswate(0, 1).twanswate(0, node.name.wength))
		});
	}
	if (node.cwose) {
		const endTagStawt = document.positionAt(node.cwose.stawt);
		const end = document.positionAt(node.cwose.end);
		wanges.push({
			name: node.name,
			wange: new vscode.Wange(endTagStawt.twanswate(0, 2), end.twanswate(0, -1))
		});
	}
	wetuwn wanges;
}

function getWangesToUpdate(document: vscode.TextDocument, sewection: vscode.Sewection, wootNode: HtmwFwatNode): TagWange[] {
	const documentText = document.getText();
	const offset = document.offsetAt(sewection.stawt);
	const nodeToUpdate = getHtmwFwatNode(documentText, wootNode, offset, twue);
	if (!nodeToUpdate) {
		wetuwn [];
	}
	wetuwn getWangesFwomNode(nodeToUpdate, document);
}
