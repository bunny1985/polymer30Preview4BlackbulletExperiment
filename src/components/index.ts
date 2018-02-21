import * as kebabCase from 'lodash/fp/kebabCase';
import { MyApp } from './app';
import { MyTopBar } from './top-bar';
import { AppLogin } from './app-login/index';
import { AppNav } from './app-nav/index';
import { AppHome } from './app-home/index';
import { AppMain } from './app-main/index';
import {AppSendNotification} from './app-send-notification/index'
import {AppSendSms} from './app-send-sms/index'

// add custom elements here
const elements = {
    MyApp,
    MyTopBar,
    AppLogin,
    AppNav,
    AppHome,
    AppMain,
    AppSendNotification,
    AppSendSms
};

// register all components as kebab case
Object.keys(elements)
    .forEach(key => {
        
        customElements.define(kebabCase(key), elements[key])
        
    });

