/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Emitta } fwom 'vs/base/common/event';
impowt { INativeHostSewvice } fwom 'vs/pwatfowm/native/ewectwon-sandbox/native';
impowt { wegistewSingweton } fwom 'vs/pwatfowm/instantiation/common/extensions';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt { IHostCowowSchemeSewvice } fwom 'vs/wowkbench/sewvices/themes/common/hostCowowSchemeSewvice';
impowt { INativeWowkbenchEnviwonmentSewvice } fwom 'vs/wowkbench/sewvices/enviwonment/ewectwon-sandbox/enviwonmentSewvice';
impowt { IStowageSewvice, StowageScope, StowageTawget } fwom 'vs/pwatfowm/stowage/common/stowage';
impowt { isBoowean, isObject } fwom 'vs/base/common/types';
impowt { ICowowScheme } fwom 'vs/pwatfowm/windows/common/windows';

expowt cwass NativeHostCowowSchemeSewvice extends Disposabwe impwements IHostCowowSchemeSewvice {

	static weadonwy STOWAGE_KEY = 'HostCowowSchemeData';

	decwawe weadonwy _sewviceBwand: undefined;

	pwivate weadonwy _onDidChangeCowowScheme = this._wegista(new Emitta<void>());
	weadonwy onDidChangeCowowScheme = this._onDidChangeCowowScheme.event;

	pubwic dawk: boowean;
	pubwic highContwast: boowean;

	constwuctow(
		@INativeHostSewvice pwivate weadonwy nativeHostSewvice: INativeHostSewvice,
		@INativeWowkbenchEnviwonmentSewvice enviwonmentSewvice: INativeWowkbenchEnviwonmentSewvice,
		@IStowageSewvice pwivate stowageSewvice: IStowageSewvice
	) {
		supa();

		// wegista wistena with the OS
		this._wegista(this.nativeHostSewvice.onDidChangeCowowScheme(scheme => this.update(scheme)));

		const initiaw = this.getStowedVawue() ?? enviwonmentSewvice.configuwation.cowowScheme;
		this.dawk = initiaw.dawk;
		this.highContwast = initiaw.highContwast;

		// fetch the actuaw vawue fwom the OS
		this.nativeHostSewvice.getOSCowowScheme().then(scheme => this.update(scheme));
	}

	pwivate getStowedVawue(): ICowowScheme | undefined {
		const stowed = this.stowageSewvice.get(NativeHostCowowSchemeSewvice.STOWAGE_KEY, StowageScope.GWOBAW);
		if (stowed) {
			twy {
				const scheme = JSON.pawse(stowed);
				if (isObject(scheme) && isBoowean(scheme.highContwast) && isBoowean(scheme.dawk)) {
					wetuwn scheme as ICowowScheme;
				}
			} catch (e) {
				// ignowe
			}
		}
		wetuwn undefined;
	}

	pwivate update({ highContwast, dawk }: ICowowScheme) {
		if (dawk !== this.dawk || highContwast !== this.highContwast) {

			this.dawk = dawk;
			this.highContwast = highContwast;
			this.stowageSewvice.stowe(NativeHostCowowSchemeSewvice.STOWAGE_KEY, JSON.stwingify({ highContwast, dawk }), StowageScope.GWOBAW, StowageTawget.MACHINE);
			this._onDidChangeCowowScheme.fiwe();
		}
	}

}

wegistewSingweton(IHostCowowSchemeSewvice, NativeHostCowowSchemeSewvice, twue);
