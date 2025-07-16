//@ts-check
/** @import {DirEndUserProps, DirAllProps, DirActions, PAP, FileOrDir} from './types' */
/** @import {IshConfig } from './ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {DirActions}
 * @implements {EventListenerObject}
 */
export class Dir extends Scope{
    /**
     * @type {IshConfig<DirAllProps & Scope, DirActions>}
     */
    static config = {
        // propDefaults:{
        //     directoryHandleChangeCount: 0,
        // },
        propInfo: {
            beDirective: {},
            directoryHandle: {},
            directoryHandleChangeCount: {
                def: 0,
            }
        },
        xform:{

        },
        compacts:{
            when_beDirective_changes_call_hydrate:0,
            when_directoryHandleChangeCount_changes_call_updateDirectoryHandle: 0,
            when_directoryHandle_changes_call_expandDirectoryHandle: 0,
        }
    }

    /**
     * 
     * @param {DirAllProps & Scope} self 
     */
    hydrate(self){
        const {beDirective} = self;
        if(!beDirective) return;
        beDirective.propagator.addEventListener('directoryHandle', this);
        this.handleEvent();
        console.log({beDirective});
    }

    handleEvent(){
        const self = /** @type {DirAllProps} */ (/** @type {any} */ (this));
        self.directoryHandleChangeCount++;
    }


    /**
     * 
     * @param {DirAllProps & Scope} self 
     * @returns 
     */
    updateDirectoryHandle(self){
        const {beDirective} = self;
        if(!beDirective){
            return ({});
        }
        const {directoryHandle} = beDirective;
        return /** @type {PAP} */ ({
            directoryHandle
        });
    }

    /**
     * 
     * @param {DirAllProps & Scope} self 
     * @returns 
     */
    async expandDirectoryHandle(self){
        const {directoryHandle} = self;
        /**
         * @type {Array<FileOrDir>}
         */
        const list = [];
        for await (const [name, handle] of directoryHandle.entries()){
            list.push({
                name,
                handle
            });
        }
        console.log({list});
        this.#ref.deref().ish = list;

    }

    #ref;
    '<mount>'(scope, el){
        console.log({scope, el});
        this.#ref = new WeakRef(el);
        super['<mount>'](scope, el);
    }
}

Dir.bootUp();