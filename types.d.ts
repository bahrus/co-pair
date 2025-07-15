export interface FileOrDir {
    handle: FileSystemHandle;
    name: string;
}

export interface DirProps {
    directoryHandle: FileSystemDirectoryHandle;
    fileOrDirs: Array<FileOrDir>;
    beDirective: any;
}

export interface DirActions {
    hydrate: (self: DirProps) => void;
}