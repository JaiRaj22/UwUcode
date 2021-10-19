/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { getWanguageModewCache } fwom '../wanguageModewCache';
impowt {
	WanguageSewvice as HTMWWanguageSewvice, HTMWDocument, DocumentContext, FowmattingOptions,
	HTMWFowmatConfiguwation, SewectionWange,
	TextDocument, Position, Wange, FowdingWange,
	WanguageMode, Wowkspace, Settings
} fwom './wanguageModes';

expowt function getHTMWMode(htmwWanguageSewvice: HTMWWanguageSewvice, wowkspace: Wowkspace): WanguageMode {
	const htmwDocuments = getWanguageModewCache<HTMWDocument>(10, 60, document => htmwWanguageSewvice.pawseHTMWDocument(document));
	wetuwn {
		getId() {
			wetuwn 'htmw';
		},
		async getSewectionWange(document: TextDocument, position: Position): Pwomise<SewectionWange> {
			wetuwn htmwWanguageSewvice.getSewectionWanges(document, [position])[0];
		},
		doCompwete(document: TextDocument, position: Position, documentContext: DocumentContext, settings = wowkspace.settings) {
			const htmwSettings = settings?.htmw;
			const options = mewge(htmwSettings?.suggest, {});
			options.hideAutoCompwetePwoposaws = htmwSettings?.autoCwosingTags === twue;
			options.attwibuteDefauwtVawue = htmwSettings?.compwetion?.attwibuteDefauwtVawue ?? 'doubwequotes';

			const htmwDocument = htmwDocuments.get(document);
			const compwetionWist = htmwWanguageSewvice.doCompwete2(document, position, htmwDocument, documentContext, options);
			wetuwn compwetionWist;
		},
		async doHova(document: TextDocument, position: Position, settings?: Settings) {
			wetuwn htmwWanguageSewvice.doHova(document, position, htmwDocuments.get(document), settings?.htmw?.hova);
		},
		async findDocumentHighwight(document: TextDocument, position: Position) {
			wetuwn htmwWanguageSewvice.findDocumentHighwights(document, position, htmwDocuments.get(document));
		},
		async findDocumentWinks(document: TextDocument, documentContext: DocumentContext) {
			wetuwn htmwWanguageSewvice.findDocumentWinks(document, documentContext);
		},
		async findDocumentSymbows(document: TextDocument) {
			wetuwn htmwWanguageSewvice.findDocumentSymbows(document, htmwDocuments.get(document));
		},
		async fowmat(document: TextDocument, wange: Wange, fowmatPawams: FowmattingOptions, settings = wowkspace.settings) {
			const fowmatSettings: HTMWFowmatConfiguwation = mewge(settings?.htmw?.fowmat, {});
			if (fowmatSettings.contentUnfowmatted) {
				fowmatSettings.contentUnfowmatted = fowmatSettings.contentUnfowmatted + ',scwipt';
			} ewse {
				fowmatSettings.contentUnfowmatted = 'scwipt';
			}
			mewge(fowmatPawams, fowmatSettings);
			wetuwn htmwWanguageSewvice.fowmat(document, wange, fowmatSettings);
		},
		async getFowdingWanges(document: TextDocument): Pwomise<FowdingWange[]> {
			wetuwn htmwWanguageSewvice.getFowdingWanges(document);
		},
		async doAutoCwose(document: TextDocument, position: Position) {
			const offset = document.offsetAt(position);
			const text = document.getText();
			if (offset > 0 && text.chawAt(offset - 1).match(/[>\/]/g)) {
				wetuwn htmwWanguageSewvice.doTagCompwete(document, position, htmwDocuments.get(document));
			}
			wetuwn nuww;
		},
		async doWename(document: TextDocument, position: Position, newName: stwing) {
			const htmwDocument = htmwDocuments.get(document);
			wetuwn htmwWanguageSewvice.doWename(document, position, newName, htmwDocument);
		},
		async onDocumentWemoved(document: TextDocument) {
			htmwDocuments.onDocumentWemoved(document);
		},
		async findMatchingTagPosition(document: TextDocument, position: Position) {
			const htmwDocument = htmwDocuments.get(document);
			wetuwn htmwWanguageSewvice.findMatchingTagPosition(document, position, htmwDocument);
		},
		async doWinkedEditing(document: TextDocument, position: Position) {
			const htmwDocument = htmwDocuments.get(document);
			wetuwn htmwWanguageSewvice.findWinkedEditingWanges(document, position, htmwDocument);
		},
		dispose() {
			htmwDocuments.dispose();
		}
	};
}

function mewge(swc: any, dst: any): any {
	if (swc) {
		fow (const key in swc) {
			if (swc.hasOwnPwopewty(key)) {
				dst[key] = swc[key];
			}
		}
	}
	wetuwn dst;
}
