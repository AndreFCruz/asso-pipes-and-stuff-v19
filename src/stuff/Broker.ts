import { Queue } from '../queue/api';
import { Observable } from './Subscriber';
import { Publisher } from './Publisher';
import { Ventilator } from './Ventilator';

export class Broker<T> {
    // type vDict = { [key: number]:  Ventilator<T> };

    private ventilators: { [key: number] : Ventilator<T>; } // Ventilator<T>[]
    private publishers: { [key: number] : Publisher<T>; } // Publisher<T>[]

    
    constructor() {
        this.publishers = {}
        this.ventilators = {}
    }

    addPublisher(pub: Publisher<T>){
        this.publishers[pub.id] = pub
        this.ventilators[pub.id] = new Ventilator()
    }

    addSubscription(ob: Observable<T>, pub: Publisher<T>){
        if (!(pub.id in this.publishers))
            this.addPublisher(pub)
        
        this.ventilators[pub.id].addObserver(ob)
    }

    /*
    notifyObservers(message: T): void {
        this.observables.map((observer) => observer.sendRequest(message))
    }

    async run(time: Number, queue: Queue.BlockingQueue<T>): Promise<void> {
        while (time > Date.now()) {
            this.notifyObservers(await queue.pop());
        }
    }
    */
}