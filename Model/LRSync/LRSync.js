//@ts-check
/** @import {AP, Actions, FileComp, PAP, SubDirComp} from './types' */
/** @import {IshConfig } from '../../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

export class LRSync extends Scope{
    static config = {};
}

LRSync.bootUp();