export const Client = {id: '', name: '', surname: '', second_surname: '', dni: '', phone: '', 
                        email: '', address: '', cp: '', city: '', comments: ''}

export const Material = {id: '', name: '', price: '', reference: '', description: '', quantity: 0};

export const User = {id: '', userName: '', name: '', surname: '', phone: '', email: '', password: '', permissionLevel: 0, costHour: 0.0};

export const Note = {id: '', reference: '', client: Client, scheduledUser: '', description: '', 
                        comments: '', creationDate: new Date(), scheduledDate: '', priority: false};

export const Order = {id: '', reference: '', note: Note, client: Client, materials: [], services: [], laborers: [], 
                        comments: '', photoBefore: [], photoAfter: [], signClient: '', signUser: ''};