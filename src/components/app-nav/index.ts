
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.nav.html';

import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { customElement } from '../../utils/Decorators';


@customElement("app-nav" , {view: view})
export class AppNav extends Element {

    
    
    
}