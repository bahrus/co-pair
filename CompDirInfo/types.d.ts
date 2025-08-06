export interface EndUserProps {
    myHandle: FileSystemDirectoryHandle;
    yourHandle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
    nameToDisplay: string;
    subDirs: Array<SubDir>;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): ProPAP;
}

export interface SubDir {
    myHandle: FileSystemDirectoryHandle | undefined;
    yourHandle: FileSystemDirectoryHandle | undefined;
    weMatch: boolean;
    onlyYoursExists: boolean;
    onlyMineExists: boolean;
    nameToDisplay: string;
}