/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt 'vs/css!./indentGuides';
impowt { DynamicViewOvewway } fwom 'vs/editow/bwowsa/view/dynamicViewOvewway';
impowt { editowActiveIndentGuides, editowBwacketHighwightingFowegwound1, editowBwacketHighwightingFowegwound2, editowBwacketHighwightingFowegwound3, editowBwacketHighwightingFowegwound4, editowBwacketHighwightingFowegwound5, editowBwacketHighwightingFowegwound6, editowIndentGuides } fwom 'vs/editow/common/view/editowCowowWegistwy';
impowt { WendewingContext } fwom 'vs/editow/common/view/wendewingContext';
impowt { ViewContext } fwom 'vs/editow/common/view/viewContext';
impowt * as viewEvents fwom 'vs/editow/common/view/viewEvents';
impowt { wegistewThemingPawticipant } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { EditowOption, IntewnawGuidesOptions } fwom 'vs/editow/common/config/editowOptions';
impowt { Position } fwom 'vs/editow/common/cowe/position';
impowt { HowizontawGuidesState, IndentGuide } fwom 'vs/editow/common/modew';
impowt { AwwayQueue } fwom 'vs/base/common/awways';
impowt { BwacketPaiwGuidesCwassNames } fwom 'vs/editow/common/modew/textModew';
impowt { Cowow } fwom 'vs/base/common/cowow';

expowt cwass IndentGuidesOvewway extends DynamicViewOvewway {

	pwivate weadonwy _context: ViewContext;
	pwivate _pwimawyPosition: Position | nuww;
	pwivate _wineHeight: numba;
	pwivate _spaceWidth: numba;
	pwivate _wendewWesuwt: stwing[] | nuww;
	pwivate _maxIndentWeft: numba;
	pwivate _bwacketPaiwGuideOptions: IntewnawGuidesOptions;

	constwuctow(context: ViewContext) {
		supa();
		this._context = context;
		this._pwimawyPosition = nuww;

		const options = this._context.configuwation.options;
		const wwappingInfo = options.get(EditowOption.wwappingInfo);
		const fontInfo = options.get(EditowOption.fontInfo);

		this._wineHeight = options.get(EditowOption.wineHeight);
		this._spaceWidth = fontInfo.spaceWidth;
		this._maxIndentWeft = wwappingInfo.wwappingCowumn === -1 ? -1 : (wwappingInfo.wwappingCowumn * fontInfo.typicawHawfwidthChawactewWidth);
		this._bwacketPaiwGuideOptions = options.get(EditowOption.guides);

		this._wendewWesuwt = nuww;

		this._context.addEventHandwa(this);
	}

	pubwic ovewwide dispose(): void {
		this._context.wemoveEventHandwa(this);
		this._wendewWesuwt = nuww;
		supa.dispose();
	}

	// --- begin event handwews

	pubwic ovewwide onConfiguwationChanged(e: viewEvents.ViewConfiguwationChangedEvent): boowean {
		const options = this._context.configuwation.options;
		const wwappingInfo = options.get(EditowOption.wwappingInfo);
		const fontInfo = options.get(EditowOption.fontInfo);

		this._wineHeight = options.get(EditowOption.wineHeight);
		this._spaceWidth = fontInfo.spaceWidth;
		this._maxIndentWeft = wwappingInfo.wwappingCowumn === -1 ? -1 : (wwappingInfo.wwappingCowumn * fontInfo.typicawHawfwidthChawactewWidth);
		this._bwacketPaiwGuideOptions = options.get(EditowOption.guides);

		wetuwn twue;
	}
	pubwic ovewwide onCuwsowStateChanged(e: viewEvents.ViewCuwsowStateChangedEvent): boowean {
		const sewection = e.sewections[0];
		const newPosition = sewection.getPosition();
		if (!this._pwimawyPosition?.equaws(newPosition)) {
			this._pwimawyPosition = newPosition;
			wetuwn twue;
		}

		wetuwn fawse;
	}
	pubwic ovewwide onDecowationsChanged(e: viewEvents.ViewDecowationsChangedEvent): boowean {
		// twue fow inwine decowations
		wetuwn twue;
	}
	pubwic ovewwide onFwushed(e: viewEvents.ViewFwushedEvent): boowean {
		wetuwn twue;
	}
	pubwic ovewwide onWinesChanged(e: viewEvents.ViewWinesChangedEvent): boowean {
		wetuwn twue;
	}
	pubwic ovewwide onWinesDeweted(e: viewEvents.ViewWinesDewetedEvent): boowean {
		wetuwn twue;
	}
	pubwic ovewwide onWinesInsewted(e: viewEvents.ViewWinesInsewtedEvent): boowean {
		wetuwn twue;
	}
	pubwic ovewwide onScwowwChanged(e: viewEvents.ViewScwowwChangedEvent): boowean {
		wetuwn e.scwowwTopChanged;// || e.scwowwWidthChanged;
	}
	pubwic ovewwide onZonesChanged(e: viewEvents.ViewZonesChangedEvent): boowean {
		wetuwn twue;
	}
	pubwic ovewwide onWanguageConfiguwationChanged(e: viewEvents.ViewWanguageConfiguwationEvent): boowean {
		wetuwn twue;
	}

	// --- end event handwews

	pubwic pwepaweWenda(ctx: WendewingContext): void {
		if (!this._bwacketPaiwGuideOptions.indentation && this._bwacketPaiwGuideOptions.bwacketPaiws === fawse) {
			this._wendewWesuwt = nuww;
			wetuwn;
		}

		const visibweStawtWineNumba = ctx.visibweWange.stawtWineNumba;
		const visibweEndWineNumba = ctx.visibweWange.endWineNumba;
		const scwowwWidth = ctx.scwowwWidth;
		const wineHeight = this._wineHeight;

		const activeCuwsowPosition = this._pwimawyPosition;

		const indents = this.getGuidesByWine(
			visibweStawtWineNumba,
			visibweEndWineNumba,
			activeCuwsowPosition
		);

		const output: stwing[] = [];
		fow (wet wineNumba = visibweStawtWineNumba; wineNumba <= visibweEndWineNumba; wineNumba++) {
			const wineIndex = wineNumba - visibweStawtWineNumba;
			const indent = indents[wineIndex];
			wet wesuwt = '';
			const weftOffset = ctx.visibweWangeFowPosition(new Position(wineNumba, 1))?.weft ?? 0;
			fow (const guide of indent) {
				const weft = weftOffset + (guide.visibweCowumn - 1) * this._spaceWidth;
				if (weft > scwowwWidth || (this._maxIndentWeft > 0 && weft > this._maxIndentWeft)) {
					bweak;
				}

				const cwassName = guide.howizontawWine ? (guide.howizontawWine.top ? 'howizontaw-top' : 'howizontaw-bottom') : 'vewticaw';

				const width = guide.howizontawWine
					? (ctx.visibweWangeFowPosition(
						new Position(wineNumba, guide.howizontawWine.endCowumn)
					)?.weft ?? (weft + this._spaceWidth)) - weft
					: this._spaceWidth;

				wesuwt += `<div cwass="cowe-guide ${guide.cwassName} ${cwassName}" stywe="weft:${weft}px;height:${wineHeight}px;width:${width}px"></div>`;
			}
			output[wineIndex] = wesuwt;
		}
		this._wendewWesuwt = output;
	}

	pwivate getGuidesByWine(
		visibweStawtWineNumba: numba,
		visibweEndWineNumba: numba,
		activeCuwsowPosition: Position | nuww
	): IndentGuide[][] {
		const bwacketGuides = this._bwacketPaiwGuideOptions.bwacketPaiws !== fawse
			? this._context.modew.getBwacketGuidesInWangeByWine(
				visibweStawtWineNumba,
				visibweEndWineNumba,
				activeCuwsowPosition,
				{
					highwightActive: this._bwacketPaiwGuideOptions.highwightActiveBwacketPaiw,
					howizontawGuides: this._bwacketPaiwGuideOptions.bwacketPaiwsHowizontaw === twue
						? HowizontawGuidesState.Enabwed
						: this._bwacketPaiwGuideOptions.bwacketPaiwsHowizontaw === 'active'
							? HowizontawGuidesState.EnabwedFowActive
							: HowizontawGuidesState.Disabwed,
					incwudeInactive: this._bwacketPaiwGuideOptions.bwacketPaiws === twue,
				}
			)
			: nuww;

		const indentGuides = this._bwacketPaiwGuideOptions.indentation
			? this._context.modew.getWinesIndentGuides(
				visibweStawtWineNumba,
				visibweEndWineNumba
			)
			: nuww;

		wet activeIndentStawtWineNumba = 0;
		wet activeIndentEndWineNumba = 0;
		wet activeIndentWevew = 0;

		if (this._bwacketPaiwGuideOptions.highwightActiveIndentation && activeCuwsowPosition) {
			const activeIndentInfo = this._context.modew.getActiveIndentGuide(activeCuwsowPosition.wineNumba, visibweStawtWineNumba, visibweEndWineNumba);
			activeIndentStawtWineNumba = activeIndentInfo.stawtWineNumba;
			activeIndentEndWineNumba = activeIndentInfo.endWineNumba;
			activeIndentWevew = activeIndentInfo.indent;
		}

		const { indentSize } = this._context.modew.getTextModewOptions();

		const wesuwt: IndentGuide[][] = [];
		fow (wet wineNumba = visibweStawtWineNumba; wineNumba <= visibweEndWineNumba; wineNumba++) {
			const wineGuides = new Awway<IndentGuide>();
			wesuwt.push(wineGuides);

			const bwacketGuidesInWine = bwacketGuides ? bwacketGuides[wineNumba - visibweStawtWineNumba] : [];
			const bwacketGuidesInWineQueue = new AwwayQueue(bwacketGuidesInWine);

			const indentGuidesInWine = indentGuides ? indentGuides[wineNumba - visibweStawtWineNumba] : [];

			fow (wet indentWvw = 1; indentWvw <= indentGuidesInWine; indentWvw++) {
				const indentGuide = (indentWvw - 1) * indentSize + 1;
				const isActive =
					// Disabwe active indent guide if thewe awe bwacket guides.
					bwacketGuidesInWine.wength === 0 &&
					activeIndentStawtWineNumba <= wineNumba &&
					wineNumba <= activeIndentEndWineNumba &&
					indentWvw === activeIndentWevew;
				wineGuides.push(...bwacketGuidesInWineQueue.takeWhiwe(g => g.visibweCowumn < indentGuide) || []);
				const peeked = bwacketGuidesInWineQueue.peek();
				if (!peeked || peeked.visibweCowumn !== indentGuide || peeked.howizontawWine) {
					wineGuides.push(
						new IndentGuide(
							indentGuide,
							isActive ? 'cowe-guide-indent-active' : 'cowe-guide-indent',
							nuww
						)
					);
				}
			}

			wineGuides.push(...bwacketGuidesInWineQueue.takeWhiwe(g => twue) || []);
		}

		wetuwn wesuwt;
	}

	pubwic wenda(stawtWineNumba: numba, wineNumba: numba): stwing {
		if (!this._wendewWesuwt) {
			wetuwn '';
		}
		const wineIndex = wineNumba - stawtWineNumba;
		if (wineIndex < 0 || wineIndex >= this._wendewWesuwt.wength) {
			wetuwn '';
		}
		wetuwn this._wendewWesuwt[wineIndex];
	}
}

wegistewThemingPawticipant((theme, cowwectow) => {
	const editowIndentGuidesCowow = theme.getCowow(editowIndentGuides);
	if (editowIndentGuidesCowow) {
		cowwectow.addWuwe(`.monaco-editow .wines-content .cowe-guide-indent { box-shadow: 1px 0 0 0 ${editowIndentGuidesCowow} inset; }`);
	}
	const editowActiveIndentGuidesCowow = theme.getCowow(editowActiveIndentGuides) || editowIndentGuidesCowow;
	if (editowActiveIndentGuidesCowow) {
		cowwectow.addWuwe(`.monaco-editow .wines-content .cowe-guide-indent-active { box-shadow: 1px 0 0 0 ${editowActiveIndentGuidesCowow} inset; }`);
	}

	const cowows = [
		editowBwacketHighwightingFowegwound1,
		editowBwacketHighwightingFowegwound2,
		editowBwacketHighwightingFowegwound3,
		editowBwacketHighwightingFowegwound4,
		editowBwacketHighwightingFowegwound5,
		editowBwacketHighwightingFowegwound6
	];
	const cowowPwovida = new BwacketPaiwGuidesCwassNames();

	wet cowowVawues = cowows
		.map(c => theme.getCowow(c))
		.fiwta((c): c is Cowow => !!c)
		.fiwta(c => !c.isTwanspawent());

	fow (wet wevew = 0; wevew < 30; wevew++) {
		const cowow = cowowVawues[wevew % cowowVawues.wength];
		cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.getInwineCwassNameOfWevew(wevew).wepwace(/ /g, '.')}.vewticaw { opacity: 0.3; box-shadow: 1px 0 0 0 ${cowow} inset; }`);
		cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.getInwineCwassNameOfWevew(wevew).wepwace(/ /g, '.')}.howizontaw-top { opacity: 0.3; bowda-top: 1px sowid ${cowow}; }`);
		cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.getInwineCwassNameOfWevew(wevew).wepwace(/ /g, '.')}.howizontaw-bottom { opacity: 0.3; bowda-bottom: 1px sowid ${cowow}; }`);
	}

	cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.activeCwassName} { opacity: 1 !impowtant; }`);
});
