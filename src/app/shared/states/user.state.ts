import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserState {
    private _user = signal<User | null>(null);

    isAuthenticated = computed(() => this._user() !== null);

    setUser(user: User) {
        this._user.set(user);
    }

    clearUser() {
        this._user.set(null);
    }

    getUser(): User | null {
        return this._user();
    }

    getRole(): string | null {
        return this._user()?.role || null;
    }
}
