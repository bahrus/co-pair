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
            handle: {}, dirInfoRef: {}, debugList: {},
        },
        xform:{
        },
        compacts:{
            when_handle_changes_call_getList: 0,
            when_dirInfoRef_changes_call_hydrate: 0,
        },
        mapParentScopeRefTo: 'dirInfoRef'
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async getList(self){
        const {handle: directoryHandle} = self;
        /**
         * @type Array<DirInfoPAP>>
         */
        const list = [];
        for await (const [name, handle] of directoryHandle.entries()){
            //console.log({handle, kind: this.#kind});
            if(handle.kind !== this.#kind) continue;
            list.push({
                handle,
            });
        }
        this.#ref.deref().ish = list;
        return /** @type {PAP} */ ({
            debugList: list
        });
        
    }

    #ref;
    #kind = 'directory';
    '<mount>'(scope, el){
        this.#ref = new WeakRef(el);
        this.#kind = el.getAttribute('data-kind') || 'directory';
        super['<mount>'](scope, el);
    }

    handleEvent(){
        const self = /** @type {AP} */(/** @type {any} */(this));
        const {dirInfoRef} = self;
        const dirInfo = dirInfoRef.deref();
        if(!dirInfo) return;
        self.handle = dirInfo.handle;
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    hydrate(self){
        const {dirInfoRef} = self;
        dirInfoRef.deref()?.propagator.addEventListener('directoryHandle', this);
        this.handleEvent();
        return /** @type {PAP} */ ({
        });
    }

}

DirList.bootUp();