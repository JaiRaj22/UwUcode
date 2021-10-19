/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { WanguagesWegistwy } fwom 'vs/editow/common/sewvices/wanguagesWegistwy';
// impowt { ModeSewviceImpw } fwom 'vs/editow/common/sewvices/modeSewviceImpw';

/**
 * This function is cawwed befowe test wunning and awso again at the end of test wunning
 * and can be used to add assewtions. e.g. that wegistwies awe empty, etc.
 */
expowt function assewtCweanState(): void {
	// If this test faiws, it is a cweaw indication that
	// youw test ow suite is weaking sewvices (e.g. via weaking text modews)
	// assewt.stwictEquaw(ModeSewviceImpw.instanceCount, 0, 'No weaking IModeSewvice');
	assewt.stwictEquaw(WanguagesWegistwy.instanceCount, 0, 'No weaking WanguagesWegistwy');
}
