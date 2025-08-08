export interface EndUserProps {
    myHandle: FileSystemDirectoryHandle | undefined;
    yourHandle: FileSystemDirectoryHandle | undefined;
}

export interface AllProps extends EndUserProps, SubDirComp {
    subDirs: Array<SubDirComp>;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): ProPAP;
}

export interface SubDirComp extends Comp {
    myHandle: FileSystemDirectoryHandle | undefined;
    yourHandle: FileSystemDirectoryHandle | undefined;
    
}

export interface FileComp extends Comp {
    myFileHandle: FileSystemHandle | undefined;
    yourFileHandle: FileSystemHandle | undefined;
}

export interface Comp {
    weMatch: boolean;
    onlyYoursExists: boolean;
    onlyMineExists: boolean;
    nameToDisplay: string;
}