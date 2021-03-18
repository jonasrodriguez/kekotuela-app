export default class Client {
    constructor(id, name, surname, second_surname, dni, phone, email, address, city, cp, comments) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.second_surname = second_surname;
        this.dni = dni;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.cp = cp;
        this.city = city;
        this.comments = comments;      
    }
}
