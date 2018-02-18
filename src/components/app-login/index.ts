import { html } from '@polymer/polymer/polymer.js'
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';


import * as view from './app.login.html';


import {inject} from '../../utils/index'
import { Api} from '../../utils/Api';




import { StartOfSourceMap } from 'uglify-js/node_modules/source-map/source-map';
import { Observable } from 'rxjs';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';

export class AppLogin extends GestureEventListeners(PolymerElement) {

    _Api: Api
    _NotificationFactory: NotificationFactory
    _ApplicationState: ApplicationState;
    view: any;
    
    // Define a string template instead of a `<template>` element.
    //_template  = html('<h1>DUPA</h1');
     static get template() {
         return  view;
     }
    constructor() {
        super();
        inject.inject(this , ["Api", "NotificationFactory", "ApplicationState"]) 
    

    }
    static get properties() {
        return {

        };
    }
    public on_login_clicked(){
    
        
        this._Api.login(this.view.$.login.value , this.view.$.password.value  , true).then( () => {
            this._NotificationFactory.CreateNotification("Logged in!" , "you are now logged in");
        })
    }

    ready() {
        super.ready();
        this.view = this as any;
        this._ApplicationState.GetStateSubject().subscribe((state) => {
            if(state.newState.loggedIn ==true){
                alert("Wiem że sie zalogowało");
            }
        })
     
     
    }
}