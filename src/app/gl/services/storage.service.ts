import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  async get<T>(key: string): Promise<T | null> {
    const jsonText = localStorage.getItem(key);

    return JSON.parse(jsonText ?? 'null');
  }

  async set<T>(key: string, value: T): Promise<void> {
    const jsonText = JSON.stringify(value);

    return localStorage.setItem(key, jsonText);
  }

  async remove(key: string): Promise<void> {
    return localStorage.removeItem(key);
  }
}
