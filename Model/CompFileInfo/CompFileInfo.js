//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm, RHS} from '../../ts-refs/trans-render/types' */

const _ = /** @type {RHS<AP, Actions>} */({a: 0, o: []});

import {Scope} from 'trans-render/froop/Scope.js';
import {FileDeletedEvent } from '../../Events.js';

/**
 * @implements {Actions}
 */
export class CompFileInfo extends Scope{
    /**
     * @type {IshConfig<AP, Actions>}
     */
    static config = {
        propInfo: {
            myHandle: {},
            nameToDisplay:{},
            padding:{},
        },
    };



    /**
     * @param {AP} self
     * @param {Event} evt
     * @returns 
     */
    async delete(self, evt){
        const {myHandle} = self;
        if(myHandle === undefined) return;
        await myHandle.remove();
        const {target} = evt;
        if(target instanceof Element){
            target.dispatchEvent(new FileDeletedEvent({bubbles: true, cancelable: true}));
        }
        
    }

    

}

CompFileInfo.bootUp();