export default class Order {
    constructor(id, reference, noteId, materials, photoBefore, photoAfter, comments, signClient, signUser) {
        this.id = id;
        this.reference = reference;
        this.noteId = noteId;
        this.materials = materials;
        this.photoBefore = photoBefore;
        this.photoAfter = photoAfter;
        this.comments = comments;
        this.signClient = signClient;
        this.signUser = signUser;
    }

    fillOrderFromDb(db) {
        this.id = db._id;
        this.reference = db.reference;
        this.noteId = db.noteId;
        this.materials = db.materials;
        this.photoBefore = db.photoBefore;
        this.photoAfter = db.photoAfter;
        this.comments = db.comments;
        this.signClient = db.signClient;
        this.signUser = db.signUser
    }
}

//export const EmptyOrder = new Order(  "", "", null, [], [], [], "", "", "");
export const EmptyOrder = {id: "", reference: "", noteId: null, materials: [], photoBefore: [], photoAfter: [], comments: "", signClient: "", signUser: ""};
