export const Client = {id: '', name: '', surname: '', second_surname: '', dni: '', phone: '', 
                        email: '', address: '', cp: '', city: '', comments: ''}

export const Order = {id: '', reference: '', noteId: null, materials: [], 
                        photoBefore: [], photoAfter: [], comments: '', signClient: '', signUser: '', total: 0.0};

export const Note = {id: '', reference: '', client: Client, scheduledUser: '', description: '', 
                        comments: '', creationDate: new Date(), scheduledDate: '', priority: false};

export const Material = {id: '', name: '', price: '', reference: '', description: ''};

export const User = {id: '', userName: '', name: '', surname: '', phone: '', email: '', password: '', permissionLevel: 0};
