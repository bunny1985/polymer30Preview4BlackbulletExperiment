import '@polymer/paper-tabs/paper-tabs';
import '@polymer/iron-pages/iron-pages';
import '@polymer/polymer/lib/elements/dom-if';

import { Element } from '@polymer/polymer/polymer-element';

import { container } from '../../utils';
import { Api } from '../../utils/Api';
import { customElement, property, query } from '../../utils/Decorators';
import * as view from './app.main.html';



@customElement("app-main" , {view: view})
export class AppMain extends Element {

    @property({type: Number})
    selected:number = 0;
    @query("#tabs")
    tabs : HTMLElement;
    
    
    
    private _Api: Api
    constructor( ) {
        super();
        this._Api = container.get(Api);
        
    }

    
    ready() {
        super.ready();
        this._Api.connect();
        (this.tabs as any ).select(0)
    }
    
}