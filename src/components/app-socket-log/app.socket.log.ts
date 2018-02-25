import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import "@polymer/polymer/lib/elements/dom-repeat.js"
import { Api, container, ApplicationState , NotificationFactory} from '../../utils';
import { customElement, property } from '../../utils/Decorators';
import * as view from './app.socket.log.html';
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";




@customElement("app-socket-log", { view: view })
export class AppSocketLog extends PolymerElement {
    _Api: Api;
    _ApplicationState : ApplicationState;
    _NotificationFactory: NotificationFactory;
    @property({type: Array})
    messages : Array<any>;
    @property({type: Array})
    battery : String;

    constructor() {
        super();
        
    }
    subscribeSocketMessage(){
        let socket = this._Api.GetSocket();
        socket.next('{"type": "battery"}');
        socket.subscribe((message) => {
            let date = new Date(Date.now());
            message.time = date.getHours() + ":" + date.getMinutes();
            if(message.status)return;
            if(message.notificationType == "notification"){
                (this as any).push("messages" , message)
                this._NotificationFactory.CreateNotification(message.title , message.body);
            }
            if(message.notificationType == "battery"){
                let battery = "~" +( Number.parseFloat(message.percent)* 100) + "%";
                if(message.isCharging == "true") battery = battery + " (charging)";
                (this as any).push("messages" , {title: "Battery Status Recived" , body: battery , time: date.getHours() + ":" + date.getMinutes()})
                this.battery = battery;
            }

        })
        setTimeout(() => {
            socket.next('{"type": "battery"}');
        }, 1000 * 60 * 5 );
    }

    
    public ready() {
        super.ready();
        console.log("READY");
        this.messages = [];
        this._Api = container.get(Api);
        this._ApplicationState = container.get(ApplicationState);
        this._NotificationFactory = container.get(NotificationFactory);
        
        if(this._ApplicationState.currentState.connected){
            this.subscribeSocketMessage();
        }else{
            this._ApplicationState.GetStateSubject().subscribe((state) => {
                    if(state.newState.connected && state.oldState.connected==false){
                        this.subscribeSocketMessage();
                    }
            }
            )
        }

    }

}