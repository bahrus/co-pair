export interface FileOrDir {
    handle: FileSystemHandle;
    name: string;
}

export interface DirProps {
    dirHandle: FileSystemDirectoryHandle;
    fileOrDirs: Array<FileOrDir>;
    beDirective: any;
}

export interface DirActions {
    hydrate: (self: DirProps) => void;
}