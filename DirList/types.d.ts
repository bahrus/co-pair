import {AllProps as DirInfoAllProps} from '../DirInfo/types';
export interface EndUserProps {
    directoryHandle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    debugList: Array<FileSystemDirectoryHandle>;
    dirInfo: DirInfoAllProps;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getList(self: AP): ProPAP;
}