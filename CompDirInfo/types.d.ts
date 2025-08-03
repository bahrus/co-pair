export interface EndUserProps {
    myHandle: FileSystemDirectoryHandle;
    yourHandle: FileSystemDirectoryHandle;
}

export interface AllProps extends EndUserProps {
    name: string;
}

export interface SubDir {
    handle: FileSystemDirectoryHandle;
    isMine: boolean;
    isYours: boolean;
    isShared: boolean;
}