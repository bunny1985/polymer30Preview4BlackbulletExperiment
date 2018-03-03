
import {NotificationFactory} from  "./Notifications";
import {EventsDispatcher} from "./EventsDispatcher"
import { Api} from './Api';
import { ApplicationState } from './State';
import { StateRouter, ListenableRouter } from './StateRouter';
import { Container } from "inversify";
import {Element as PolymerElement, html} from "@polymer/polymer/polymer-element.js"
export * from './Api';
export * from './State';
export * from './StateRouter';
export * from './Notifications';
export * from './EventsDispatcher';

var kernel = new Container({ autoBindInjectable: true });
kernel.bind<Api>(Api).toSelf().inSingletonScope();
kernel.bind<NotificationFactory>(NotificationFactory).toSelf().inSingletonScope();
kernel.bind<EventsDispatcher>(EventsDispatcher).toSelf().inSingletonScope();
kernel.bind<ApplicationState>(ApplicationState).toSelf().inSingletonScope();
kernel.bind<ListenableRouter>("StateRouter").toConstantValue(StateRouter);



export const bind = (objectsToBind: Array<{key, obj}>) => {
    objectsToBind.forEach(element => {
        element.obj = kernel.get(element.key)
    });
}


export const container = kernel;

(window as any).s = kernel.get(ApplicationState);