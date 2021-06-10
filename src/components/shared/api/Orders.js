import { FetchAll, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/Orders"

export const FetchOrders = (callback) => {
    FetchAll(uri, callback);
}

export const InsertOrder = (body, callback) => {
    Insert(uri, body, callback);
}

export const UpdateOrder = (id, body, callback) => {
    Update(uri+"/"+id, body, callback);
}

export const DeleteOrder = (id, callback) => {
    Delete(uri+"/"+id, callback);
}
