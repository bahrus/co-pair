import {PAP as DirInfoPAP, AP as DirInfoAllProps} from '../DirInfo/types';
export interface EndUserProps {
    directoryHandle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    debugList: Array<DirInfoPAP>;
    dirInfo: DirInfoAllProps;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    hydrate(self: AP): ProPAP;
    getList(self: AP): ProPAP;
}