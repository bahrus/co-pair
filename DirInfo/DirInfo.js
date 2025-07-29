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
            handle: {},
            name:{},
            subDirs: {},
            files: {},
        },
        xform:{
            '| name': 0,
        },
        compacts:{
            when_handle_changes_call_getInfo: 0,
        }
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async getInfo(self){
        const subDirs = [];
        const files = [];
        const {handle} = self;
        for await (const [name, childHandle] of handle.entries()){
            switch(childHandle.kind){
                case 'directory':
                    subDirs.push({handle: childHandle});
                    break;
                case 'file':
                    files.push({handle: childHandle});
                    break;
            }
        }
        return /** @type {PAP} */({
            name: self.handle.name,
            subDirs,
            files,
        });
    }

}

DirInfo.bootUp();