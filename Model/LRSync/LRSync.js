//@ts-check
/** @import {AP, Actions, PAP} from './types' */
/** @import {IshConfig } from '../../ts-refs/trans-render/froop/types' */
/** @import {ITransformer, XForm, RHS} from '../../ts-refs/trans-render/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class LRSync extends Scope{
    /**
     * @type {IshConfig<AP, Actions>}
     */
    static config = {
        xform: {
            ':root': {
                a: {
                    on: 'toggle',
                    do: 'handleToggle',
                    options: {capture: true}
                }
            }
        }
    };

    /**
     * 
     * @param {Event} evt 
     * @param {ITransformer<AP, Actions>} transformer 
     */
    async handleToggle(evt, transformer/*: ITransformer<AP, Actions>*/){
        console.log('toggled', evt, transformer);
    }
}

LRSync.bootUp();