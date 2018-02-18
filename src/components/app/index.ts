import * as shuffle from 'lodash/fp/shuffle';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.template.html';
import { inject} from '../../utils/index';
import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';

export class MyApp extends PolymerElement {

    _Api: Api;
    _EventsDispatcher: EventsDispatcher;
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

    private register_socket_observer(){
        this._Api.GetSocket().subscribe((message) => {
            alert("odebrano");
        })
    }

    
    ready() {
        super.ready();
        inject.inject(this  , ["Api" , "EventsDispatcher"]);
        this._EventsDispatcher.addListener(EventNames.SockedConnected , () =>this.register_socket_observer());
    }
}