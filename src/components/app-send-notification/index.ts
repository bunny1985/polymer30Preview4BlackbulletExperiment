import { html } from '@polymer/polymer/polymer.js'
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';


import * as view from './app.send.notification.html';



import { Api} from '../../utils/Api';




import { StartOfSourceMap } from 'uglify-js/node_modules/source-map/source-map';
import { Observable } from 'rxjs';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';
import { ListenableRouter } from '../../utils/StateRouter';
import { injectable } from 'inversify';
import { customElement } from '../../utils/Decorators';


@customElement("app-send-notification" , {view: view})
export class AppSendNotification extends GestureEventListeners(PolymerElement) {

    
    view: any;
    
    constructor( private _Api: Api , 
        private _NotificationFactory: NotificationFactory, 
        private _ApplicationState: ApplicationState ,
        private _StateRouter: ListenableRouter) {
        super();
        //inject.inject(this , ["Api", "NotificationFactory", "ApplicationState" , "StateRouter"]) 
        
    }

    public on_clicked(){
        console.log("COMPONENT:" , this)
        this.view = (this as any).$;
        let text = this.view.text.value;
        let json = "{'type': 'notification' , 'text': '" + text+ "' }";
        
        this._Api.GetSocket().next(json);
    }


}