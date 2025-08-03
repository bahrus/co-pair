export interface EndUserProps {
    myHandle: FileSystemDirectoryHandle;
    yourHandle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
    subDirs: Array<SubDir>;
}

export interface SubDir {
    myHandle: FileSystemDirectoryHandle | undefined;
    yourHandle: FileSystemDirectoryHandle | undefined;
    weMatch: boolean;
    onlyYoursExists: boolean;
    onlyMineExists: boolean;
    nameToDisplay: string;
}