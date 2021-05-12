export default class Note {
    constructor(id, reference, clientId, userId, userName, description, comments, creationDate, orderDate, priority) {
        this.id = id;
        this.reference = reference;
        this.clientId = clientId;
        this.userId = userId;
        this.userName = userName;
        this.description = description;
        this.comments = comments;
        this.creationDate = creationDate;
        this.orderDate = orderDate;
        this.priority = priority;
    }

    fillNoteFromDb(db) {
        this.id = db._id;
        this.reference = db.reference;
        this.clientId = db.clientId;
        this.userId = db.userId;
        this.description = db.description;
        this.comments = db.comments;
        this.userName = db.user.userName;
        this.creationDate = db.createdAt;
        this.orderDate = db.orderDate;
        this.priority = db.priority;
    }
}

export const EmptyNote = new Note("", "", "", null, "", "", "", new Date(), null, false);
