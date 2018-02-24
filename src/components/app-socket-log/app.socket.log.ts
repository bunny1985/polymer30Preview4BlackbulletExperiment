
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

import { customElement, property } from '../../utils/Decorators';
import * as view from './app.socket.log.html';
import { container, Api } from '../../utils/index';
import { window } from 'rxjs/operators/window';




@customElement("app-socket-log", { view: view })
export class AppSocketLog extends PolymerElement {
    _Api: Api;
    
    messages : Array<any>;

    constructor() {
        super();
        
    }
    public ready() {
        this.messages = [];
        setInterval(() => {
            this.messages.push(1);
        } , 1000)
        //let socket = this._Api.GetSocket().subscribe((message) => {
          //  this.messages.push(message)
            
        //})
    }

}