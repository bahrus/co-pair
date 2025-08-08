//@ts-check
/** @import {AP, Actions, PAP, SubDirComp} from './types' */
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
            subDirs: {},
            nameToDisplay: {},
            onlyYoursExists: {
                def: false,
            },
            onlyMineExists: {
                def: true,
            },
            weMatch:{
                def: false,
            }
        },
        xform: {
            '| nameToDisplay': 0,
            ':root':[
                {s: '?.dataset?.onlyYoursExists', o: 'onlyYoursExists'},
                {s: '?.dataset?.onlyMineExists', o: 'onlyMineExists'},
                {s: '?.dataset?.weMatch', o: 'weMatch',}
            ]
                
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
         * @type {SubDirComp[]}
         */
        const subDirs = [];
        let {myHandle, yourHandle, nameToDisplay} = self;
        if(myHandle && !nameToDisplay){
            nameToDisplay = myHandle.name;
        }
        const mySubDirectories = /** @type {Array<FileSystemDirectoryHandle>} */ ([]);
        if(myHandle !== undefined){
            for await (const [name, mySubHandle] of myHandle.entries()){
                switch(mySubHandle.kind){
                    case 'directory':
                        mySubDirectories.push(/** @type {FileSystemDirectoryHandle} */ (mySubHandle));
                        break;
                }
                
            }
        }

        const yourSubDirectories = /** @type {Array<FileSystemDirectoryHandle>} */ ([]);
        if(yourHandle !== undefined){
            for await (const [name, yourSubHandle] of yourHandle.entries()){
                switch(yourSubHandle.kind){
                    case 'directory':
                        yourSubDirectories.push(/** @type {FileSystemDirectoryHandle} */ (yourSubHandle));
                        break;
                }
                
            }
        }

        const yourHandleMap = Object.groupBy(yourSubDirectories,subDir => subDir.name);
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
            const yourSubHandle = yourHandleMap[name]?.[0];
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