import * as shuffle from 'lodash/fp/shuffle';
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.template.html';
import { inject} from '../../utils/index';
import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { NotificationFactory } from '../../utils/Notifications';

export class MyApp extends Element {

    _Api: Api;
    _EventsDispatcher: EventsDispatcher;
    _StateRouter: ListenableRouter;
    _NotificationFactory: NotificationFactory;
    // Define a string template instead of a `<template>` element.
    static get template() {
        return view;
    }
    constructor() {
        super();
    }
    static get properties() {
        return {
            isGameCompleted: {
                type: Boolean,
            },
        };
    }
    

    changeView(toState , fromState){
        console.log("CHANGE VIEW");
        let name = toState.name;
        var dom = (this as any).$.outlet;
        switch(name) {
            case "home":
                console.log(dom);
                dom.innerHTML = '<app-home></app-home>';
                break;
            case "login":
                dom.innerHTML = `<app-login></app-login>`;
                break;
            case "main":
                dom.innerHTML = `<app-main></app-main>`;
                break;
            default:
                console.log("notFound");
        }
    }

    private register_socket_observer(){
        this._Api.GetSocket().subscribe((message) => {
            console.log(message);//notificationType
            if(message.notificationType == "notification"){
                this._NotificationFactory.CreateNotification(message.title , message.body);
            }
        })
    }

    
    ready() {
        
        super.ready();
        inject.inject(this  , ["Api" , "EventsDispatcher" , "StateRouter" , "NotificationFactory"]);
        this._EventsDispatcher.addListener(EventNames.SockedConnected , () =>this.register_socket_observer());
        this._StateRouter.addListener((a , b) => this.changeView(a , b));
        this._StateRouter.start("home");
    }
}