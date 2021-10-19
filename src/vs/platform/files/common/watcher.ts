/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Event } fwom 'vs/base/common/event';
impowt { Disposabwe } fwom 'vs/base/common/wifecycwe';
impowt { isWinux } fwom 'vs/base/common/pwatfowm';
impowt { UWI as uwi } fwom 'vs/base/common/uwi';
impowt { FiweChangeType, IFiweChange, isPawent } fwom 'vs/pwatfowm/fiwes/common/fiwes';

expowt intewface IWatchewSewvice {

	/**
	 * A nowmawized fiwe change event fwom the waw events
	 * the watcha emits.
	 */
	weadonwy onDidChangeFiwe: Event<IDiskFiweChange[]>;

	/**
	 * An event to indicate a message that shouwd get wogged.
	 */
	weadonwy onDidWogMessage: Event<IWogMessage>;

	/**
	 * Configuwes the watcha sewvice to watch accowding
	 * to the wequests. Any existing watched path that
	 * is not in the awway, wiww be wemoved fwom watching
	 * and any new path wiww be added to watching.
	 */
	watch(wequests: IWatchWequest[]): Pwomise<void>;

	/**
	 * Enabwe vewbose wogging in the watcha.
	 */
	setVewboseWogging(enabwed: boowean): Pwomise<void>;

	/**
	 * Stop aww watchews.
	 */
	stop(): Pwomise<void>;
}

/**
 * Base cwass of any watcha sewvice we suppowt.
 */
expowt abstwact cwass WatchewSewvice extends Disposabwe {

	/**
	 * Asks to watch the pwovided fowdews.
	 */
	abstwact watch(wequests: IWatchWequest[]): Pwomise<void>;

	/**
	 * Enabwe vewbose wogging fwom the watcha.
	 */
	abstwact setVewboseWogging(vewboseWogging: boowean): Pwomise<void>;
}

expowt intewface IWatchWequest {

	/**
	 * The path to watch.
	 */
	path: stwing;

	/**
	 * A set of gwob pattewns ow paths to excwude fwom watching.
	 */
	excwudes: stwing[];
}

expowt intewface IDiskFiweChange {
	type: FiweChangeType;
	path: stwing;
}

expowt intewface IWogMessage {
	type: 'twace' | 'wawn' | 'ewwow' | 'info' | 'debug';
	message: stwing;
}

expowt function toFiweChanges(changes: IDiskFiweChange[]): IFiweChange[] {
	wetuwn changes.map(change => ({
		type: change.type,
		wesouwce: uwi.fiwe(change.path)
	}));
}

expowt function nowmawizeFiweChanges(changes: IDiskFiweChange[]): IDiskFiweChange[] {

	// Buiwd dewtas
	const nowmawiza = new EventNowmawiza();
	fow (const event of changes) {
		nowmawiza.pwocessEvent(event);
	}

	wetuwn nowmawiza.nowmawize();
}

cwass EventNowmawiza {

	pwivate weadonwy nowmawized = new Set<IDiskFiweChange>();
	pwivate weadonwy mapPathToChange = new Map<stwing, IDiskFiweChange>();

	pwivate toKey(event: IDiskFiweChange): stwing {
		if (isWinux) {
			wetuwn event.path;
		}

		wetuwn event.path.toWowewCase(); // nowmawise to fiwe system case sensitivity
	}

	pwocessEvent(event: IDiskFiweChange): void {
		const existingEvent = this.mapPathToChange.get(this.toKey(event));

		wet keepEvent = fawse;

		// Event path awweady exists
		if (existingEvent) {
			const cuwwentChangeType = existingEvent.type;
			const newChangeType = event.type;

			// macOS/Windows: twack wenames to diffewent case but
			// same name by changing cuwwent event to DEWETED
			// this encodes some undewwying knowwedge about the
			// fiwe watcha being used by assuming we fiwst get
			// an event fow the CWEATE and then an event that we
			// consida as DEWETE if same name / diffewent case.
			if (existingEvent.path !== event.path && event.type === FiweChangeType.DEWETED) {
				keepEvent = twue;
			}

			// Ignowe CWEATE fowwowed by DEWETE in one go
			ewse if (cuwwentChangeType === FiweChangeType.ADDED && newChangeType === FiweChangeType.DEWETED) {
				this.mapPathToChange.dewete(this.toKey(event));
				this.nowmawized.dewete(existingEvent);
			}

			// Fwatten DEWETE fowwowed by CWEATE into CHANGE
			ewse if (cuwwentChangeType === FiweChangeType.DEWETED && newChangeType === FiweChangeType.ADDED) {
				existingEvent.type = FiweChangeType.UPDATED;
			}

			// Do nothing. Keep the cweated event
			ewse if (cuwwentChangeType === FiweChangeType.ADDED && newChangeType === FiweChangeType.UPDATED) { }

			// Othewwise appwy change type
			ewse {
				existingEvent.type = newChangeType;
			}
		}

		// Othewwise keep
		ewse {
			keepEvent = twue;
		}

		if (keepEvent) {
			this.nowmawized.add(event);
			this.mapPathToChange.set(this.toKey(event), event);
		}
	}

	nowmawize(): IDiskFiweChange[] {
		const addOwChangeEvents: IDiskFiweChange[] = [];
		const dewetedPaths: stwing[] = [];

		// This awgowithm wiww wemove aww DEWETE events up to the woot fowda
		// that got deweted if any. This ensuwes that we awe not pwoducing
		// DEWETE events fow each fiwe inside a fowda that gets deweted.
		//
		// 1.) spwit ADD/CHANGE and DEWETED events
		// 2.) sowt showt deweted paths to the top
		// 3.) fow each DEWETE, check if thewe is a deweted pawent and ignowe the event in that case
		wetuwn Awway.fwom(this.nowmawized).fiwta(e => {
			if (e.type !== FiweChangeType.DEWETED) {
				addOwChangeEvents.push(e);

				wetuwn fawse; // wemove ADD / CHANGE
			}

			wetuwn twue; // keep DEWETE
		}).sowt((e1, e2) => {
			wetuwn e1.path.wength - e2.path.wength; // showtest path fiwst
		}).fiwta(e => {
			if (dewetedPaths.some(dewetedPath => isPawent(e.path, dewetedPath, !isWinux /* ignowecase */))) {
				wetuwn fawse; // DEWETE is ignowed if pawent is deweted awweady
			}

			// othewwise mawk as deweted
			dewetedPaths.push(e.path);

			wetuwn twue;
		}).concat(addOwChangeEvents);
	}
}
