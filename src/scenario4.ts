/*

Multiple publishers, multiple subscribers;
Both have specialized queues:
    Inbound and Outbound;
    Broker manages queue binding;
    Broker moves messages around (between queues);
    Queues may be persistent;
No implicit connections between subscribers and producers:
    Explicit subscription;
    Identification mechanism is needed (keys, topics, ...);
    Study the Registry and (if you are feeling adventurous) the Service Locator patterns.


*/
import {Queue} from "./queue/api";
import { Observer, Publisher, Broker} from './stuff'


export function testScenarioFour() {


    // Creating Broker
    const broker = new Broker()

    // Creating Publishers
    const publisher = new Publisher(1)
    const publisher2 = new Publisher(2)

    // Creating Subscribers
    const subscriberA = new Observer(1)
    const subscriberB = new Observer(2)
    const subscriberC = new Observer(3)
    const subscriberD = new Observer(4)

    // Subscribing to the Broker
    broker.addSubscription(subscriberA, publisher)
    broker.addSubscription(subscriberB, publisher)
    broker.addSubscription(subscriberC, publisher)
    broker.addSubscription(subscriberA, publisher2)
    broker.addSubscription(subscriberB, publisher2)
    broker.addSubscription(subscriberC, publisher2);

    (async () => {
        setTimeout(() => publisher.run(Date.now() + 5000, broker.queues[publisher.id]), 100)

        // Start running the
        broker.run(Date.now() + 5000)

        publisher2.run(Date.now() + 5000, broker.queues[publisher2.id])
    })()

    broker.addSubscription(subscriberD, publisher)
}

testScenarioFour();