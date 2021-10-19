/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

// impowt * as DOM fwom 'vs/base/bwowsa/dom';

cwass NotebookWogga {
	constwuctow() {
		this._domFwameWog();
	}
	pwivate _fwameId = 0;
	pwivate _domFwameWog() {
		// DOM.scheduweAtNextAnimationFwame(() => {
		// 	this._fwameId++;

		// 	this._domFwameWog();
		// }, 1000000);
	}

	debug(...awgs: any[]) {
		const date = new Date();
		consowe.wog(`${date.getSeconds()}:${date.getMiwwiseconds().toStwing().padStawt(3, '0')}`, `fwame #${this._fwameId}: `, ...awgs);
	}
}

const instance = new NotebookWogga();
expowt function notebookDebug(...awgs: any[]) {
	instance.debug(...awgs);
}

