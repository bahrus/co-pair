//@ts-check
/** @import {AP, Actions, PAP, SubDir} from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';

/**
 * @implements {Actions}
 */
export class CompDirInfo extends Scope {
    /**
     * @type {IshConfig<AP & Scope, Actions>}
     */
    static config = {
        propInfo: {
            myHandle: {},
            yourHandle: {},
            name: {},
            subDirs: {},
        },
        xform: {
            '| name': 0,
        },
        actions: {
            getInfo: {
                ifAllOf: ['myHandle', 'yourHandle'],
            }
        }
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async getInfo(self){
        /**
         * @type {SubDir[]}
         */
        const subDirs = [];
        const {myHandle, yourHandle} = self;
        const mySubDirectories = [];
        for await (const [name, mySubHandle] of myHandle.entries()){
            mySubDirectories.push(mySubHandle);
        }
        const yourSubDirectories = [];
        for await (const [name, yourSubHandle] of yourHandle.entries()){
            yourSubDirectories.push(yourSubHandle);
        }
        debugger;
        //alphabetize mySubdictories and yourSubdirectories
        //iterate through mySubdirectories
        //if the name matches 
        //push into subDirs
        //iterate through yoursubs
        // subDirs.push({
        //     weMatch: true,
        //     myHandle: 

        // });
        throw 'NI';
        return /** @type {PAP} */({
            name: myHandle.name,
            subDirs,
        });
    }
}

CompDirInfo.bootUp();