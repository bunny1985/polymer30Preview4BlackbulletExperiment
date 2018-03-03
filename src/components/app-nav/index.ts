
import * as css from './app-nav.css';

import { Api } from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { customElement, property } from '../../utils/Decorators';
import { ApplicationState, container } from '../../utils/index';
import { StatusChanging } from '../../utils/State';
import {LitElement} from '@polymer/lit-element/lit-element'
import {html} from 'lit-html/lib/lit-extended'

@customElement("app-nav")
export class AppNav extends LitElement {


    @property()
    isLogged: Boolean;
    _ApplicationState: ApplicationState
    render({isLogged}){
        return html`
        <style>${css}</style>

        <div class="container" >
  
        <ul>
          <li>
            <a href="#/home">Home</a>
          </li>
          
          <li style='display:${isLogged?'none':''}'>
            <a href="#/login">Login</a>
          </li>
          <li style='display:${isLogged?'':'none'}'>
            <a href="#/main">Main</a>
          </li>
          <li style='display:${isLogged?'':'none'}'>
            <a href="#/logout">Logout</a>
          </li>
          
        </ul>
      </div>`
    }
    

    connectedCallback() {
        super.connectedCallback();
        this._ApplicationState = container.get(ApplicationState);
        this._ApplicationState.GetStateSubject().subscribe((s) => { this.stateChanging(s)});
    }

    stateChanging(change: StatusChanging){
        this.isLogged = change.newState.loggedIn;
        this.render({isLogged: this.isLogged});
    }

}