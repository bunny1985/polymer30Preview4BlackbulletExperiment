
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.nav.html';
import { inject} from '../../utils/index';
import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';

export class AppNav extends Element {

    
    // Define a string template instead of a `<template>` element.
    static get template() {
        return view;
    }
    
}