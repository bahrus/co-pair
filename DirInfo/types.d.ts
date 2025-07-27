import {AP as FolderPickerProps, Actions as FolderPickerActions} from '../ts-refs/folder-picker/types';


export interface EndUserProps {
    directoryHandle: FileSystemFileHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): PAP;
}