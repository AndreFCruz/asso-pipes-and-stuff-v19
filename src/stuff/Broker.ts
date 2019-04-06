import { Queue } from '../queue/api';
import { Observer } from './Subscriber';
import { Publisher } from './Publisher';
import { Ventilator } from './Ventilator';

export class Broker<T> {

    private ventilators: { [key: number] : Ventilator<T>; }     // Ventilator<T>[]
    // private publishers: { [key: number] : Publisher<T>; }       // Publisher<T>[]
    public queues: { [key: number] : Queue.UnboundedQueue<T>; }  // publisher queues


    constructor() {
        // this.publishers = {}
        this.ventilators = {}
        this.queues = {}
    }

    addPublisher(pub: Publisher<T>){
        //this.publishers[pub.id] = pub
        this.ventilators[pub.id] = new Ventilator()
        this.queues[pub.id] = new Queue.UnboundedQueue<T>()
    }

    addSubscription(ob: Observer<T>, pub: Publisher<T>){
        if (!(pub.id in this.ventilators))
            this.addPublisher(pub)
        
        this.ventilators[pub.id].addObserver(ob)
    }

    async run(time: number): Promise<void> {
        for (let key in this.ventilators) {
            let value = this.ventilators[key];
            value.run(time, this.queues[key])
        }
    }
}