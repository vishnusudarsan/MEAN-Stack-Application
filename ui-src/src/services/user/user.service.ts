import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../../app/app.config';
import { User } from '../../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(config.apiUrl + '/api/users');
    }

    getById(_id: string) {
        return this.http.get(config.apiUrl + '/api/user/' + _id);
    }

    create(user: User) {
        return this.http.post(config.apiUrl + '/api/register', user);
    }

    update(user: User) {
        return this.http.put(config.apiUrl + '/api/update/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(config.apiUrl + '/api/delete/' + _id);
    }
}