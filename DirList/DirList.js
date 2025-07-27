//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class DirList extends Scope{
    /**
     * @type {IshConfig<AP & Scope, Actions>}
     */
    static config = {
        propInfo: {
            directoryHandle: {},
        },
        xform:{
        },
        compacts:{
            when_directoryHandle_changes_call_getList: 0,
        },
        mapParentScopeRefTo: 'dirInfo'
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async getList(self){
        const {directoryHandle} = self;
        const list = [];
        for await (const [name, handle] of directoryHandle.entries()){
            //console.log({handle, kind: this.#kind});
            if(handle.kind !== 'directory') continue;
            list.push(handle);
        }
        this.#ref.deref().ish = list;
        return /** @type {PAP} */ ({
            debugList: list
        });
        
    }

    #ref;
    '<mount>'(scope, el){
        this.#ref = new WeakRef(el);
        super['<mount>'](scope, el);
    }

}

DirList.bootUp();