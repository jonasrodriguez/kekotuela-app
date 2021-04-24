export default class Material {
    constructor(id, name, price, reference, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.reference = reference;
        this.description = description;
    }

    fillOrderFromDb(db) {
        this.id = db._id;
        this.name = db.readableId;
        this.price = db.price;
        this.reference = db.reference;
        this.description = db.description;
    }

    clearMaterial() {
        this.id = "";
        this.name = "";
        this.price = 0.0;
        this.reference = "";
        this.description = "";
    }
}

export const EmptyMaterial = new Material("", "", 0.0, "", "");
