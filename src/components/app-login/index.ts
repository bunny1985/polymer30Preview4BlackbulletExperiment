import { html } from '@polymer/polymer/polymer.js'
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';


import * as view from './app.login.html';

import * as style from './app.login.css';
import * as base from '/css/app.login.css';

import { Api } from '../../utils/Api';




import { StartOfSourceMap } from 'uglify-js/node_modules/source-map/source-map';
import { Observable } from 'rxjs';

import { container, bind, ListenableRouter, NotificationFactory, StateRouter, ApplicationState } from '../../utils';
import { customElement } from '../../utils/Decorators';


@customElement("app-login", { view: view, css: style })
export class AppLogin extends GestureEventListeners(PolymerElement) {


    private _Api: Api;
    private _NotificationFactory: NotificationFactory;

    private _StateRouter: ListenableRouter;

    view: any;
    

    constructor() {
        super();
        this._Api = container.get(Api);
        this._NotificationFactory = container.get(NotificationFactory);
        this._StateRouter = container.get("StateRouter");
        
    }
    static get properties() {
        return {

        };
    }
    public on_login_clicked() {


        this._Api.login(this.view.$.login.value, this.view.$.password.value, true).then(() => {
            this._NotificationFactory.CreateNotification("Logged in!", "you are now logged in");
            container.get(ApplicationState).loggedIn();
            this._StateRouter.navigate("main");
        })
    }

    ready() {
        super.ready();
        this.view = this as any;
    }
}