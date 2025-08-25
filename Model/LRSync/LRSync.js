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
            '* td[data-side]': {
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
    async handleToggle(evt, transformer, uow, listener){
        const side = listener.dataset.side;
        const otherSide = side === 'lhs' ? 'rhs' : 'lhs';
        console.log({side, otherSide});
        const target = /** @type {HTMLDetailsElement} **/ (evt.target);
        const {open} = target;
        const path = target?.closest('[itemscope]:not([itemscope=""])')?.dataset?.path;
        const {target: t} = transformer;
        if(!(t instanceof Element)) return;
        const details = /** @type {HTMLDetailsElement} */ (t.querySelector(`td[data-side="${otherSide}"] [data-path="${path}"] details`));
        if(details === null) return;
        details.open = open;
    }


}

LRSync.bootUp();