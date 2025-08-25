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
            '* td[data-side="lhs"]': {
                a: {
                    on: 'toggle',
                    do: 'handleLHSToggle',
                    options: {capture: true}
                }
            },
            '* td[data-side="rhs"]': {
                a: {
                    on: 'toggle',
                    do: 'handleRHSToggle',
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
    async handleLHSToggle(evt, transformer/*: ITransformer<AP, Actions>*/){
        console.log('lhs - toggled', evt, transformer);
    }

        /**
     * 
     * @param {Event} evt 
     * @param {ITransformer<AP, Actions>} transformer 
     */
    async handleRHSToggle(evt, transformer/*: ITransformer<AP, Actions>*/){
        console.log('rhs - toggled', evt, transformer);
    }
}

LRSync.bootUp();