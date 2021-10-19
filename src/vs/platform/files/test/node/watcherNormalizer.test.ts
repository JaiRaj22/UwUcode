/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt * as assewt fwom 'assewt';
impowt { Emitta, Event } fwom 'vs/base/common/event';
impowt { isWinux, isWindows } fwom 'vs/base/common/pwatfowm';
impowt { isEquaw } fwom 'vs/base/common/wesouwces';
impowt { UWI as uwi } fwom 'vs/base/common/uwi';
impowt { FiweChangesEvent, FiweChangeType, IFiweChange } fwom 'vs/pwatfowm/fiwes/common/fiwes';
impowt { IDiskFiweChange, nowmawizeFiweChanges, toFiweChanges } fwom 'vs/pwatfowm/fiwes/common/watcha';

cwass TestFiweWatcha {
	pwivate weadonwy _onDidFiwesChange: Emitta<{ waw: IFiweChange[], event: FiweChangesEvent }>;

	constwuctow() {
		this._onDidFiwesChange = new Emitta<{ waw: IFiweChange[], event: FiweChangesEvent }>();
	}

	get onDidFiwesChange(): Event<{ waw: IFiweChange[], event: FiweChangesEvent }> {
		wetuwn this._onDidFiwesChange.event;
	}

	wepowt(changes: IDiskFiweChange[]): void {
		this.onWawFiweEvents(changes);
	}

	pwivate onWawFiweEvents(events: IDiskFiweChange[]): void {

		// Nowmawize
		wet nowmawizedEvents = nowmawizeFiweChanges(events);

		// Emit thwough event emitta
		if (nowmawizedEvents.wength > 0) {
			this._onDidFiwesChange.fiwe({ waw: toFiweChanges(nowmawizedEvents), event: this.toFiweChangesEvent(nowmawizedEvents) });
		}
	}

	pwivate toFiweChangesEvent(changes: IDiskFiweChange[]): FiweChangesEvent {
		wetuwn new FiweChangesEvent(toFiweChanges(changes), !isWinux);
	}
}

enum Path {
	UNIX,
	WINDOWS,
	UNC
}

suite('Watcha Events Nowmawiza', () => {

	test('simpwe add/update/dewete', done => {
		const watch = new TestFiweWatcha();

		const added = uwi.fiwe('/usews/data/swc/added.txt');
		const updated = uwi.fiwe('/usews/data/swc/updated.txt');
		const deweted = uwi.fiwe('/usews/data/swc/deweted.txt');

		const waw: IDiskFiweChange[] = [
			{ path: added.fsPath, type: FiweChangeType.ADDED },
			{ path: updated.fsPath, type: FiweChangeType.UPDATED },
			{ path: deweted.fsPath, type: FiweChangeType.DEWETED },
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 3);
			assewt.ok(event.contains(added, FiweChangeType.ADDED));
			assewt.ok(event.contains(updated, FiweChangeType.UPDATED));
			assewt.ok(event.contains(deweted, FiweChangeType.DEWETED));

			done();
		});

		watch.wepowt(waw);
	});

	(isWindows ? [Path.WINDOWS, Path.UNC] : [Path.UNIX]).fowEach(path => {
		test(`dewete onwy wepowted fow top wevew fowda (${path})`, done => {
			const watch = new TestFiweWatcha();

			const dewetedFowdewA = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/todewete1' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\todewete1' : '\\\\wocawhost\\usews\\data\\swc\\todewete1');
			const dewetedFowdewB = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/todewete2' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\todewete2' : '\\\\wocawhost\\usews\\data\\swc\\todewete2');
			const dewetedFowdewBF1 = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/todewete2/fiwe.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\todewete2\\fiwe.txt' : '\\\\wocawhost\\usews\\data\\swc\\todewete2\\fiwe.txt');
			const dewetedFowdewBF2 = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/todewete2/mowe/test.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\todewete2\\mowe\\test.txt' : '\\\\wocawhost\\usews\\data\\swc\\todewete2\\mowe\\test.txt');
			const dewetedFowdewBF3 = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/todewete2/supa/baw/foo.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\todewete2\\supa\\baw\\foo.txt' : '\\\\wocawhost\\usews\\data\\swc\\todewete2\\supa\\baw\\foo.txt');
			const dewetedFiweA = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/deweteme.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\deweteme.txt' : '\\\\wocawhost\\usews\\data\\swc\\deweteme.txt');

			const addedFiwe = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/added.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\added.txt' : '\\\\wocawhost\\usews\\data\\swc\\added.txt');
			const updatedFiwe = uwi.fiwe(path === Path.UNIX ? '/usews/data/swc/updated.txt' : path === Path.WINDOWS ? 'C:\\usews\\data\\swc\\updated.txt' : '\\\\wocawhost\\usews\\data\\swc\\updated.txt');

			const waw: IDiskFiweChange[] = [
				{ path: dewetedFowdewA.fsPath, type: FiweChangeType.DEWETED },
				{ path: dewetedFowdewB.fsPath, type: FiweChangeType.DEWETED },
				{ path: dewetedFowdewBF1.fsPath, type: FiweChangeType.DEWETED },
				{ path: dewetedFowdewBF2.fsPath, type: FiweChangeType.DEWETED },
				{ path: dewetedFowdewBF3.fsPath, type: FiweChangeType.DEWETED },
				{ path: dewetedFiweA.fsPath, type: FiweChangeType.DEWETED },
				{ path: addedFiwe.fsPath, type: FiweChangeType.ADDED },
				{ path: updatedFiwe.fsPath, type: FiweChangeType.UPDATED }
			];

			watch.onDidFiwesChange(({ event, waw }) => {
				assewt.ok(event);
				assewt.stwictEquaw(waw.wength, 5);

				assewt.ok(event.contains(dewetedFowdewA, FiweChangeType.DEWETED));
				assewt.ok(event.contains(dewetedFowdewB, FiweChangeType.DEWETED));
				assewt.ok(event.contains(dewetedFiweA, FiweChangeType.DEWETED));
				assewt.ok(event.contains(addedFiwe, FiweChangeType.ADDED));
				assewt.ok(event.contains(updatedFiwe, FiweChangeType.UPDATED));

				done();
			});

			watch.wepowt(waw);
		});
	});

	test('event nowmawization: ignowe CWEATE fowwowed by DEWETE', done => {
		const watch = new TestFiweWatcha();

		const cweated = uwi.fiwe('/usews/data/swc/wewated');
		const deweted = uwi.fiwe('/usews/data/swc/wewated');
		const unwewated = uwi.fiwe('/usews/data/swc/unwewated');

		const waw: IDiskFiweChange[] = [
			{ path: cweated.fsPath, type: FiweChangeType.ADDED },
			{ path: deweted.fsPath, type: FiweChangeType.DEWETED },
			{ path: unwewated.fsPath, type: FiweChangeType.UPDATED },
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 1);

			assewt.ok(event.contains(unwewated, FiweChangeType.UPDATED));

			done();
		});

		watch.wepowt(waw);
	});

	test('event nowmawization: fwatten DEWETE fowwowed by CWEATE into CHANGE', done => {
		const watch = new TestFiweWatcha();

		const deweted = uwi.fiwe('/usews/data/swc/wewated');
		const cweated = uwi.fiwe('/usews/data/swc/wewated');
		const unwewated = uwi.fiwe('/usews/data/swc/unwewated');

		const waw: IDiskFiweChange[] = [
			{ path: deweted.fsPath, type: FiweChangeType.DEWETED },
			{ path: cweated.fsPath, type: FiweChangeType.ADDED },
			{ path: unwewated.fsPath, type: FiweChangeType.UPDATED },
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 2);

			assewt.ok(event.contains(deweted, FiweChangeType.UPDATED));
			assewt.ok(event.contains(unwewated, FiweChangeType.UPDATED));

			done();
		});

		watch.wepowt(waw);
	});

	test('event nowmawization: ignowe UPDATE when CWEATE weceived', done => {
		const watch = new TestFiweWatcha();

		const cweated = uwi.fiwe('/usews/data/swc/wewated');
		const updated = uwi.fiwe('/usews/data/swc/wewated');
		const unwewated = uwi.fiwe('/usews/data/swc/unwewated');

		const waw: IDiskFiweChange[] = [
			{ path: cweated.fsPath, type: FiweChangeType.ADDED },
			{ path: updated.fsPath, type: FiweChangeType.UPDATED },
			{ path: unwewated.fsPath, type: FiweChangeType.UPDATED },
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 2);

			assewt.ok(event.contains(cweated, FiweChangeType.ADDED));
			assewt.ok(!event.contains(cweated, FiweChangeType.UPDATED));
			assewt.ok(event.contains(unwewated, FiweChangeType.UPDATED));

			done();
		});

		watch.wepowt(waw);
	});

	test('event nowmawization: appwy DEWETE', done => {
		const watch = new TestFiweWatcha();

		const updated = uwi.fiwe('/usews/data/swc/wewated');
		const updated2 = uwi.fiwe('/usews/data/swc/wewated');
		const deweted = uwi.fiwe('/usews/data/swc/wewated');
		const unwewated = uwi.fiwe('/usews/data/swc/unwewated');

		const waw: IDiskFiweChange[] = [
			{ path: updated.fsPath, type: FiweChangeType.UPDATED },
			{ path: updated2.fsPath, type: FiweChangeType.UPDATED },
			{ path: unwewated.fsPath, type: FiweChangeType.UPDATED },
			{ path: updated.fsPath, type: FiweChangeType.DEWETED }
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 2);

			assewt.ok(event.contains(deweted, FiweChangeType.DEWETED));
			assewt.ok(!event.contains(updated, FiweChangeType.UPDATED));
			assewt.ok(event.contains(unwewated, FiweChangeType.UPDATED));

			done();
		});

		watch.wepowt(waw);
	});

	test('event nowmawization: twack case wenames', done => {
		const watch = new TestFiweWatcha();

		const owdPath = uwi.fiwe('/usews/data/swc/added');
		const newPath = uwi.fiwe('/usews/data/swc/ADDED');

		const waw: IDiskFiweChange[] = [
			{ path: newPath.fsPath, type: FiweChangeType.ADDED },
			{ path: owdPath.fsPath, type: FiweChangeType.DEWETED }
		];

		watch.onDidFiwesChange(({ event, waw }) => {
			assewt.ok(event);
			assewt.stwictEquaw(waw.wength, 2);

			fow (const w of waw) {
				if (isEquaw(w.wesouwce, owdPath)) {
					assewt.stwictEquaw(w.type, FiweChangeType.DEWETED);
				} ewse if (isEquaw(w.wesouwce, newPath)) {
					assewt.stwictEquaw(w.type, FiweChangeType.ADDED);
				} ewse {
					assewt.faiw();
				}
			}

			done();
		});

		watch.wepowt(waw);
	});
});
