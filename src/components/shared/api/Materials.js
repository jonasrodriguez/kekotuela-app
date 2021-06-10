import { FetchAll, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/materials"

export const FetchMaterials = (callback) => {
    FetchAll(uri, callback);
}

export const InsertMaterial = (body, callback) => {
    Insert(uri, body, callback);
}

export const UpdateMaterial = (id, body, callback) => {
    Update(uri+"/"+id, body, callback);
}

export const DeleteMaterial = (id, callback) => {
    Delete(uri+"/"+id, callback);
}
