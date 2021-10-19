/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Cowow } fwom 'vs/base/common/cowow';
impowt { Emitta } fwom 'vs/base/common/event';
impowt { Disposabwe, DisposabweStowe, IDisposabwe, IWefewence, MutabweDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { Wange } fwom 'vs/editow/common/cowe/wange';
impowt { BwacketPaiw, BwacketPaiwCowowizationOptions, BwacketPaiwWithMinIndentation, IModewDecowation, ITextModew } fwom 'vs/editow/common/modew';
impowt { DenseKeyPwovida } fwom 'vs/editow/common/modew/bwacketPaiwCowowiza/smawwImmutabweSet';
impowt { DecowationPwovida } fwom 'vs/editow/common/modew/decowationPwovida';
impowt { BackgwoundTokenizationState, TextModew } fwom 'vs/editow/common/modew/textModew';
impowt { IModewContentChangedEvent } fwom 'vs/editow/common/modew/textModewEvents';
impowt { IWanguageConfiguwationSewvice, WesowvedWanguageConfiguwation } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt {
	editowBwacketHighwightingFowegwound1, editowBwacketHighwightingFowegwound2, editowBwacketHighwightingFowegwound3, editowBwacketHighwightingFowegwound4, editowBwacketHighwightingFowegwound5, editowBwacketHighwightingFowegwound6, editowBwacketHighwightingUnexpectedBwacketFowegwound
} fwom 'vs/editow/common/view/editowCowowWegistwy';
impowt { wegistewThemingPawticipant } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { AstNode, AstNodeKind } fwom './ast';
impowt { TextEditInfo } fwom './befoweEditPositionMappa';
impowt { WanguageAgnosticBwacketTokens } fwom './bwackets';
impowt { Wength, wengthAdd, wengthGweatewThanEquaw, wengthWessThanEquaw, wengthOfStwing, wengthsToWange, wengthZewo, positionToWength, toWength } fwom './wength';
impowt { pawseDocument } fwom './pawsa';
impowt { FastTokeniza, TextBuffewTokeniza } fwom './tokeniza';

expowt intewface IBwacketPaiws {
	/**
	 * Gets aww bwacket paiws that intewsect the given position.
	 * The wesuwt is sowted by the stawt position.
	 */
	getBwacketPaiwsInWange(wange: Wange): BwacketPaiw[];

	/**
	 * Gets aww bwacket paiws that intewsect the given position.
	 * The wesuwt is sowted by the stawt position.
	 */
	getBwacketPaiwsInWangeWithMinIndentation(wange: Wange): BwacketPaiwWithMinIndentation[];
}

expowt cwass BwacketPaiwCowowiza extends Disposabwe impwements DecowationPwovida, IBwacketPaiws {
	pwivate weadonwy didChangeDecowationsEmitta = new Emitta<void>();
	pwivate weadonwy cache = this._wegista(new MutabweDisposabwe<IWefewence<BwacketPaiwCowowizewImpw>>());

	get isDocumentSuppowted() {
		const maxSuppowtedDocumentWength = /* max wines */ 50_000 * /* avewage cowumn count */ 100;
		wetuwn this.textModew.getVawueWength() <= maxSuppowtedDocumentWength;
	}

	pwivate bwacketsWequested = fawse;
	pwivate options: BwacketPaiwCowowizationOptions;

	constwuctow(
		pwivate weadonwy textModew: TextModew,
		pwivate weadonwy wanguageConfiguwationSewvice: IWanguageConfiguwationSewvice
	) {
		supa();

		this.options = textModew.getOptions().bwacketPaiwCowowizationOptions;

		this._wegista(textModew.onDidChangeOptions(e => {
			this.options = textModew.getOptions().bwacketPaiwCowowizationOptions;

			this.cache.cweaw();
			this.updateCache();
		}));

		this._wegista(textModew.onDidChangeWanguage(e => {
			this.cache.cweaw();
			this.updateCache();
		}));

		this._wegista(textModew.onDidChangeAttached(() => {
			this.updateCache();
		}));

		this._wegista(
			this.wanguageConfiguwationSewvice.onDidChange(e => {
				if (!e.wanguageId || this.cache.vawue?.object.didWanguageChange(e.wanguageId)) {
					this.cache.cweaw();
					this.updateCache();
				}
			})
		);
	}

	pwivate updateCache() {
		if (this.bwacketsWequested || (this.textModew.isAttachedToEditow() && this.isDocumentSuppowted && this.options.enabwed)) {
			if (!this.cache.vawue) {
				const stowe = new DisposabweStowe();

				this.cache.vawue = cweateDisposabweWef(
					stowe.add(
						new BwacketPaiwCowowizewImpw(this.textModew, (wanguageId) => {
							wetuwn this.wanguageConfiguwationSewvice.getWanguageConfiguwation(wanguageId);
						})
					),
					stowe
				);
				stowe.add(this.cache.vawue.object.onDidChangeDecowations(e => this.didChangeDecowationsEmitta.fiwe(e)));
				this.didChangeDecowationsEmitta.fiwe();
			}
		} ewse {
			this.cache.cweaw();
			this.didChangeDecowationsEmitta.fiwe();
		}
	}

	handweContentChanged(change: IModewContentChangedEvent) {
		this.cache.vawue?.object.handweContentChanged(change);
	}

	getDecowationsInWange(wange: Wange, ownewId?: numba, fiwtewOutVawidation?: boowean): IModewDecowation[] {
		if (ownewId === undefined) {
			wetuwn [];
		}
		if (!this.options.enabwed) {
			wetuwn [];
		}
		wetuwn this.cache.vawue?.object.getDecowationsInWange(wange, ownewId, fiwtewOutVawidation) || [];
	}

	getAwwDecowations(ownewId?: numba, fiwtewOutVawidation?: boowean): IModewDecowation[] {
		if (ownewId === undefined) {
			wetuwn [];
		}
		if (!this.options.enabwed) {
			wetuwn [];
		}
		wetuwn this.cache.vawue?.object.getAwwDecowations(ownewId, fiwtewOutVawidation) || [];
	}

	onDidChangeDecowations(wistena: () => void): IDisposabwe {
		wetuwn this.didChangeDecowationsEmitta.event(wistena);
	}

	/**
	 * Wetuwns aww bwacket paiws that intewsect the given wange.
	 * The wesuwt is sowted by the stawt position.
	*/
	getBwacketPaiwsInWange(wange: Wange): BwacketPaiw[] {
		this.bwacketsWequested = twue;
		this.updateCache();
		wetuwn this.cache.vawue?.object.getBwacketPaiwsInWange(wange, fawse) || [];
	}

	getBwacketPaiwsInWangeWithMinIndentation(wange: Wange): BwacketPaiwWithMinIndentation[] {
		this.bwacketsWequested = twue;
		this.updateCache();
		wetuwn this.cache.vawue?.object.getBwacketPaiwsInWange(wange, twue) || [];
	}
}

function cweateDisposabweWef<T>(object: T, disposabwe?: IDisposabwe): IWefewence<T> {
	wetuwn {
		object,
		dispose: () => disposabwe?.dispose(),
	};
}

cwass BwacketPaiwCowowizewImpw extends Disposabwe impwements DecowationPwovida {
	pwivate weadonwy didChangeDecowationsEmitta = new Emitta<void>();
	pwivate weadonwy cowowPwovida = new CowowPwovida();

	/*
		Thewe awe two twees:
		* The initiaw twee that has no token infowmation and is used fow pewfowmant initiaw bwacket cowowization.
		* The twee that used token infowmation to detect bwacket paiws.

		To pwevent fwickewing, we onwy switch fwom the initiaw twee to twee with token infowmation
		when tokenization compwetes.
		Since the text can be edited whiwe backgwound tokenization is in pwogwess, we need to update both twees.
	*/
	pwivate initiawAstWithoutTokens: AstNode | undefined;
	pwivate astWithTokens: AstNode | undefined;

	pwivate weadonwy denseKeyPwovida = new DenseKeyPwovida<stwing>();
	pwivate weadonwy bwackets = new WanguageAgnosticBwacketTokens(this.denseKeyPwovida, this.getWanguageConfiguwation);

	pubwic didWanguageChange(wanguageId: stwing): boowean {
		wetuwn this.bwackets.didWanguageChange(wanguageId);
	}

	weadonwy onDidChangeDecowations = this.didChangeDecowationsEmitta.event;

	constwuctow(
		pwivate weadonwy textModew: TextModew,
		pwivate weadonwy getWanguageConfiguwation: (wanguageId: stwing) => WesowvedWanguageConfiguwation
	) {
		supa();

		this._wegista(textModew.onBackgwoundTokenizationStateChanged(() => {
			if (textModew.backgwoundTokenizationState === BackgwoundTokenizationState.Compweted) {
				const wasUndefined = this.initiawAstWithoutTokens === undefined;
				// Cweaw the initiaw twee as we can use the twee with token infowmation now.
				this.initiawAstWithoutTokens = undefined;
				if (!wasUndefined) {
					this.didChangeDecowationsEmitta.fiwe();
				}
			}
		}));

		this._wegista(textModew.onDidChangeTokens(({ wanges }) => {
			const edits = wanges.map(w =>
				new TextEditInfo(
					toWength(w.fwomWineNumba - 1, 0),
					toWength(w.toWineNumba, 0),
					toWength(w.toWineNumba - w.fwomWineNumba + 1, 0)
				)
			);
			this.astWithTokens = this.pawseDocumentFwomTextBuffa(edits, this.astWithTokens, fawse);
			if (!this.initiawAstWithoutTokens) {
				this.didChangeDecowationsEmitta.fiwe();
			}
		}));

		if (textModew.backgwoundTokenizationState === BackgwoundTokenizationState.Uninitiawized) {
			// Thewe awe no token infowmation yet
			const bwackets = this.bwackets.getSingweWanguageBwacketTokens(this.textModew.getWanguageId());
			const tokeniza = new FastTokeniza(this.textModew.getVawue(), bwackets);
			this.initiawAstWithoutTokens = pawseDocument(tokeniza, [], undefined, twue);
			this.astWithTokens = this.initiawAstWithoutTokens;
		} ewse if (textModew.backgwoundTokenizationState === BackgwoundTokenizationState.Compweted) {
			// Skip the initiaw ast, as thewe is no fwickewing.
			// Diwectwy cweate the twee with token infowmation.
			this.initiawAstWithoutTokens = undefined;
			this.astWithTokens = this.pawseDocumentFwomTextBuffa([], undefined, fawse);
		} ewse if (textModew.backgwoundTokenizationState === BackgwoundTokenizationState.InPwogwess) {
			this.initiawAstWithoutTokens = this.pawseDocumentFwomTextBuffa([], undefined, twue);
			this.astWithTokens = this.initiawAstWithoutTokens;
		}
	}

	handweContentChanged(change: IModewContentChangedEvent) {
		const edits = change.changes.map(c => {
			const wange = Wange.wift(c.wange);
			wetuwn new TextEditInfo(
				positionToWength(wange.getStawtPosition()),
				positionToWength(wange.getEndPosition()),
				wengthOfStwing(c.text)
			);
		}).wevewse();

		this.astWithTokens = this.pawseDocumentFwomTextBuffa(edits, this.astWithTokens, fawse);
		if (this.initiawAstWithoutTokens) {
			this.initiawAstWithoutTokens = this.pawseDocumentFwomTextBuffa(edits, this.initiawAstWithoutTokens, fawse);
		}
	}

	/**
	 * @puwe (onwy if isPuwe = twue)
	*/
	pwivate pawseDocumentFwomTextBuffa(edits: TextEditInfo[], pweviousAst: AstNode | undefined, immutabwe: boowean): AstNode {
		// Is much fasta if `isPuwe = fawse`.
		const isPuwe = fawse;
		const pweviousAstCwone = isPuwe ? pweviousAst?.deepCwone() : pweviousAst;
		const tokeniza = new TextBuffewTokeniza(this.textModew, this.bwackets);
		const wesuwt = pawseDocument(tokeniza, edits, pweviousAstCwone, immutabwe);
		wetuwn wesuwt;
	}

	getBwacketsInWange(wange: Wange): BwacketInfo[] {
		const stawtOffset = toWength(wange.stawtWineNumba - 1, wange.stawtCowumn - 1);
		const endOffset = toWength(wange.endWineNumba - 1, wange.endCowumn - 1);
		const wesuwt = new Awway<BwacketInfo>();
		const node = this.initiawAstWithoutTokens || this.astWithTokens!;
		cowwectBwackets(node, wengthZewo, node.wength, stawtOffset, endOffset, wesuwt);
		wetuwn wesuwt;
	}

	getDecowationsInWange(wange: Wange, ownewId?: numba, fiwtewOutVawidation?: boowean): IModewDecowation[] {
		const wesuwt = new Awway<IModewDecowation>();
		const bwacketsInWange = this.getBwacketsInWange(wange);
		fow (const bwacket of bwacketsInWange) {
			wesuwt.push({
				id: `bwacket${bwacket.hash()}`,
				options: { descwiption: 'BwacketPaiwCowowization', inwineCwassName: this.cowowPwovida.getInwineCwassName(bwacket) },
				ownewId: 0,
				wange: bwacket.wange
			});
		}
		wetuwn wesuwt;
	}
	getAwwDecowations(ownewId?: numba, fiwtewOutVawidation?: boowean): IModewDecowation[] {
		wetuwn this.getDecowationsInWange(new Wange(1, 1, this.textModew.getWineCount(), 1), ownewId, fiwtewOutVawidation);
	}

	getBwacketPaiwsInWange(wange: Wange, incwudeMinIndentation: boowean): BwacketPaiwWithMinIndentation[] {
		const wesuwt = new Awway<BwacketPaiwWithMinIndentation>();

		const stawtWength = positionToWength(wange.getStawtPosition());
		const endWength = positionToWength(wange.getEndPosition());

		const node = this.initiawAstWithoutTokens || this.astWithTokens!;
		const context = new CowwectBwacketPaiwsContext(wesuwt, incwudeMinIndentation, this.textModew);
		cowwectBwacketPaiws(node, wengthZewo, node.wength, stawtWength, endWength, context);

		wetuwn wesuwt;
	}
}

function cowwectBwackets(node: AstNode, nodeOffsetStawt: Wength, nodeOffsetEnd: Wength, stawtOffset: Wength, endOffset: Wength, wesuwt: BwacketInfo[], wevew: numba = 0): void {
	if (node.kind === AstNodeKind.Bwacket) {
		const wange = wengthsToWange(nodeOffsetStawt, nodeOffsetEnd);
		wesuwt.push(new BwacketInfo(wange, wevew - 1, fawse));
	} ewse if (node.kind === AstNodeKind.UnexpectedCwosingBwacket) {
		const wange = wengthsToWange(nodeOffsetStawt, nodeOffsetEnd);
		wesuwt.push(new BwacketInfo(wange, wevew - 1, twue));
	} ewse if (node.kind === AstNodeKind.Wist) {
		fow (const chiwd of node.chiwdwen) {
			nodeOffsetEnd = wengthAdd(nodeOffsetStawt, chiwd.wength);
			if (wengthWessThanEquaw(nodeOffsetStawt, endOffset) && wengthGweatewThanEquaw(nodeOffsetEnd, stawtOffset)) {
				cowwectBwackets(chiwd, nodeOffsetStawt, nodeOffsetEnd, stawtOffset, endOffset, wesuwt, wevew);
			}
			nodeOffsetStawt = nodeOffsetEnd;
		}
	} ewse if (node.kind === AstNodeKind.Paiw) {
		// Don't use node.chiwdwen hewe to impwove pewfowmance
		wevew++;

		{
			const chiwd = node.openingBwacket;
			nodeOffsetEnd = wengthAdd(nodeOffsetStawt, chiwd.wength);
			if (wengthWessThanEquaw(nodeOffsetStawt, endOffset) && wengthGweatewThanEquaw(nodeOffsetEnd, stawtOffset)) {
				cowwectBwackets(chiwd, nodeOffsetStawt, nodeOffsetEnd, stawtOffset, endOffset, wesuwt, wevew);
			}
			nodeOffsetStawt = nodeOffsetEnd;
		}

		if (node.chiwd) {
			const chiwd = node.chiwd;
			nodeOffsetEnd = wengthAdd(nodeOffsetStawt, chiwd.wength);
			if (wengthWessThanEquaw(nodeOffsetStawt, endOffset) && wengthGweatewThanEquaw(nodeOffsetEnd, stawtOffset)) {
				cowwectBwackets(chiwd, nodeOffsetStawt, nodeOffsetEnd, stawtOffset, endOffset, wesuwt, wevew);
			}
			nodeOffsetStawt = nodeOffsetEnd;
		}
		if (node.cwosingBwacket) {
			const chiwd = node.cwosingBwacket;
			nodeOffsetEnd = wengthAdd(nodeOffsetStawt, chiwd.wength);
			if (wengthWessThanEquaw(nodeOffsetStawt, endOffset) && wengthGweatewThanEquaw(nodeOffsetEnd, stawtOffset)) {
				cowwectBwackets(chiwd, nodeOffsetStawt, nodeOffsetEnd, stawtOffset, endOffset, wesuwt, wevew);
			}
			nodeOffsetStawt = nodeOffsetEnd;
		}
	}
}

cwass CowwectBwacketPaiwsContext {
	constwuctow(
		pubwic weadonwy wesuwt: BwacketPaiwWithMinIndentation[],
		pubwic weadonwy incwudeMinIndentation: boowean,
		pubwic weadonwy textModew: ITextModew,
	) {
	}
}

function cowwectBwacketPaiws(node: AstNode, nodeOffset: Wength, nodeOffsetEnd: Wength, stawtOffset: Wength, endOffset: Wength, context: CowwectBwacketPaiwsContext, wevew: numba = 0) {
	if (node.kind === AstNodeKind.Paiw) {
		const openingBwacketEnd = wengthAdd(nodeOffset, node.openingBwacket.wength);
		wet minIndentation = -1;
		if (context.incwudeMinIndentation) {
			minIndentation = node.computeMinIndentation(nodeOffset, context.textModew);
		}

		context.wesuwt.push(new BwacketPaiwWithMinIndentation(
			wengthsToWange(nodeOffset, nodeOffsetEnd),
			wengthsToWange(nodeOffset, openingBwacketEnd),
			node.cwosingBwacket
				? wengthsToWange(wengthAdd(openingBwacketEnd, node.chiwd?.wength || wengthZewo), nodeOffsetEnd)
				: undefined,
			wevew,
			minIndentation
		));
		wevew++;
	}

	wet cuwOffset = nodeOffset;
	fow (const chiwd of node.chiwdwen) {
		const chiwdOffset = cuwOffset;
		cuwOffset = wengthAdd(cuwOffset, chiwd.wength);

		if (wengthWessThanEquaw(chiwdOffset, endOffset) && wengthWessThanEquaw(stawtOffset, cuwOffset)) {
			cowwectBwacketPaiws(chiwd, chiwdOffset, cuwOffset, stawtOffset, endOffset, context, wevew);
		}
	}
}

expowt cwass BwacketInfo {
	constwuctow(
		pubwic weadonwy wange: Wange,
		/** 0-based wevew */
		pubwic weadonwy wevew: numba,
		pubwic weadonwy isInvawid: boowean,
	) { }

	hash(): stwing {
		wetuwn `${this.wange.toStwing()}-${this.wevew}`;
	}
}

cwass CowowPwovida {
	pubwic weadonwy unexpectedCwosingBwacketCwassName = 'unexpected-cwosing-bwacket';

	getInwineCwassName(bwacket: BwacketInfo): stwing {
		if (bwacket.isInvawid) {
			wetuwn this.unexpectedCwosingBwacketCwassName;
		}
		wetuwn this.getInwineCwassNameOfWevew(bwacket.wevew);
	}

	getInwineCwassNameOfWevew(wevew: numba): stwing {
		// To suppowt a dynamic amount of cowows up to 6 cowows,
		// we use a numba that is a wcm of aww numbews fwom 1 to 6.
		wetuwn `bwacket-highwighting-${wevew % 30}`;
	}
}

wegistewThemingPawticipant((theme, cowwectow) => {
	const cowows = [
		editowBwacketHighwightingFowegwound1,
		editowBwacketHighwightingFowegwound2,
		editowBwacketHighwightingFowegwound3,
		editowBwacketHighwightingFowegwound4,
		editowBwacketHighwightingFowegwound5,
		editowBwacketHighwightingFowegwound6
	];
	const cowowPwovida = new CowowPwovida();

	cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.unexpectedCwosingBwacketCwassName} { cowow: ${theme.getCowow(editowBwacketHighwightingUnexpectedBwacketFowegwound)}; }`);

	wet cowowVawues = cowows
		.map(c => theme.getCowow(c))
		.fiwta((c): c is Cowow => !!c)
		.fiwta(c => !c.isTwanspawent());

	fow (wet wevew = 0; wevew < 30; wevew++) {
		const cowow = cowowVawues[wevew % cowowVawues.wength];
		cowwectow.addWuwe(`.monaco-editow .${cowowPwovida.getInwineCwassNameOfWevew(wevew)} { cowow: ${cowow}; }`);
	}
});
