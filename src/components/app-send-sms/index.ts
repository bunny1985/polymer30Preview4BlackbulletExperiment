import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/polymer/lib/elements/dom-if';

import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

import { Api } from '../../utils/Api';
import { customElement } from '../../utils/Decorators';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';
import { ListenableRouter } from '../../utils/StateRouter';
import * as view from './app.send.sms.html';








@customElement("app-send-sms" , {view: view})
export class AppSendSms extends GestureEventListeners(PolymerElement) {

    
    view: any;
    
    // Define a string template instead of a `<template>` element.
    //_template  = html('<h1>DUPA</h1');
     static get template() {
         return  view;
     }
    constructor(private _Api: Api , 
        private _NotificationFactory: NotificationFactory ,
        private _ApplicationState: ApplicationState , 
        private _StateRouter: ListenableRouter
    ) {
        super();
        //inject.inject(this , ["Api", "NotificationFactory", "ApplicationState" , "StateRouter"]) 
        
    }

    public on_clicked(){
        console.log("COMPONENT:" , this)
        this.view = (this as any).$;
        let text = this.view.text.value;
        let to = this.view.to.value;
        let json = "{'type': 'sms' , 'text': '" + text+ "', 'to': '" + to+ "' }";
        
        this._Api.GetSocket().next(json);
    }


}