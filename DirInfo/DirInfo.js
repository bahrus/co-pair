//@ts-check
/** @import {AP, Actions, PAP, } from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class DirInfo extends Scope{
    /**
     * @type {IshConfig<AP & Scope, Actions>}
     */
    static config = {
        propInfo: {
            directoryHandle: {},
            name:{},
        },
        xform:{
            '| name': 0,
        },
        compacts:{
            when_directoryHandle_changes_call_getInfo: 0,
        }
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    getInfo(self){
        return /** @type {PAP} */({
            name: self.directoryHandle.name,
        });
    }

}

DirInfo.bootUp();