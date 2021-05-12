export const Client = {id: '', name: '', surname: '', second_surname: '', dni: '', phone: '', 
                            email: '', address: '', cp: '', city: '', comments: ''}

export const Order = {id: '', reference: '', noteId: null, materials: [], 
                            photoBefore: [], photoAfter: [], comments: '', signClient: '', signUser: '', total: 0.0};

export const Note = {id: '', reference: '', clientId: null, userId: null, userName: '', description: '', 
                            comments: '', creationDate: new Date(), orderDate: new Date(), priority: false};

export const Material = {id: '', name: '', price: '', reference: '', description: ''};
