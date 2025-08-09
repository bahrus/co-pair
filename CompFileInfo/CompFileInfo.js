//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm, RHS} from '../ts-refs/trans-render/types' */

const _ = /** @type {RHS<AP, Actions>} */({a: 0, o: []});

import {Scope} from 'trans-render/froop/Scope.js';

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
        },
        xform: {
            '| nameToDisplay': 0,
            '@ delete': _,
            ':root':[
                {s: '?.dataset?.onlyYoursExists', o: 'onlyYoursExists'},
                {s: '?.dataset?.onlyMineExists', o: 'onlyMineExists'},
                {s: '?.dataset?.weMatch', o: 'weMatch'},
            ]
        },

    }



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
            target.remove();
        }
        
    }

    

}

CompFileInfo.bootUp();