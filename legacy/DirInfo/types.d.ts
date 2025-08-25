export interface EndUserProps {
    handle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
    subDirs: Array<{handle: FileSystemDirectoryHandle}>;
    files: Array<{handle: FileSystemFileHandle}>;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): ProPAP;
}