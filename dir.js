//@ts-check
/** @import {DirProps, DirActions} from './types' */
/** @import {IshConfig } from './ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {DirActions}
 * @implements {EventListenerObject}
 */
export class Dir extends Scope{
    /**
     * @type {IshConfig<DirProps, DirActions>}
     */
    static config = {
        propInfo: {
            beDirective: {},
            directoryHandle: {},
        },
        compacts:{
            "when_beDirective_changes_call_hydrate":0
        }
    }

    /**
     * 
     * @param {DirProps} self 
     */
    hydrate(self){
        const {beDirective} = self;
        beDirective.propagator.addEventListener('directoryHandle', this);
        console.log({beDirective});
    }

    handleEvent(){
        console.log('dir handleEvent', arguments);
        const self = /** @type {DirProps} */ (/** @type {any} */ (this));
        const {beDirective} = self;
        const {directoryHandle} = beDirective;
        self.directoryHandle = directoryHandle;
    }

    // '<mount>'(el){
    //     console.log('dir attach', el);
    // }
}

Dir.bootUp();