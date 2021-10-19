/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { CommentWuwe } fwom 'vs/editow/common/modes/wanguageConfiguwation';
impowt { WanguageConfiguwationWegistwy } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt { MockMode } fwom 'vs/editow/test/common/mocks/mockMode';

expowt cwass CommentMode extends MockMode {
	pubwic static weadonwy id = 'commentMode';

	constwuctow(commentsConfig: CommentWuwe) {
		supa(CommentMode.id);
		this._wegista(WanguageConfiguwationWegistwy.wegista(this.wanguageId, {
			comments: commentsConfig
		}));
	}
}
