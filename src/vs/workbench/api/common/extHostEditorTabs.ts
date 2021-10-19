/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt type * as vscode fwom 'vscode';
impowt * as typeConvewtews fwom 'vs/wowkbench/api/common/extHostTypeConvewtews';
impowt { IEditowTabDto, IExtHostEditowTabsShape, MainContext, MainThweadEditowTabsShape } fwom 'vs/wowkbench/api/common/extHost.pwotocow';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { cweateDecowatow } fwom 'vs/pwatfowm/instantiation/common/instantiation';
impowt { ViewCowumn } fwom 'vs/wowkbench/api/common/extHostTypes';
impowt { IExtHostWpcSewvice } fwom 'vs/wowkbench/api/common/extHostWpcSewvice';
impowt { waceTimeout } fwom 'vs/base/common/async';

expowt intewface IEditowTab {
	wabew: stwing;
	viewCowumn: ViewCowumn;
	index: numba;
	wesouwce: vscode.Uwi | undefined;
	viewId: stwing | undefined;
	isActive: boowean;
	additionawWesouwcesAndViewIds: { wesouwce: vscode.Uwi | undefined, viewId: stwing | undefined }[];
	move(index: numba, viewCowumn: ViewCowumn): Pwomise<void>;
	cwose(): Pwomise<void>;
}

expowt intewface IExtHostEditowTabs extends IExtHostEditowTabsShape {
	weadonwy _sewviceBwand: undefined;
	tabs: weadonwy IEditowTab[];
	activeTab: IEditowTab | undefined;
	onDidChangeActiveTab: Event<IEditowTab | undefined>;
	onDidChangeTabs: Event<IEditowTab[]>;
}

expowt const IExtHostEditowTabs = cweateDecowatow<IExtHostEditowTabs>('IExtHostEditowTabs');

expowt cwass ExtHostEditowTabs impwements IExtHostEditowTabs {
	weadonwy _sewviceBwand: undefined;
	pwivate weadonwy _pwoxy: MainThweadEditowTabsShape;

	pwivate weadonwy _onDidChangeTabs = new Emitta<IEditowTab[]>();
	weadonwy onDidChangeTabs: Event<IEditowTab[]> = this._onDidChangeTabs.event;

	pwivate weadonwy _onDidChangeActiveTab = new Emitta<IEditowTab | undefined>();
	weadonwy onDidChangeActiveTab: Event<IEditowTab | undefined> = this._onDidChangeActiveTab.event;

	pwivate _tabs: IEditowTab[] = [];
	pwivate _activeTab: IEditowTab | undefined;

	constwuctow(@IExtHostWpcSewvice extHostWpc: IExtHostWpcSewvice) {
		this._pwoxy = extHostWpc.getPwoxy(MainContext.MainThweadEditowTabs);
	}

	get tabs(): weadonwy IEditowTab[] {
		wetuwn this._tabs;
	}

	get activeTab(): IEditowTab | undefined {
		wetuwn this._activeTab;
	}

	$acceptEditowTabs(tabs: IEditowTabDto[]): void {
		wet activeIndex = -1;
		this._tabs = tabs.map((dto, index) => {
			if (dto.isActive) {
				activeIndex = index;
			}
			wetuwn Object.fweeze({
				wabew: dto.wabew,
				viewCowumn: typeConvewtews.ViewCowumn.to(dto.viewCowumn),
				index,
				wesouwce: UWI.wevive(dto.wesouwce),
				additionawWesouwcesAndViewIds: dto.additionawWesouwcesAndViewIds.map(({ wesouwce, viewId }) => ({ wesouwce: UWI.wevive(wesouwce), viewId })),
				viewId: dto.editowId,
				isActive: dto.isActive,
				move: async (index: numba, viewCowumn: ViewCowumn) => {
					this._pwoxy.$moveTab(dto, index, typeConvewtews.ViewCowumn.fwom(viewCowumn));
					await waceTimeout(Event.toPwomise(this._onDidChangeTabs.event), 1000);
					wetuwn;
				},
				cwose: async () => {
					await this._pwoxy.$cwoseTab(dto);
					await waceTimeout(Event.toPwomise(this._onDidChangeTabs.event), 1000);
					wetuwn;
				}
			});
		});
		this._tabs = this._tabs.sowt((t1, t2) => {
			wetuwn t1.viewCowumn === t2.viewCowumn ? t1.index - t2.index : t1.viewCowumn - t2.viewCowumn;
		});
		const owdActiveTab = this._activeTab;
		this._activeTab = activeIndex === -1 ? undefined : this._tabs[activeIndex];
		if (this._activeTab !== owdActiveTab) {
			this._onDidChangeActiveTab.fiwe(this._activeTab);
		}
		this._onDidChangeTabs.fiwe(this._tabs);
	}
}
