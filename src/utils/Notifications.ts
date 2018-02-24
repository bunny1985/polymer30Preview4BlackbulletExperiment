import { injectable} from "inversify";
var _Notification :any = false
if("Notification" in window){
     _Notification = window["Notification"];
 }


document.addEventListener('DOMContentLoaded', function () {
    if (!_Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.'); 
      return;
    }
    if (_Notification.permission !== "granted"){
        _Notification.requestPermission();
    }
    
      
    }
);

@injectable()
export class NotificationFactory{
    CreateNotification(title , body){
        var audio = new Audio('/static/sounds/ping.ogg');
        audio.play();

        var notification = new _Notification(title, {
            icon: '/static/images/icon.png',
            body: body,
          });
          return notification;
    }
}



