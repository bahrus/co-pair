export interface EndUserProps {
    handle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
    subDirs: Array<FileSystemDirectoryHandle>;
    files: Array<FileSystemFileHandle>;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): ProPAP;
}