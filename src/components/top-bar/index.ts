import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as view from './top-bar.template.html';
import { customElement } from '../../utils/Decorators';


@customElement("my-top-bar" , {view: view , css : null})
export class MyTopBar extends GestureEventListeners(PolymerElement) {

    
    static get template() {
        return view;
    }
}