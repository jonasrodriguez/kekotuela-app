export default class Order {
    constructor(id, readableId, clientId, userId, userName, description, creationDate, orderDate, priority) {
        this.id = id;
        this.readableId = readableId;
        this.clientId = clientId;
        this.userId = userId;
        this.userName = userName;
        this.description = description;
        this.creationDate = creationDate;
        this.orderDate = orderDate;
        this.priority = priority;
    }

    fillOrderFromDb(db) {
        this.id = db._id;
        this.readableId = db.readableId;
        this.clientId = db.clientId;
        this.userId = db.userId;
        this.description = db.description;
        this.userName = db.user.userName;
        this.creationDate = db.createdAt;
        this.orderDate = db.orderDate;
        this.priority = db.priority;
    }
}

export const EmptyOrder = new Order("", "", "", null, "", "", new Date(), null, 0);
