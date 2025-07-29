//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */
/** @import {ITransformer} from '../ts-refs/trans-render/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class FileInfo extends Scope{
    /**
     * @type {IshConfig<AP & Scope, Actions>}
     */
    static config = {
        propInfo: {
            handle: {},
            name:{},
        },
        xform:{
            '| name': 0,
            '@ delete': {a: 0, o: []}
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
            name: self.handle.name,
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

FileInfo.bootUp();