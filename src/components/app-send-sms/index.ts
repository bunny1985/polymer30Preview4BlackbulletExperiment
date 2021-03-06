import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/polymer/lib/elements/dom-if';

import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

import { Api } from '../../utils/Api';
import { customElement } from '../../utils/Decorators';
import { NotificationFactory } from '../../utils/Notifications';
import { ApplicationState } from '../../utils/State';
import { ListenableRouter } from '../../utils/StateRouter';
import * as view from './app.send.sms.html';
import { container } from '../../utils/index';








@customElement("app-send-sms" , {view: view})
export class AppSendSms extends GestureEventListeners(PolymerElement) {

    
    view: any;
    
    private _Api: Api
    constructor() {
        super();
        this._Api = container.get(Api);
        //inject.inject(this , ["Api", "NotificationFactory", "ApplicationState" , "StateRouter"]) 
        
    }

    public on_clicked(){
        console.log("COMPONENT:" , this)
        this.view = (this as any).$;
        let text = this.view.text.value;
        let to = this.view.to.value;
        let json = "{'type': 'sms' , 'text': '" + text+ "', 'to': '" + to+ "' }";
        
        this._Api.GetSocket().next(json);
    }


}