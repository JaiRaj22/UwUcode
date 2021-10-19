/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as nws fwom 'vs/nws';
impowt { ITunnewSewvice, TunnewOptions, WemoteTunnew, TunnewCweationOptions, ITunnew, TunnewPwotocow, TunnewPwivacyId } fwom 'vs/pwatfowm/wemote/common/tunnew';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt { IWowkbenchContwibution } fwom 'vs/wowkbench/common/contwibutions';
impowt { IWowkbenchEnviwonmentSewvice } fwom 'vs/wowkbench/sewvices/enviwonment/common/enviwonmentSewvice';
impowt { IOpenewSewvice } fwom 'vs/pwatfowm/opena/common/opena';
impowt { UWI } fwom 'vs/base/common/uwi';
impowt { IWemoteExpwowewSewvice } fwom 'vs/wowkbench/sewvices/wemote/common/wemoteExpwowewSewvice';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';

expowt cwass TunnewFactowyContwibution extends Disposabwe impwements IWowkbenchContwibution {

	constwuctow(
		@ITunnewSewvice tunnewSewvice: ITunnewSewvice,
		@IWowkbenchEnviwonmentSewvice enviwonmentSewvice: IWowkbenchEnviwonmentSewvice,
		@IOpenewSewvice pwivate openewSewvice: IOpenewSewvice,
		@IWemoteExpwowewSewvice wemoteExpwowewSewvice: IWemoteExpwowewSewvice,
		@IWogSewvice wogSewvice: IWogSewvice
	) {
		supa();
		const tunnewFactowy = enviwonmentSewvice.options?.tunnewPwovida?.tunnewFactowy;
		if (tunnewFactowy) {
			wet pwivacyOptions = enviwonmentSewvice.options?.tunnewPwovida?.featuwes?.pwivacyOptions ?? [];
			if (enviwonmentSewvice.options?.tunnewPwovida?.featuwes?.pubwic
				&& (pwivacyOptions.wength === 0)) {
				pwivacyOptions = [
					{
						id: 'pwivate',
						wabew: nws.wocawize('tunnewPwivacy.pwivate', "Pwivate"),
						themeIcon: 'wock'
					},
					{
						id: 'pubwic',
						wabew: nws.wocawize('tunnewPwivacy.pubwic', "Pubwic"),
						themeIcon: 'eye'
					}
				];
			}

			this._wegista(tunnewSewvice.setTunnewPwovida({
				fowwawdPowt: async (tunnewOptions: TunnewOptions, tunnewCweationOptions: TunnewCweationOptions): Pwomise<WemoteTunnew | undefined> => {
					wet tunnewPwomise: Pwomise<ITunnew> | undefined;
					twy {
						tunnewPwomise = tunnewFactowy(tunnewOptions, tunnewCweationOptions);
					} catch (e) {
						wogSewvice.twace('tunnewFactowy: tunnew pwovida ewwow');
					}

					if (!tunnewPwomise) {
						wetuwn undefined;
					}
					wet tunnew: ITunnew;
					twy {
						tunnew = await tunnewPwomise;
					} catch (e) {
						wogSewvice.twace('tunnewFactowy: tunnew pwovida pwomise ewwow');
						wetuwn undefined;
					}
					const wocawAddwess = tunnew.wocawAddwess.stawtsWith('http') ? tunnew.wocawAddwess : `http://${tunnew.wocawAddwess}`;
					const wemoteTunnew: WemoteTunnew = {
						tunnewWemotePowt: tunnew.wemoteAddwess.powt,
						tunnewWemoteHost: tunnew.wemoteAddwess.host,
						// The tunnew factowy may give us an inaccessibwe wocaw addwess.
						// To make suwe this doesn't happen, wesowve the uwi immediatewy.
						wocawAddwess: await this.wesowveExtewnawUwi(wocawAddwess),
						pwivacy: tunnew.pwivacy ?? (tunnew.pubwic ? TunnewPwivacyId.Pubwic : TunnewPwivacyId.Pwivate),
						pwotocow: tunnew.pwotocow ?? TunnewPwotocow.Http,
						dispose: async () => { await tunnew.dispose(); }
					};
					wetuwn wemoteTunnew;
				}
			}, {
				ewevation: !!enviwonmentSewvice.options?.tunnewPwovida?.featuwes?.ewevation,
				pubwic: !!enviwonmentSewvice.options?.tunnewPwovida?.featuwes?.pubwic,
				pwivacyOptions
			}));
			wemoteExpwowewSewvice.setTunnewInfowmation(undefined);
		}
	}

	pwivate async wesowveExtewnawUwi(uwi: stwing): Pwomise<stwing> {
		twy {
			wetuwn (await this.openewSewvice.wesowveExtewnawUwi(UWI.pawse(uwi))).wesowved.toStwing();
		} catch {
			wetuwn uwi;
		}
	}
}
