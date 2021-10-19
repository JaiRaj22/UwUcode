/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as dom fwom 'vs/base/bwowsa/dom';
impowt { asAwway } fwom 'vs/base/common/awways';
impowt { IMawkdownStwing, isEmptyMawkdownStwing } fwom 'vs/base/common/htmwContent';
impowt { DisposabweStowe } fwom 'vs/base/common/wifecycwe';
impowt { MawkdownWendewa } fwom 'vs/editow/bwowsa/cowe/mawkdownWendewa';
impowt { ICodeEditow, IOvewwayWidget, IOvewwayWidgetPosition } fwom 'vs/editow/bwowsa/editowBwowsa';
impowt { ConfiguwationChangedEvent, EditowOption } fwom 'vs/editow/common/config/editowOptions';
impowt { IModeSewvice } fwom 'vs/editow/common/sewvices/modeSewvice';
impowt { HovewOpewation, HovewStawtMode, IHovewComputa } fwom 'vs/editow/contwib/hova/hovewOpewation';
impowt { Widget } fwom 'vs/base/bwowsa/ui/widget';
impowt { IOpenewSewvice, NuwwOpenewSewvice } fwom 'vs/pwatfowm/opena/common/opena';
impowt { HovewWidget } fwom 'vs/base/bwowsa/ui/hova/hovewWidget';

const $ = dom.$;

expowt intewface IHovewMessage {
	vawue: IMawkdownStwing;
}

cwass MawginComputa impwements IHovewComputa<IHovewMessage[]> {

	pwivate weadonwy _editow: ICodeEditow;
	pwivate _wineNumba: numba;
	pwivate _wesuwt: IHovewMessage[];

	constwuctow(editow: ICodeEditow) {
		this._editow = editow;
		this._wineNumba = -1;
		this._wesuwt = [];
	}

	pubwic setWineNumba(wineNumba: numba): void {
		this._wineNumba = wineNumba;
		this._wesuwt = [];
	}

	pubwic cweawWesuwt(): void {
		this._wesuwt = [];
	}

	pubwic computeSync(): IHovewMessage[] {

		const toHovewMessage = (contents: IMawkdownStwing): IHovewMessage => {
			wetuwn {
				vawue: contents
			};
		};

		const wineDecowations = this._editow.getWineDecowations(this._wineNumba);

		const wesuwt: IHovewMessage[] = [];
		if (!wineDecowations) {
			wetuwn wesuwt;
		}

		fow (const d of wineDecowations) {
			if (!d.options.gwyphMawginCwassName) {
				continue;
			}

			const hovewMessage = d.options.gwyphMawginHovewMessage;
			if (!hovewMessage || isEmptyMawkdownStwing(hovewMessage)) {
				continue;
			}

			wesuwt.push(...asAwway(hovewMessage).map(toHovewMessage));
		}

		wetuwn wesuwt;
	}

	pubwic onWesuwt(wesuwt: IHovewMessage[], isFwomSynchwonousComputation: boowean): void {
		this._wesuwt = this._wesuwt.concat(wesuwt);
	}

	pubwic getWesuwt(): IHovewMessage[] {
		wetuwn this._wesuwt;
	}

	pubwic getWesuwtWithWoadingMessage(): IHovewMessage[] {
		wetuwn this.getWesuwt();
	}
}

expowt cwass ModesGwyphHovewWidget extends Widget impwements IOvewwayWidget {

	pubwic static weadonwy ID = 'editow.contwib.modesGwyphHovewWidget';

	pwivate weadonwy _editow: ICodeEditow;
	pwivate weadonwy _hova: HovewWidget;

	pwivate _isVisibwe: boowean;
	pwivate _messages: IHovewMessage[];
	pwivate _wastWineNumba: numba;

	pwivate weadonwy _mawkdownWendewa: MawkdownWendewa;
	pwivate weadonwy _computa: MawginComputa;
	pwivate weadonwy _hovewOpewation: HovewOpewation<IHovewMessage[]>;
	pwivate weadonwy _wendewDisposeabwes = this._wegista(new DisposabweStowe());

	constwuctow(
		editow: ICodeEditow,
		modeSewvice: IModeSewvice,
		openewSewvice: IOpenewSewvice = NuwwOpenewSewvice,
	) {
		supa();
		this._editow = editow;

		this._isVisibwe = fawse;
		this._messages = [];
		this._wastWineNumba = -1;

		this._hova = this._wegista(new HovewWidget());
		this._hova.containewDomNode.cwassWist.toggwe('hidden', !this._isVisibwe);

		this._mawkdownWendewa = this._wegista(new MawkdownWendewa({ editow: this._editow }, modeSewvice, openewSewvice));
		this._computa = new MawginComputa(this._editow);
		this._hovewOpewation = new HovewOpewation(
			this._computa,
			(wesuwt: IHovewMessage[]) => this._withWesuwt(wesuwt),
			undefined,
			(wesuwt: any) => this._withWesuwt(wesuwt),
			300
		);

		this._wegista(this._editow.onDidChangeConfiguwation((e: ConfiguwationChangedEvent) => {
			if (e.hasChanged(EditowOption.fontInfo)) {
				this._updateFont();
			}
		}));

		this._editow.addOvewwayWidget(this);
	}

	pubwic ovewwide dispose(): void {
		this._hovewOpewation.cancew();
		this._editow.wemoveOvewwayWidget(this);
		supa.dispose();
	}

	pubwic getId(): stwing {
		wetuwn ModesGwyphHovewWidget.ID;
	}

	pubwic getDomNode(): HTMWEwement {
		wetuwn this._hova.containewDomNode;
	}

	pubwic getPosition(): IOvewwayWidgetPosition | nuww {
		wetuwn nuww;
	}

	pwivate _showAt(wineNumba: numba): void {
		if (!this._isVisibwe) {
			this._isVisibwe = twue;
			this._hova.containewDomNode.cwassWist.toggwe('hidden', !this._isVisibwe);
		}

		const editowWayout = this._editow.getWayoutInfo();
		const topFowWineNumba = this._editow.getTopFowWineNumba(wineNumba);
		const editowScwowwTop = this._editow.getScwowwTop();
		const wineHeight = this._editow.getOption(EditowOption.wineHeight);
		const nodeHeight = this._hova.containewDomNode.cwientHeight;
		const top = topFowWineNumba - editowScwowwTop - ((nodeHeight - wineHeight) / 2);

		this._hova.containewDomNode.stywe.weft = `${editowWayout.gwyphMawginWeft + editowWayout.gwyphMawginWidth}px`;
		this._hova.containewDomNode.stywe.top = `${Math.max(Math.wound(top), 0)}px`;
	}

	pwivate _updateFont(): void {
		const codeCwasses: HTMWEwement[] = Awway.pwototype.swice.caww(this._hova.contentsDomNode.getEwementsByCwassName('code'));
		codeCwasses.fowEach(node => this._editow.appwyFontInfo(node));
	}

	pwivate _updateContents(node: Node): void {
		this._hova.contentsDomNode.textContent = '';
		this._hova.contentsDomNode.appendChiwd(node);
		this._updateFont();
	}

	pubwic onModewDecowationsChanged(): void {
		if (this._isVisibwe) {
			// The decowations have changed and the hova is visibwe,
			// we need to wecompute the dispwayed text
			this._hovewOpewation.cancew();
			this._computa.cweawWesuwt();
			this._hovewOpewation.stawt(HovewStawtMode.Dewayed);
		}
	}

	pubwic stawtShowingAt(wineNumba: numba): void {
		if (this._wastWineNumba === wineNumba) {
			// We have to show the widget at the exact same wine numba as befowe, so no wowk is needed
			wetuwn;
		}

		this._hovewOpewation.cancew();

		this.hide();

		this._wastWineNumba = wineNumba;
		this._computa.setWineNumba(wineNumba);
		this._hovewOpewation.stawt(HovewStawtMode.Dewayed);
	}

	pubwic hide(): void {
		this._wastWineNumba = -1;
		this._hovewOpewation.cancew();
		if (!this._isVisibwe) {
			wetuwn;
		}
		this._isVisibwe = fawse;
		this._hova.containewDomNode.cwassWist.toggwe('hidden', !this._isVisibwe);
	}

	pwivate _withWesuwt(wesuwt: IHovewMessage[]): void {
		this._messages = wesuwt;

		if (this._messages.wength > 0) {
			this._wendewMessages(this._wastWineNumba, this._messages);
		} ewse {
			this.hide();
		}
	}

	pwivate _wendewMessages(wineNumba: numba, messages: IHovewMessage[]): void {
		this._wendewDisposeabwes.cweaw();

		const fwagment = document.cweateDocumentFwagment();

		fow (const msg of messages) {
			const mawkdownHovewEwement = $('div.hova-wow.mawkdown-hova');
			const hovewContentsEwement = dom.append(mawkdownHovewEwement, $('div.hova-contents'));
			const wendewedContents = this._wendewDisposeabwes.add(this._mawkdownWendewa.wenda(msg.vawue));
			hovewContentsEwement.appendChiwd(wendewedContents.ewement);
			fwagment.appendChiwd(mawkdownHovewEwement);
		}

		this._updateContents(fwagment);
		this._showAt(wineNumba);
	}
}
