import { html } from '@polymer/polymer/polymer.js'
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';


import * as view from './app.send.sms.html';


import {inject} from '../../utils/index'
import { Api} from '../../utils/Api';




import { StartOfSourceMap } from 'uglify-js/node_modules/source-map/source-map';
import { Observable } from 'rxjs';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';
import { ListenableRouter } from '../../utils/StateRouter';

export class AppSendSms extends GestureEventListeners(PolymerElement) {

    _Api: Api
    _NotificationFactory: NotificationFactory
    _ApplicationState: ApplicationState;
    _StateRouter: ListenableRouter;
    view: any;
    
    // Define a string template instead of a `<template>` element.
    //_template  = html('<h1>DUPA</h1');
     static get template() {
         return  view;
     }
    constructor() {
        super();
        inject.inject(this , ["Api", "NotificationFactory", "ApplicationState" , "StateRouter"]) 
        
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