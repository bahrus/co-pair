import {AP as FolderPickerProps, Actions as FolderPickerActions} from './ts-refs/folder-picker/types';

export interface FileOrDir {
    directoryHandle: FileSystemHandle;
    name: string;
}

export interface DirEndUserProps {
    directoryHandle: FileSystemDirectoryHandle;
    folderPicker: FolderPickerProps & FolderPickerActions;
}

export interface DirAllProps extends DirEndUserProps {
    //fileOrDirs: Array<FileOrDir>;
    directoryHandleChangeCount: number;
    name: string;
}

export type PAP = Partial<DirAllProps>;

export type ProPAP = Promise<PAP>;

export interface DirActions {
    hydrate: (self: DirAllProps) => void;
    updateDirectoryHandle: (self: DirAllProps) => PAP;
    expandDirectoryHandle: (self: DirAllProps) => ProPAP;
}