//@ts-check
/** @import {DirEndUserProps, DirAllProps, DirActions, PAP} from './types' */
/** @import {IshConfig } from './ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {DirActions}
 * @implements {EventListenerObject}
 */
export class Dir extends Scope{
    /**
     * @type {IshConfig<DirAllProps, DirActions>}
     */
    static config = {
        propDefaults:{
            directoryHandleChangeCount: 0,
        },
        propInfo: {
            beDirective: {},
            directoryHandle: {},
        },
        compacts:{
            "when_beDirective_changes_call_hydrate":0,
            'when_directoryHandleChangeCount_changes_call_updateDirectoryHandle': 0,
        }
    }

    /**
     * 
     * @param {DirAllProps} self 
     */
    hydrate(self){
        const {beDirective} = self;
        beDirective.propagator.addEventListener('directoryHandle', this);
        console.log({beDirective});
    }

    handleEvent(){
        const self = /** @type {DirAllProps} */ (/** @type {any} */ (this));
        self.directoryHandleChangeCount++;
    }


    /**
     * 
     * @param {DirAllProps} self 
     * @returns 
     */
    updateDirectoryHandle(self){
        const {beDirective} = self;
        const {directoryHandle} = beDirective;
        return /** @type {PAP} */ ({
            directoryHandle
        });
    }

    // '<mount>'(el){
    //     console.log('dir attach', el);
    // }
}

Dir.bootUp();