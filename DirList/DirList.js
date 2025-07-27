//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {PAP as DirInfoPAP,} from '../DirInfo/types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 * @implements {EventListenerObject}
 */
export class DirList extends Scope{
    /**
     * @type {IshConfig<AP & Scope, Actions>}
     */
    static config = {
        propInfo: {
            directoryHandle: {},
            dirInfo: {},
            debugList: {},
        },
        xform:{
        },
        compacts:{
            when_directoryHandle_changes_call_getList: 0,
            when_dirInfo_changes_call_hydrate: 0,
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
        /**
         * @type Array<DirInfoPAP>>
         */
        const list = [];
        for await (const [name, handle] of directoryHandle.entries()){
            //console.log({handle, kind: this.#kind});
            if(handle.kind !== 'directory') continue;
            list.push({
                directoryHandle: handle,
            });
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

    handleEvent(){
        const self = /** @type {AP} */(this);
        const {dirInfo} = self;
        self.directoryHandle = dirInfo.deref().directoryHandle;
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    hydrate(self){
        const {dirInfo} = self;
        dirInfo.deref().propagator.addEventListener('directoryHandle', this);
        this.handleEvent();
        return /** @type {PAP} */ ({
        });
    }

}

DirList.bootUp();