import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import "@polymer/polymer/lib/elements/dom-repeat.js"
import { Api, container } from '../../utils';
import { customElement, property } from '../../utils/Decorators';
import * as view from './app.socket.log.html';
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";




@customElement("app-socket-log", { view: view })
export class AppSocketLog extends PolymerElement {
    _Api: Api;
    
    @property({type: Array})
    messages : Array<any>;

    constructor() {
        super();
        
    }
    
    
    public ready() {
        super.ready();
        console.log("READY");
        this.messages = [];
        this._Api = container.get(Api);
        
        let socket = this._Api.GetSocket().subscribe((message) => {
            (this as any).push("messages" , message)
            
        })
    }

}