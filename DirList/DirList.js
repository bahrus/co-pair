//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {PAP as DirInfoPAP,} from '../DirInfo/types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class DirList extends Scope{
    // /**
    //  * @type {IshConfig<AP & Scope, Actions>}
    //  */
    // static config = {
    //     //xform:{},
    // }


}

DirList.bootUp();