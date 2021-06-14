import { FetchAll, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/services"

export const FetchServices = (callback) => {
    FetchAll(uri, callback);
}

export const InsertService = (body, callback) => {
    Insert(uri, body, callback);
}

export const UpdateService = (id, body, callback) => {
    Update(uri+"/"+id, body, callback);
}

export const DeleteService = (id, callback) => {    
    Delete(uri+"/"+id, callback);
}
