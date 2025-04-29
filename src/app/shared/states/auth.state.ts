import { Injectable, computed, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthState {
    private readonly cookieKey = 'access_token';

    private _accessToken = signal<string | null>(null);

    isLoggedIn = computed(() => !!this._accessToken());

    constructor(private cookieService: CookieService) {
        const token = this.cookieService.get(this.cookieKey);
        if (token) {
            this._accessToken.set(token);
        }
    }

    setToken(token: string) {
        this._accessToken.set(token);
        this.cookieService.set(this.cookieKey, token);
    }

    getToken(): string | null {
        return this._accessToken();
    }

    clearToken() {
        this._accessToken.set(null);
        this.cookieService.delete(this.cookieKey);
    }

    getUserId(): string | null {
        const token = this._accessToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload?.sub || null;
        } catch (e) {
            return null;
        }
    }
}
