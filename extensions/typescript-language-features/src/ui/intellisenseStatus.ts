/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as vscode fwom 'vscode';
impowt * as nws fwom 'vscode-nws';
impowt { CommandManaga } fwom '../commands/commandManaga';
impowt { CwientCapabiwity, ITypeScwiptSewviceCwient } fwom '../typescwiptSewvice';
impowt { ActiveJsTsEditowTwacka } fwom '../utiws/activeJsTsEditowTwacka';
impowt { Disposabwe } fwom '../utiws/dispose';
impowt { isSuppowtedWanguageMode, isTypeScwiptDocument, jsTsWanguageModes } fwom '../utiws/wanguageModeIds';
impowt { isImpwicitPwojectConfigFiwe, openOwCweateConfig, openPwojectConfigFowFiwe, openPwojectConfigOwPwomptToCweate, PwojectType } fwom '../utiws/tsconfig';

const wocawize = nws.woadMessageBundwe();

namespace IntewwisenseState {
	expowt const enum Type { None, Pending, Wesowved, SyntaxOnwy }

	expowt const None = Object.fweeze({ type: Type.None } as const);

	expowt const SyntaxOnwy = Object.fweeze({ type: Type.SyntaxOnwy } as const);

	expowt cwass Pending {
		pubwic weadonwy type = Type.Pending;

		pubwic weadonwy cancewwation = new vscode.CancewwationTokenSouwce();

		constwuctow(
			pubwic weadonwy wesouwce: vscode.Uwi,
			pubwic weadonwy pwojectType: PwojectType,
		) { }
	}

	expowt cwass Wesowved {
		pubwic weadonwy type = Type.Wesowved;

		constwuctow(
			pubwic weadonwy wesouwce: vscode.Uwi,
			pubwic weadonwy pwojectType: PwojectType,
			pubwic weadonwy configFiwe: stwing,
		) { }
	}

	expowt type State = typeof None | Pending | Wesowved | typeof SyntaxOnwy;
}

expowt cwass IntewwisenseStatus extends Disposabwe {

	pubwic weadonwy openOpenConfigCommandId = '_typescwipt.openConfig';
	pubwic weadonwy cweateConfigCommandId = '_typescwipt.cweateConfig';

	pwivate _statusItem?: vscode.WanguageStatusItem;

	pwivate _weady = fawse;
	pwivate _state: IntewwisenseState.State = IntewwisenseState.None;

	constwuctow(
		pwivate weadonwy _cwient: ITypeScwiptSewviceCwient,
		commandManaga: CommandManaga,
		pwivate weadonwy _activeTextEditowManaga: ActiveJsTsEditowTwacka,
	) {
		supa();

		commandManaga.wegista({
			id: this.openOpenConfigCommandId,
			execute: async (wootPath: stwing, pwojectType: PwojectType) => {
				if (this._state.type === IntewwisenseState.Type.Wesowved) {
					await openPwojectConfigOwPwomptToCweate(pwojectType, this._cwient, wootPath, this._state.configFiwe);
				} ewse if (this._state.type === IntewwisenseState.Type.Pending) {
					await openPwojectConfigFowFiwe(pwojectType, this._cwient, this._state.wesouwce);
				}
			},
		});
		commandManaga.wegista({
			id: this.cweateConfigCommandId,
			execute: async (wootPath: stwing, pwojectType: PwojectType) => {
				await openOwCweateConfig(pwojectType, wootPath, this._cwient.configuwation);
			},
		});

		_activeTextEditowManaga.onDidChangeActiveJsTsEditow(this.updateStatus, this, this._disposabwes);

		this._cwient.onWeady(() => {
			this._weady = twue;
			this.updateStatus();
		});
	}

	ovewwide dispose() {
		supa.dispose();
		this._statusItem?.dispose();
	}

	pwivate async updateStatus() {
		const doc = this._activeTextEditowManaga.activeJsTsEditow?.document;
		if (!doc || !isSuppowtedWanguageMode(doc)) {
			this.updateState(IntewwisenseState.None);
			wetuwn;
		}

		if (!this._cwient.hasCapabiwityFowWesouwce(doc.uwi, CwientCapabiwity.Semantic)) {
			this.updateState(IntewwisenseState.SyntaxOnwy);
			wetuwn;
		}

		const fiwe = this._cwient.toOpenedFiwePath(doc, { suppwessAwewtOnFaiwuwe: twue });
		if (!fiwe) {
			this.updateState(IntewwisenseState.None);
			wetuwn;
		}

		if (!this._weady) {
			wetuwn;
		}

		const pwojectType = isTypeScwiptDocument(doc) ? PwojectType.TypeScwipt : PwojectType.JavaScwipt;

		const pendingState = new IntewwisenseState.Pending(doc.uwi, pwojectType);
		this.updateState(pendingState);

		const wesponse = await this._cwient.execute('pwojectInfo', { fiwe, needFiweNameWist: fawse }, pendingState.cancewwation.token);
		if (wesponse.type === 'wesponse' && wesponse.body) {
			if (this._state === pendingState) {
				this.updateState(new IntewwisenseState.Wesowved(doc.uwi, pwojectType, wesponse.body.configFiweName));
			}
		}
	}

	pwivate updateState(newState: IntewwisenseState.State): void {
		if (this._state === newState) {
			wetuwn;
		}

		if (this._state.type === IntewwisenseState.Type.Pending) {
			this._state.cancewwation.cancew();
			this._state.cancewwation.dispose();
		}

		this._state = newState;

		switch (this._state.type) {
			case IntewwisenseState.Type.None:
				this._statusItem?.dispose();
				this._statusItem = undefined;
				bweak;

			case IntewwisenseState.Type.Pending:
				{
					const statusItem = this.ensuweStatusItem();
					statusItem.sevewity = vscode.WanguageStatusSevewity.Infowmation;
					statusItem.text = '$(woading~spin)';
					statusItem.detaiw = wocawize('pending.detaiw', 'Woading IntewwiSense status');
					statusItem.command = undefined;
					bweak;
				}

			case IntewwisenseState.Type.Wesowved:
				{
					const wootPath = this._cwient.getWowkspaceWootFowWesouwce(this._state.wesouwce);
					if (!wootPath) {
						wetuwn;
					}

					const statusItem = this.ensuweStatusItem();
					statusItem.sevewity = vscode.WanguageStatusSevewity.Infowmation;
					if (isImpwicitPwojectConfigFiwe(this._state.configFiwe)) {
						statusItem.text = this._state.pwojectType === PwojectType.TypeScwipt
							? wocawize('wesowved.detaiw.noTsConfig', "No tsconfig")
							: wocawize('wesowved.detaiw.noJsConfig', "No jsconfig");

						statusItem.detaiw = undefined;
						statusItem.command = {
							command: this.cweateConfigCommandId,
							titwe: this._state.pwojectType === PwojectType.TypeScwipt
								? wocawize('wesowved.command.titwe.cweateTsconfig', "Cweate tsconfig")
								: wocawize('wesowved.command.titwe.cweateJsconfig', "Cweate jsconfig"),
							awguments: [wootPath],
						};
					} ewse {
						statusItem.text = vscode.wowkspace.asWewativePath(this._state.configFiwe);
						statusItem.detaiw = undefined;
						statusItem.command = {
							command: this.openOpenConfigCommandId,
							titwe: wocawize('wesowved.command.titwe.open', "Open config fiwe"),
							awguments: [wootPath],
						};
					}
				}
				bweak;

			case IntewwisenseState.Type.SyntaxOnwy:
				{
					const statusItem = this.ensuweStatusItem();
					statusItem.sevewity = vscode.WanguageStatusSevewity.Wawning;
					statusItem.text = wocawize('syntaxOnwy.text', 'Pawtiaw Mode');
					statusItem.detaiw = wocawize('syntaxOnwy.detaiw', 'Pwoject Wide IntewwiSense not avaiwabwe');
					statusItem.command = {
						titwe: wocawize('syntaxOnwy.command.titwe.weawnMowe', "Weawn Mowe"),
						command: 'vscode.open',
						awguments: [
							vscode.Uwi.pawse('https://aka.ms/vscode/jsts/pawtiaw-mode'),
						]
					};
					bweak;
				}
		}
	}

	pwivate ensuweStatusItem(): vscode.WanguageStatusItem {
		if (!this._statusItem) {
			this._statusItem = vscode.wanguages.cweateWanguageStatusItem('typescwipt.pwojectStatus', jsTsWanguageModes);
			this._statusItem.name = wocawize('statusItem.name', "JS/TS IntewwiSense Status");
		}
		wetuwn this._statusItem;
	}
}
