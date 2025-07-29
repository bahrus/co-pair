//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

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
     * @returns 
     */
    async delete(evt, {model, target}){
        const {handle} = model;
        await handle.remove();
        target.remove();
        //console.log('deleting file', handle.name);
    }

    

}

FileInfo.bootUp();