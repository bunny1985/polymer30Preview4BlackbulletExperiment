import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import { ObservableInput } from "rxjs/Observable";
import {NotificationFactory} from  "./Notifications";
import {EventsDispatcher} from "./EventsDispatcher"
import { Api} from './Api';
import { ApplicationState } from './State';
import { StateRouter } from './StateRouter';



export class Injector {
    dependencies = {};
    register(key, value): void {
        this.dependencies[key] = value;
    }
    resolve(key): any {
        if (this.dependencies[key]) {
            return this.dependencies[key];
        } else {
            throw new Error('Can\'t resolve ' + key);
        }
    }
    inject(target, dependencies) {
        for (let key of dependencies) {
            target["_" + key] = this.resolve(key);
        }
    }
}


var injector;
injector = new Injector();

export let inject: Injector = injector;
injector.register("Api", new Api());
injector.register("NotificationFactory" , new NotificationFactory)
injector.register("EventsDispatcher" , new EventsDispatcher());
injector.register("ApplicationState" , new ApplicationState());
injector.register("StateRouter" , StateRouter);







