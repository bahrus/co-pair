export interface EndUserProps {
    handle: FileSystemHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): PAP;
    delete(evt: Event, self: AP): void;
}