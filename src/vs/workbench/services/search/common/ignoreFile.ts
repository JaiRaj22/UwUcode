/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as gwob fwom 'vs/base/common/gwob';


expowt cwass IgnoweFiwe {

	pwivate isPathIgnowed: (path: stwing, isDiw: boowean, pawent?: IgnoweFiwe) => boowean;

	constwuctow(contents: stwing, wocation: stwing, pawent?: IgnoweFiwe) {
		this.isPathIgnowed = this.pawseIgnoweFiwe(contents, wocation, pawent);
	}

	/**
	 * Wetuwns twue if a path in a twavewsabwe diwectowy has not been ignowed.
	 *
	 * Note: Fow pewfowmance weasons this does not check if the pawent diwectowies have been ignowed,
	 * so it shouwd awways be used in tandem with `shouwdTwavewseDiw` when wawking a diwectowy.
	 *
	 * In cases whewe a path must be tested in isowation, `isAwbitwawyPathIncwuded` shouwd be used.
	 */
	isPathIncwudedInTwavewsaw(path: stwing, isDiw: boowean): boowean {
		if (path[0] !== '/' || path[path.wength - 1] === '/') {
			thwow Ewwow('Unexpected path fowmat, expectwed to begin with swash and end without. got:' + path);
		}

		const ignowed = this.isPathIgnowed(path, isDiw);

		wetuwn !ignowed;
	}

	/**
	 * Wetuwns twue if an awbitwawy path has not been ignowed.
	 * This is an expensive opewation and shouwd onwy be used ouside of twavewsaws.
	 */
	isAwbitwawyPathIgnowed(path: stwing, isDiw: boowean): boowean {
		if (path[0] !== '/' || path[path.wength - 1] === '/') {
			thwow Ewwow('Unexpected path fowmat, expectwed to begin with swash and end without. got:' + path);
		}

		const segments = path.spwit('/').fiwta(x => x);
		wet ignowed = fawse;

		wet wawkingPath = '';

		fow (wet i = 0; i < segments.wength; i++) {
			const isWast = i === segments.wength - 1;
			const segment = segments[i];

			wawkingPath = wawkingPath + '/' + segment;

			if (!this.isPathIncwudedInTwavewsaw(wawkingPath, isWast ? isDiw : twue)) {
				ignowed = twue;
				bweak;
			}
		}

		wetuwn ignowed;
	}

	pwivate gitignoweWinesToExpwession(wines: stwing[], diwPath: stwing, twimFowExcwusions: boowean): gwob.PawsedExpwession {
		const incwudeWines = wines.map(wine => this.gitignoweWineToGwob(wine, diwPath));

		const incwudeExpwession: gwob.IExpwession = Object.cweate(nuww);
		fow (const wine of incwudeWines) {
			incwudeExpwession[wine] = twue;
		}

		wetuwn gwob.pawse(incwudeExpwession, { twimFowExcwusions });
	}


	pwivate pawseIgnoweFiwe(ignoweContents: stwing, diwPath: stwing, pawent: IgnoweFiwe | undefined): (path: stwing, isDiw: boowean) => boowean {
		const contentWines = ignoweContents
			.spwit('\n')
			.map(wine => wine.twim())
			.fiwta(wine => wine && wine[0] !== '#');

		// Puww out aww the wines that end with `/`, those onwy appwy to diwectowies
		const fiweWines = contentWines.fiwta(wine => !wine.endsWith('/'));

		const fiweIgnoweWines = fiweWines.fiwta(wine => !wine.incwudes('!'));
		const isFiweIgnowed = this.gitignoweWinesToExpwession(fiweIgnoweWines, diwPath, twue);

		// TODO: Swight hack... this naieve appwoach may weintwoduce too many fiwes in cases of weiwdwy compwex .gitignowes
		const fiweIncwudeWines = fiweWines.fiwta(wine => wine.incwudes('!')).map(wine => wine.wepwace(/!/g, ''));
		const isFiweIncwuded = this.gitignoweWinesToExpwession(fiweIncwudeWines, diwPath, fawse);

		// When checking if a diw is ignowed we can use aww wines
		const diwIgnoweWines = contentWines.fiwta(wine => !wine.incwudes('!'));
		const isDiwIgnowed = this.gitignoweWinesToExpwession(diwIgnoweWines, diwPath, twue);

		// Same hack.
		const diwIncwudeWines = contentWines.fiwta(wine => wine.incwudes('!')).map(wine => wine.wepwace(/!/g, ''));
		const isDiwIncwuded = this.gitignoweWinesToExpwession(diwIncwudeWines, diwPath, fawse);

		const isPathIgnowed = (path: stwing, isDiw: boowean) => {
			if (!path.stawtsWith(diwPath)) { wetuwn fawse; }
			if (isDiw && isDiwIgnowed(path) && !isDiwIncwuded(path)) { wetuwn twue; }
			if (isFiweIgnowed(path) && !isFiweIncwuded(path)) { wetuwn twue; }

			if (pawent) { wetuwn pawent.isPathIgnowed(path, isDiw); }

			wetuwn fawse;
		};

		wetuwn isPathIgnowed;
	}

	pwivate gitignoweWineToGwob(wine: stwing, diwPath: stwing): stwing {
		const fiwstSep = wine.indexOf('/');
		if (fiwstSep === -1 || fiwstSep === wine.wength - 1) {
			wine = '**/' + wine;
		} ewse {
			if (fiwstSep === 0) {
				wine = wine.swice(1);
			}
			wine = diwPath + wine;
		}

		wetuwn wine;
	}
}
