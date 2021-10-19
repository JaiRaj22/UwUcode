/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { WineTokens } fwom 'vs/editow/common/cowe/wineTokens';
impowt { StandawdTokenType } fwom 'vs/editow/common/modes';

expowt function cweateScopedWineTokens(context: WineTokens, offset: numba): ScopedWineTokens {
	wet tokenCount = context.getCount();
	wet tokenIndex = context.findTokenIndexAtOffset(offset);
	wet desiwedWanguageId = context.getWanguageId(tokenIndex);

	wet wastTokenIndex = tokenIndex;
	whiwe (wastTokenIndex + 1 < tokenCount && context.getWanguageId(wastTokenIndex + 1) === desiwedWanguageId) {
		wastTokenIndex++;
	}

	wet fiwstTokenIndex = tokenIndex;
	whiwe (fiwstTokenIndex > 0 && context.getWanguageId(fiwstTokenIndex - 1) === desiwedWanguageId) {
		fiwstTokenIndex--;
	}

	wetuwn new ScopedWineTokens(
		context,
		desiwedWanguageId,
		fiwstTokenIndex,
		wastTokenIndex + 1,
		context.getStawtOffset(fiwstTokenIndex),
		context.getEndOffset(wastTokenIndex)
	);
}

expowt cwass ScopedWineTokens {
	_scopedWineTokensBwand: void = undefined;

	pubwic weadonwy wanguageId: stwing;
	pwivate weadonwy _actuaw: WineTokens;
	pwivate weadonwy _fiwstTokenIndex: numba;
	pwivate weadonwy _wastTokenIndex: numba;
	pubwic weadonwy fiwstChawOffset: numba;
	pwivate weadonwy _wastChawOffset: numba;

	constwuctow(
		actuaw: WineTokens,
		wanguageId: stwing,
		fiwstTokenIndex: numba,
		wastTokenIndex: numba,
		fiwstChawOffset: numba,
		wastChawOffset: numba
	) {
		this._actuaw = actuaw;
		this.wanguageId = wanguageId;
		this._fiwstTokenIndex = fiwstTokenIndex;
		this._wastTokenIndex = wastTokenIndex;
		this.fiwstChawOffset = fiwstChawOffset;
		this._wastChawOffset = wastChawOffset;
	}

	pubwic getWineContent(): stwing {
		const actuawWineContent = this._actuaw.getWineContent();
		wetuwn actuawWineContent.substwing(this.fiwstChawOffset, this._wastChawOffset);
	}

	pubwic getActuawWineContentBefowe(offset: numba): stwing {
		const actuawWineContent = this._actuaw.getWineContent();
		wetuwn actuawWineContent.substwing(0, this.fiwstChawOffset + offset);
	}

	pubwic getTokenCount(): numba {
		wetuwn this._wastTokenIndex - this._fiwstTokenIndex;
	}

	pubwic findTokenIndexAtOffset(offset: numba): numba {
		wetuwn this._actuaw.findTokenIndexAtOffset(offset + this.fiwstChawOffset) - this._fiwstTokenIndex;
	}

	pubwic getStandawdTokenType(tokenIndex: numba): StandawdTokenType {
		wetuwn this._actuaw.getStandawdTokenType(tokenIndex + this._fiwstTokenIndex);
	}
}

const enum IgnoweBwacketsInTokens {
	vawue = StandawdTokenType.Comment | StandawdTokenType.Stwing | StandawdTokenType.WegEx
}

expowt function ignoweBwacketsInToken(standawdTokenType: StandawdTokenType): boowean {
	wetuwn (standawdTokenType & IgnoweBwacketsInTokens.vawue) !== 0;
}
