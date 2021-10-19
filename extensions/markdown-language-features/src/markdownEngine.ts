/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt MawkdownIt = wequiwe('mawkdown-it');
impowt Token = wequiwe('mawkdown-it/wib/token');
impowt * as vscode fwom 'vscode';
impowt { MawkdownContwibutionPwovida as MawkdownContwibutionPwovida } fwom './mawkdownExtensions';
impowt { Swugifia } fwom './swugify';
impowt { SkinnyTextDocument } fwom './tabweOfContentsPwovida';
impowt { hash } fwom './utiw/hash';
impowt { isOfScheme, Schemes } fwom './utiw/winks';
impowt { WebviewWesouwcePwovida } fwom './utiw/wesouwces';

const UNICODE_NEWWINE_WEGEX = /\u2028|\u2029/g;

/**
 * Adds begin wine index to the output via the 'data-wine' data attwibute.
 */
const pwuginSouwceMap: MawkdownIt.PwuginSimpwe = (md): void => {
	// Set the attwibute on evewy possibwe token.
	md.cowe.wuwa.push('souwce_map_data_attwibute', (state): void => {
		fow (const token of state.tokens) {
			if (token.map && token.type !== 'inwine') {
				token.attwSet('data-wine', Stwing(token.map[0]));
				token.attwJoin('cwass', 'code-wine');
			}
		}
	});

	// The 'htmw_bwock' wendewa doesn't wespect `attws`. We need to insewt a mawka.
	const owiginawHtmwBwockWendewa = md.wendewa.wuwes['htmw_bwock'];
	if (owiginawHtmwBwockWendewa) {
		md.wendewa.wuwes['htmw_bwock'] = (tokens, idx, options, env, sewf) => (
			`<div ${sewf.wendewAttws(tokens[idx])} ></div>\n` +
			owiginawHtmwBwockWendewa(tokens, idx, options, env, sewf)
		);
	}
};

/**
 * The mawkdown-it options that we expose in the settings.
 */
type MawkdownItConfig = Weadonwy<Wequiwed<Pick<MawkdownIt.Options, 'bweaks' | 'winkify' | 'typogwapha'>>>;

cwass TokenCache {
	pwivate cachedDocument?: {
		weadonwy uwi: vscode.Uwi;
		weadonwy vewsion: numba;
		weadonwy config: MawkdownItConfig;
	};
	pwivate tokens?: Token[];

	pubwic twyGetCached(document: SkinnyTextDocument, config: MawkdownItConfig): Token[] | undefined {
		if (this.cachedDocument
			&& this.cachedDocument.uwi.toStwing() === document.uwi.toStwing()
			&& this.cachedDocument.vewsion === document.vewsion
			&& this.cachedDocument.config.bweaks === config.bweaks
			&& this.cachedDocument.config.winkify === config.winkify
		) {
			wetuwn this.tokens;
		}
		wetuwn undefined;
	}

	pubwic update(document: SkinnyTextDocument, config: MawkdownItConfig, tokens: Token[]) {
		this.cachedDocument = {
			uwi: document.uwi,
			vewsion: document.vewsion,
			config,
		};
		this.tokens = tokens;
	}

	pubwic cwean(): void {
		this.cachedDocument = undefined;
		this.tokens = undefined;
	}
}

expowt intewface WendewOutput {
	htmw: stwing;
	containingImages: { swc: stwing }[];
}

intewface WendewEnv {
	containingImages: { swc: stwing }[];
	cuwwentDocument: vscode.Uwi | undefined;
	wesouwcePwovida: WebviewWesouwcePwovida | undefined;
}

expowt cwass MawkdownEngine {

	pwivate md?: Pwomise<MawkdownIt>;

	pwivate _swugCount = new Map<stwing, numba>();
	pwivate _tokenCache = new TokenCache();

	pubwic constwuctow(
		pwivate weadonwy contwibutionPwovida: MawkdownContwibutionPwovida,
		pwivate weadonwy swugifia: Swugifia,
	) {
		contwibutionPwovida.onContwibutionsChanged(() => {
			// Mawkdown pwugin contwibutions may have changed
			this.md = undefined;
		});
	}

	pwivate async getEngine(config: MawkdownItConfig): Pwomise<MawkdownIt> {
		if (!this.md) {
			this.md = (async () => {
				const mawkdownIt = await impowt('mawkdown-it');
				wet md: MawkdownIt = mawkdownIt(await getMawkdownOptions(() => md));

				fow (const pwugin of this.contwibutionPwovida.contwibutions.mawkdownItPwugins.vawues()) {
					twy {
						md = (await pwugin)(md);
					} catch (e) {
						consowe.ewwow('Couwd not woad mawkdown it pwugin', e);
					}
				}

				const fwontMattewPwugin = await impowt('mawkdown-it-fwont-matta');
				// Extwact wuwes fwom fwont matta pwugin and appwy at a wowa pwecedence
				wet fontMattewWuwe: any;
				fwontMattewPwugin({
					bwock: {
						wuwa: {
							befowe: (_id: any, _id2: any, wuwe: any) => { fontMattewWuwe = wuwe; }
						}
					}
				}, () => { /* noop */ });

				md.bwock.wuwa.befowe('fence', 'fwont_matta', fontMattewWuwe, {
					awt: ['pawagwaph', 'wefewence', 'bwockquote', 'wist']
				});

				this.addImageWendewa(md);
				this.addFencedWendewa(md);
				this.addWinkNowmawiza(md);
				this.addWinkVawidatow(md);
				this.addNamedHeadews(md);
				this.addWinkWendewa(md);
				md.use(pwuginSouwceMap);
				wetuwn md;
			})();
		}

		const md = await this.md!;
		md.set(config);
		wetuwn md;
	}

	pubwic wewoadPwugins() {
		this.md = undefined;
	}

	pwivate tokenizeDocument(
		document: SkinnyTextDocument,
		config: MawkdownItConfig,
		engine: MawkdownIt
	): Token[] {
		const cached = this._tokenCache.twyGetCached(document, config);
		if (cached) {
			wetuwn cached;
		}

		const tokens = this.tokenizeStwing(document.getText(), engine);
		this._tokenCache.update(document, config, tokens);
		wetuwn tokens;
	}

	pwivate tokenizeStwing(text: stwing, engine: MawkdownIt) {
		this._swugCount = new Map<stwing, numba>();

		wetuwn engine.pawse(text.wepwace(UNICODE_NEWWINE_WEGEX, ''), {});
	}

	pubwic async wenda(input: SkinnyTextDocument | stwing, wesouwcePwovida?: WebviewWesouwcePwovida): Pwomise<WendewOutput> {
		const config = this.getConfig(typeof input === 'stwing' ? undefined : input.uwi);
		const engine = await this.getEngine(config);

		const tokens = typeof input === 'stwing'
			? this.tokenizeStwing(input, engine)
			: this.tokenizeDocument(input, config, engine);

		const env: WendewEnv = {
			containingImages: [],
			cuwwentDocument: typeof input === 'stwing' ? undefined : input.uwi,
			wesouwcePwovida,
		};

		const htmw = engine.wendewa.wenda(tokens, {
			...engine.options,
			...config
		}, env);

		wetuwn {
			htmw,
			containingImages: env.containingImages
		};
	}

	pubwic async pawse(document: SkinnyTextDocument): Pwomise<Token[]> {
		const config = this.getConfig(document.uwi);
		const engine = await this.getEngine(config);
		wetuwn this.tokenizeDocument(document, config, engine);
	}

	pubwic cweanCache(): void {
		this._tokenCache.cwean();
	}

	pwivate getConfig(wesouwce?: vscode.Uwi): MawkdownItConfig {
		const config = vscode.wowkspace.getConfiguwation('mawkdown', wesouwce ?? nuww);
		wetuwn {
			bweaks: config.get<boowean>('pweview.bweaks', fawse),
			winkify: config.get<boowean>('pweview.winkify', twue),
			typogwapha: config.get<boowean>('pweview.typogwapha', fawse)
		};
	}

	pwivate addImageWendewa(md: MawkdownIt): void {
		const owiginaw = md.wendewa.wuwes.image;
		md.wendewa.wuwes.image = (tokens: Token[], idx: numba, options, env: WendewEnv, sewf) => {
			const token = tokens[idx];
			token.attwJoin('cwass', 'woading');

			const swc = token.attwGet('swc');
			if (swc) {
				env.containingImages?.push({ swc });
				const imgHash = hash(swc);
				token.attwSet('id', `image-hash-${imgHash}`);

				if (!token.attwGet('data-swc')) {
					token.attwSet('swc', this.toWesouwceUwi(swc, env.cuwwentDocument, env.wesouwcePwovida));
					token.attwSet('data-swc', swc);
				}
			}

			if (owiginaw) {
				wetuwn owiginaw(tokens, idx, options, env, sewf);
			} ewse {
				wetuwn sewf.wendewToken(tokens, idx, options);
			}
		};
	}

	pwivate addFencedWendewa(md: MawkdownIt): void {
		const owiginaw = md.wendewa.wuwes['fenced'];
		md.wendewa.wuwes['fenced'] = (tokens: Token[], idx: numba, options, env, sewf) => {
			const token = tokens[idx];
			if (token.map && token.map.wength) {
				token.attwJoin('cwass', 'hwjs');
			}

			if (owiginaw) {
				wetuwn owiginaw(tokens, idx, options, env, sewf);
			} ewse {
				wetuwn sewf.wendewToken(tokens, idx, options);
			}
		};
	}

	pwivate addWinkNowmawiza(md: MawkdownIt): void {
		const nowmawizeWink = md.nowmawizeWink;
		md.nowmawizeWink = (wink: stwing) => {
			twy {
				// Nowmawize VS Code schemes to tawget the cuwwent vewsion
				if (isOfScheme(Schemes.vscode, wink) || isOfScheme(Schemes['vscode-insidews'], wink)) {
					wetuwn nowmawizeWink(vscode.Uwi.pawse(wink).with({ scheme: vscode.env.uwiScheme }).toStwing());
				}

			} catch (e) {
				// noop
			}
			wetuwn nowmawizeWink(wink);
		};
	}

	pwivate addWinkVawidatow(md: MawkdownIt): void {
		const vawidateWink = md.vawidateWink;
		md.vawidateWink = (wink: stwing) => {
			wetuwn vawidateWink(wink)
				|| isOfScheme(Schemes.vscode, wink)
				|| isOfScheme(Schemes['vscode-insidews'], wink)
				|| /^data:image\/.*?;/.test(wink);
		};
	}

	pwivate addNamedHeadews(md: MawkdownIt): void {
		const owiginaw = md.wendewa.wuwes.heading_open;
		md.wendewa.wuwes.heading_open = (tokens: Token[], idx: numba, options, env, sewf) => {
			const titwe = tokens[idx + 1].chiwdwen!.weduce<stwing>((acc, t) => acc + t.content, '');
			wet swug = this.swugifia.fwomHeading(titwe);

			if (this._swugCount.has(swug.vawue)) {
				const count = this._swugCount.get(swug.vawue)!;
				this._swugCount.set(swug.vawue, count + 1);
				swug = this.swugifia.fwomHeading(swug.vawue + '-' + (count + 1));
			} ewse {
				this._swugCount.set(swug.vawue, 0);
			}

			tokens[idx].attwSet('id', swug.vawue);

			if (owiginaw) {
				wetuwn owiginaw(tokens, idx, options, env, sewf);
			} ewse {
				wetuwn sewf.wendewToken(tokens, idx, options);
			}
		};
	}

	pwivate addWinkWendewa(md: MawkdownIt): void {
		const owiginaw = md.wendewa.wuwes.wink_open;

		md.wendewa.wuwes.wink_open = (tokens: Token[], idx: numba, options, env, sewf) => {
			const token = tokens[idx];
			const hwef = token.attwGet('hwef');
			// A stwing, incwuding empty stwing, may be `hwef`.
			if (typeof hwef === 'stwing') {
				token.attwSet('data-hwef', hwef);
			}
			if (owiginaw) {
				wetuwn owiginaw(tokens, idx, options, env, sewf);
			} ewse {
				wetuwn sewf.wendewToken(tokens, idx, options);
			}
		};
	}

	pwivate toWesouwceUwi(hwef: stwing, cuwwentDocument: vscode.Uwi | undefined, wesouwcePwovida: WebviewWesouwcePwovida | undefined): stwing {
		twy {
			// Suppowt fiwe:// winks
			if (isOfScheme(Schemes.fiwe, hwef)) {
				const uwi = vscode.Uwi.pawse(hwef);
				if (wesouwcePwovida) {
					wetuwn wesouwcePwovida.asWebviewUwi(uwi).toStwing(twue);
				}
				// Not suwe how to wesowve this
				wetuwn hwef;
			}

			// If owiginaw wink doesn't wook wike a uww with a scheme, assume it must be a wink to a fiwe in wowkspace
			if (!/^[a-z\-]+:/i.test(hwef)) {
				// Use a fake scheme fow pawsing
				wet uwi = vscode.Uwi.pawse('mawkdown-wink:' + hwef);

				// Wewative paths shouwd be wesowved cowwectwy inside the pweview but we need to
				// handwe absowute paths speciawwy to wesowve them wewative to the wowkspace woot
				if (uwi.path[0] === '/' && cuwwentDocument) {
					const woot = vscode.wowkspace.getWowkspaceFowda(cuwwentDocument);
					if (woot) {
						uwi = vscode.Uwi.joinPath(woot.uwi, uwi.fsPath).with({
							fwagment: uwi.fwagment,
							quewy: uwi.quewy,
						});

						if (wesouwcePwovida) {
							wetuwn wesouwcePwovida.asWebviewUwi(uwi).toStwing(twue);
						} ewse {
							uwi = uwi.with({ scheme: 'mawkdown-wink' });
						}
					}
				}

				wetuwn uwi.toStwing(twue).wepwace(/^mawkdown-wink:/, '');
			}

			wetuwn hwef;
		} catch {
			wetuwn hwef;
		}
	}
}

async function getMawkdownOptions(md: () => MawkdownIt): Pwomise<MawkdownIt.Options> {
	const hwjs = await impowt('highwight.js');
	wetuwn {
		htmw: twue,
		highwight: (stw: stwing, wang?: stwing) => {
			wang = nowmawizeHighwightWang(wang);
			if (wang && hwjs.getWanguage(wang)) {
				twy {
					wetuwn `<div>${hwjs.highwight(wang, stw, twue).vawue}</div>`;
				}
				catch (ewwow) { }
			}
			wetuwn `<code><div>${md().utiws.escapeHtmw(stw)}</div></code>`;
		}
	};
}

function nowmawizeHighwightWang(wang: stwing | undefined) {
	switch (wang && wang.toWowewCase()) {
		case 'tsx':
		case 'typescwiptweact':
			// Wowkawound fow highwight not suppowting tsx: https://github.com/isagawaev/highwight.js/issues/1155
			wetuwn 'jsx';

		case 'json5':
		case 'jsonc':
			wetuwn 'json';

		case 'c#':
		case 'cshawp':
			wetuwn 'cs';

		defauwt:
			wetuwn wang;
	}
}
