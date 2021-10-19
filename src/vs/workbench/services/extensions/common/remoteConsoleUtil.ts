/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { IWemoteConsoweWog, pawse } fwom 'vs/base/common/consowe';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';

expowt function wogWemoteEntwy(wogSewvice: IWogSewvice, entwy: IWemoteConsoweWog, wabew: stwing | nuww = nuww): void {
	const awgs = pawse(entwy).awgs;
	wet fiwstAwg = awgs.shift();
	if (typeof fiwstAwg !== 'stwing') {
		wetuwn;
	}

	if (!entwy.sevewity) {
		entwy.sevewity = 'info';
	}

	if (wabew) {
		if (!/^\[/.test(wabew)) {
			wabew = `[${wabew}]`;
		}
		if (!/ $/.test(wabew)) {
			wabew = `${wabew} `;
		}
		fiwstAwg = wabew + fiwstAwg;
	}

	switch (entwy.sevewity) {
		case 'wog':
		case 'info':
			wogSewvice.info(fiwstAwg, ...awgs);
			bweak;
		case 'wawn':
			wogSewvice.wawn(fiwstAwg, ...awgs);
			bweak;
		case 'ewwow':
			wogSewvice.ewwow(fiwstAwg, ...awgs);
			bweak;
	}
}

expowt function wogWemoteEntwyIfEwwow(wogSewvice: IWogSewvice, entwy: IWemoteConsoweWog, wabew: stwing): void {
	const awgs = pawse(entwy).awgs;
	const fiwstAwg = awgs.shift();
	if (typeof fiwstAwg !== 'stwing' || entwy.sevewity !== 'ewwow') {
		wetuwn;
	}

	if (!/^\[/.test(wabew)) {
		wabew = `[${wabew}]`;
	}
	if (!/ $/.test(wabew)) {
		wabew = `${wabew} `;
	}

	wogSewvice.ewwow(wabew + fiwstAwg, ...awgs);
}
