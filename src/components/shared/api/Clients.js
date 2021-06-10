import { FetchAll, FetchQuery, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/clients"

export const FetchClients = (callback) => {
    FetchAll(uri, callback);
}

export const FetchClientFilter = (filter, callback) => {
    const query = 'filter=' + filter;
    FetchQuery(uri, query, callback);
}

export const InsertClient = (body, callback) => {
    Insert(uri, body, callback);
}

export const UpdateClient = (id, body, callback) => {
    Update(uri+"/"+id, body, callback);
}

export const DeleteClient = (id, callback) => {
    Delete(uri+"/"+id, callback);
}
