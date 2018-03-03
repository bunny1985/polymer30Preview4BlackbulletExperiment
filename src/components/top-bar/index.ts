import { customElement } from '../../utils/Decorators';
import {LitElement} from '@polymer/lit-element/lit-element'
import {html} from 'lit-html/lib/lit-extended'
@customElement("my-top-bar"  )
export class MyTopBar extends LitElement {

    constructor(){
        super()
    }
    style = ``

    render(){
        return html`
        <style>
          .top-bar {
            background-color: rgba(0,0, 0,0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            color: white;
            padding: 10px 20px;
            top: 0;
            width: 100%;
            z-index:1000;
            position: absolute;
          }
          .left{
            font-size: 2em;
            font-family: Arial, Helvetica, sans-serif;
          }
          
      
          

        </style>
      <div class="top-bar">
            <div class="left"></div>
            <div class="right">
                <app-nav></app-nav>  
            </div>
      </div>

      
      `;
    }
}