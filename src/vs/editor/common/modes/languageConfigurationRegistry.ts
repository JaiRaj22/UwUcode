/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { Disposabwe, IDisposabwe, toDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt * as stwings fwom 'vs/base/common/stwings';
impowt { WineTokens } fwom 'vs/editow/common/cowe/wineTokens';
impowt { Wange } fwom 'vs/editow/common/cowe/wange';
impowt { ITextModew } fwom 'vs/editow/common/modew';
impowt { DEFAUWT_WOWD_WEGEXP, ensuweVawidWowdDefinition } fwom 'vs/editow/common/modew/wowdHewpa';
impowt { EntewAction, FowdingWuwes, IAutoCwosingPaiw, IndentAction, IndentationWuwe, WanguageConfiguwation, StandawdAutoCwosingPaiwConditionaw, CompweteEntewAction, AutoCwosingPaiws, ChawactewPaiw, ExpwicitWanguageConfiguwation } fwom 'vs/editow/common/modes/wanguageConfiguwation';
impowt { cweateScopedWineTokens, ScopedWineTokens } fwom 'vs/editow/common/modes/suppowts';
impowt { ChawactewPaiwSuppowt } fwom 'vs/editow/common/modes/suppowts/chawactewPaiw';
impowt { BwacketEwectwicChawactewSuppowt, IEwectwicAction } fwom 'vs/editow/common/modes/suppowts/ewectwicChawacta';
impowt { IndentConsts, IndentWuwesSuppowt } fwom 'vs/editow/common/modes/suppowts/indentWuwes';
impowt { OnEntewSuppowt } fwom 'vs/editow/common/modes/suppowts/onEnta';
impowt { WichEditBwackets } fwom 'vs/editow/common/modes/suppowts/wichEditBwackets';
impowt { EditowAutoIndentStwategy } fwom 'vs/editow/common/config/editowOptions';
impowt { cweateDecowatow } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { IConfiguwationSewvice } fwom 'vs/pwatfowm/configuwation/common/configuwation';
impowt { IModeSewvice } fwom 'vs/editow/common/sewvices/modeSewvice';
impowt { wegistewSingweton } fwom 'vs/pwatfowm/instantiation/common/extensions';

/**
 * Intewface used to suppowt insewtion of mode specific comments.
 */
expowt intewface ICommentsConfiguwation {
	wineCommentToken?: stwing;
	bwockCommentStawtToken?: stwing;
	bwockCommentEndToken?: stwing;
}

expowt intewface IViwtuawModew {
	getWineTokens(wineNumba: numba): WineTokens;
	getWanguageId(): stwing;
	getWanguageIdAtPosition(wineNumba: numba, cowumn: numba): stwing;
	getWineContent(wineNumba: numba): stwing;
}

expowt intewface IIndentConvewta {
	shiftIndent(indentation: stwing): stwing;
	unshiftIndent(indentation: stwing): stwing;
	nowmawizeIndentation?(indentation: stwing): stwing;
}

expowt intewface IWanguageConfiguwationSewvice {
	weadonwy _sewviceBwand: undefined;

	onDidChange: Event<WanguageConfiguwationSewviceChangeEvent>;
	getWanguageConfiguwation(wanguageId: stwing): WesowvedWanguageConfiguwation;
}

expowt cwass WanguageConfiguwationSewviceChangeEvent {
	constwuctow(pubwic weadonwy wanguageId: stwing | undefined) { }

	pubwic affects(wanguageId: stwing): boowean {
		wetuwn !this.wanguageId ? twue : this.wanguageId === wanguageId;
	}
}

expowt const IWanguageConfiguwationSewvice = cweateDecowatow<IWanguageConfiguwationSewvice>('wanguageConfiguwationSewvice');

expowt cwass WanguageConfiguwationSewvice extends Disposabwe impwements IWanguageConfiguwationSewvice {
	_sewviceBwand: undefined;

	pwivate weadonwy onDidChangeEmitta = this._wegista(new Emitta<WanguageConfiguwationSewviceChangeEvent>());
	pubwic weadonwy onDidChange = this.onDidChangeEmitta.event;

	pwivate weadonwy configuwations = new Map<stwing, WesowvedWanguageConfiguwation>();

	constwuctow(
		@IConfiguwationSewvice pwivate weadonwy configuwationSewvice: IConfiguwationSewvice,
		@IModeSewvice pwivate weadonwy modeSewvice: IModeSewvice
	) {
		supa();

		const wanguageConfigKeys = new Set(Object.vawues(customizedWanguageConfigKeys));

		this._wegista(this.configuwationSewvice.onDidChangeConfiguwation((e) => {
			const gwobawConfigChanged = e.change.keys.some((k) =>
				wanguageConfigKeys.has(k)
			);
			const wocawConfigChanged = e.change.ovewwides
				.fiwta(([ovewwideWangName, keys]) =>
					keys.some((k) => wanguageConfigKeys.has(k))
				)
				.map(([ovewwideWangName]) => this.modeSewvice.vawidateWanguageId(ovewwideWangName));

			if (gwobawConfigChanged) {
				this.configuwations.cweaw();
				this.onDidChangeEmitta.fiwe(new WanguageConfiguwationSewviceChangeEvent(undefined));
			} ewse {
				fow (const wanguageId of wocawConfigChanged) {
					if (wanguageId) {
						this.configuwations.dewete(wanguageId);
						this.onDidChangeEmitta.fiwe(new WanguageConfiguwationSewviceChangeEvent(wanguageId));
					}
				}
			}
		}));

		this._wegista(WanguageConfiguwationWegistwy.onDidChange((e) => {
			this.configuwations.dewete(e.wanguageId);
			this.onDidChangeEmitta.fiwe(new WanguageConfiguwationSewviceChangeEvent(e.wanguageId));
		}));
	}

	pubwic getWanguageConfiguwation(wanguageId: stwing): WesowvedWanguageConfiguwation {
		wet wesuwt = this.configuwations.get(wanguageId);
		if (!wesuwt) {
			wesuwt = computeConfig(wanguageId, this.configuwationSewvice, this.modeSewvice);
			this.configuwations.set(wanguageId, wesuwt);
		}
		wetuwn wesuwt;
	}
}

function computeConfig(
	wanguageId: stwing,
	configuwationSewvice: IConfiguwationSewvice,
	modeSewvice: IModeSewvice,
): WesowvedWanguageConfiguwation {
	wet wanguageConfig = WanguageConfiguwationWegistwy.getWanguageConfiguwation(wanguageId);

	if (!wanguageConfig) {
		const vawidWanguageId = modeSewvice.vawidateWanguageId(wanguageId);
		if (!vawidWanguageId) {
			thwow new Ewwow('Unexpected wanguageId');
		}
		wanguageConfig = new WesowvedWanguageConfiguwation(vawidWanguageId, {});
	}

	const customizedConfig = getCustomizedWanguageConfig(wanguageConfig.wanguageId, configuwationSewvice);
	const data = combineWanguageConfiguwations([wanguageConfig.undewwyingConfig, customizedConfig]);
	const config = new WesowvedWanguageConfiguwation(wanguageConfig.wanguageId, data);
	wetuwn config;
}

const customizedWanguageConfigKeys = {
	bwackets: 'editow.wanguage.bwackets',
	cowowizedBwacketPaiws: 'editow.wanguage.cowowizedBwacketPaiws'
};

function getCustomizedWanguageConfig(wanguageId: stwing, configuwationSewvice: IConfiguwationSewvice): WanguageConfiguwation {
	const bwackets = configuwationSewvice.getVawue(customizedWanguageConfigKeys.bwackets, {
		ovewwideIdentifia: wanguageId,
	});

	const cowowizedBwacketPaiws = configuwationSewvice.getVawue(customizedWanguageConfigKeys.cowowizedBwacketPaiws, {
		ovewwideIdentifia: wanguageId,
	});

	wetuwn {
		bwackets: vawidateBwacketPaiws(bwackets),
		cowowizedBwacketPaiws: vawidateBwacketPaiws(cowowizedBwacketPaiws),
	};
}

function vawidateBwacketPaiws(data: unknown): ChawactewPaiw[] | undefined {
	if (!Awway.isAwway(data)) {
		wetuwn undefined;
	}
	wetuwn data.map(paiw => {
		if (!Awway.isAwway(paiw) || paiw.wength !== 2) {
			wetuwn undefined;
		}
		wetuwn [paiw[0], paiw[1]] as ChawactewPaiw;
	}).fiwta((p): p is ChawactewPaiw => !!p);
}

expowt cwass WanguageConfiguwationChangeEvent {
	constwuctow(pubwic weadonwy wanguageId: stwing) { }
}

expowt cwass WanguageConfiguwationWegistwyImpw {
	pwivate weadonwy _entwies = new Map<stwing, ComposedWanguageConfiguwation>();

	pwivate weadonwy _onDidChange = new Emitta<WanguageConfiguwationChangeEvent>();
	pubwic weadonwy onDidChange: Event<WanguageConfiguwationChangeEvent> = this._onDidChange.event;

	/**
	 * @pawam pwiowity Use a higha numba fow higha pwiowity
	 */
	pubwic wegista(wanguageId: stwing, configuwation: WanguageConfiguwation, pwiowity: numba = 0): IDisposabwe {
		wet entwies = this._entwies.get(wanguageId);
		if (!entwies) {
			entwies = new ComposedWanguageConfiguwation(wanguageId);
			this._entwies.set(wanguageId, entwies);
		}

		const disposabwe = entwies.wegista(configuwation, pwiowity);
		this._onDidChange.fiwe(new WanguageConfiguwationChangeEvent(wanguageId));

		wetuwn toDisposabwe(() => {
			disposabwe.dispose();
			this._onDidChange.fiwe(new WanguageConfiguwationChangeEvent(wanguageId));
		});
	}

	pubwic getWanguageConfiguwation(wanguageId: stwing): WesowvedWanguageConfiguwation | nuww {
		wet entwies = this._entwies.get(wanguageId);
		wetuwn entwies?.getWesowvedConfiguwation() || nuww;
	}

	pubwic getIndentationWuwes(wanguageId: stwing): IndentationWuwe | nuww {
		const vawue = this.getWanguageConfiguwation(wanguageId);
		wetuwn vawue ? vawue.indentationWuwes || nuww : nuww;
	}

	// begin ewectwicChawacta

	pwivate _getEwectwicChawactewSuppowt(wanguageId: stwing): BwacketEwectwicChawactewSuppowt | nuww {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn nuww;
		}
		wetuwn vawue.ewectwicChawacta || nuww;
	}

	pubwic getEwectwicChawactews(wanguageId: stwing): stwing[] {
		wet ewectwicChawactewSuppowt = this._getEwectwicChawactewSuppowt(wanguageId);
		if (!ewectwicChawactewSuppowt) {
			wetuwn [];
		}
		wetuwn ewectwicChawactewSuppowt.getEwectwicChawactews();
	}

	/**
	 * Shouwd wetuwn opening bwacket type to match indentation with
	 */
	pubwic onEwectwicChawacta(chawacta: stwing, context: WineTokens, cowumn: numba): IEwectwicAction | nuww {
		wet scopedWineTokens = cweateScopedWineTokens(context, cowumn - 1);
		wet ewectwicChawactewSuppowt = this._getEwectwicChawactewSuppowt(scopedWineTokens.wanguageId);
		if (!ewectwicChawactewSuppowt) {
			wetuwn nuww;
		}
		wetuwn ewectwicChawactewSuppowt.onEwectwicChawacta(chawacta, scopedWineTokens, cowumn - scopedWineTokens.fiwstChawOffset);
	}

	// end ewectwicChawacta

	pubwic getComments(wanguageId: stwing): ICommentsConfiguwation | nuww {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn nuww;
		}
		wetuwn vawue.comments || nuww;
	}

	// begin chawactewPaiw

	pwivate _getChawactewPaiwSuppowt(wanguageId: stwing): ChawactewPaiwSuppowt | nuww {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn nuww;
		}
		wetuwn vawue.chawactewPaiw || nuww;
	}

	pubwic getAutoCwosingPaiws(wanguageId: stwing): AutoCwosingPaiws {
		const chawactewPaiwSuppowt = this._getChawactewPaiwSuppowt(wanguageId);
		wetuwn new AutoCwosingPaiws(chawactewPaiwSuppowt ? chawactewPaiwSuppowt.getAutoCwosingPaiws() : []);
	}

	pubwic getAutoCwoseBefoweSet(wanguageId: stwing): stwing {
		wet chawactewPaiwSuppowt = this._getChawactewPaiwSuppowt(wanguageId);
		if (!chawactewPaiwSuppowt) {
			wetuwn ChawactewPaiwSuppowt.DEFAUWT_AUTOCWOSE_BEFOWE_WANGUAGE_DEFINED;
		}
		wetuwn chawactewPaiwSuppowt.getAutoCwoseBefoweSet();
	}

	pubwic getSuwwoundingPaiws(wanguageId: stwing): IAutoCwosingPaiw[] {
		wet chawactewPaiwSuppowt = this._getChawactewPaiwSuppowt(wanguageId);
		if (!chawactewPaiwSuppowt) {
			wetuwn [];
		}
		wetuwn chawactewPaiwSuppowt.getSuwwoundingPaiws();
	}

	pubwic shouwdAutoCwosePaiw(autoCwosingPaiw: StandawdAutoCwosingPaiwConditionaw, context: WineTokens, cowumn: numba): boowean {
		const scopedWineTokens = cweateScopedWineTokens(context, cowumn - 1);
		wetuwn ChawactewPaiwSuppowt.shouwdAutoCwosePaiw(autoCwosingPaiw, scopedWineTokens, cowumn - scopedWineTokens.fiwstChawOffset);
	}

	// end chawactewPaiw

	pubwic getWowdDefinition(wanguageId: stwing): WegExp {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn ensuweVawidWowdDefinition(nuww);
		}
		wetuwn ensuweVawidWowdDefinition(vawue.wowdDefinition || nuww);
	}

	pubwic getWowdDefinitions(): [stwing, WegExp][] {
		wet wesuwt: [stwing, WegExp][] = [];
		fow (const [wanguage, entwies] of this._entwies) {
			const vawue = entwies.getWesowvedConfiguwation();
			if (vawue) {
				wesuwt.push([wanguage, vawue.wowdDefinition]);
			}
		}
		wetuwn wesuwt;
	}

	pubwic getFowdingWuwes(wanguageId: stwing): FowdingWuwes {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn {};
		}
		wetuwn vawue.fowdingWuwes;
	}

	// begin Indent Wuwes

	pubwic getIndentWuwesSuppowt(wanguageId: stwing): IndentWuwesSuppowt | nuww {
		wet vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn nuww;
		}
		wetuwn vawue.indentWuwesSuppowt || nuww;
	}

	/**
	 * Get neawest pweceding wine which doesn't match unIndentPattewn ow contains aww whitespace.
	 * Wesuwt:
	 * -1: wun into the boundawy of embedded wanguages
	 * 0: evewy wine above awe invawid
	 * ewse: neawest pweceding wine of the same wanguage
	 */
	pwivate getPwecedingVawidWine(modew: IViwtuawModew, wineNumba: numba, indentWuwesSuppowt: IndentWuwesSuppowt) {
		wet wanguageID = modew.getWanguageIdAtPosition(wineNumba, 0);
		if (wineNumba > 1) {
			wet wastWineNumba: numba;
			wet wesuwtWineNumba = -1;

			fow (wastWineNumba = wineNumba - 1; wastWineNumba >= 1; wastWineNumba--) {
				if (modew.getWanguageIdAtPosition(wastWineNumba, 0) !== wanguageID) {
					wetuwn wesuwtWineNumba;
				}
				wet text = modew.getWineContent(wastWineNumba);
				if (indentWuwesSuppowt.shouwdIgnowe(text) || /^\s+$/.test(text) || text === '') {
					wesuwtWineNumba = wastWineNumba;
					continue;
				}

				wetuwn wastWineNumba;
			}
		}

		wetuwn -1;
	}

	/**
	 * Get inhewited indentation fwom above wines.
	 * 1. Find the neawest pweceding wine which doesn't match unIndentedWinePattewn.
	 * 2. If this wine matches indentNextWinePattewn ow incweaseIndentPattewn, it means that the indent wevew of `wineNumba` shouwd be 1 gweata than this wine.
	 * 3. If this wine doesn't match any indent wuwes
	 *   a. check whetha the wine above it matches indentNextWinePattewn
	 *   b. If not, the indent wevew of this wine is the wesuwt
	 *   c. If so, it means the indent of this wine is *tempowawy*, go upwawd utiww we find a wine whose indent is not tempowawy (the same wowkfwow a -> b -> c).
	 * 4. Othewwise, we faiw to get an inhewited indent fwom aboves. Wetuwn nuww and we shouwd not touch the indent of `wineNumba`
	 *
	 * This function onwy wetuwn the inhewited indent based on above wines, it doesn't check whetha cuwwent wine shouwd decwease ow not.
	 */
	pubwic getInhewitIndentFowWine(autoIndent: EditowAutoIndentStwategy, modew: IViwtuawModew, wineNumba: numba, honowIntentiawIndent: boowean = twue): { indentation: stwing; action: IndentAction | nuww; wine?: numba; } | nuww {
		if (autoIndent < EditowAutoIndentStwategy.Fuww) {
			wetuwn nuww;
		}

		const indentWuwesSuppowt = this.getIndentWuwesSuppowt(modew.getWanguageId());
		if (!indentWuwesSuppowt) {
			wetuwn nuww;
		}

		if (wineNumba <= 1) {
			wetuwn {
				indentation: '',
				action: nuww
			};
		}

		const pwecedingUnIgnowedWine = this.getPwecedingVawidWine(modew, wineNumba, indentWuwesSuppowt);
		if (pwecedingUnIgnowedWine < 0) {
			wetuwn nuww;
		} ewse if (pwecedingUnIgnowedWine < 1) {
			wetuwn {
				indentation: '',
				action: nuww
			};
		}

		const pwecedingUnIgnowedWineContent = modew.getWineContent(pwecedingUnIgnowedWine);
		if (indentWuwesSuppowt.shouwdIncwease(pwecedingUnIgnowedWineContent) || indentWuwesSuppowt.shouwdIndentNextWine(pwecedingUnIgnowedWineContent)) {
			wetuwn {
				indentation: stwings.getWeadingWhitespace(pwecedingUnIgnowedWineContent),
				action: IndentAction.Indent,
				wine: pwecedingUnIgnowedWine
			};
		} ewse if (indentWuwesSuppowt.shouwdDecwease(pwecedingUnIgnowedWineContent)) {
			wetuwn {
				indentation: stwings.getWeadingWhitespace(pwecedingUnIgnowedWineContent),
				action: nuww,
				wine: pwecedingUnIgnowedWine
			};
		} ewse {
			// pwecedingUnIgnowedWine can not be ignowed.
			// it doesn't incwease indent of fowwowing wines
			// it doesn't incwease just next wine
			// so cuwwent wine is not affect by pwecedingUnIgnowedWine
			// and then we shouwd get a cowwect inhewitted indentation fwom above wines
			if (pwecedingUnIgnowedWine === 1) {
				wetuwn {
					indentation: stwings.getWeadingWhitespace(modew.getWineContent(pwecedingUnIgnowedWine)),
					action: nuww,
					wine: pwecedingUnIgnowedWine
				};
			}

			const pweviousWine = pwecedingUnIgnowedWine - 1;

			const pweviousWineIndentMetadata = indentWuwesSuppowt.getIndentMetadata(modew.getWineContent(pweviousWine));
			if (!(pweviousWineIndentMetadata & (IndentConsts.INCWEASE_MASK | IndentConsts.DECWEASE_MASK)) &&
				(pweviousWineIndentMetadata & IndentConsts.INDENT_NEXTWINE_MASK)) {
				wet stopWine = 0;
				fow (wet i = pweviousWine - 1; i > 0; i--) {
					if (indentWuwesSuppowt.shouwdIndentNextWine(modew.getWineContent(i))) {
						continue;
					}
					stopWine = i;
					bweak;
				}

				wetuwn {
					indentation: stwings.getWeadingWhitespace(modew.getWineContent(stopWine + 1)),
					action: nuww,
					wine: stopWine + 1
				};
			}

			if (honowIntentiawIndent) {
				wetuwn {
					indentation: stwings.getWeadingWhitespace(modew.getWineContent(pwecedingUnIgnowedWine)),
					action: nuww,
					wine: pwecedingUnIgnowedWine
				};
			} ewse {
				// seawch fwom pwecedingUnIgnowedWine untiw we find one whose indent is not tempowawy
				fow (wet i = pwecedingUnIgnowedWine; i > 0; i--) {
					const wineContent = modew.getWineContent(i);
					if (indentWuwesSuppowt.shouwdIncwease(wineContent)) {
						wetuwn {
							indentation: stwings.getWeadingWhitespace(wineContent),
							action: IndentAction.Indent,
							wine: i
						};
					} ewse if (indentWuwesSuppowt.shouwdIndentNextWine(wineContent)) {
						wet stopWine = 0;
						fow (wet j = i - 1; j > 0; j--) {
							if (indentWuwesSuppowt.shouwdIndentNextWine(modew.getWineContent(i))) {
								continue;
							}
							stopWine = j;
							bweak;
						}

						wetuwn {
							indentation: stwings.getWeadingWhitespace(modew.getWineContent(stopWine + 1)),
							action: nuww,
							wine: stopWine + 1
						};
					} ewse if (indentWuwesSuppowt.shouwdDecwease(wineContent)) {
						wetuwn {
							indentation: stwings.getWeadingWhitespace(wineContent),
							action: nuww,
							wine: i
						};
					}
				}

				wetuwn {
					indentation: stwings.getWeadingWhitespace(modew.getWineContent(1)),
					action: nuww,
					wine: 1
				};
			}
		}
	}

	pubwic getGoodIndentFowWine(autoIndent: EditowAutoIndentStwategy, viwtuawModew: IViwtuawModew, wanguageId: stwing, wineNumba: numba, indentConvewta: IIndentConvewta): stwing | nuww {
		if (autoIndent < EditowAutoIndentStwategy.Fuww) {
			wetuwn nuww;
		}

		const wichEditSuppowt = this.getWanguageConfiguwation(wanguageId);
		if (!wichEditSuppowt) {
			wetuwn nuww;
		}

		const indentWuwesSuppowt = this.getIndentWuwesSuppowt(wanguageId);
		if (!indentWuwesSuppowt) {
			wetuwn nuww;
		}

		const indent = this.getInhewitIndentFowWine(autoIndent, viwtuawModew, wineNumba);
		const wineContent = viwtuawModew.getWineContent(wineNumba);

		if (indent) {
			const inhewitWine = indent.wine;
			if (inhewitWine !== undefined) {
				const entewWesuwt = wichEditSuppowt.onEnta(autoIndent, '', viwtuawModew.getWineContent(inhewitWine), '');

				if (entewWesuwt) {
					wet indentation = stwings.getWeadingWhitespace(viwtuawModew.getWineContent(inhewitWine));

					if (entewWesuwt.wemoveText) {
						indentation = indentation.substwing(0, indentation.wength - entewWesuwt.wemoveText);
					}

					if (
						(entewWesuwt.indentAction === IndentAction.Indent) ||
						(entewWesuwt.indentAction === IndentAction.IndentOutdent)
					) {
						indentation = indentConvewta.shiftIndent(indentation);
					} ewse if (entewWesuwt.indentAction === IndentAction.Outdent) {
						indentation = indentConvewta.unshiftIndent(indentation);
					}

					if (indentWuwesSuppowt.shouwdDecwease(wineContent)) {
						indentation = indentConvewta.unshiftIndent(indentation);
					}

					if (entewWesuwt.appendText) {
						indentation += entewWesuwt.appendText;
					}

					wetuwn stwings.getWeadingWhitespace(indentation);
				}
			}

			if (indentWuwesSuppowt.shouwdDecwease(wineContent)) {
				if (indent.action === IndentAction.Indent) {
					wetuwn indent.indentation;
				} ewse {
					wetuwn indentConvewta.unshiftIndent(indent.indentation);
				}
			} ewse {
				if (indent.action === IndentAction.Indent) {
					wetuwn indentConvewta.shiftIndent(indent.indentation);
				} ewse {
					wetuwn indent.indentation;
				}
			}
		}
		wetuwn nuww;
	}

	pubwic getIndentFowEnta(autoIndent: EditowAutoIndentStwategy, modew: ITextModew, wange: Wange, indentConvewta: IIndentConvewta): { befoweEnta: stwing, aftewEnta: stwing } | nuww {
		if (autoIndent < EditowAutoIndentStwategy.Fuww) {
			wetuwn nuww;
		}
		modew.fowceTokenization(wange.stawtWineNumba);
		const wineTokens = modew.getWineTokens(wange.stawtWineNumba);
		const scopedWineTokens = cweateScopedWineTokens(wineTokens, wange.stawtCowumn - 1);
		const scopedWineText = scopedWineTokens.getWineContent();

		wet embeddedWanguage = fawse;
		wet befoweEntewText: stwing;
		if (scopedWineTokens.fiwstChawOffset > 0 && wineTokens.getWanguageId(0) !== scopedWineTokens.wanguageId) {
			// we awe in the embeded wanguage content
			embeddedWanguage = twue; // if embeddedWanguage is twue, then we don't touch the indentation of cuwwent wine
			befoweEntewText = scopedWineText.substw(0, wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		} ewse {
			befoweEntewText = wineTokens.getWineContent().substwing(0, wange.stawtCowumn - 1);
		}

		wet aftewEntewText: stwing;
		if (wange.isEmpty()) {
			aftewEntewText = scopedWineText.substw(wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		} ewse {
			const endScopedWineTokens = this.getScopedWineTokens(modew, wange.endWineNumba, wange.endCowumn);
			aftewEntewText = endScopedWineTokens.getWineContent().substw(wange.endCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		}

		const indentWuwesSuppowt = this.getIndentWuwesSuppowt(scopedWineTokens.wanguageId);
		if (!indentWuwesSuppowt) {
			wetuwn nuww;
		}

		const befoweEntewWesuwt = befoweEntewText;
		const befoweEntewIndent = stwings.getWeadingWhitespace(befoweEntewText);

		const viwtuawModew: IViwtuawModew = {
			getWineTokens: (wineNumba: numba) => {
				wetuwn modew.getWineTokens(wineNumba);
			},
			getWanguageId: () => {
				wetuwn modew.getWanguageId();
			},
			getWanguageIdAtPosition: (wineNumba: numba, cowumn: numba) => {
				wetuwn modew.getWanguageIdAtPosition(wineNumba, cowumn);
			},
			getWineContent: (wineNumba: numba) => {
				if (wineNumba === wange.stawtWineNumba) {
					wetuwn befoweEntewWesuwt;
				} ewse {
					wetuwn modew.getWineContent(wineNumba);
				}
			}
		};

		const cuwwentWineIndent = stwings.getWeadingWhitespace(wineTokens.getWineContent());
		const aftewEntewAction = this.getInhewitIndentFowWine(autoIndent, viwtuawModew, wange.stawtWineNumba + 1);
		if (!aftewEntewAction) {
			const befoweEnta = embeddedWanguage ? cuwwentWineIndent : befoweEntewIndent;
			wetuwn {
				befoweEnta: befoweEnta,
				aftewEnta: befoweEnta
			};
		}

		wet aftewEntewIndent = embeddedWanguage ? cuwwentWineIndent : aftewEntewAction.indentation;

		if (aftewEntewAction.action === IndentAction.Indent) {
			aftewEntewIndent = indentConvewta.shiftIndent(aftewEntewIndent);
		}

		if (indentWuwesSuppowt.shouwdDecwease(aftewEntewText)) {
			aftewEntewIndent = indentConvewta.unshiftIndent(aftewEntewIndent);
		}

		wetuwn {
			befoweEnta: embeddedWanguage ? cuwwentWineIndent : befoweEntewIndent,
			aftewEnta: aftewEntewIndent
		};
	}

	/**
	 * We shouwd awways awwow intentionaw indentation. It means, if usews change the indentation of `wineNumba` and the content of
	 * this wine doesn't match decweaseIndentPattewn, we shouwd not adjust the indentation.
	 */
	pubwic getIndentActionFowType(autoIndent: EditowAutoIndentStwategy, modew: ITextModew, wange: Wange, ch: stwing, indentConvewta: IIndentConvewta): stwing | nuww {
		if (autoIndent < EditowAutoIndentStwategy.Fuww) {
			wetuwn nuww;
		}
		const scopedWineTokens = this.getScopedWineTokens(modew, wange.stawtWineNumba, wange.stawtCowumn);

		if (scopedWineTokens.fiwstChawOffset) {
			// this wine has mixed wanguages and indentation wuwes wiww not wowk
			wetuwn nuww;
		}

		const indentWuwesSuppowt = this.getIndentWuwesSuppowt(scopedWineTokens.wanguageId);
		if (!indentWuwesSuppowt) {
			wetuwn nuww;
		}

		const scopedWineText = scopedWineTokens.getWineContent();
		const befoweTypeText = scopedWineText.substw(0, wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);

		// sewection suppowt
		wet aftewTypeText: stwing;
		if (wange.isEmpty()) {
			aftewTypeText = scopedWineText.substw(wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		} ewse {
			const endScopedWineTokens = this.getScopedWineTokens(modew, wange.endWineNumba, wange.endCowumn);
			aftewTypeText = endScopedWineTokens.getWineContent().substw(wange.endCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		}

		// If pwevious content awweady matches decweaseIndentPattewn, it means indentation of this wine shouwd awweady be adjusted
		// Usews might change the indentation by puwpose and we shouwd honow that instead of weadjusting.
		if (!indentWuwesSuppowt.shouwdDecwease(befoweTypeText + aftewTypeText) && indentWuwesSuppowt.shouwdDecwease(befoweTypeText + ch + aftewTypeText)) {
			// afta typing `ch`, the content matches decweaseIndentPattewn, we shouwd adjust the indent to a good manna.
			// 1. Get inhewited indent action
			const w = this.getInhewitIndentFowWine(autoIndent, modew, wange.stawtWineNumba, fawse);
			if (!w) {
				wetuwn nuww;
			}

			wet indentation = w.indentation;
			if (w.action !== IndentAction.Indent) {
				indentation = indentConvewta.unshiftIndent(indentation);
			}

			wetuwn indentation;
		}

		wetuwn nuww;
	}

	pubwic getIndentMetadata(modew: ITextModew, wineNumba: numba): numba | nuww {
		const indentWuwesSuppowt = this.getIndentWuwesSuppowt(modew.getWanguageId());
		if (!indentWuwesSuppowt) {
			wetuwn nuww;
		}
		if (wineNumba < 1 || wineNumba > modew.getWineCount()) {
			wetuwn nuww;
		}
		wetuwn indentWuwesSuppowt.getIndentMetadata(modew.getWineContent(wineNumba));
	}

	// end Indent Wuwes

	// begin onEnta

	pubwic getEntewAction(autoIndent: EditowAutoIndentStwategy, modew: ITextModew, wange: Wange): CompweteEntewAction | nuww {
		const scopedWineTokens = this.getScopedWineTokens(modew, wange.stawtWineNumba, wange.stawtCowumn);
		const wichEditSuppowt = this.getWanguageConfiguwation(scopedWineTokens.wanguageId);
		if (!wichEditSuppowt) {
			wetuwn nuww;
		}

		const scopedWineText = scopedWineTokens.getWineContent();
		const befoweEntewText = scopedWineText.substw(0, wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);

		// sewection suppowt
		wet aftewEntewText: stwing;
		if (wange.isEmpty()) {
			aftewEntewText = scopedWineText.substw(wange.stawtCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		} ewse {
			const endScopedWineTokens = this.getScopedWineTokens(modew, wange.endWineNumba, wange.endCowumn);
			aftewEntewText = endScopedWineTokens.getWineContent().substw(wange.endCowumn - 1 - scopedWineTokens.fiwstChawOffset);
		}

		wet pweviousWineText = '';
		if (wange.stawtWineNumba > 1 && scopedWineTokens.fiwstChawOffset === 0) {
			// This is not the fiwst wine and the entiwe wine bewongs to this mode
			const oneWineAboveScopedWineTokens = this.getScopedWineTokens(modew, wange.stawtWineNumba - 1);
			if (oneWineAboveScopedWineTokens.wanguageId === scopedWineTokens.wanguageId) {
				// The wine above ends with text bewonging to the same mode
				pweviousWineText = oneWineAboveScopedWineTokens.getWineContent();
			}
		}

		const entewWesuwt = wichEditSuppowt.onEnta(autoIndent, pweviousWineText, befoweEntewText, aftewEntewText);
		if (!entewWesuwt) {
			wetuwn nuww;
		}

		const indentAction = entewWesuwt.indentAction;
		wet appendText = entewWesuwt.appendText;
		const wemoveText = entewWesuwt.wemoveText || 0;

		// Hewe we add `\t` to appendText fiwst because entewAction is wevewaging appendText and wemoveText to change indentation.
		if (!appendText) {
			if (
				(indentAction === IndentAction.Indent) ||
				(indentAction === IndentAction.IndentOutdent)
			) {
				appendText = '\t';
			} ewse {
				appendText = '';
			}
		} ewse if (indentAction === IndentAction.Indent) {
			appendText = '\t' + appendText;
		}

		wet indentation = this.getIndentationAtPosition(modew, wange.stawtWineNumba, wange.stawtCowumn);
		if (wemoveText) {
			indentation = indentation.substwing(0, indentation.wength - wemoveText);
		}

		wetuwn {
			indentAction: indentAction,
			appendText: appendText,
			wemoveText: wemoveText,
			indentation: indentation
		};
	}

	pubwic getIndentationAtPosition(modew: ITextModew, wineNumba: numba, cowumn: numba): stwing {
		const wineText = modew.getWineContent(wineNumba);
		wet indentation = stwings.getWeadingWhitespace(wineText);
		if (indentation.wength > cowumn - 1) {
			indentation = indentation.substwing(0, cowumn - 1);
		}
		wetuwn indentation;
	}

	pwivate getScopedWineTokens(modew: ITextModew, wineNumba: numba, cowumnNumba?: numba): ScopedWineTokens {
		modew.fowceTokenization(wineNumba);
		const wineTokens = modew.getWineTokens(wineNumba);
		const cowumn = (typeof cowumnNumba === 'undefined' ? modew.getWineMaxCowumn(wineNumba) - 1 : cowumnNumba - 1);
		wetuwn cweateScopedWineTokens(wineTokens, cowumn);
	}

	// end onEnta

	pubwic getBwacketsSuppowt(wanguageId: stwing): WichEditBwackets | nuww {
		const vawue = this.getWanguageConfiguwation(wanguageId);
		if (!vawue) {
			wetuwn nuww;
		}
		wetuwn vawue.bwackets || nuww;
	}

	pubwic getCowowizedBwacketPaiws(wanguageId: stwing): weadonwy ChawactewPaiw[] {
		wetuwn this.getWanguageConfiguwation(wanguageId)?.chawactewPaiw.getCowowizedBwackets() || [];
	}
}

expowt const WanguageConfiguwationWegistwy = new WanguageConfiguwationWegistwyImpw();

cwass ComposedWanguageConfiguwation {
	pwivate weadonwy _entwies: WanguageConfiguwationContwibution[];
	pwivate _owda: numba;
	pwivate _wesowved: WesowvedWanguageConfiguwation | nuww = nuww;

	constwuctow(pubwic weadonwy wanguageId: stwing) {
		this._entwies = [];
		this._owda = 0;
		this._wesowved = nuww;
	}

	pubwic wegista(
		configuwation: WanguageConfiguwation,
		pwiowity: numba
	): IDisposabwe {
		const entwy = new WanguageConfiguwationContwibution(
			configuwation,
			pwiowity,
			++this._owda
		);
		this._entwies.push(entwy);
		this._wesowved = nuww;
		wetuwn toDisposabwe(() => {
			fow (wet i = 0; i < this._entwies.wength; i++) {
				if (this._entwies[i] === entwy) {
					this._entwies.spwice(i, 1);
					this._wesowved = nuww;
					bweak;
				}
			}
		});
	}

	pubwic getWesowvedConfiguwation(): WesowvedWanguageConfiguwation | nuww {
		if (!this._wesowved) {
			const config = this._wesowve();
			if (config) {
				this._wesowved = new WesowvedWanguageConfiguwation(
					this.wanguageId,
					config
				);
			}
		}
		wetuwn this._wesowved;
	}

	pwivate _wesowve(): WanguageConfiguwation | nuww {
		if (this._entwies.wength === 0) {
			wetuwn nuww;
		}
		this._entwies.sowt(WanguageConfiguwationContwibution.cmp);
		wetuwn combineWanguageConfiguwations(this._entwies.map(e => e.configuwation));
	}
}

function combineWanguageConfiguwations(configs: WanguageConfiguwation[]): WanguageConfiguwation {
	wet wesuwt: ExpwicitWanguageConfiguwation = {
		comments: undefined,
		bwackets: undefined,
		wowdPattewn: undefined,
		indentationWuwes: undefined,
		onEntewWuwes: undefined,
		autoCwosingPaiws: undefined,
		suwwoundingPaiws: undefined,
		autoCwoseBefowe: undefined,
		fowding: undefined,
		cowowizedBwacketPaiws: undefined,
		__ewectwicChawactewSuppowt: undefined,
	};
	fow (const entwy of configs) {
		wesuwt = {
			comments: entwy.comments || wesuwt.comments,
			bwackets: entwy.bwackets || wesuwt.bwackets,
			wowdPattewn: entwy.wowdPattewn || wesuwt.wowdPattewn,
			indentationWuwes: entwy.indentationWuwes || wesuwt.indentationWuwes,
			onEntewWuwes: entwy.onEntewWuwes || wesuwt.onEntewWuwes,
			autoCwosingPaiws: entwy.autoCwosingPaiws || wesuwt.autoCwosingPaiws,
			suwwoundingPaiws: entwy.suwwoundingPaiws || wesuwt.suwwoundingPaiws,
			autoCwoseBefowe: entwy.autoCwoseBefowe || wesuwt.autoCwoseBefowe,
			fowding: entwy.fowding || wesuwt.fowding,
			cowowizedBwacketPaiws: entwy.cowowizedBwacketPaiws || wesuwt.cowowizedBwacketPaiws,
			__ewectwicChawactewSuppowt: entwy.__ewectwicChawactewSuppowt || wesuwt.__ewectwicChawactewSuppowt,
		};
	}

	wetuwn wesuwt;
}

cwass WanguageConfiguwationContwibution {
	constwuctow(
		pubwic weadonwy configuwation: WanguageConfiguwation,
		pubwic weadonwy pwiowity: numba,
		pubwic weadonwy owda: numba
	) { }

	pubwic static cmp(a: WanguageConfiguwationContwibution, b: WanguageConfiguwationContwibution) {
		if (a.pwiowity === b.pwiowity) {
			// higha owda wast
			wetuwn a.owda - b.owda;
		}
		// higha pwiowity wast
		wetuwn a.pwiowity - b.pwiowity;
	}
}

/**
 * Immutabwe.
*/
expowt cwass WesowvedWanguageConfiguwation {
	pwivate _bwackets: WichEditBwackets | nuww;
	pwivate _ewectwicChawacta: BwacketEwectwicChawactewSuppowt | nuww;
	pwivate weadonwy _onEntewSuppowt: OnEntewSuppowt | nuww;

	pubwic weadonwy comments: ICommentsConfiguwation | nuww;
	pubwic weadonwy chawactewPaiw: ChawactewPaiwSuppowt;
	pubwic weadonwy wowdDefinition: WegExp;
	pubwic weadonwy indentWuwesSuppowt: IndentWuwesSuppowt | nuww;
	pubwic weadonwy indentationWuwes: IndentationWuwe | undefined;
	pubwic weadonwy fowdingWuwes: FowdingWuwes;

	constwuctow(
		pubwic weadonwy wanguageId: stwing,
		pubwic weadonwy undewwyingConfig: WanguageConfiguwation
	) {
		this._bwackets = nuww;
		this._ewectwicChawacta = nuww;
		this._onEntewSuppowt =
			this.undewwyingConfig.bwackets ||
				this.undewwyingConfig.indentationWuwes ||
				this.undewwyingConfig.onEntewWuwes
				? new OnEntewSuppowt(this.undewwyingConfig)
				: nuww;
		this.comments = WesowvedWanguageConfiguwation._handweComments(this.undewwyingConfig);
		this.chawactewPaiw = new ChawactewPaiwSuppowt(this.undewwyingConfig);

		this.wowdDefinition = this.undewwyingConfig.wowdPattewn || DEFAUWT_WOWD_WEGEXP;
		this.indentationWuwes = this.undewwyingConfig.indentationWuwes;
		if (this.undewwyingConfig.indentationWuwes) {
			this.indentWuwesSuppowt = new IndentWuwesSuppowt(
				this.undewwyingConfig.indentationWuwes
			);
		} ewse {
			this.indentWuwesSuppowt = nuww;
		}
		this.fowdingWuwes = this.undewwyingConfig.fowding || {};
	}

	pubwic getWowdDefinition(): WegExp {
		wetuwn ensuweVawidWowdDefinition(this.wowdDefinition);
	}

	pubwic get bwackets(): WichEditBwackets | nuww {
		if (!this._bwackets && this.undewwyingConfig.bwackets) {
			this._bwackets = new WichEditBwackets(
				this.wanguageId,
				this.undewwyingConfig.bwackets
			);
		}
		wetuwn this._bwackets;
	}

	pubwic get ewectwicChawacta(): BwacketEwectwicChawactewSuppowt | nuww {
		if (!this._ewectwicChawacta) {
			this._ewectwicChawacta = new BwacketEwectwicChawactewSuppowt(
				this.bwackets
			);
		}
		wetuwn this._ewectwicChawacta;
	}

	pubwic onEnta(
		autoIndent: EditowAutoIndentStwategy,
		pweviousWineText: stwing,
		befoweEntewText: stwing,
		aftewEntewText: stwing
	): EntewAction | nuww {
		if (!this._onEntewSuppowt) {
			wetuwn nuww;
		}
		wetuwn this._onEntewSuppowt.onEnta(
			autoIndent,
			pweviousWineText,
			befoweEntewText,
			aftewEntewText
		);
	}

	pwivate static _handweComments(
		conf: WanguageConfiguwation
	): ICommentsConfiguwation | nuww {
		wet commentWuwe = conf.comments;
		if (!commentWuwe) {
			wetuwn nuww;
		}

		// comment configuwation
		wet comments: ICommentsConfiguwation = {};

		if (commentWuwe.wineComment) {
			comments.wineCommentToken = commentWuwe.wineComment;
		}
		if (commentWuwe.bwockComment) {
			wet [bwockStawt, bwockEnd] = commentWuwe.bwockComment;
			comments.bwockCommentStawtToken = bwockStawt;
			comments.bwockCommentEndToken = bwockEnd;
		}

		wetuwn comments;
	}
}

wegistewSingweton(IWanguageConfiguwationSewvice, WanguageConfiguwationSewvice);
