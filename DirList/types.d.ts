import {PAP as DirInfoPAP, AP as DirInfoAllProps} from '../DirInfo/types';
export interface EndUserProps {
    handle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    debugList: Array<DirInfoPAP>;
    dirInfoRef: WeakRef<DirInfoAllProps>;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    hydrate(self: AP): PAP;
    getList(self: AP): ProPAP;
}