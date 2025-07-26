import {AP as FolderPickerProps, Actions as FolderPickerActions} from '../ts-refs/folder-picker/types';

export interface File {
    directoryHandle: FileSystemHandle;
    name: string;
}

export interface FileEndUserProps {
    fileHandle: FileSystemFileHandle;
}

export interface FileAllProps extends FileEndUserProps {
    //fileOrDirs: Array<FileOrDir>;
    fileHandleChangeCount: number;
    name: string;
}

export type PAP = Partial<FileAllProps>;

export type ProPAP = Promise<PAP>;

export interface FileActions {
    //hydrate: (self: FileAllProps) => void;
    //updateDirectoryHandle: (self: FileAllProps) => PAP;
    expandFileHandle: (self: FileAllProps) => ProPAP;
}