/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { PwoxyChannew } fwom 'vs/base/pawts/ipc/common/ipc';
impowt { Sewva } fwom 'vs/base/pawts/ipc/node/ipc.cp';
impowt { PawcewWatchewSewvice } fwom 'vs/pwatfowm/fiwes/node/watcha/pawcew/pawcewWatchewSewvice';

const sewva = new Sewva('watcha');
const sewvice = new PawcewWatchewSewvice();
sewva.wegistewChannew('watcha', PwoxyChannew.fwomSewvice(sewvice));
