//@ts-check
/** @import {AP, Actions, FileComp, PAP, SubDirComp} from './types' */
/** @import {IshConfig } from '../ts-refs/trans-render/froop/types' */

import {Scope} from 'trans-render/froop/Scope.js';
import {FileDeletedEvent} from '../Events.js';

/**
 * @implements {Actions}
 * @implements {EventListenerObject}
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
            files: {},
            nameToDisplay: {},
            onlyYoursExists: {
                def: false,
            },
            onlyMineExists: {
                def: true,
            },
            weMatch:{
                def: false,
            },
            updateCnt: {
                def: 1,
            },
            // elRef: {},
        },
        xform: {
            '| nameToDisplay': 0,
            ':root':[
                {data: ['onlyYoursExists', 'onlyMineExists', 'weMatch', 'nameToDisplay']},
                {m: {
                    on: FileDeletedEvent.eventName,
                    inc: 'updateCnt',
                    byAmt: 1,
                    stopPropagation: true, 
                }}
            ]
                
        },
        actions: {
            getInfo: {
                ifAllOf: ['myHandle', 'yourHandle', 'updateCnt'],
            }
        },

    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async getInfo(self){
        let {myHandle, yourHandle, nameToDisplay} = self;
        if(myHandle && !nameToDisplay){
            nameToDisplay = myHandle.name;
        }
        const mySubDirectories = /** @type {Array<FileSystemDirectoryHandle>} */ ([]);
        const myFiles = /** @type {Array<FileSystemFileHandle>} */ ([]);
        if(myHandle !== undefined){
            for await (const [name, myFileOrSubHandle] of myHandle.entries()){
                switch(myFileOrSubHandle.kind){
                    case 'directory':
                        mySubDirectories.push(/** @type {FileSystemDirectoryHandle} */ (myFileOrSubHandle));
                        break;
                    case 'file':
                        myFiles.push(/** @type {FileSystemFileHandle} */ (myFileOrSubHandle));
                        break;
                }
                
            }
        }

        const yourSubDirectories = /** @type {Array<FileSystemDirectoryHandle>} */ ([]);
        const yourFiles = /** @type {Array<FileSystemFileHandle>} */ ([]);
        if(yourHandle !== undefined){
            for await (const [name, yourFileOrSubHandle] of yourHandle.entries()){
                switch(yourFileOrSubHandle.kind){
                    case 'directory':
                        yourSubDirectories.push(/** @type {FileSystemDirectoryHandle} */ (yourFileOrSubHandle));
                        break;
                    case 'file':
                        yourFiles.push(/** @type {FileSystemFileHandle} */ (yourFileOrSubHandle));
                        break;
                }
                
            }
        }

        //#region subdirectories

        const yourSubdirectoryMap = Object.groupBy(yourSubDirectories, subDir => subDir.name);
        const mySubdirectoryMap = Object.groupBy(mySubDirectories, subDir => subDir.name);
        const ourSubdirNames = new Set();
        for (const ourSubHandle of [...mySubDirectories, ...yourSubDirectories]){
            ourSubdirNames.add(ourSubHandle.name);
        }
        const ourSortedSubdirNames = Array.from(ourSubdirNames).sort();
        /**
         * @type {SubDirComp[]}
         */
        const subDirs = [];
        for (const name of ourSortedSubdirNames){
            const mySubHandle = mySubdirectoryMap[name]?.[0];
            const yourSubHandle = yourSubdirectoryMap[name]?.[0];
            const onlyYoursExists = !mySubHandle && !!yourSubHandle;
            subDirs.push({
                myHandle: mySubHandle,
                yourHandle: yourSubHandle,
                weMatch: !!mySubHandle === !!yourSubHandle,
                onlyYoursExists,
                onlyMineExists: !!mySubHandle && !yourSubHandle,
                nameToDisplay: onlyYoursExists ? '' : name,
            });
        }

        //#endregion subdirectories
        
        //#region  files
        const yourFileMap = Object.groupBy(yourFiles, x => x.name);
        const myFileMap = Object.groupBy(myFiles, x => x.name);
        const ourFileNames = new Set();
        for(const ourFileHandle of [...myFiles, ...yourFiles]){
            ourFileNames.add(ourFileHandle.name);
        }
        const ourSortedFileNames = Array.from(ourFileNames).sort();
        /**
         * @type {FileComp[]}
         */
        const files = [];
        for(const name of ourSortedFileNames){
            const myFileHandle = myFileMap[name]?.[0];
            const yourFileHandle = yourFileMap[name]?.[0];
            const onlyYoursExists = !myFileHandle && !!yourFileHandle;
            files.push({
                myHandle: myFileHandle,
                yourHandle: yourFileHandle,
                weMatch: !!myFileHandle === !!yourFileHandle,
                onlyYoursExists,
                onlyMineExists: !!myFileHandle && !yourFileHandle,
                nameToDisplay: onlyYoursExists ? '' : name,
            });
        }
        //#endregion files
        return /** @type {PAP} */({
            nameToDisplay,
            subDirs,
            files,
        });
    }

 
}

CompDirInfo.bootUp();