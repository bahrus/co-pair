//@ts-check
/** @import {DirProps, DirActions} from './types' */
/** @import {IshConfig } from './ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {DirActions}
 */
export class Dir extends Scope{
    /**
     * @type {IshConfig<DirProps, DirActions>}
     */
    static config = {
        propInfo: {
            beDirective: {}
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
        console.log({beDirective});
    }

    // '<mount>'(el){
    //     console.log('dir attach', el);
    // }
}

Dir.bootUp();