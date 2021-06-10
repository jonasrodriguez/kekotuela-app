import { FetchAll, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/notes"

export const FetchNotes = (callback) => {
    FetchAll(uri, callback);
}

export const InsertNote = (body, callback) => {
    Insert(uri, body, callback);
}

export const UpdateNote = (id, body, callback) => {
    Update(uri+"/"+id, body, callback);
}

export const DeleteNote = (id, callback) => {
    Delete(uri+"/"+id, callback);
}
