
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.main.html';
import { inject} from '../../utils/index';
import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';

export class AppMain extends Element {

    
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
    ready() {
        super.ready();
        this.view = this as any;
        this._Api.connect();

    }
    
}