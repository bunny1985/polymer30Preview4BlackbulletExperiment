import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import { ObservableInput } from "rxjs/Observable";

import { EventsDispatcher } from "./EventsDispatcher";
import { EventNames } from "./EventNames";
import { injectable, inject } from "inversify";
import { container } from "./index";
import { ApplicationState } from "./State";
var urls = {
    login: "/api/Account/Login" , 
    register: "/api/Account/Register"
}
const apiUrl = "https://blackbulletapp.ovh";
const websocketUrl = "wss://blackbulletapp.ovh/notificationsSocket";
// const apiUrl = "http://localhost:8080";
// const websocketUrl = "ws://localhost:8080/notificationsSocket";

@injectable()
export class Api {

    socket: WebSocketSubject<any>;

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
     connect(){
        console.log("connect");
        let subject = Observable.webSocket(websocketUrl);
        subject
          .retry()
          .subscribe(
             (msg) => console.log('message received: ' ,  msg),
             (err) => alert(err),
             () => console.log('complete')
           );
        subject.next(JSON.stringify({ op: 'hello' }));
        this.socket = subject;
        container.get(ApplicationState).connected();

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
    GetSocket(): WebSocketSubject<any>{
        
        return this.socket
    }



}