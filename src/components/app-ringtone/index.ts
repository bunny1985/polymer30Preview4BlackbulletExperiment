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
import * as view from './app.play.ringtone.html';
import { container } from '../../utils/index';








@customElement("app-play-ringtone" , {view: view})
export class AppPlayRingtone extends GestureEventListeners(PolymerElement) {

    
    view: any;
    private _Api: Api
    // Define a string template instead of a `<template>` element.
    //_template  = html('<h1>DUPA</h1');
     static get template() {
         return  view;
     }
    constructor() {
        super();
        //inject.inject(this , ["Api", "NotificationFactory", "ApplicationState" , "StateRouter"]) 
        
    }

    public on_clicked(){
        console.log("COMPONENT:" , this)
        this._Api = container.get(Api);
        this.view = (this as any).$;
        let json = '{"type": "ringtone"}';
        this._Api.GetSocket().next(json);
    }


}