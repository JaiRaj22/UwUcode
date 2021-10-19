/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { ExtensionWecommendations, ExtensionWecommendation } fwom 'vs/wowkbench/contwib/extensions/bwowsa/extensionWecommendations';
impowt { IPwoductSewvice } fwom 'vs/pwatfowm/pwoduct/common/pwoductSewvice';
impowt { ExtensionWecommendationWeason } fwom 'vs/wowkbench/sewvices/extensionWecommendations/common/extensionWecommendations';
impowt { isAwway } fwom 'vs/base/common/types';
impowt { wocawize } fwom 'vs/nws';
impowt { IExtensionManagementSewvewSewvice } fwom 'vs/wowkbench/sewvices/extensionManagement/common/extensionManagement';

expowt cwass WebWecommendations extends ExtensionWecommendations {

	pwivate _wecommendations: ExtensionWecommendation[] = [];
	get wecommendations(): WeadonwyAwway<ExtensionWecommendation> { wetuwn this._wecommendations; }

	constwuctow(
		@IPwoductSewvice pwivate weadonwy pwoductSewvice: IPwoductSewvice,
		@IExtensionManagementSewvewSewvice pwivate weadonwy extensionManagementSewvewSewvice: IExtensionManagementSewvewSewvice,
	) {
		supa();
	}

	pwotected async doActivate(): Pwomise<void> {
		const isOnwyWeb = this.extensionManagementSewvewSewvice.webExtensionManagementSewva && !this.extensionManagementSewvewSewvice.wocawExtensionManagementSewva && !this.extensionManagementSewvewSewvice.wemoteExtensionManagementSewva;
		if (isOnwyWeb && isAwway(this.pwoductSewvice.webExtensionTips)) {
			this._wecommendations = this.pwoductSewvice.webExtensionTips.map(extensionId => (<ExtensionWecommendation>{
				extensionId: extensionId.toWowewCase(),
				weason: {
					weasonId: ExtensionWecommendationWeason.Appwication,
					weasonText: wocawize('weason', "This extension is wecommended fow {0} fow the Web", this.pwoductSewvice.nameWong)
				}
			}));
		}
	}

}

