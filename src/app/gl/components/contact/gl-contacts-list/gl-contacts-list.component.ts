import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Person } from '../../../models/contacts';
import { ContactsService } from '../../../services/contacts.service';
import { OauthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-gl-contacts-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gl-contacts-list.component.html',
  styleUrl: './gl-contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlContactsListComponent implements OnInit {
  private contactsService = inject(ContactsService);
  private oauthService = inject(OauthService);
  private router = inject(Router);

  contacts = signal<Person[]>([]);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      console.log('Contacts signal updated:', this.contacts());
      console.log('Error signal updated:', this.error());
    });
  }

  async ngOnInit() {
    console.log('ContactsListComponent: ngOnInit started');
    const accessToken = await this.oauthService.getAccessTokenData();
    console.log('Access Token:', accessToken);
    if (!accessToken) {
      console.log('No access token, redirecting to /login');
      this.router.navigate(['/login']);
      return;
    }
    await this.loadContacts();
  }

  async loadContacts() {
    try {
      console.log('Loading contacts...');
      const params = {
        personFields: 'names,emailAddresses',
      };
      const response = await firstValueFrom(
        this.contactsService.getContacts(params),
      );
      console.log('API Response:', response);
      this.contacts.set([...(response.connections || [])]); // ใช้ spread operator เพื่อแปลงเป็น mutable Person[]
      console.log('Contacts set:', this.contacts());
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to load contacts');
      console.error('Error loading contacts:', err);
    }
  }

  async signOut() {
    await this.oauthService.clear();
    this.router.navigate(['/login']);
  }

  getDisplayName(contact: Person): string {
    const displayName = contact.names?.[0]?.displayName;
    console.log('getDisplayName for contact:', contact, 'result:', displayName);
    return displayName || '';
  }

  getEmail(contact: Person): string {
    const email = contact.emailAddresses?.[0]?.value;
    console.log('getEmail for contact:', contact, 'result:', email);
    return email || '';
  }
}
