import * as shuffle from 'lodash/fp/shuffle';
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.template.html';

import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { NotificationFactory } from '../../utils/Notifications';



import {container , bind}  from "../../utils"
import { customElement  } from '../../utils/Decorators';
import * as baseStyle from '../../css/base.css'

@customElement("my-app" , {
    view: view, 
    css: baseStyle
})
export class MyApp extends Element {


    private _Api: Api;
    private  _EventsDispatcher: EventsDispatcher;
    private _StateRouter: ListenableRouter;
    private _NotificationFactory: NotificationFactory;

    // Define a string template instead of a `<template>` element.
    
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
        
        this._Api = container.get<Api>(Api);
        this._EventsDispatcher = container.get<EventsDispatcher>(EventsDispatcher);
        this._StateRouter = container.get("StateRouter");
        this._NotificationFactory = container.get(NotificationFactory);
        
        this._EventsDispatcher.addListener(EventNames.SockedConnected , () =>this.register_socket_observer());
        this._StateRouter.addListener((a , b) => this.changeView(a , b));
        this._StateRouter.start("home");
    }
}