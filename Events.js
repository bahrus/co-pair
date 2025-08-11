//@ts-check
export class FileDeletedEvent extends Event {
    static eventName = 'file-deleted';
    /**
     * 
     * @param {EventInit | undefined} eventInitDict= 
     */
    constructor(eventInitDict){
        super(FileDeletedEvent.eventName, eventInitDict);
    }
}