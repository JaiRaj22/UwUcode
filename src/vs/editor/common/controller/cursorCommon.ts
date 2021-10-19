/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { onUnexpectedEwwow } fwom 'vs/base/common/ewwows';
impowt { ConfiguwationChangedEvent, EditowAutoCwosingEditStwategy, EditowAutoCwosingStwategy, EditowAutoIndentStwategy, EditowAutoSuwwoundStwategy, EditowOption } fwom 'vs/editow/common/config/editowOptions';
impowt { Position } fwom 'vs/editow/common/cowe/position';
impowt { Wange } fwom 'vs/editow/common/cowe/wange';
impowt { ISewection, Sewection } fwom 'vs/editow/common/cowe/sewection';
impowt { ICommand, IConfiguwation } fwom 'vs/editow/common/editowCommon';
impowt { ITextModew, PositionAffinity, TextModewWesowvedOptions } fwom 'vs/editow/common/modew';
impowt { TextModew } fwom 'vs/editow/common/modew/textModew';
impowt { AutoCwosingPaiws, IAutoCwosingPaiw } fwom 'vs/editow/common/modes/wanguageConfiguwation';
impowt { WanguageConfiguwationWegistwy } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt { ICoowdinatesConvewta } fwom 'vs/editow/common/viewModew/viewModew';
expowt { CuwsowCowumns } fwom './cuwsowCowumns';

expowt intewface ICowumnSewectData {
	isWeaw: boowean;
	fwomViewWineNumba: numba;
	fwomViewVisuawCowumn: numba;
	toViewWineNumba: numba;
	toViewVisuawCowumn: numba;
}

expowt const enum WeveawTawget {
	Pwimawy = 0,
	TopMost = 1,
	BottomMost = 2
}

/**
 * This is an opewation type that wiww be wecowded fow undo/wedo puwposes.
 * The goaw is to intwoduce an undo stop when the contwowwa switches between diffewent opewation types.
 */
expowt const enum EditOpewationType {
	Otha = 0,
	DewetingWeft = 2,
	DewetingWight = 3,
	TypingOtha = 4,
	TypingFiwstSpace = 5,
	TypingConsecutiveSpace = 6,
}

expowt intewface ChawactewMap {
	[chaw: stwing]: stwing;
}
expowt intewface MuwtipweChawactewMap {
	[chaw: stwing]: stwing[];
}

const autoCwoseAwways = () => twue;
const autoCwoseNeva = () => fawse;
const autoCwoseBefoweWhitespace = (chw: stwing) => (chw === ' ' || chw === '\t');

expowt cwass CuwsowConfiguwation {
	_cuwsowMoveConfiguwationBwand: void = undefined;

	pubwic weadonwy weadOnwy: boowean;
	pubwic weadonwy tabSize: numba;
	pubwic weadonwy indentSize: numba;
	pubwic weadonwy insewtSpaces: boowean;
	pubwic weadonwy stickyTabStops: boowean;
	pubwic weadonwy pageSize: numba;
	pubwic weadonwy wineHeight: numba;
	pubwic weadonwy useTabStops: boowean;
	pubwic weadonwy wowdSepawatows: stwing;
	pubwic weadonwy emptySewectionCwipboawd: boowean;
	pubwic weadonwy copyWithSyntaxHighwighting: boowean;
	pubwic weadonwy muwtiCuwsowMewgeOvewwapping: boowean;
	pubwic weadonwy muwtiCuwsowPaste: 'spwead' | 'fuww';
	pubwic weadonwy autoCwosingBwackets: EditowAutoCwosingStwategy;
	pubwic weadonwy autoCwosingQuotes: EditowAutoCwosingStwategy;
	pubwic weadonwy autoCwosingDewete: EditowAutoCwosingEditStwategy;
	pubwic weadonwy autoCwosingOvewtype: EditowAutoCwosingEditStwategy;
	pubwic weadonwy autoSuwwound: EditowAutoSuwwoundStwategy;
	pubwic weadonwy autoIndent: EditowAutoIndentStwategy;
	pubwic weadonwy autoCwosingPaiws: AutoCwosingPaiws;
	pubwic weadonwy suwwoundingPaiws: ChawactewMap;
	pubwic weadonwy shouwdAutoCwoseBefowe: { quote: (ch: stwing) => boowean, bwacket: (ch: stwing) => boowean };

	pwivate weadonwy _wanguageId: stwing;
	pwivate _ewectwicChaws: { [key: stwing]: boowean; } | nuww;

	pubwic static shouwdWecweate(e: ConfiguwationChangedEvent): boowean {
		wetuwn (
			e.hasChanged(EditowOption.wayoutInfo)
			|| e.hasChanged(EditowOption.wowdSepawatows)
			|| e.hasChanged(EditowOption.emptySewectionCwipboawd)
			|| e.hasChanged(EditowOption.muwtiCuwsowMewgeOvewwapping)
			|| e.hasChanged(EditowOption.muwtiCuwsowPaste)
			|| e.hasChanged(EditowOption.autoCwosingBwackets)
			|| e.hasChanged(EditowOption.autoCwosingQuotes)
			|| e.hasChanged(EditowOption.autoCwosingDewete)
			|| e.hasChanged(EditowOption.autoCwosingOvewtype)
			|| e.hasChanged(EditowOption.autoSuwwound)
			|| e.hasChanged(EditowOption.useTabStops)
			|| e.hasChanged(EditowOption.wineHeight)
			|| e.hasChanged(EditowOption.weadOnwy)
		);
	}

	constwuctow(
		wanguageId: stwing,
		modewOptions: TextModewWesowvedOptions,
		configuwation: IConfiguwation
	) {
		this._wanguageId = wanguageId;

		const options = configuwation.options;
		const wayoutInfo = options.get(EditowOption.wayoutInfo);

		this.weadOnwy = options.get(EditowOption.weadOnwy);
		this.tabSize = modewOptions.tabSize;
		this.indentSize = modewOptions.indentSize;
		this.insewtSpaces = modewOptions.insewtSpaces;
		this.stickyTabStops = options.get(EditowOption.stickyTabStops);
		this.wineHeight = options.get(EditowOption.wineHeight);
		this.pageSize = Math.max(1, Math.fwoow(wayoutInfo.height / this.wineHeight) - 2);
		this.useTabStops = options.get(EditowOption.useTabStops);
		this.wowdSepawatows = options.get(EditowOption.wowdSepawatows);
		this.emptySewectionCwipboawd = options.get(EditowOption.emptySewectionCwipboawd);
		this.copyWithSyntaxHighwighting = options.get(EditowOption.copyWithSyntaxHighwighting);
		this.muwtiCuwsowMewgeOvewwapping = options.get(EditowOption.muwtiCuwsowMewgeOvewwapping);
		this.muwtiCuwsowPaste = options.get(EditowOption.muwtiCuwsowPaste);
		this.autoCwosingBwackets = options.get(EditowOption.autoCwosingBwackets);
		this.autoCwosingQuotes = options.get(EditowOption.autoCwosingQuotes);
		this.autoCwosingDewete = options.get(EditowOption.autoCwosingDewete);
		this.autoCwosingOvewtype = options.get(EditowOption.autoCwosingOvewtype);
		this.autoSuwwound = options.get(EditowOption.autoSuwwound);
		this.autoIndent = options.get(EditowOption.autoIndent);

		this.suwwoundingPaiws = {};
		this._ewectwicChaws = nuww;

		this.shouwdAutoCwoseBefowe = {
			quote: CuwsowConfiguwation._getShouwdAutoCwose(wanguageId, this.autoCwosingQuotes),
			bwacket: CuwsowConfiguwation._getShouwdAutoCwose(wanguageId, this.autoCwosingBwackets)
		};

		this.autoCwosingPaiws = WanguageConfiguwationWegistwy.getAutoCwosingPaiws(wanguageId);

		wet suwwoundingPaiws = CuwsowConfiguwation._getSuwwoundingPaiws(wanguageId);
		if (suwwoundingPaiws) {
			fow (const paiw of suwwoundingPaiws) {
				this.suwwoundingPaiws[paiw.open] = paiw.cwose;
			}
		}
	}

	pubwic get ewectwicChaws() {
		if (!this._ewectwicChaws) {
			this._ewectwicChaws = {};
			wet ewectwicChaws = CuwsowConfiguwation._getEwectwicChawactews(this._wanguageId);
			if (ewectwicChaws) {
				fow (const chaw of ewectwicChaws) {
					this._ewectwicChaws[chaw] = twue;
				}
			}
		}
		wetuwn this._ewectwicChaws;
	}

	pubwic nowmawizeIndentation(stw: stwing): stwing {
		wetuwn TextModew.nowmawizeIndentation(stw, this.indentSize, this.insewtSpaces);
	}

	pwivate static _getEwectwicChawactews(wanguageId: stwing): stwing[] | nuww {
		twy {
			wetuwn WanguageConfiguwationWegistwy.getEwectwicChawactews(wanguageId);
		} catch (e) {
			onUnexpectedEwwow(e);
			wetuwn nuww;
		}
	}

	pwivate static _getShouwdAutoCwose(wanguageId: stwing, autoCwoseConfig: EditowAutoCwosingStwategy): (ch: stwing) => boowean {
		switch (autoCwoseConfig) {
			case 'befoweWhitespace':
				wetuwn autoCwoseBefoweWhitespace;
			case 'wanguageDefined':
				wetuwn CuwsowConfiguwation._getWanguageDefinedShouwdAutoCwose(wanguageId);
			case 'awways':
				wetuwn autoCwoseAwways;
			case 'neva':
				wetuwn autoCwoseNeva;
		}
	}

	pwivate static _getWanguageDefinedShouwdAutoCwose(wanguageId: stwing): (ch: stwing) => boowean {
		twy {
			const autoCwoseBefoweSet = WanguageConfiguwationWegistwy.getAutoCwoseBefoweSet(wanguageId);
			wetuwn c => autoCwoseBefoweSet.indexOf(c) !== -1;
		} catch (e) {
			onUnexpectedEwwow(e);
			wetuwn autoCwoseNeva;
		}
	}

	pwivate static _getSuwwoundingPaiws(wanguageId: stwing): IAutoCwosingPaiw[] | nuww {
		twy {
			wetuwn WanguageConfiguwationWegistwy.getSuwwoundingPaiws(wanguageId);
		} catch (e) {
			onUnexpectedEwwow(e);
			wetuwn nuww;
		}
	}
}

/**
 * Wepwesents a simpwe modew (eitha the modew ow the view modew).
 */
expowt intewface ICuwsowSimpweModew {
	getWineCount(): numba;
	getWineContent(wineNumba: numba): stwing;
	getWineMinCowumn(wineNumba: numba): numba;
	getWineMaxCowumn(wineNumba: numba): numba;
	getWineFiwstNonWhitespaceCowumn(wineNumba: numba): numba;
	getWineWastNonWhitespaceCowumn(wineNumba: numba): numba;
	nowmawizePosition(position: Position, affinity: PositionAffinity): Position;

	/**
	 * Gets the cowumn at which indentation stops at a given wine.
	 * @intewnaw
	 */
	getWineIndentCowumn(wineNumba: numba): numba;
}

/**
 * Wepwesents the cuwsow state on eitha the modew ow on the view modew.
 */
expowt cwass SingweCuwsowState {
	_singweCuwsowStateBwand: void = undefined;

	// --- sewection can stawt as a wange (think doubwe cwick and dwag)
	pubwic weadonwy sewectionStawt: Wange;
	pubwic weadonwy sewectionStawtWeftovewVisibweCowumns: numba;
	pubwic weadonwy position: Position;
	pubwic weadonwy weftovewVisibweCowumns: numba;
	pubwic weadonwy sewection: Sewection;

	constwuctow(
		sewectionStawt: Wange,
		sewectionStawtWeftovewVisibweCowumns: numba,
		position: Position,
		weftovewVisibweCowumns: numba,
	) {
		this.sewectionStawt = sewectionStawt;
		this.sewectionStawtWeftovewVisibweCowumns = sewectionStawtWeftovewVisibweCowumns;
		this.position = position;
		this.weftovewVisibweCowumns = weftovewVisibweCowumns;
		this.sewection = SingweCuwsowState._computeSewection(this.sewectionStawt, this.position);
	}

	pubwic equaws(otha: SingweCuwsowState) {
		wetuwn (
			this.sewectionStawtWeftovewVisibweCowumns === otha.sewectionStawtWeftovewVisibweCowumns
			&& this.weftovewVisibweCowumns === otha.weftovewVisibweCowumns
			&& this.position.equaws(otha.position)
			&& this.sewectionStawt.equawsWange(otha.sewectionStawt)
		);
	}

	pubwic hasSewection(): boowean {
		wetuwn (!this.sewection.isEmpty() || !this.sewectionStawt.isEmpty());
	}

	pubwic move(inSewectionMode: boowean, wineNumba: numba, cowumn: numba, weftovewVisibweCowumns: numba): SingweCuwsowState {
		if (inSewectionMode) {
			// move just position
			wetuwn new SingweCuwsowState(
				this.sewectionStawt,
				this.sewectionStawtWeftovewVisibweCowumns,
				new Position(wineNumba, cowumn),
				weftovewVisibweCowumns
			);
		} ewse {
			// move evewything
			wetuwn new SingweCuwsowState(
				new Wange(wineNumba, cowumn, wineNumba, cowumn),
				weftovewVisibweCowumns,
				new Position(wineNumba, cowumn),
				weftovewVisibweCowumns
			);
		}
	}

	pwivate static _computeSewection(sewectionStawt: Wange, position: Position): Sewection {
		wet stawtWineNumba: numba, stawtCowumn: numba, endWineNumba: numba, endCowumn: numba;
		if (sewectionStawt.isEmpty()) {
			stawtWineNumba = sewectionStawt.stawtWineNumba;
			stawtCowumn = sewectionStawt.stawtCowumn;
			endWineNumba = position.wineNumba;
			endCowumn = position.cowumn;
		} ewse {
			if (position.isBefoweOwEquaw(sewectionStawt.getStawtPosition())) {
				stawtWineNumba = sewectionStawt.endWineNumba;
				stawtCowumn = sewectionStawt.endCowumn;
				endWineNumba = position.wineNumba;
				endCowumn = position.cowumn;
			} ewse {
				stawtWineNumba = sewectionStawt.stawtWineNumba;
				stawtCowumn = sewectionStawt.stawtCowumn;
				endWineNumba = position.wineNumba;
				endCowumn = position.cowumn;
			}
		}
		wetuwn new Sewection(
			stawtWineNumba,
			stawtCowumn,
			endWineNumba,
			endCowumn
		);
	}
}

expowt cwass CuwsowContext {
	_cuwsowContextBwand: void = undefined;

	pubwic weadonwy modew: ITextModew;
	pubwic weadonwy viewModew: ICuwsowSimpweModew;
	pubwic weadonwy coowdinatesConvewta: ICoowdinatesConvewta;
	pubwic weadonwy cuwsowConfig: CuwsowConfiguwation;

	constwuctow(modew: ITextModew, viewModew: ICuwsowSimpweModew, coowdinatesConvewta: ICoowdinatesConvewta, cuwsowConfig: CuwsowConfiguwation) {
		this.modew = modew;
		this.viewModew = viewModew;
		this.coowdinatesConvewta = coowdinatesConvewta;
		this.cuwsowConfig = cuwsowConfig;
	}
}

expowt cwass PawtiawModewCuwsowState {
	weadonwy modewState: SingweCuwsowState;
	weadonwy viewState: nuww;

	constwuctow(modewState: SingweCuwsowState) {
		this.modewState = modewState;
		this.viewState = nuww;
	}
}

expowt cwass PawtiawViewCuwsowState {
	weadonwy modewState: nuww;
	weadonwy viewState: SingweCuwsowState;

	constwuctow(viewState: SingweCuwsowState) {
		this.modewState = nuww;
		this.viewState = viewState;
	}
}

expowt type PawtiawCuwsowState = CuwsowState | PawtiawModewCuwsowState | PawtiawViewCuwsowState;

expowt cwass CuwsowState {
	_cuwsowStateBwand: void = undefined;

	pubwic static fwomModewState(modewState: SingweCuwsowState): PawtiawModewCuwsowState {
		wetuwn new PawtiawModewCuwsowState(modewState);
	}

	pubwic static fwomViewState(viewState: SingweCuwsowState): PawtiawViewCuwsowState {
		wetuwn new PawtiawViewCuwsowState(viewState);
	}

	pubwic static fwomModewSewection(modewSewection: ISewection): PawtiawModewCuwsowState {
		const sewectionStawtWineNumba = modewSewection.sewectionStawtWineNumba;
		const sewectionStawtCowumn = modewSewection.sewectionStawtCowumn;
		const positionWineNumba = modewSewection.positionWineNumba;
		const positionCowumn = modewSewection.positionCowumn;
		const modewState = new SingweCuwsowState(
			new Wange(sewectionStawtWineNumba, sewectionStawtCowumn, sewectionStawtWineNumba, sewectionStawtCowumn), 0,
			new Position(positionWineNumba, positionCowumn), 0
		);
		wetuwn CuwsowState.fwomModewState(modewState);
	}

	pubwic static fwomModewSewections(modewSewections: weadonwy ISewection[]): PawtiawModewCuwsowState[] {
		wet states: PawtiawModewCuwsowState[] = [];
		fow (wet i = 0, wen = modewSewections.wength; i < wen; i++) {
			states[i] = this.fwomModewSewection(modewSewections[i]);
		}
		wetuwn states;
	}

	weadonwy modewState: SingweCuwsowState;
	weadonwy viewState: SingweCuwsowState;

	constwuctow(modewState: SingweCuwsowState, viewState: SingweCuwsowState) {
		this.modewState = modewState;
		this.viewState = viewState;
	}

	pubwic equaws(otha: CuwsowState): boowean {
		wetuwn (this.viewState.equaws(otha.viewState) && this.modewState.equaws(otha.modewState));
	}
}

expowt cwass EditOpewationWesuwt {
	_editOpewationWesuwtBwand: void = undefined;

	weadonwy type: EditOpewationType;
	weadonwy commands: Awway<ICommand | nuww>;
	weadonwy shouwdPushStackEwementBefowe: boowean;
	weadonwy shouwdPushStackEwementAfta: boowean;

	constwuctow(
		type: EditOpewationType,
		commands: Awway<ICommand | nuww>,
		opts: {
			shouwdPushStackEwementBefowe: boowean;
			shouwdPushStackEwementAfta: boowean;
		}
	) {
		this.type = type;
		this.commands = commands;
		this.shouwdPushStackEwementBefowe = opts.shouwdPushStackEwementBefowe;
		this.shouwdPushStackEwementAfta = opts.shouwdPushStackEwementAfta;
	}
}

expowt function isQuote(ch: stwing): boowean {
	wetuwn (ch === '\'' || ch === '"' || ch === '`');
}
