import {AP as BeDirectiveAProps, Actions as BeDirectiveActions} from './ts-refs/be-directive/types';

export interface FileOrDir {
    handle: FileSystemHandle;
    name: string;
}

export interface DirEndUserProps {
    directoryHandle: FileSystemDirectoryHandle;
    beDirective: BeDirectiveAProps & BeDirectiveActions;
}

export interface DirAllProps extends DirEndUserProps {
    //fileOrDirs: Array<FileOrDir>;
    directoryHandleChangeCount: number;
}

export type PAP = Partial<DirAllProps>;

export type ProPAP = Promise<PAP>;

export interface DirActions {
    hydrate: (self: DirAllProps) => void;
    updateDirectoryHandle: (self: DirAllProps) => PAP;
    expandDirectoryHandle: (self: DirAllProps) => ProPAP;
}