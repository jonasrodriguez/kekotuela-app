export default class Cliente {      
    constructor(id, name, surname, second_surname, dni, phone, email, address, city, cp, comments) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._second_surname = second_surname;
        this._dni = dni;
        this._phone = phone;
        this._email = email;
        this._address = address;
        this._cp = cp;
        this._city = city;
        this._comments = comments;      
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set name(name) { this._name = name; }
    get name() { return this._name; }

    set surname(surname) { this._surname = surname; }
    get surname() { return this._surname; }

    set second_surname(ss) { this._second_surname = ss; }
    get second_surname() { return this._second_surname; }

    set dni(dni) { this._dni = dni; }
    get dni() { return this._dni; }

    set phone(phone) { this._phone = phone; }
    get phone() { return this._phone; }

    set email(email) { this._email = email; }
    get email() { return this._email; }

    set address(address) { this._address = address; }
    get address() { return this._address; }

    set cp(cp) { this._cp = cp; }
    get cp() { return this._cp; }

    set city(city) { this._city = city; }
    get city() { return this._city; }

    set comments(comments) { this._comments = comments; }
    get comments() { return this._comments; }

    fillClientInfoFromDb(newClient) {
        this._id = newClient._id;
        this._name = newClient.name;
        this._surname = newClient.surname;
        this._second_surname = newClient.second_surname;
        this._dni = newClient.dni;
        this._phone = newClient.phone;
        this._email = newClient.email;
        this._address = newClient.address;
        this._cp = newClient.cp;
        this._city = newClient.city;
        this._comments = newClient.comments; 
    }

    clearValues() {
        this._id = "";
        this._name = "";
        this._surname = "";
        this._second_surname = "";
        this._dni = "";
        this._phone = "";
        this._email = "";
        this._address = "";
        this._cp = "";
        this._city = "";
        this._comments = "";
    }
}

export const EmptyCliente = new Cliente("0", "", "", "", "", "", "", "", "", "", "");

export const Client = (id, name, surname, second_surname, dni, phone, email, address, city, cp, comments) => { 
    return { 
        id: id, 
        name: name,
        surname: surname, 
        second_surname: second_surname,
        dni: dni, 
        phone: phone,
        email: email,
        address: address, 
        cp: cp,
        city: city,
        comments: comments,
    } 
}

export const ClientInit = Client("","","","","","","","","","","");

export const EmptyClient = {id: '', name: '', surname: '', second_surname: '', dni: '', phone: '', email: '', address: '', cp: '', city: '', comments: ''}
