export interface EndUserProps {
    myHandle: FileSystemDirectoryHandle | undefined;
    yourHandle: FileSystemDirectoryHandle | undefined;
    parentPath: string;
}

export interface AllProps extends EndUserProps, SubDirComp {
    subDirs: Array<SubDirComp>;
    files: Array<FileComp>;
    updateCnt: number;
    hasContentToDisplay: boolean;
    path: string;
}

export type AP = AllProps;

export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getInfo(self: AP): ProPAP;
    //hydrate(self: AP): void;
}

export interface SubDirComp extends Comp {
    myHandle: FileSystemDirectoryHandle | [] | undefined;
    yourHandle: FileSystemDirectoryHandle | [] |  undefined;
    parentPath: string;
}

export interface FileComp extends Comp {
    myHandle: FileSystemHandle | [] |  undefined;
    yourHandle: FileSystemHandle | [] |  undefined;
}

export interface Comp {
    weMatch: boolean;
    onlyYoursExists: boolean;
    onlyMineExists: boolean;
    nameToDisplay: string;
    isOddItem: boolean;
    margin: number;
}