//@ts-check
/** @import {FileEndUserProps, FileAllProps, FileActions, PAP, } from '../File/types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {FileActions}
 * @implements {EventListenerObject}
 */
export class File extends Scope{
    /**
     * @type {IshConfig<FileAllProps & Scope, FileActions>}
     */
    static config = {
        // propDefaults:{
        //     directoryHandleChangeCount: 0,
        // },
        propInfo: {
            fileHandle: {},
            name:{},
        },
        xform:{
            '| name': 0,
            
        },
        compacts:{
            when_fileHandle_changes_call_expandFileHandle: 0,
        }
    }






    /**
     * 
     * @param {FileAllProps & Scope} self 
     * @returns 
     */
    async expandFileHandle(self){
        const {fileHandle} = self;
        return{
            name: fileHandle.name
        }
    }

    #ref;
    '<mount>'(scope, el){
        this.#ref = new WeakRef(el);
        super['<mount>'](scope, el);
    }
}

File.bootUp();