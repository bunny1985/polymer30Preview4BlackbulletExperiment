import {Subject} from "rxjs";
import { EventNames } from "./EventNames";
import { Map } from "immutable"

import { EventsDispatcher } from "./EventsDispatcher";
import { StateRouter } from "./StateRouter"
import { injectable} from "inversify";






export class State{
    loggedIn= false;
    connected=  false;
}
export interface StatusChanging{
    oldState: State;
    newState: State;
}

@injectable()
export  class ApplicationState{
    stateChanges = new Subject<StatusChanging>();
    currentState = new State();
    
    private  state_changed(newState ){
        this.stateChanges.next({newState: newState ,oldState: this.currentState })
        this.currentState = newState;
        
    }
    

    
    GetStateSubject(){    
        return this.stateChanges;
    }
    constructor(private _EventsDispatcher: EventsDispatcher){
    //    inject.inject(this , ["EventsDispatcher"])
        this._EventsDispatcher.addListener(EventNames.SockedConnected , ( data ) => {this.loggedIn()})


        
    }

    connected(){
        let newState = Map(this.currentState).asImmutable().toObject();
        newState.connected = true;
        this.state_changed(newState)
    }

    loggedIn(){
        let newState = Map(this.currentState).asImmutable().toObject();
        newState.loggedIn = true;
        this.state_changed(newState)
    }



    
    
    
    

}
