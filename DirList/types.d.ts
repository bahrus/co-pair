import {PAP as DirInfoPAP, AP as DirInfoAllProps} from '../DirInfo/types';
export interface EndUserProps {
}

export interface AllProps extends EndUserProps {
    
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    
}