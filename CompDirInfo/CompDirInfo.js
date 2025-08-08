//@ts-check
/** @import {AP, Actions, PAP, SubDir} from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';
import { match } from 'trans-render/lib/specialKeys.js';

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
        let {myHandle, yourHandle, nameToDisplay} = self;
        if(myHandle && !nameToDisplay){
            nameToDisplay = myHandle.name;
        }
        const mySubDirectories = [];
        for await (const [name, mySubHandle] of myHandle.entries()){
            mySubDirectories.push(mySubHandle);
        }
        const yourSubDirectories = [];
        for await (const [name, yourSubHandle] of yourHandle.entries()){
            yourSubDirectories.push(yourSubHandle);
        }
        const yourHandlelMap = Object.groupBy(yourSubDirectories,subDir => subDir.name);
        const myHandleMap = Object.groupBy(mySubDirectories, subDir => subDir.name);
        const matches = new Set();
        for (const mySubHandle of mySubDirectories){
            const name = mySubHandle.name;
            matches.add(name);
        }
        for (const yourSubHandle of yourSubDirectories){
            const name = yourSubHandle.name;
            matches.add(name);
        }
        const names = Array.from(matches).sort();
        for (const name of names){
            const mySubHandle = myHandleMap[name]?.[0];
            const yourSubHandle = yourHandlelMap[name]?.[0];
            const onlyYoursExists = !mySubHandle && !!yourSubHandle;
            subDirs.push({
                myHandle: mySubHandle,
                yourHandle: yourSubHandle,
                weMatch: !!yourSubHandle,
                onlyYoursExists,
                onlyMineExists: !!mySubHandle && !yourSubHandle,
                nameToDisplay: onlyYoursExists ? '' : name,
            });
        }
        return /** @type {PAP} */({
            nameToDisplay,
            subDirs,
        });
    }
}

CompDirInfo.bootUp();