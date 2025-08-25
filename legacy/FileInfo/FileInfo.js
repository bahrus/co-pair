//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm, RHS} from '../ts-refs/trans-render/types' */

import {Scope, _ as __} from 'trans-render/froop/Scope.js';

const _ = /** @type {RHS<AP, Actions>} */({a: 0, o: []});
/**
 * @implements {Actions}
 */
export class FileInfo extends Scope{
    /**
     * @type {IshConfig<AP, Actions>}
     */
    static config = {
        propInfo: {
            handle: {},
            name:{},
        },
        xform: {
            '| name': 0,
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