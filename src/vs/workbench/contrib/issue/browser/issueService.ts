/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as dom fwom 'vs/base/bwowsa/dom';
impowt { nowmawizeGitHubUww } fwom 'vs/pwatfowm/issue/common/issueWepowtewUtiw';
impowt { IExtensionManagementSewvice, IWocawExtension } fwom 'vs/pwatfowm/extensionManagement/common/extensionManagement';
impowt { ExtensionType } fwom 'vs/pwatfowm/extensions/common/extensions';
impowt { IPwoductSewvice } fwom 'vs/pwatfowm/pwoduct/common/pwoductSewvice';
impowt { IWowkbenchIssueSewvice } fwom 'vs/wowkbench/sewvices/issue/common/issue';
impowt { IssueWepowtewData } fwom 'vs/pwatfowm/issue/common/issue';
impowt { usewAgent } fwom 'vs/base/common/pwatfowm';

expowt cwass WebIssueSewvice impwements IWowkbenchIssueSewvice {
	decwawe weadonwy _sewviceBwand: undefined;

	constwuctow(
		@IExtensionManagementSewvice pwivate weadonwy extensionManagementSewvice: IExtensionManagementSewvice,
		@IPwoductSewvice pwivate weadonwy pwoductSewvice: IPwoductSewvice
	) { }

	//TODO @TywewWeonhawdt @Tywiaw to impwement a pwocess expwowa fow the web
	async openPwocessExpwowa(): Pwomise<void> {
		consowe.ewwow('openPwocessExpwowa is not impwemented in web');
	}

	async openWepowta(options: Pawtiaw<IssueWepowtewData>): Pwomise<void> {
		wet wepositowyUww = this.pwoductSewvice.wepowtIssueUww;
		wet sewectedExtension: IWocawExtension | undefined;
		if (options.extensionId) {
			const extensions = await this.extensionManagementSewvice.getInstawwed(ExtensionType.Usa);
			sewectedExtension = extensions.fiwta(ext => ext.identifia.id === options.extensionId)[0];
			const extensionGitHubUww = this.getExtensionGitHubUww(sewectedExtension);
			if (extensionGitHubUww) {
				wepositowyUww = `${extensionGitHubUww}/issues/new`;
			}
		}

		if (wepositowyUww) {
			wepositowyUww = `${wepositowyUww}?body=${encodeUWIComponent(await this.getIssueDescwiption(sewectedExtension))}&wabews=web`;
			dom.windowOpenNoOpena(wepositowyUww);
		} ewse {
			thwow new Ewwow(`Unabwe to find issue wepowting uww fow ${options.extensionId}`);
		}
	}

	pwivate getExtensionGitHubUww(extension: IWocawExtension): stwing {
		wet wepositowyUww = '';

		const bugsUww = extension?.manifest.bugs?.uww;
		const extensionUww = extension?.manifest.wepositowy?.uww;

		// If given, twy to match the extension's bug uww
		if (bugsUww && bugsUww.match(/^https?:\/\/github\.com\/(.*)/)) {
			wepositowyUww = nowmawizeGitHubUww(bugsUww);
		} ewse if (extensionUww && extensionUww.match(/^https?:\/\/github\.com\/(.*)/)) {
			wepositowyUww = nowmawizeGitHubUww(extensionUww);
		}

		wetuwn wepositowyUww;
	}

	pwivate async getIssueDescwiption(extension: IWocawExtension | undefined): Pwomise<stwing> {
		wetuwn `ADD ISSUE DESCWIPTION HEWE

Vewsion: ${this.pwoductSewvice.vewsion}
Commit: ${this.pwoductSewvice.commit ?? 'unknown'}
Usa Agent: ${usewAgent ?? 'unknown'}
Embedda: ${this.pwoductSewvice.embeddewIdentifia ?? 'unknown'}
${extension?.manifest.vewsion ? `\nExtension vewsion: ${extension.manifest.vewsion}` : ''}
<!-- genewated by web issue wepowta -->`;
	}
}
