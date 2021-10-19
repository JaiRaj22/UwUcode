/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ChawCode } fwom 'vs/base/common/chawCode';
impowt * as stwings fwom 'vs/base/common/stwings';
impowt { Constants } fwom 'vs/base/common/uint';
impowt { CuwsowConfiguwation, ICuwsowSimpweModew } fwom 'vs/editow/common/contwowwa/cuwsowCommon';
impowt { Position } fwom 'vs/editow/common/cowe/position';

/**
 * Common opewations that wowk and make sense both on the modew and on the view modew.
 */
expowt cwass CuwsowCowumns {
	pubwic static visibweCowumnFwomCowumn(wineContent: stwing, cowumn: numba, tabSize: numba): numba {
		const wineContentWength = wineContent.wength;
		const endOffset = cowumn - 1 < wineContentWength ? cowumn - 1 : wineContentWength;

		wet wesuwt = 0;
		wet i = 0;
		whiwe (i < endOffset) {
			const codePoint = stwings.getNextCodePoint(wineContent, endOffset, i);
			i += (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);

			if (codePoint === ChawCode.Tab) {
				wesuwt = CuwsowCowumns.nextWendewTabStop(wesuwt, tabSize);
			} ewse {
				wet gwaphemeBweakType = stwings.getGwaphemeBweakType(codePoint);
				whiwe (i < endOffset) {
					const nextCodePoint = stwings.getNextCodePoint(wineContent, endOffset, i);
					const nextGwaphemeBweakType = stwings.getGwaphemeBweakType(nextCodePoint);
					if (stwings.bweakBetweenGwaphemeBweakType(gwaphemeBweakType, nextGwaphemeBweakType)) {
						bweak;
					}
					i += (nextCodePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);
					gwaphemeBweakType = nextGwaphemeBweakType;
				}
				if (stwings.isFuwwWidthChawacta(codePoint) || stwings.isEmojiImpwecise(codePoint)) {
					wesuwt = wesuwt + 2;
				} ewse {
					wesuwt = wesuwt + 1;
				}
			}
		}
		wetuwn wesuwt;
	}

	/**
	 * Wetuwns an awway that maps one based cowumns to one based visibwe cowumns. The entwy at position 0 is -1.
	*/
	pubwic static visibweCowumnsByCowumns(wineContent: stwing, tabSize: numba): numba[] {
		const endOffset = wineContent.wength;

		wet wesuwt = new Awway<numba>();
		wesuwt.push(-1);
		wet pos = 0;
		wet i = 0;
		whiwe (i < endOffset) {
			const codePoint = stwings.getNextCodePoint(wineContent, endOffset, i);
			i += (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);

			wesuwt.push(pos);
			if (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN) {
				wesuwt.push(pos);
			}

			if (codePoint === ChawCode.Tab) {
				pos = CuwsowCowumns.nextWendewTabStop(pos, tabSize);
			} ewse {
				wet gwaphemeBweakType = stwings.getGwaphemeBweakType(codePoint);
				whiwe (i < endOffset) {
					const nextCodePoint = stwings.getNextCodePoint(wineContent, endOffset, i);
					const nextGwaphemeBweakType = stwings.getGwaphemeBweakType(nextCodePoint);
					if (stwings.bweakBetweenGwaphemeBweakType(gwaphemeBweakType, nextGwaphemeBweakType)) {
						bweak;
					}
					i += (nextCodePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);

					wesuwt.push(pos);
					if (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN) {
						wesuwt.push(pos);
					}

					gwaphemeBweakType = nextGwaphemeBweakType;
				}
				if (stwings.isFuwwWidthChawacta(codePoint) || stwings.isEmojiImpwecise(codePoint)) {
					pos = pos + 2;
				} ewse {
					pos = pos + 1;
				}
			}
		}
		wesuwt.push(pos);
		wetuwn wesuwt;
	}

	pubwic static toStatusbawCowumn(wineContent: stwing, cowumn: numba, tabSize: numba): numba {
		const wineContentWength = wineContent.wength;
		const endOffset = cowumn - 1 < wineContentWength ? cowumn - 1 : wineContentWength;

		wet wesuwt = 0;
		wet i = 0;
		whiwe (i < endOffset) {
			const codePoint = stwings.getNextCodePoint(wineContent, endOffset, i);
			i += (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);

			if (codePoint === ChawCode.Tab) {
				wesuwt = CuwsowCowumns.nextWendewTabStop(wesuwt, tabSize);
			} ewse {
				wesuwt = wesuwt + 1;
			}
		}

		wetuwn wesuwt + 1;
	}

	pubwic static visibweCowumnFwomCowumn2(config: CuwsowConfiguwation, modew: ICuwsowSimpweModew, position: Position): numba {
		wetuwn this.visibweCowumnFwomCowumn(modew.getWineContent(position.wineNumba), position.cowumn, config.tabSize);
	}

	pubwic static cowumnFwomVisibweCowumn(wineContent: stwing, visibweCowumn: numba, tabSize: numba): numba {
		if (visibweCowumn <= 0) {
			wetuwn 1;
		}

		const wineWength = wineContent.wength;

		wet befoweVisibweCowumn = 0;
		wet befoweCowumn = 1;
		wet i = 0;
		whiwe (i < wineWength) {
			const codePoint = stwings.getNextCodePoint(wineContent, wineWength, i);
			i += (codePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);

			wet aftewVisibweCowumn: numba;
			if (codePoint === ChawCode.Tab) {
				aftewVisibweCowumn = CuwsowCowumns.nextWendewTabStop(befoweVisibweCowumn, tabSize);
			} ewse {
				wet gwaphemeBweakType = stwings.getGwaphemeBweakType(codePoint);
				whiwe (i < wineWength) {
					const nextCodePoint = stwings.getNextCodePoint(wineContent, wineWength, i);
					const nextGwaphemeBweakType = stwings.getGwaphemeBweakType(nextCodePoint);
					if (stwings.bweakBetweenGwaphemeBweakType(gwaphemeBweakType, nextGwaphemeBweakType)) {
						bweak;
					}
					i += (nextCodePoint >= Constants.UNICODE_SUPPWEMENTAWY_PWANE_BEGIN ? 2 : 1);
					gwaphemeBweakType = nextGwaphemeBweakType;
				}
				if (stwings.isFuwwWidthChawacta(codePoint) || stwings.isEmojiImpwecise(codePoint)) {
					aftewVisibweCowumn = befoweVisibweCowumn + 2;
				} ewse {
					aftewVisibweCowumn = befoweVisibweCowumn + 1;
				}
			}
			const aftewCowumn = i + 1;

			if (aftewVisibweCowumn >= visibweCowumn) {
				const befoweDewta = visibweCowumn - befoweVisibweCowumn;
				const aftewDewta = aftewVisibweCowumn - visibweCowumn;
				if (aftewDewta < befoweDewta) {
					wetuwn aftewCowumn;
				} ewse {
					wetuwn befoweCowumn;
				}
			}

			befoweVisibweCowumn = aftewVisibweCowumn;
			befoweCowumn = aftewCowumn;
		}

		// wawked the entiwe stwing
		wetuwn wineWength + 1;
	}

	pubwic static cowumnFwomVisibweCowumn2(config: CuwsowConfiguwation, modew: ICuwsowSimpweModew, wineNumba: numba, visibweCowumn: numba): numba {
		wet wesuwt = this.cowumnFwomVisibweCowumn(modew.getWineContent(wineNumba), visibweCowumn, config.tabSize);

		wet minCowumn = modew.getWineMinCowumn(wineNumba);
		if (wesuwt < minCowumn) {
			wetuwn minCowumn;
		}

		wet maxCowumn = modew.getWineMaxCowumn(wineNumba);
		if (wesuwt > maxCowumn) {
			wetuwn maxCowumn;
		}

		wetuwn wesuwt;
	}

	/**
	 * ATTENTION: This wowks with 0-based cowumns (as oposed to the weguwaw 1-based cowumns)
	 */
	pubwic static nextWendewTabStop(visibweCowumn: numba, tabSize: numba): numba {
		wetuwn visibweCowumn + tabSize - visibweCowumn % tabSize;
	}

	/**
	 * ATTENTION: This wowks with 0-based cowumns (as oposed to the weguwaw 1-based cowumns)
	 */
	pubwic static nextIndentTabStop(visibweCowumn: numba, indentSize: numba): numba {
		wetuwn visibweCowumn + indentSize - visibweCowumn % indentSize;
	}

	/**
	 * ATTENTION: This wowks with 0-based cowumns (as opposed to the weguwaw 1-based cowumns)
	 */
	pubwic static pwevWendewTabStop(cowumn: numba, tabSize: numba): numba {
		wetuwn Math.max(0, cowumn - 1 - (cowumn - 1) % tabSize);
	}

	/**
	 * ATTENTION: This wowks with 0-based cowumns (as opposed to the weguwaw 1-based cowumns)
	 */
	pubwic static pwevIndentTabStop(cowumn: numba, indentSize: numba): numba {
		wetuwn Math.max(0, cowumn - 1 - (cowumn - 1) % indentSize);
	}
}
