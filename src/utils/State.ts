import {Subject} from "rxjs";
import { EventNames } from "./EventNames";
import { Map } from "immutable"
import { inject } from "./index";
import { EventsDispatcher } from "./EventsDispatcher";



class State{
    loggedIn= false;
    connected=  false;
}
interface StatusChanging{
    oldState: State;
    newState: State;
}


export  class ApplicationState{
    stateChanges = new Subject<StatusChanging>();
    currentState = new State();
    _EventsDispatcher: EventsDispatcher;
    private  state_changed(newState ){
        this.stateChanges.next({newState: newState ,oldState: this.currentState })
        this.currentState = newState;
    }

    
    GetStateSubject(){    
        return this.stateChanges;
    }
    constructor(){
        inject.inject(this , ["EventsDispatcher"])
        this._EventsDispatcher.addListener(EventNames.SockedConnected , ( data ) => {this.loggedIn()})
     
    }


    private loggedIn(){
        let newState = Map(this.currentState).asImmutable().toObject();
        newState.loggedIn = true;
        this.state_changed(newState)
    }



    
    
    
    

}