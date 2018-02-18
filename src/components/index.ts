import * as kebabCase from 'lodash/fp/kebabCase';
import { MyApp } from './app';
import { MyTopBar } from './top-bar';
import { AppLogin } from './app-login/index';


// add custom elements here
const elements = {
    MyApp,
    MyTopBar,
    AppLogin

};

// register all components as kebab case
Object.keys(elements)
    .forEach(key => {
        
        customElements.define(kebabCase(key), elements[key])
        
    });

