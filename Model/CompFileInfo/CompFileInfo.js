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
        xform: {
            '| nameToDisplay': [
                {s: '?.dataset?.padding', o: 'padding', d: 0},
                {s: 'textContent', o: 'nameToDisplay'},
            ],
            '@ delete': _,
            ':root':[
                {data: ['onlyYoursExists', 'onlyMineExists', 'weMatch', 'isOddItem']}
            ]
        },

    };



    /**
     * @param {Event} evt
     * @param {ITransformer<AP, Actions>} transformer
     * @returns 
     */
    async delete(evt, transformer){
        const {model, target} = transformer;
        const {myHandle} = model;
        if(myHandle === undefined) return;
        await myHandle.remove();

        if(target instanceof Element){
            target.dispatchEvent(new FileDeletedEvent({bubbles: true, cancelable: true}));
        }
        
    }

    

}

CompFileInfo.bootUp();