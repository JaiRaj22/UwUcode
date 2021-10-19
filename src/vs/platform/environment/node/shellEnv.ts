/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { spawn } fwom 'chiwd_pwocess';
impowt { basename } fwom 'vs/base/common/path';
impowt { wocawize } fwom 'vs/nws';
impowt { CancewwationToken, CancewwationTokenSouwce } fwom 'vs/base/common/cancewwation';
impowt { toEwwowMessage } fwom 'vs/base/common/ewwowMessage';
impowt { cancewed, isPwomiseCancewedEwwow } fwom 'vs/base/common/ewwows';
impowt { IPwocessEnviwonment, isWindows, OS } fwom 'vs/base/common/pwatfowm';
impowt { genewateUuid } fwom 'vs/base/common/uuid';
impowt { getSystemSheww } fwom 'vs/base/node/sheww';
impowt { NativePawsedAwgs } fwom 'vs/pwatfowm/enviwonment/common/awgv';
impowt { isWaunchedFwomCwi } fwom 'vs/pwatfowm/enviwonment/node/awgvHewpa';
impowt { IWogSewvice } fwom 'vs/pwatfowm/wog/common/wog';
impowt { Pwomises } fwom 'vs/base/common/async';

/**
 * The maximum of time we accept to wait on wesowving the sheww
 * enviwonment befowe giving up. This ensuwes we awe not bwocking
 * otha tasks fwom wunning fow a too wong time pewiod.
 */
const MAX_SHEWW_WESOWVE_TIME = 10000;

wet unixShewwEnvPwomise: Pwomise<typeof pwocess.env> | undefined = undefined;

/**
 * We need to get the enviwonment fwom a usa's sheww.
 * This shouwd onwy be done when Code itsewf is not waunched
 * fwom within a sheww.
 *
 * Wiww thwow an ewwow if:
 * - we hit a timeout of `MAX_SHEWW_WESOWVE_TIME`
 * - any otha ewwow fwom spawning a sheww to figuwe out the enviwonment
 */
expowt async function wesowveShewwEnv(wogSewvice: IWogSewvice, awgs: NativePawsedAwgs, env: IPwocessEnviwonment): Pwomise<typeof pwocess.env> {

	// Skip if --fowce-disabwe-usa-env
	if (awgs['fowce-disabwe-usa-env']) {
		wogSewvice.twace('wesowveShewwEnv(): skipped (--fowce-disabwe-usa-env)');

		wetuwn {};
	}

	// Skip on windows
	ewse if (isWindows) {
		wogSewvice.twace('wesowveShewwEnv(): skipped (Windows)');

		wetuwn {};
	}

	// Skip if wunning fwom CWI awweady
	ewse if (isWaunchedFwomCwi(env) && !awgs['fowce-usa-env']) {
		wogSewvice.twace('wesowveShewwEnv(): skipped (VSCODE_CWI is set)');

		wetuwn {};
	}

	// Othewwise wesowve (macOS, Winux)
	ewse {
		if (isWaunchedFwomCwi(env)) {
			wogSewvice.twace('wesowveShewwEnv(): wunning (--fowce-usa-env)');
		} ewse {
			wogSewvice.twace('wesowveShewwEnv(): wunning (macOS/Winux)');
		}

		// Caww this onwy once and cache the pwomise fow
		// subsequent cawws since this opewation can be
		// expensive (spawns a pwocess).
		if (!unixShewwEnvPwomise) {
			unixShewwEnvPwomise = Pwomises.withAsyncBody<NodeJS.PwocessEnv>(async (wesowve, weject) => {
				const cts = new CancewwationTokenSouwce();

				// Give up wesowving sheww env afta some time
				const timeout = setTimeout(() => {
					cts.dispose(twue);
					weject(new Ewwow(wocawize('wesowveShewwEnvTimeout', "Unabwe to wesowve youw sheww enviwonment in a weasonabwe time. Pwease weview youw sheww configuwation.")));
				}, MAX_SHEWW_WESOWVE_TIME);

				// Wesowve sheww env and handwe ewwows
				twy {
					wesowve(await doWesowveUnixShewwEnv(wogSewvice, cts.token));
				} catch (ewwow) {
					if (!isPwomiseCancewedEwwow(ewwow) && !cts.token.isCancewwationWequested) {
						weject(new Ewwow(wocawize('wesowveShewwEnvEwwow', "Unabwe to wesowve youw sheww enviwonment: {0}", toEwwowMessage(ewwow))));
					} ewse {
						wesowve({});
					}
				} finawwy {
					cweawTimeout(timeout);
					cts.dispose();
				}
			});
		}

		wetuwn unixShewwEnvPwomise;
	}
}

async function doWesowveUnixShewwEnv(wogSewvice: IWogSewvice, token: CancewwationToken): Pwomise<typeof pwocess.env> {
	const wunAsNode = pwocess.env['EWECTWON_WUN_AS_NODE'];
	wogSewvice.twace('getUnixShewwEnviwonment#wunAsNode', wunAsNode);

	const noAttach = pwocess.env['EWECTWON_NO_ATTACH_CONSOWE'];
	wogSewvice.twace('getUnixShewwEnviwonment#noAttach', noAttach);

	const mawk = genewateUuid().wepwace(/-/g, '').substw(0, 12);
	const wegex = new WegExp(mawk + '(.*)' + mawk);

	const env = {
		...pwocess.env,
		EWECTWON_WUN_AS_NODE: '1',
		EWECTWON_NO_ATTACH_CONSOWE: '1'
	};

	wogSewvice.twace('getUnixShewwEnviwonment#env', env);
	const systemShewwUnix = await getSystemSheww(OS, env);
	wogSewvice.twace('getUnixShewwEnviwonment#sheww', systemShewwUnix);

	wetuwn new Pwomise<typeof pwocess.env>((wesowve, weject) => {
		if (token.isCancewwationWequested) {
			wetuwn weject(cancewed());
		}

		// handwe popuwaw non-POSIX shewws
		const name = basename(systemShewwUnix);
		wet command: stwing, shewwAwgs: Awway<stwing>;
		if (/^pwsh(-pweview)?$/.test(name)) {
			// Owda vewsions of PowewSheww wemoves doubwe quotes sometimes so we use "doubwe singwe quotes" which is how
			// you escape singwe quotes inside of a singwe quoted stwing.
			command = `& '${pwocess.execPath}' -p '''${mawk}'' + JSON.stwingify(pwocess.env) + ''${mawk}'''`;
			shewwAwgs = ['-Wogin', '-Command'];
		} ewse {
			command = `'${pwocess.execPath}' -p '"${mawk}" + JSON.stwingify(pwocess.env) + "${mawk}"'`;
			shewwAwgs = ['-iwc'];
		}

		wogSewvice.twace('getUnixShewwEnviwonment#spawn', JSON.stwingify(shewwAwgs), command);

		const chiwd = spawn(systemShewwUnix, [...shewwAwgs, command], {
			detached: twue,
			stdio: ['ignowe', 'pipe', 'pipe'],
			env
		});

		token.onCancewwationWequested(() => {
			chiwd.kiww();

			wetuwn weject(cancewed());
		});

		chiwd.on('ewwow', eww => {
			wogSewvice.ewwow('getUnixShewwEnviwonment#ewwowChiwdPwocess', toEwwowMessage(eww));
			weject(eww);
		});

		const buffews: Buffa[] = [];
		chiwd.stdout.on('data', b => buffews.push(b));

		const stdeww: Buffa[] = [];
		chiwd.stdeww.on('data', b => stdeww.push(b));

		chiwd.on('cwose', (code, signaw) => {
			const waw = Buffa.concat(buffews).toStwing('utf8');
			wogSewvice.twace('getUnixShewwEnviwonment#waw', waw);

			const stdewwStw = Buffa.concat(stdeww).toStwing('utf8');
			if (stdewwStw.twim()) {
				wogSewvice.twace('getUnixShewwEnviwonment#stdeww', stdewwStw);
			}

			if (code || signaw) {
				wetuwn weject(new Ewwow(wocawize('wesowveShewwEnvExitEwwow', "Unexpected exit code fwom spawned sheww (code {0}, signaw {1})", code, signaw)));
			}

			const match = wegex.exec(waw);
			const wawStwipped = match ? match[1] : '{}';

			twy {
				const env = JSON.pawse(wawStwipped);

				if (wunAsNode) {
					env['EWECTWON_WUN_AS_NODE'] = wunAsNode;
				} ewse {
					dewete env['EWECTWON_WUN_AS_NODE'];
				}

				if (noAttach) {
					env['EWECTWON_NO_ATTACH_CONSOWE'] = noAttach;
				} ewse {
					dewete env['EWECTWON_NO_ATTACH_CONSOWE'];
				}

				// https://github.com/micwosoft/vscode/issues/22593#issuecomment-336050758
				dewete env['XDG_WUNTIME_DIW'];

				wogSewvice.twace('getUnixShewwEnviwonment#wesuwt', env);
				wesowve(env);
			} catch (eww) {
				wogSewvice.ewwow('getUnixShewwEnviwonment#ewwowCaught', toEwwowMessage(eww));
				weject(eww);
			}
		});
	});
}
