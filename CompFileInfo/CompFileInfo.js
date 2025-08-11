//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm, RHS} from '../ts-refs/trans-render/types' */

const _ = /** @type {RHS<AP, Actions>} */({a: 0, o: []});

import {Scope} from 'trans-render/froop/Scope.js';
import {FileDeletedEvent } from '../Events.js';

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
                {data: ['onlyYoursExists', 'onlyMineExists', 'weMatch']}
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

        // if(target instanceof Element){
        //     target.remove();
        // }
        // if(target instanceof Element){
        //     const ish = target.closest('[itemscope="CompDirInfo"]')?.ish;
        //     const result = await ish.getInfo(ish);
        //     Object.assign(ish, result);
        // }
        if(target instanceof Element){
            target.dispatchEvent(new FileDeletedEvent({bubbles: true, cancelable: true}));
        }
        
    }

    

}

CompFileInfo.bootUp();