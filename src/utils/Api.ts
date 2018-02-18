import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import { ObservableInput } from "rxjs/Observable";
import {inject} from "./index"
import { EventsDispatcher } from "./EventsDispatcher";
import { EventNames } from "./EventNames";

var urls = {
    login: "/api/Account/Login" , 
    register: "/api/Account/Register"
}
const apiUrl = "https://blackbulletapp.ovh";
const websocketUrl = "wss://blackbulletapp.ovh/notificationsSocket";



export class Api {

    socket: WebSocketSubject<{}>;

    default_post_headers = {
        'Content-Type': 'application/json',
        'Origin': 'https://blackbulletapp.ovh',
        'content-type': 'application/json'
    }
    methods = {
        post: "POST",
        get: "GET",
        patch: "PATCH",
        delete: "DELETE"
    }
    private post(url, data) {
        return fetch(apiUrl+ url, {
            method: this.methods.post,
            headers: this.default_post_headers,
            body: JSON.stringify(data),
            
            credentials: 'include'
        });
    }
    private get(url) {
        return fetch(apiUrl+ url, {
            method: this.methods.get,
            credentials: 'include'
        });
    }
    private delete(url) {
        return fetch(apiUrl + url, {
            method: this.methods.delete,
            credentials: 'include'
        });
    }
    register(user, password) {
        let registerData = {
            "email": user,
            "password": password,
            "confirmPassword": password
          }
        return this.post(urls.register , registerData);
    }
    private connect(){
        console.log("connect");
        let subject = Observable.webSocket(websocketUrl);
        subject
          .retry()
          .subscribe(
             (msg) => console.log('message received: ' + msg),
             (err) => alert(err),
             () => console.log('complete')
           );
        subject.next(JSON.stringify({ op: 'hello' }));
        let e = inject.resolve("EventsDispatcher") as EventsDispatcher;
        
        this.socket = subject;
        e.dispatch(EventNames.SockedConnected , {});

    }
    

    login(user, password, rememberMe) {
        let loginData = {
            "email": user,
            "password": password,
            "rememberMe": rememberMe
        };
        return this.post(urls.login , loginData).then((resp) => {
            if(!resp.ok) return;
            console.log(resp);
            this.connect()
        }  );
    }
    GetSocket(): WebSocketSubject<{}>{
        return this.socket
    }



}