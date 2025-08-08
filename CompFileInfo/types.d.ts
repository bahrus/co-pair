import {ITransformer} from '../ts-refs/trans-render/types';
import {FileComp} from '../CompDirInfo/types';
export interface EndUserProps {
    //handle: FileSystemHandle;
}

export interface AllProps extends EndUserProps, FileComp {
    
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    //getInfo(self: AP): PAP;
    delete(evt: Event, transformer: ITransformer<AP, Actions>): Promise<void>;
}

export interface FileSystemHandle {
    remove(): Promise<void>;
    nameToDisplay: string;
}