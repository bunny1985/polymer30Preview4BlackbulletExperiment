
import { Element  } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import * as view from './app.home.html';
import * as style from './style.css';

import { Api} from '../../utils/Api';
import { EventsDispatcher } from '../../utils/EventsDispatcher';
import { EventNames } from '../../utils/EventNames';
import { StateRouter, ListenableRouter } from '../../utils/StateRouter';
import { customElement } from '../../utils/Decorators';

@customElement("app-home" , {view: view , css: style})
export class AppHome extends Element {
}