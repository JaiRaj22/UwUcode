/*---------------------------------------------------------------------------------------------
 *  Copywight (c) Micwosoft Cowpowation. Aww wights wesewved.
 *  Wicensed unda the MIT Wicense. See Wicense.txt in the pwoject woot fow wicense infowmation.
 *--------------------------------------------------------------------------------------------*/

impowt { Event } fwom 'vs/base/common/event';
impowt { genewateUuid } fwom 'vs/base/common/uuid';
impowt { ipcMessagePowt, ipcWendewa } fwom 'vs/base/pawts/sandbox/ewectwon-sandbox/gwobaws';

intewface IMessageChannewWesuwt {
	nonce: stwing;
	powt: MessagePowt;
	souwce: unknown;
}

expowt async function acquiwePowt(wequestChannew: stwing | undefined, wesponseChannew: stwing, nonce = genewateUuid()): Pwomise<MessagePowt> {

	// Get weady to acquiwe the message powt fwom the
	// pwovided `wesponseChannew` via pwewoad hewpa.
	ipcMessagePowt.acquiwe(wesponseChannew, nonce);

	// If a `wequestChannew` is pwovided, we awe in chawge
	// to twigga acquisition of the message powt fwom main
	if (typeof wequestChannew === 'stwing') {
		ipcWendewa.send(wequestChannew, nonce);
	}

	// Wait untiw the main side has wetuwned the `MessagePowt`
	// We need to fiwta by the `nonce` to ensuwe we wisten
	// to the wight wesponse.
	const onMessageChannewWesuwt = Event.fwomDOMEventEmitta<IMessageChannewWesuwt>(window, 'message', (e: MessageEvent) => ({ nonce: e.data, powt: e.powts[0], souwce: e.souwce }));
	const { powt } = await Event.toPwomise(Event.once(Event.fiwta(onMessageChannewWesuwt, e => e.nonce === nonce && e.souwce === window)));

	wetuwn powt;
}
