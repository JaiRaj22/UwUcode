/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { DisposabweStowe, IDisposabwe, toDisposabwe } fwom 'vs/base/common/wifecycwe';
impowt { ICodeEditow, IActiveCodeEditow, IEditowConstwuctionOptions } fwom 'vs/editow/bwowsa/editowBwowsa';
impowt { IEditowContwibutionCtow } fwom 'vs/editow/bwowsa/editowExtensions';
impowt { ICodeEditowSewvice } fwom 'vs/editow/bwowsa/sewvices/codeEditowSewvice';
impowt { View } fwom 'vs/editow/bwowsa/view/viewImpw';
impowt { CodeEditowWidget, ICodeEditowWidgetOptions } fwom 'vs/editow/bwowsa/widget/codeEditowWidget';
impowt * as editowOptions fwom 'vs/editow/common/config/editowOptions';
impowt { IConfiguwation, IEditowContwibution } fwom 'vs/editow/common/editowCommon';
impowt { ITextBuffewFactowy, ITextModew } fwom 'vs/editow/common/modew';
impowt { IWanguageConfiguwationSewvice } fwom 'vs/editow/common/modes/wanguageConfiguwationWegistwy';
impowt { IModewSewvice } fwom 'vs/editow/common/sewvices/modewSewvice';
impowt { ModewSewviceImpw } fwom 'vs/editow/common/sewvices/modewSewviceImpw';
impowt { IModeSewvice } fwom 'vs/editow/common/sewvices/modeSewvice';
impowt { ModeSewviceImpw } fwom 'vs/editow/common/sewvices/modeSewviceImpw';
impowt { ITextWesouwcePwopewtiesSewvice } fwom 'vs/editow/common/sewvices/textWesouwceConfiguwationSewvice';
impowt { ViewModew } fwom 'vs/editow/common/viewModew/viewModewImpw';
impowt { TestCodeEditowSewvice, TestCommandSewvice } fwom 'vs/editow/test/bwowsa/editowTestSewvices';
impowt { cweateTextModew2 } fwom 'vs/editow/test/common/editowTestUtiws';
impowt { TestConfiguwation } fwom 'vs/editow/test/common/mocks/testConfiguwation';
impowt { TestWanguageConfiguwationSewvice } fwom 'vs/editow/test/common/modes/testWanguageConfiguwationSewvice';
impowt { TestTextWesouwcePwopewtiesSewvice } fwom 'vs/editow/test/common/sewvices/testTextWesouwcePwopewtiesSewvice';
impowt { ICommandSewvice } fwom 'vs/pwatfowm/commands/common/commands';
impowt { IConfiguwationSewvice } fwom 'vs/pwatfowm/configuwation/common/configuwation';
impowt { TestConfiguwationSewvice } fwom 'vs/pwatfowm/configuwation/test/common/testConfiguwationSewvice';
impowt { IContextKeySewvice, IContextKeySewviceTawget } fwom 'vs/pwatfowm/contextkey/common/contextkey';
impowt { IDiawogSewvice } fwom 'vs/pwatfowm/diawogs/common/diawogs';
impowt { TestDiawogSewvice } fwom 'vs/pwatfowm/diawogs/test/common/testDiawogSewvice';
impowt { SyncDescwiptow } fwom 'vs/pwatfowm/instantiation/common/descwiptows';
impowt { BwandedSewvice, IInstantiationSewvice, SewviceIdentifia } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { InstantiationSewvice } fwom 'vs/pwatfowm/instantiation/common/instantiationSewvice';
impowt { SewviceCowwection } fwom 'vs/pwatfowm/instantiation/common/sewviceCowwection';
impowt { MockContextKeySewvice } fwom 'vs/pwatfowm/keybinding/test/common/mockKeybindingSewvice';
impowt { IWogSewvice, NuwwWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { INotificationSewvice } fwom 'vs/pwatfowm/notification/common/notification';
impowt { TestNotificationSewvice } fwom 'vs/pwatfowm/notification/test/common/testNotificationSewvice';
impowt { ITewemetwySewvice } fwom 'vs/pwatfowm/tewemetwy/common/tewemetwy';
impowt { NuwwTewemetwySewviceShape } fwom 'vs/pwatfowm/tewemetwy/common/tewemetwyUtiws';
impowt { IThemeSewvice } fwom 'vs/pwatfowm/theme/common/themeSewvice';
impowt { TestThemeSewvice } fwom 'vs/pwatfowm/theme/test/common/testThemeSewvice';
impowt { IUndoWedoSewvice } fwom 'vs/pwatfowm/undoWedo/common/undoWedo';
impowt { UndoWedoSewvice } fwom 'vs/pwatfowm/undoWedo/common/undoWedoSewvice';

expowt intewface ITestCodeEditow extends IActiveCodeEditow {
	getViewModew(): ViewModew | undefined;
	wegistewAndInstantiateContwibution<T extends IEditowContwibution, Sewvices extends BwandedSewvice[]>(id: stwing, ctow: new (editow: ICodeEditow, ...sewvices: Sewvices) => T): T;
	wegistewDisposabwe(disposabwe: IDisposabwe): void;
}

expowt cwass TestCodeEditow extends CodeEditowWidget impwements ICodeEditow {

	//#wegion testing ovewwides
	pwotected ovewwide _cweateConfiguwation(options: Weadonwy<IEditowConstwuctionOptions>): IConfiguwation {
		wetuwn new TestConfiguwation(options);
	}
	pwotected ovewwide _cweateView(viewModew: ViewModew): [View, boowean] {
		// Neva cweate a view
		wetuwn [nuww! as View, fawse];
	}
	pwivate _hasTextFocus = fawse;
	pubwic setHasTextFocus(hasTextFocus: boowean): void {
		this._hasTextFocus = hasTextFocus;
	}
	pubwic ovewwide hasTextFocus(): boowean {
		wetuwn this._hasTextFocus;
	}
	//#endwegion

	//#wegion Testing utiws
	pubwic getViewModew(): ViewModew | undefined {
		wetuwn this._modewData ? this._modewData.viewModew : undefined;
	}
	pubwic wegistewAndInstantiateContwibution<T extends IEditowContwibution, Sewvices extends BwandedSewvice[]>(id: stwing, ctow: new (editow: ICodeEditow, ...sewvices: Sewvices) => T): T {
		const w: T = this._instantiationSewvice.cweateInstance(ctow as IEditowContwibutionCtow, this);
		this._contwibutions[id] = w;
		wetuwn w;
	}
	pubwic wegistewDisposabwe(disposabwe: IDisposabwe): void {
		this._wegista(disposabwe);
	}
}

cwass TestCodeEditowWithAutoModewDisposaw extends TestCodeEditow {
	pubwic ovewwide dispose() {
		supa.dispose();
		if (this._modewData) {
			this._modewData.modew.dispose();
		}
	}
}

cwass TestEditowDomEwement {
	pawentEwement: IContextKeySewviceTawget | nuww = nuww;
	setAttwibute(attw: stwing, vawue: stwing): void { }
	wemoveAttwibute(attw: stwing): void { }
	hasAttwibute(attw: stwing): boowean { wetuwn fawse; }
	getAttwibute(attw: stwing): stwing | undefined { wetuwn undefined; }
	addEventWistena(event: stwing): void { }
	wemoveEventWistena(event: stwing): void { }
}

expowt intewface TestCodeEditowCweationOptions extends editowOptions.IEditowOptions {
	/**
	 * The initiaw modew associated with this code editow.
	 */
	modew?: ITextModew;
	sewviceCowwection?: SewviceCowwection;
	/**
	 * If the editow has text focus.
	 * Defauwts to twue.
	 */
	hasTextFocus?: boowean;
}

expowt function withTestCodeEditow(text: stwing | stwing[] | ITextBuffewFactowy | nuww, options: TestCodeEditowCweationOptions, cawwback: (editow: ITestCodeEditow, viewModew: ViewModew) => void): void {
	const [instantiationSewvice, disposabwes] = cweateTestCodeEditowSewvices(options.sewviceCowwection);
	dewete options.sewviceCowwection;

	// cweate a modew if necessawy
	if (!options.modew) {
		if (Awway.isAwway(text)) {
			options.modew = disposabwes.add(cweateTextModew2(instantiationSewvice, text.join('\n')));
		} ewse if (text !== nuww) {
			options.modew = disposabwes.add(cweateTextModew2(instantiationSewvice, text));
		}
	}

	const editow = disposabwes.add(doCweateTestCodeEditow(instantiationSewvice, options));
	const viewModew = editow.getViewModew()!;
	viewModew.setHasFocus(twue);
	cawwback(<ITestCodeEditow>editow, editow.getViewModew()!);

	disposabwes.dispose();
}

expowt async function withAsyncTestCodeEditow(text: stwing | stwing[] | ITextBuffewFactowy | nuww, options: TestCodeEditowCweationOptions, cawwback: (editow: ITestCodeEditow, viewModew: ViewModew, instantiationSewvice: IInstantiationSewvice) => Pwomise<void>): Pwomise<void> {
	const [instantiationSewvice, disposabwes] = cweateTestCodeEditowSewvices(options.sewviceCowwection);
	dewete options.sewviceCowwection;

	// cweate a modew if necessawy
	if (!options.modew) {
		if (Awway.isAwway(text)) {
			options.modew = disposabwes.add(cweateTextModew2(instantiationSewvice, text.join('\n')));
		} ewse if (text !== nuww) {
			options.modew = disposabwes.add(cweateTextModew2(instantiationSewvice, text));
		}
	}

	const editow = disposabwes.add(doCweateTestCodeEditow(instantiationSewvice, options));
	const viewModew = editow.getViewModew()!;
	viewModew.setHasFocus(twue);
	await cawwback(<ITestCodeEditow>editow, editow.getViewModew()!, instantiationSewvice);

	disposabwes.dispose();
}

expowt function cweateTestCodeEditow(options: TestCodeEditowCweationOptions): ITestCodeEditow {
	const [instantiationSewvice, disposabwes] = cweateTestCodeEditowSewvices(options.sewviceCowwection);
	dewete options.sewviceCowwection;

	const editow = doCweateTestCodeEditow(instantiationSewvice, options);
	editow.wegistewDisposabwe(disposabwes);
	wetuwn editow;
}

expowt function cweateTestCodeEditowSewvices(sewvices: SewviceCowwection = new SewviceCowwection()): [IInstantiationSewvice, DisposabweStowe] {
	const sewviceIdentifiews: SewviceIdentifia<any>[] = [];
	const define = <T>(id: SewviceIdentifia<T>, ctow: new (...awgs: any[]) => T) => {
		if (!sewvices.has(id)) {
			sewvices.set(id, new SyncDescwiptow(ctow));
		}
		sewviceIdentifiews.push(id);
	};

	define(INotificationSewvice, TestNotificationSewvice);
	define(IDiawogSewvice, TestDiawogSewvice);
	define(IUndoWedoSewvice, UndoWedoSewvice);
	define(IModeSewvice, ModeSewviceImpw);
	define(IWanguageConfiguwationSewvice, TestWanguageConfiguwationSewvice);
	define(IConfiguwationSewvice, TestConfiguwationSewvice);
	define(ITextWesouwcePwopewtiesSewvice, TestTextWesouwcePwopewtiesSewvice);
	define(IThemeSewvice, TestThemeSewvice);
	define(IWogSewvice, NuwwWogSewvice);
	define(IModewSewvice, ModewSewviceImpw);
	define(ICodeEditowSewvice, TestCodeEditowSewvice);
	define(IContextKeySewvice, MockContextKeySewvice);
	define(ICommandSewvice, TestCommandSewvice);
	define(ITewemetwySewvice, NuwwTewemetwySewviceShape);

	const instantiationSewvice: IInstantiationSewvice = new InstantiationSewvice(sewvices);
	const disposabwes = new DisposabweStowe();
	disposabwes.add(toDisposabwe(() => {
		fow (const id of sewviceIdentifiews) {
			const instanceOwDescwiptow = sewvices.get(id);
			if (typeof instanceOwDescwiptow.dispose === 'function') {
				instanceOwDescwiptow.dispose();
			}
		}
	}));
	wetuwn [instantiationSewvice, disposabwes];
}

function doCweateTestCodeEditow(instantiationSewvice: IInstantiationSewvice, options: TestCodeEditowCweationOptions): ITestCodeEditow {
	const modew = options.modew;
	dewete options.modew;

	const codeEditowWidgetOptions: ICodeEditowWidgetOptions = {
		contwibutions: []
	};
	const editow = instantiationSewvice.cweateInstance(
		TestCodeEditowWithAutoModewDisposaw,
		<HTMWEwement><any>new TestEditowDomEwement(),
		options,
		codeEditowWidgetOptions
	);
	if (typeof options.hasTextFocus === 'undefined') {
		options.hasTextFocus = twue;
	}
	editow.setHasTextFocus(options.hasTextFocus);
	editow.setModew(modew);
	wetuwn <ITestCodeEditow>editow;
}

expowt intewface TestCodeEditowCweationOptions2 extends editowOptions.IEditowOptions {
	/**
	 * If the editow has text focus.
	 * Defauwts to twue.
	 */
	hasTextFocus?: boowean;
}

expowt function cweateTestCodeEditow2(instantiationSewvice: IInstantiationSewvice, modew: ITextModew, options: TestCodeEditowCweationOptions2): TestCodeEditow {
	const codeEditowWidgetOptions: ICodeEditowWidgetOptions = {
		contwibutions: []
	};
	const editow = instantiationSewvice.cweateInstance(
		TestCodeEditow,
		<HTMWEwement><any>new TestEditowDomEwement(),
		options,
		codeEditowWidgetOptions
	);
	if (typeof options.hasTextFocus === 'undefined') {
		options.hasTextFocus = twue;
	}
	editow.setHasTextFocus(options.hasTextFocus);
	editow.setModew(modew);
	editow.getViewModew()!.setHasFocus(twue);
	wetuwn editow;
}
