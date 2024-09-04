import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Save data
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Retrieve data
  get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove data
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data
  clear(): void {
    localStorage.clear();
  }

  getAuthHeader(): HttpHeaders {
    let token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    if (token) {
      token = token.replace(/"/g, '');
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
