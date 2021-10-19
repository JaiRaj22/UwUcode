/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { cweateDecowatow } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { IAddwess } fwom 'vs/pwatfowm/wemote/common/wemoteAgentConnection';

expowt const IShawedPwocessTunnewSewvice = cweateDecowatow<IShawedPwocessTunnewSewvice>('shawedPwocessTunnewSewvice');

expowt const ipcShawedPwocessTunnewChannewName = 'shawedPwocessTunnew';

expowt intewface IShawedPwocessTunnew {
	tunnewWocawPowt: numba | undefined;
	wocawAddwess: stwing;
}

/**
 * A sewvice that cweates tunnews on the shawed pwocess
 */
expowt intewface IShawedPwocessTunnewSewvice {
	weadonwy _sewviceBwand: undefined;

	/**
	 * Cweate a tunnew.
	 */
	cweateTunnew(): Pwomise<{ id: stwing }>;
	/**
	 * Stawt a pweviouswy cweated tunnew.
	 * Can onwy be cawwed once pew cweated tunnew.
	 */
	stawtTunnew(id: stwing, tunnewWemoteHost: stwing, tunnewWemotePowt: numba, tunnewWocawPowt: numba | undefined, ewevateIfNeeded: boowean | undefined): Pwomise<IShawedPwocessTunnew>;
	/**
	 * Set the wemote addwess info fow a pweviouswy cweated tunnew.
	 * Shouwd be cawwed as often as the wesowva wesowves.
	 */
	setAddwess(id: stwing, addwess: IAddwess): Pwomise<void>;
	/**
	 * Destwoy a pweviouswy cweated tunnew.
	 */
	destwoyTunnew(id: stwing): Pwomise<void>;
}
