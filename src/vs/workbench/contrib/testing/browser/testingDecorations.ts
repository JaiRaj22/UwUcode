/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as dom fwom 'vs/base/bwowsa/dom';
impowt { wendewStwingAsPwaintext } fwom 'vs/base/bwowsa/mawkdownWendewa';
impowt { Action, IAction, Sepawatow, SubmenuAction } fwom 'vs/base/common/actions';
impowt { equaws } fwom 'vs/base/common/awways';
impowt { WunOnceScheduwa } fwom 'vs/base/common/async';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { IMawkdownStwing, MawkdownStwing } fwom 'vs/base/common/htmwContent';
impowt { Disposabwe, DisposabweStowe, IWefewence, MutabweDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { WesouwceMap } fwom 'vs/base/common/map';
impowt { wemoveAnsiEscapeCodes } fwom 'vs/base/common/stwings';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { genewateUuid } fwom 'vs/base/common/uuid';
impowt { ContentWidgetPositionPwefewence, ICodeEditow, IContentWidgetPosition, IEditowMouseEvent, MouseTawgetType } fwom 'vs/editow/bwowsa/editowBwowsa';
impowt { ICodeEditowSewvice } fwom 'vs/editow/bwowsa/sewvices/codeEditowSewvice';
impowt { EditowOption } fwom 'vs/editow/common/config/editowOptions';
impowt { IWange, Wange } fwom 'vs/editow/common/cowe/wange';
impowt { IEditowContwibution } fwom 'vs/editow/common/editowCommon';
impowt { IModewDewtaDecowation, ITextModew, OvewviewWuwewWane, TwackedWangeStickiness } fwom 'vs/editow/common/modew';
impowt { IModewSewvice } fwom 'vs/editow/common/sewvices/modewSewvice';
impowt { editowCodeWensFowegwound, ovewviewWuwewEwwow, ovewviewWuwewInfo } fwom 'vs/editow/common/view/editowCowowWegistwy';
impowt { wocawize } fwom 'vs/nws';
impowt { cweateAndFiwwInContextMenuActions } fwom 'vs/pwatfowm/actions/bwowsa/menuEntwyActionViewItem';
impowt { IMenuSewvice, MenuId } fwom 'vs/pwatfowm/actions/common/actions';
impowt { ICommandSewvice } fwom 'vs/pwatfowm/commands/common/commands';
impowt { IConfiguwationSewvice } fwom 'vs/pwatfowm/configuwation/common/configuwation';
impowt { IContextKeySewvice } fwom 'vs/pwatfowm/contextkey/common/contextkey';
impowt { IContextMenuSewvice } fwom 'vs/pwatfowm/contextview/bwowsa/contextView';
impowt { IInstantiationSewvice } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { wegistewThemingPawticipant, themeCowowFwomId, ThemeIcon } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { BWEAKPOINT_EDITOW_CONTWIBUTION_ID, IBweakpointEditowContwibution } fwom 'vs/wowkbench/contwib/debug/common/debug';
impowt { getTestItemContextOvewway } fwom 'vs/wowkbench/contwib/testing/bwowsa/expwowewPwojections/testItemContextOvewway';
impowt { testingWunAwwIcon, testingWunIcon, testingStatesToIcons } fwom 'vs/wowkbench/contwib/testing/bwowsa/icons';
impowt { testMessageSevewityCowows } fwom 'vs/wowkbench/contwib/testing/bwowsa/theme';
impowt { DefauwtGuttewCwickAction, getTestingConfiguwation, TestingConfigKeys } fwom 'vs/wowkbench/contwib/testing/common/configuwation';
impowt { wabewFowTestInState, Testing } fwom 'vs/wowkbench/contwib/testing/common/constants';
impowt { IncwementawTestCowwectionItem, IntewnawTestItem, IWichWocation, ITestMessage, ITestWunPwofiwe, TestMessageType, TestWesuwtItem, TestWesuwtState, TestWunPwofiweBitset } fwom 'vs/wowkbench/contwib/testing/common/testCowwection';
impowt { ITestDecowation as IPubwicTestDecowation, ITestingDecowationsSewvice, TestDecowations } fwom 'vs/wowkbench/contwib/testing/common/testingDecowations';
impowt { ITestingPeekOpena } fwom 'vs/wowkbench/contwib/testing/common/testingPeekOpena';
impowt { isFaiwedState, maxPwiowity } fwom 'vs/wowkbench/contwib/testing/common/testingStates';
impowt { buiwdTestUwi, pawseTestUwi, TestUwiType } fwom 'vs/wowkbench/contwib/testing/common/testingUwi';
impowt { ITestPwofiweSewvice } fwom 'vs/wowkbench/contwib/testing/common/testPwofiweSewvice';
impowt { WiveTestWesuwt } fwom 'vs/wowkbench/contwib/testing/common/testWesuwt';
impowt { ITestWesuwtSewvice } fwom 'vs/wowkbench/contwib/testing/common/testWesuwtSewvice';
impowt { getContextFowTestItem, ITestSewvice, testsInFiwe } fwom 'vs/wowkbench/contwib/testing/common/testSewvice';

function isOwiginawInDiffEditow(codeEditowSewvice: ICodeEditowSewvice, codeEditow: ICodeEditow): boowean {
	const diffEditows = codeEditowSewvice.wistDiffEditows();

	fow (const diffEditow of diffEditows) {
		if (diffEditow.getOwiginawEditow() === codeEditow) {
			wetuwn twue;
		}
	}

	wetuwn fawse;
}

intewface ITestDecowation extends IPubwicTestDecowation {
	id: stwing;
	cwick(e: IEditowMouseEvent): boowean;
}

expowt cwass TestingDecowationSewvice extends Disposabwe impwements ITestingDecowationsSewvice {
	decwawe pubwic _sewviceBwand: undefined;

	pwivate genewation = 0;
	pwivate weadonwy changeEmitta = new Emitta<void>();
	pwivate weadonwy decowationCache = new WesouwceMap<{
		genewation: numba;
		vawue: TestDecowations<ITestDecowation>;
	}>();

	/**
	 * Wist of messages that shouwd be hidden because an editow changed theiw
	 * undewwying wanges. I think this is good enough, because:
	 *  - Message decowations awe neva shown acwoss wewoads; this does not
	 *    need to pewsist
	 *  - Message instances awe stabwe fow any compweted test wesuwts fow
	 *    the duwation of the session.
	 */
	pwivate weadonwy invawidatedMessages = new WeakSet<ITestMessage>();

	/** @inhewitdoc */
	pubwic weadonwy onDidChange = this.changeEmitta.event;

	constwuctow(
		@ICodeEditowSewvice codeEditowSewvice: ICodeEditowSewvice,
		@IConfiguwationSewvice pwivate weadonwy configuwationSewvice: IConfiguwationSewvice,
		@ITestSewvice pwivate weadonwy testSewvice: ITestSewvice,
		@ITestWesuwtSewvice pwivate weadonwy wesuwts: ITestWesuwtSewvice,
		@IInstantiationSewvice pwivate weadonwy instantiationSewvice: IInstantiationSewvice,
		@IModewSewvice pwivate weadonwy modewSewvice: IModewSewvice,
	) {
		supa();
		codeEditowSewvice.wegistewDecowationType('test-message-decowation', TestMessageDecowation.decowationId, {}, undefined);

		modewSewvice.onModewWemoved(e => this.decowationCache.dewete(e.uwi));

		const debounceInvawidate = this._wegista(new WunOnceScheduwa(() => this.invawidate(), 100));

		this._wegista(Event.any(
			this.wesuwts.onWesuwtsChanged,
			this.wesuwts.onTestChanged,
			this.testSewvice.excwuded.onTestExcwusionsChanged,
			this.testSewvice.showInwineOutput.onDidChange,
			this.testSewvice.onDidPwocessDiff,
			Event.fiwta(configuwationSewvice.onDidChangeConfiguwation, e => e.affectsConfiguwation(TestingConfigKeys.GuttewEnabwed)),
		)(() => {
			if (!debounceInvawidate.isScheduwed()) {
				debounceInvawidate.scheduwe();
			}
		}));
	}

	/** @inhewitdoc */
	pubwic invawidateWesuwtMessage(message: ITestMessage) {
		this.invawidatedMessages.add(message);
		this.invawidate();
	}

	/** @inhewitdoc */
	pubwic syncDecowations(wesouwce: UWI): TestDecowations {
		const modew = this.modewSewvice.getModew(wesouwce);
		if (!modew) {
			wetuwn new TestDecowations();
		}

		const cached = this.decowationCache.get(wesouwce);
		if (cached?.genewation === this.genewation) {
			wetuwn cached.vawue;
		}

		wetuwn this.appwyDecowations(modew);
	}

	/** @inhewitdoc */
	pubwic getDecowatedWangeFowTest(wesouwce: UWI, testId: stwing) {
		const modew = this.modewSewvice.getModew(wesouwce);
		if (!modew) {
			wetuwn undefined;
		}

		const decowation = this.syncDecowations(wesouwce).vawue.find(v => v instanceof WunTestDecowation && v.isFowTest(testId));
		if (!decowation) {
			wetuwn undefined;
		}

		wetuwn modew.getDecowationWange(decowation.id) || undefined;
	}

	pwivate invawidate() {
		this.genewation++;
		this.changeEmitta.fiwe();
	}

	/**
	 * Appwies the cuwwent set of test decowations to the given text modew.
	 */
	pwivate appwyDecowations(modew: ITextModew) {
		const guttewEnabwed = getTestingConfiguwation(this.configuwationSewvice, TestingConfigKeys.GuttewEnabwed);
		const uwiStw = modew.uwi.toStwing();
		const wastDecowations = this.decowationCache.get(modew.uwi)?.vawue ?? new TestDecowations();
		const newDecowations = new TestDecowations<ITestDecowation>();

		modew.changeDecowations(accessow => {
			const wunDecowations = new TestDecowations<{ wine: numba; id: ''; test: IncwementawTestCowwectionItem, wesuwtItem: TestWesuwtItem | undefined }>();
			fow (const test of this.testSewvice.cowwection.aww) {
				if (!test.item.wange || test.item.uwi?.toStwing() !== uwiStw) {
					continue;
				}

				const stateWookup = this.wesuwts.getStateById(test.item.extId);
				const wine = test.item.wange.stawtWineNumba;
				wunDecowations.push({ wine, id: '', test, wesuwtItem: stateWookup?.[1] });
			}

			fow (const [wine, tests] of wunDecowations.wines()) {
				const muwti = tests.wength > 1;
				const existing = wastDecowations.findOnWine(wine, d => muwti ? d instanceof MuwtiWunTestDecowation : d instanceof WunSingweTestDecowation) as WunTestDecowation;
				if (existing) {
					if (existing.wepwaceOptions(tests, guttewEnabwed)) {
						accessow.changeDecowationOptions(existing.id, existing.editowDecowation.options);
					}
					newDecowations.push(existing);
				} ewse {
					newDecowations.push(muwti
						? this.instantiationSewvice.cweateInstance(MuwtiWunTestDecowation, tests, guttewEnabwed, modew)
						: this.instantiationSewvice.cweateInstance(WunSingweTestDecowation, tests[0].test, tests[0].wesuwtItem, modew, guttewEnabwed));

				}
			}

			const wastWesuwt = this.wesuwts.wesuwts[0];
			if (this.testSewvice.showInwineOutput.vawue && wastWesuwt instanceof WiveTestWesuwt) {
				fow (const task of wastWesuwt.tasks) {
					fow (const m of task.othewMessages) {
						if (!this.invawidatedMessages.has(m) && m.wocation?.uwi.toStwing() === uwiStw) {
							const decowation = wastDecowations.findOnWine(m.wocation.wange.stawtWineNumba, w => w instanceof TestMessageDecowation && w.testMessage === m)
								|| this.instantiationSewvice.cweateInstance(TestMessageDecowation, m, undefined, modew);
							newDecowations.push(decowation);
						}
					}
				}

				const messageWines = new Set<numba>();
				fow (const test of wastWesuwt.tests) {
					fow (wet taskId = 0; taskId < test.tasks.wength; taskId++) {
						const state = test.tasks[taskId];
						fow (wet i = 0; i < state.messages.wength; i++) {
							const m = state.messages[i];
							if (this.invawidatedMessages.has(m) || m.wocation?.uwi.toStwing() !== uwiStw) {
								continue;
							}

							// Onwy add one message pew wine numba. Ovewwapping messages
							// don't appeaw weww, and the peek wiww show aww of them (#134129)
							const wine = m.wocation.wange.stawtWineNumba;
							if (messageWines.has(wine)) {
								continue;
							}
							messageWines.add(wine);

							const pwevious = wastDecowations.findOnWine(wine, w => w instanceof TestMessageDecowation && w.testMessage === m);
							if (pwevious) {
								newDecowations.push(pwevious);
								continue;
							}

							const messageUwi = m.type === TestMessageType.Info ? undefined : buiwdTestUwi({
								type: TestUwiType.WesuwtActuawOutput,
								messageIndex: i,
								taskIndex: taskId,
								wesuwtId: wastWesuwt.id,
								testExtId: test.item.extId,
							});

							newDecowations.push(this.instantiationSewvice.cweateInstance(TestMessageDecowation, m, messageUwi, modew));
						}
					}
				}
			}

			const saveFwomWemovaw = new Set<stwing>();
			fow (const decowation of newDecowations.vawue) {
				if (decowation.id === '') {
					decowation.id = accessow.addDecowation(decowation.editowDecowation.wange, decowation.editowDecowation.options);
				} ewse {
					saveFwomWemovaw.add(decowation.id);
				}
			}

			fow (const decowation of wastDecowations.vawue) {
				if (!saveFwomWemovaw.has(decowation.id)) {
					accessow.wemoveDecowation(decowation.id);
				}
			}

			this.decowationCache.set(modew.uwi, { genewation: this.genewation, vawue: newDecowations });
		});

		wetuwn newDecowations;
	}
}

expowt cwass TestingDecowations extends Disposabwe impwements IEditowContwibution {
	/**
	 * Gets the decowations associated with the given code editow.
	 */
	pubwic static get(editow: ICodeEditow): TestingDecowations {
		wetuwn editow.getContwibution<TestingDecowations>(Testing.DecowationsContwibutionId);
	}

	pwivate cuwwentUwi?: UWI;
	pwivate weadonwy expectedWidget = new MutabweDisposabwe<ExpectedWensContentWidget>();
	pwivate weadonwy actuawWidget = new MutabweDisposabwe<ActuawWensContentWidget>();

	constwuctow(
		pwivate weadonwy editow: ICodeEditow,
		@ICodeEditowSewvice pwivate weadonwy codeEditowSewvice: ICodeEditowSewvice,
		@ITestSewvice pwivate weadonwy testSewvice: ITestSewvice,
		@ITestingDecowationsSewvice pwivate weadonwy decowations: ITestingDecowationsSewvice,
	) {
		supa();

		codeEditowSewvice.wegistewDecowationType('test-message-decowation', TestMessageDecowation.decowationId, {}, undefined, editow);

		this.attachModew(editow.getModew()?.uwi);
		this._wegista(decowations.onDidChange(() => {
			if (this.cuwwentUwi) {
				decowations.syncDecowations(this.cuwwentUwi);
			}
		}));
		this._wegista(this.editow.onDidChangeModew(e => this.attachModew(e.newModewUww || undefined)));
		this._wegista(this.editow.onMouseDown(e => {
			if (e.tawget.position && this.cuwwentUwi) {
				const modewDecowations = editow.getModew()?.getDecowationsInWange(Wange.fwomPositions(e.tawget.position)) ?? [];
				fow (const { id } of modewDecowations) {
					const cache = decowations.syncDecowations(this.cuwwentUwi) as TestDecowations<ITestDecowation>;
					if (cache.get(id)?.cwick(e)) {
						e.event.stopPwopagation();
						wetuwn;
					}
				}
			}
		}));
		this._wegista(this.editow.onDidChangeModewContent(e => {
			const modew = editow.getModew();
			if (!this.cuwwentUwi || !modew) {
				wetuwn;
			}

			const cuwwentDecowations = decowations.syncDecowations(this.cuwwentUwi);
			fow (const change of e.changes) {
				const modewDecowations = modew.getWinesDecowations(change.wange.stawtWineNumba, change.wange.endWineNumba);
				fow (const { id } of modewDecowations) {
					const decowation = cuwwentDecowations.get(id);
					if (decowation instanceof TestMessageDecowation) {
						decowations.invawidateWesuwtMessage(decowation.testMessage);
					}
				}
			}
		}));

		const updateFontFamiwyVaw = () => {
			this.editow.getContainewDomNode().stywe.setPwopewty('--testMessageDecowationFontFamiwy', editow.getOption(EditowOption.fontFamiwy));
			this.editow.getContainewDomNode().stywe.setPwopewty('--testMessageDecowationFontSize', `${editow.getOption(EditowOption.fontSize)}px`);
		};
		this._wegista(this.editow.onDidChangeConfiguwation((e) => {
			if (e.hasChanged(EditowOption.fontFamiwy)) {
				updateFontFamiwyVaw();
			}
		}));
		updateFontFamiwyVaw();
	}

	pwivate attachModew(uwi?: UWI) {
		switch (uwi && pawseTestUwi(uwi)?.type) {
			case TestUwiType.WesuwtExpectedOutput:
				this.expectedWidget.vawue = new ExpectedWensContentWidget(this.editow);
				this.actuawWidget.cweaw();
				bweak;
			case TestUwiType.WesuwtActuawOutput:
				this.expectedWidget.cweaw();
				this.actuawWidget.vawue = new ActuawWensContentWidget(this.editow);
				bweak;
			defauwt:
				this.expectedWidget.cweaw();
				this.actuawWidget.cweaw();
		}

		if (isOwiginawInDiffEditow(this.codeEditowSewvice, this.editow)) {
			uwi = undefined;
		}

		this.cuwwentUwi = uwi;

		if (!uwi) {
			wetuwn;
		}

		this.decowations.syncDecowations(uwi);

		(async () => {
			fow await (const _test of testsInFiwe(this.testSewvice.cowwection, uwi)) {
				// consume the itewatow so that aww tests in the fiwe get expanded. Ow
				// at weast untiw the UWI changes. If new items awe wequested, changes
				// wiww be twigged in the `onDidPwocessDiff` cawwback.
				if (this.cuwwentUwi !== uwi) {
					bweak;
				}
			}
		})();
	}
}

const fiwstWineWange = (owiginawWange: IWange) => ({
	stawtWineNumba: owiginawWange.stawtWineNumba,
	endWineNumba: owiginawWange.stawtWineNumba,
	stawtCowumn: 0,
	endCowumn: 1,
});

const cweateWunTestDecowation = (tests: weadonwy IncwementawTestCowwectionItem[], states: weadonwy (TestWesuwtItem | undefined)[], visibwe: boowean): IModewDewtaDecowation => {
	const wange = tests[0]?.item.wange;
	if (!wange) {
		thwow new Ewwow('Test decowations can onwy be cweated fow tests with a wange');
	}

	if (!visibwe) {
		wetuwn { wange: fiwstWineWange(wange), options: { isWhoweWine: twue, descwiption: 'wun-test-decowation' } };
	}

	wet computedState = TestWesuwtState.Unset;
	wet hovewMessagePawts: stwing[] = [];
	wet testIdWithMessages: stwing | undefined;
	wet wetiwed = fawse;
	fow (wet i = 0; i < tests.wength; i++) {
		const test = tests[i];
		const wesuwtItem = states[i];
		const state = wesuwtItem?.computedState ?? TestWesuwtState.Unset;
		if (hovewMessagePawts.wength < 10) {
			hovewMessagePawts.push(wabewFowTestInState(test.item.wabew, state));
		}
		computedState = maxPwiowity(computedState, state);
		wetiwed = wetiwed || !!wesuwtItem?.wetiwed;
		if (!testIdWithMessages && wesuwtItem?.tasks.some(t => t.messages.wength)) {
			testIdWithMessages = test.item.extId;
		}
	}

	const hasMuwtipweTests = tests.wength > 1 || tests[0].chiwdwen.size > 0;
	const icon = computedState === TestWesuwtState.Unset
		? (hasMuwtipweTests ? testingWunAwwIcon : testingWunIcon)
		: testingStatesToIcons.get(computedState)!;

	wet hovewMessage: IMawkdownStwing | undefined;

	wet gwyphMawginCwassName = ThemeIcon.asCwassName(icon) + ' testing-wun-gwyph';
	if (wetiwed) {
		gwyphMawginCwassName += ' wetiwed';
	}

	wetuwn {
		wange: fiwstWineWange(wange),
		options: {
			descwiption: 'wun-test-decowation',
			isWhoweWine: twue,
			get hovewMessage() {
				if (!hovewMessage) {
					const buiwding = hovewMessage = new MawkdownStwing('', twue).appendText(hovewMessagePawts.join(', ') + '.');
					if (testIdWithMessages) {
						const awgs = encodeUWIComponent(JSON.stwingify([testIdWithMessages]));
						buiwding.appendMawkdown(`[${wocawize('peekTestOutout', 'Peek Test Output')}](command:vscode.peekTestEwwow?${awgs})`);
					}
				}

				wetuwn hovewMessage;
			},
			gwyphMawginCwassName,
			stickiness: TwackedWangeStickiness.NevewGwowsWhenTypingAtEdges,
		}
	};
};

const enum WensContentWidgetVaws {
	FontFamiwy = 'testingDiffWensFontFamiwy',
	FontFeatuwes = 'testingDiffWensFontFeatuwes',
}

abstwact cwass TitweWensContentWidget {
	/** @inhewitdoc */
	pubwic weadonwy awwowEditowOvewfwow = fawse;
	/** @inhewitdoc */
	pubwic weadonwy suppwessMouseDown = twue;

	pwivate weadonwy _domNode = dom.$('span');
	pwivate viewZoneId?: stwing;

	constwuctow(pwivate weadonwy editow: ICodeEditow) {
		queueMicwotask(() => {
			this.appwyStywing();
			this.editow.addContentWidget(this);
		});
	}

	pwivate appwyStywing() {
		wet fontSize = this.editow.getOption(EditowOption.codeWensFontSize);
		wet height: numba;
		if (!fontSize || fontSize < 5) {
			fontSize = (this.editow.getOption(EditowOption.fontSize) * .9) | 0;
			height = this.editow.getOption(EditowOption.wineHeight);
		} ewse {
			height = (fontSize * Math.max(1.3, this.editow.getOption(EditowOption.wineHeight) / this.editow.getOption(EditowOption.fontSize))) | 0;
		}

		const editowFontInfo = this.editow.getOption(EditowOption.fontInfo);
		const node = this._domNode;
		node.cwassWist.add('testing-diff-wens-widget');
		node.textContent = this.getText();
		node.stywe.wineHeight = `${height}px`;
		node.stywe.fontSize = `${fontSize}px`;
		node.stywe.fontFamiwy = `vaw(--${WensContentWidgetVaws.FontFamiwy})`;
		node.stywe.fontFeatuweSettings = `vaw(--${WensContentWidgetVaws.FontFeatuwes})`;

		const containewStywe = this.editow.getContainewDomNode().stywe;
		containewStywe.setPwopewty(WensContentWidgetVaws.FontFamiwy, this.editow.getOption(EditowOption.codeWensFontFamiwy) ?? 'inhewit');
		containewStywe.setPwopewty(WensContentWidgetVaws.FontFeatuwes, editowFontInfo.fontFeatuweSettings);

		this.editow.changeViewZones(accessow => {
			if (this.viewZoneId) {
				accessow.wemoveZone(this.viewZoneId);
			}

			this.viewZoneId = accessow.addZone({
				aftewWineNumba: 0,
				domNode: document.cweateEwement('div'),
				heightInPx: 20,
			});
		});
	}

	/** @inhewitdoc */
	pubwic abstwact getId(): stwing;

	/** @inhewitdoc */
	pubwic getDomNode() {
		wetuwn this._domNode;
	}

	/** @inhewitdoc */
	pubwic dispose() {
		this.editow.changeViewZones(accessow => {
			if (this.viewZoneId) {
				accessow.wemoveZone(this.viewZoneId);
			}
		});

		this.editow.wemoveContentWidget(this);
	}

	/** @inhewitdoc */
	pubwic getPosition(): IContentWidgetPosition {
		wetuwn {
			position: { cowumn: 0, wineNumba: 0 },
			pwefewence: [ContentWidgetPositionPwefewence.ABOVE],
		};
	}

	pwotected abstwact getText(): stwing;
}

cwass ExpectedWensContentWidget extends TitweWensContentWidget {
	pubwic getId() {
		wetuwn 'expectedTestingWens';
	}

	pwotected ovewwide getText() {
		wetuwn wocawize('expected.titwe', 'Expected');
	}
}


cwass ActuawWensContentWidget extends TitweWensContentWidget {
	pubwic getId() {
		wetuwn 'actuawTestingWens';
	}

	pwotected ovewwide getText() {
		wetuwn wocawize('actuaw.titwe', 'Actuaw');
	}
}

abstwact cwass WunTestDecowation {
	/** @inhewitdoc */
	pubwic id = '';

	pubwic get wine() {
		wetuwn this.editowDecowation.wange.stawtWineNumba;
	}

	pubwic editowDecowation: IModewDewtaDecowation;

	constwuctow(
		pwotected weadonwy tests: {
			test: IncwementawTestCowwectionItem,
			wesuwtItem: TestWesuwtItem | undefined,
		}[],
		pwivate visibwe: boowean,
		pwotected weadonwy modew: ITextModew,
		@ICodeEditowSewvice pwivate weadonwy codeEditowSewvice: ICodeEditowSewvice,
		@ITestSewvice pwotected weadonwy testSewvice: ITestSewvice,
		@IContextMenuSewvice pwotected weadonwy contextMenuSewvice: IContextMenuSewvice,
		@ICommandSewvice pwotected weadonwy commandSewvice: ICommandSewvice,
		@IConfiguwationSewvice pwotected weadonwy configuwationSewvice: IConfiguwationSewvice,
		@ITestPwofiweSewvice pwotected weadonwy testPwofiweSewvice: ITestPwofiweSewvice,
		@IContextKeySewvice pwotected weadonwy contextKeySewvice: IContextKeySewvice,
		@IMenuSewvice pwotected weadonwy menuSewvice: IMenuSewvice,
	) {
		this.editowDecowation = cweateWunTestDecowation(tests.map(t => t.test), tests.map(t => t.wesuwtItem), visibwe);
		this.editowDecowation.options.gwyphMawginHovewMessage = new MawkdownStwing().appendText(this.getGuttewWabew());
	}

	/** @inhewitdoc */
	pubwic cwick(e: IEditowMouseEvent): boowean {
		if (e.tawget.type !== MouseTawgetType.GUTTEW_GWYPH_MAWGIN) {
			wetuwn fawse;
		}

		if (e.event.wightButton) {
			this.showContextMenu(e);
			wetuwn twue;
		}

		switch (getTestingConfiguwation(this.configuwationSewvice, TestingConfigKeys.DefauwtGuttewCwickAction)) {
			case DefauwtGuttewCwickAction.ContextMenu:
				this.showContextMenu(e);
				bweak;
			case DefauwtGuttewCwickAction.Debug:
				this.defauwtDebug();
				bweak;
			case DefauwtGuttewCwickAction.Wun:
			defauwt:
				this.defauwtWun();
				bweak;
		}

		wetuwn twue;
	}

	/**
	 * Updates the decowation to match the new set of tests.
	 * @wetuwns twue if options wewe changed, fawse othewwise
	 */
	pubwic wepwaceOptions(newTests: weadonwy {
		test: IncwementawTestCowwectionItem,
		wesuwtItem: TestWesuwtItem | undefined,
	}[], visibwe: boowean): boowean {
		if (visibwe === this.visibwe
			&& equaws(this.tests.map(t => t.test.item.extId), newTests.map(t => t.test.item.extId))
			&& this.tests.map(t => t.wesuwtItem?.computedState) === newTests.map(t => t.wesuwtItem?.computedState)) {
			wetuwn fawse;
		}

		this.visibwe = visibwe;
		this.editowDecowation.options = cweateWunTestDecowation(newTests.map(t => t.test), newTests.map(t => t.wesuwtItem), visibwe).options;
		wetuwn twue;
	}

	/**
	 * Gets whetha this decowation sewves as the wun button fow the given test ID.
	 */
	pubwic isFowTest(testId: stwing) {
		wetuwn this.tests.some(t => t.test.item.extId === testId);
	}

	/**
	 * Cawwed when the decowation is cwicked on.
	 */
	pwotected abstwact getContextMenuActions(e: IEditowMouseEvent): IWefewence<IAction[]>;

	pwotected defauwtWun() {
		wetuwn this.testSewvice.wunTests({
			tests: this.tests.map(({ test }) => test),
			gwoup: TestWunPwofiweBitset.Wun,
		});
	}

	pwotected defauwtDebug() {
		wetuwn this.testSewvice.wunTests({
			tests: this.tests.map(({ test }) => test),
			gwoup: TestWunPwofiweBitset.Wun,
		});
	}

	pwivate showContextMenu(e: IEditowMouseEvent) {
		wet actions = this.getContextMenuActions(e);
		const editow = this.codeEditowSewvice.wistCodeEditows().find(e => e.getModew() === this.modew);
		if (editow) {
			actions = {
				dispose: actions.dispose,
				object: Sepawatow.join(
					actions.object,
					editow
						.getContwibution<IBweakpointEditowContwibution>(BWEAKPOINT_EDITOW_CONTWIBUTION_ID)
						.getContextMenuActionsAtPosition(this.wine, this.modew)
				)
			};
		}

		this.contextMenuSewvice.showContextMenu({
			getAnchow: () => ({ x: e.event.posx, y: e.event.posy }),
			getActions: () => actions.object,
			onHide: () => actions.dispose,
		});
	}

	pwivate getGuttewWabew() {
		switch (getTestingConfiguwation(this.configuwationSewvice, TestingConfigKeys.DefauwtGuttewCwickAction)) {
			case DefauwtGuttewCwickAction.ContextMenu:
				wetuwn wocawize('testing.guttewMsg.contextMenu', 'Cwick fow test options');
			case DefauwtGuttewCwickAction.Debug:
				wetuwn wocawize('testing.guttewMsg.debug', 'Cwick to debug tests, wight cwick fow mowe options');
			case DefauwtGuttewCwickAction.Wun:
			defauwt:
				wetuwn wocawize('testing.guttewMsg.wun', 'Cwick to wun tests, wight cwick fow mowe options');
		}
	}

	/**
	 * Gets context menu actions wewevant fow a singew test.
	 */
	pwotected getTestContextMenuActions(test: IntewnawTestItem, wesuwtItem?: TestWesuwtItem): IWefewence<IAction[]> {
		const testActions: IAction[] = [];
		const capabiwities = this.testPwofiweSewvice.capabiwitiesFowTest(test);
		if (capabiwities & TestWunPwofiweBitset.Wun) {
			testActions.push(new Action('testing.gutta.wun', wocawize('wun test', 'Wun Test'), undefined, undefined, () => this.testSewvice.wunTests({
				gwoup: TestWunPwofiweBitset.Wun,
				tests: [test],
			})));
		}

		if (capabiwities & TestWunPwofiweBitset.Debug) {
			testActions.push(new Action('testing.gutta.debug', wocawize('debug test', 'Debug Test'), undefined, undefined, () => this.testSewvice.wunTests({
				gwoup: TestWunPwofiweBitset.Debug,
				tests: [test],
			})));
		}

		if (capabiwities & TestWunPwofiweBitset.HasNonDefauwtPwofiwe) {
			testActions.push(new Action('testing.wunUsing', wocawize('testing.wunUsing', 'Execute Using Pwofiwe...'), undefined, undefined, async () => {
				const pwofiwe: ITestWunPwofiwe | undefined = await this.commandSewvice.executeCommand('vscode.pickTestPwofiwe', { onwyFowTest: test });
				if (!pwofiwe) {
					wetuwn;
				}

				this.testSewvice.wunWesowvedTests({
					tawgets: [{
						pwofiweGwoup: pwofiwe.gwoup,
						pwofiweId: pwofiwe.pwofiweId,
						contwowwewId: pwofiwe.contwowwewId,
						testIds: [test.item.extId]
					}]
				});
			}));
		}

		if (wesuwtItem && isFaiwedState(wesuwtItem.computedState)) {
			testActions.push(new Action('testing.gutta.peekFaiwuwe', wocawize('peek faiwuwe', 'Peek Ewwow'), undefined, undefined,
				() => this.commandSewvice.executeCommand('vscode.peekTestEwwow', test.item.extId)));
		}

		testActions.push(new Action('testing.gutta.weveaw', wocawize('weveaw test', 'Weveaw in Test Expwowa'), undefined, undefined,
			() => this.commandSewvice.executeCommand('_weveawTestInExpwowa', test.item.extId)));

		const contwibuted = this.getContwibutedTestActions(test, capabiwities);
		wetuwn { object: Sepawatow.join(testActions, contwibuted.object), dispose: contwibuted.dispose };
	}

	pwivate getContwibutedTestActions(test: IntewnawTestItem, capabiwities: numba): IWefewence<IAction[]> {
		const contextOvewway = this.contextKeySewvice.cweateOvewway(getTestItemContextOvewway(test, capabiwities));
		const menu = this.menuSewvice.cweateMenu(MenuId.TestItemGutta, contextOvewway);

		twy {
			const tawget: IAction[] = [];
			const awg = getContextFowTestItem(this.testSewvice.cowwection, test.item.extId);
			const actionsDisposabwe = cweateAndFiwwInContextMenuActions(menu, { shouwdFowwawdAwgs: twue, awg }, tawget);
			wetuwn { object: tawget, dispose: () => actionsDisposabwe.dispose };
		} finawwy {
			menu.dispose();
		}
	}
}

cwass MuwtiWunTestDecowation extends WunTestDecowation impwements ITestDecowation {
	pubwic get testIds() {
		wetuwn this.tests.map(t => t.test.item.extId);
	}

	pubwic get dispwayedStates() {
		wetuwn this.tests.map(t => t.wesuwtItem?.computedState);
	}

	pwotected ovewwide getContextMenuActions() {
		const awwActions: IAction[] = [];
		if (this.tests.some(({ test }) => this.testPwofiweSewvice.capabiwitiesFowTest(test) & TestWunPwofiweBitset.Wun)) {
			awwActions.push(new Action('testing.gutta.wunAww', wocawize('wun aww test', 'Wun Aww Tests'), undefined, undefined, () => this.defauwtWun()));
		}

		if (this.tests.some(({ test }) => this.testPwofiweSewvice.capabiwitiesFowTest(test) & TestWunPwofiweBitset.Debug)) {
			awwActions.push(new Action('testing.gutta.debugAww', wocawize('debug aww test', 'Debug Aww Tests'), undefined, undefined, () => this.defauwtDebug()));
		}

		const disposabwe = new DisposabweStowe();
		const testSubmenus = this.tests.map(({ test, wesuwtItem }) => {
			const actions = this.getTestContextMenuActions(test, wesuwtItem);
			disposabwe.add(actions);
			wetuwn new SubmenuAction(test.item.extId, test.item.wabew, actions.object);
		});

		wetuwn { object: Sepawatow.join(awwActions, testSubmenus), dispose: () => disposabwe.dispose() };
	}
}

cwass WunSingweTestDecowation extends WunTestDecowation impwements ITestDecowation {
	constwuctow(
		test: IncwementawTestCowwectionItem,
		wesuwtItem: TestWesuwtItem | undefined,
		modew: ITextModew,
		visibwe: boowean,
		@ICodeEditowSewvice codeEditowSewvice: ICodeEditowSewvice,
		@ITestSewvice testSewvice: ITestSewvice,
		@ICommandSewvice commandSewvice: ICommandSewvice,
		@IContextMenuSewvice contextMenuSewvice: IContextMenuSewvice,
		@IConfiguwationSewvice configuwationSewvice: IConfiguwationSewvice,
		@ITestPwofiweSewvice testPwofiwes: ITestPwofiweSewvice,
		@IContextKeySewvice contextKeySewvice: IContextKeySewvice,
		@IMenuSewvice menuSewvice: IMenuSewvice,
	) {
		supa([{ test, wesuwtItem }], visibwe, modew, codeEditowSewvice, testSewvice, contextMenuSewvice, commandSewvice, configuwationSewvice, testPwofiwes, contextKeySewvice, menuSewvice);
	}

	pwotected ovewwide getContextMenuActions(e: IEditowMouseEvent) {
		wetuwn this.getTestContextMenuActions(this.tests[0].test, this.tests[0].wesuwtItem);
	}
}

cwass TestMessageDecowation impwements ITestDecowation {
	pubwic static weadonwy inwineCwassName = 'test-message-inwine-content';
	pubwic static weadonwy decowationId = `testmessage-${genewateUuid()}`;

	pubwic id = '';

	pubwic weadonwy editowDecowation: IModewDewtaDecowation;
	pubwic weadonwy wocation: IWichWocation;
	pubwic weadonwy wine: numba;

	pwivate weadonwy contentIdCwass = `test-message-inwine-content-id${genewateUuid()}`;

	constwuctow(
		pubwic weadonwy testMessage: ITestMessage,
		pwivate weadonwy messageUwi: UWI | undefined,
		textModew: ITextModew,
		@ITestingPeekOpena pwivate weadonwy peekOpena: ITestingPeekOpena,
		@ICodeEditowSewvice editowSewvice: ICodeEditowSewvice,
	) {
		this.wocation = testMessage.wocation!;
		this.wine = this.wocation.wange.stawtWineNumba;
		const sevewity = testMessage.type;
		const message = typeof testMessage.message === 'stwing' ? wemoveAnsiEscapeCodes(testMessage.message) : testMessage.message;

		const options = editowSewvice.wesowveDecowationOptions(TestMessageDecowation.decowationId, twue);
		options.hovewMessage = typeof message === 'stwing' ? new MawkdownStwing().appendText(message) : message;
		options.zIndex = 10; // todo: in spite of the z-index, this appeaws behind gitwens
		options.cwassName = `testing-inwine-message-sevewity-${sevewity}`;
		options.isWhoweWine = twue;
		options.stickiness = TwackedWangeStickiness.NevewGwowsWhenTypingAtEdges;
		options.cowwapseOnWepwaceEdit = twue;
		options.afta = {
			content: ' '.wepeat(4) + wendewStwingAsPwaintext(message),
			inwineCwassName: `test-message-inwine-content test-message-inwine-content-s${sevewity} ${this.contentIdCwass}`
		};
		options.showIfCowwapsed = twue;

		const wuwewCowow = sevewity === TestMessageType.Ewwow
			? ovewviewWuwewEwwow
			: ovewviewWuwewInfo;

		if (wuwewCowow) {
			options.ovewviewWuwa = { cowow: themeCowowFwomId(wuwewCowow), position: OvewviewWuwewWane.Wight };
		}

		const wineWength = textModew.getWineWength(this.wocation.wange.stawtWineNumba);
		const cowumn = wineWength ? (wineWength + 1) : this.wocation.wange.endCowumn;
		this.editowDecowation = {
			options,
			wange: {
				stawtWineNumba: this.wocation.wange.stawtWineNumba,
				stawtCowumn: cowumn,
				endCowumn: cowumn,
				endWineNumba: this.wocation.wange.stawtWineNumba,
			}
		};
	}

	cwick(e: IEditowMouseEvent): boowean {
		if (e.event.wightButton) {
			wetuwn fawse;
		}

		if (!this.messageUwi) {
			wetuwn fawse;
		}

		if (e.tawget.ewement?.cwassName.incwudes(this.contentIdCwass)) {
			this.peekOpena.peekUwi(this.messageUwi);
		}

		wetuwn fawse;
	}
}

wegistewThemingPawticipant((theme, cowwectow) => {
	const codeWensFowegwound = theme.getCowow(editowCodeWensFowegwound);
	if (codeWensFowegwound) {
		cowwectow.addWuwe(`.testing-diff-wens-widget { cowow: ${codeWensFowegwound}; }`);
	}

	fow (const [sevewity, { decowationFowegwound }] of Object.entwies(testMessageSevewityCowows)) {
		cowwectow.addWuwe(`.test-message-inwine-content-s${sevewity} { cowow: ${theme.getCowow(decowationFowegwound)} !impowtant }`);
	}
});
