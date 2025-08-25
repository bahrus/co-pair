import {ITransformer} from '../../ts-refs/trans-render/types';
export interface EndUserProps {
}

export interface AllProps extends EndUserProps {
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    handleToggle(evt: Event, transformer: ITransformer<AP, Actions>): Promise<void>;
}