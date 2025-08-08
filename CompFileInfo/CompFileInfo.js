//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm} from '../ts-refs/trans-render/types' */

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
            handle: {},
            nameToDisplay:{},
        },
        xform: {
            '| nameToDisplay': 0,
            '@ delete': _,
        },
        compacts:{
            when_handle_changes_call_getInfo: 0,
        }
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    getInfo(self){
        return /** @type {PAP} */({
            //name: self.handle.name,
        });
    }

    /**
     * @param {Event} evt
     * @param {ITransformer<AP, Actions>} transformer
     * @returns 
     */
    async delete(evt, transformer){
        const {model, target} = transformer;
        const {handle} = model;
        await handle.remove();
        if(target instanceof Element){
            target.remove();
        }
        
    }

    

}

CompFileInfo.bootUp();