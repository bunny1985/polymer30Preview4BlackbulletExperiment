import  { createRouter, errorCodes, transitionPath, loggerPlugin, constants } from 'router5';
import  { Router } from 'router5/create-router';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';


const routes = [
    { name: 'home', path: '/home' , component: "my-app"},
    { name: 'login', path: '/login' },
    { name: 'register', path: '/register' },
    { name: 'main', path: '/main' }
];
export interface ListenableRouter extends  Router {
    addListener(fn: any);
}

const router = createRouter(routes  ,{defaultRoute: 'home'}).usePlugin(listenersPlugin()).usePlugin(browserPlugin({
    useHash: true
})) as ListenableRouter;

function callback(toState, fromState) {
    console.log("State Change from" , fromState , toState);
}
router.addListener(callback);


export const StateRouter =  router;


