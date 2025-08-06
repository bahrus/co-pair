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
            nameToDisplay: {},
        },
        xform: {
            '| name': 0,
            '| nameToDisplay': 0,
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
        //aplhabetize subdirectories
        mySubDirectories.sort((a, b) => a.name.localeCompare(b.name));
        yourSubDirectories.sort((a, b) => a.name.localeCompare(b.name));
        //chatgpt suggested I use a map to speed up the lookup

        const yourHandleMap = new Map(
            yourSubDirectories.map((subDir) => [subDir.name, subDir])

        );
        // It says the purpose of this line is to track names alreayd matched
        //I however don't undestand how this is doing that
        const matches = new Set();
        for await (const mySubHandle of mySubDirectories){
            const name = mySubHandle.name
            const yourSubHandle = yourHandleMap.get(name);
            subDirs.push({
                myHandle : mySubHandle,
                yourHandle: yourSubHandle,
                weMatch: !!yourSubHandle,
                onlyYoursExists: false,
                onnlyMineExists: !yourSubHandle,
                nameToDisplay: mySubHandle.name,
            })
            console.log(subDirs)



        }

        //alphabetize mySubdictories and yourSubdirectories
        //iterate through mySubdirectories
        //if the name matches 
        //push into subDirs
        //iterate through yoursubs
        // subDirs.push({
        //     weMatch: true,
        //     myHandle: 

        // });
        return /** @type {PAP} */({
            name: myHandle.name,
            subDirs,
        });
    }
}

CompDirInfo.bootUp();