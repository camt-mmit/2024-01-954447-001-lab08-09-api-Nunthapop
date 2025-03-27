import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RequiredProperties } from '../../../models';
import {
  ContactCreateBody,
  EmailAddress,
  Name,
} from '../../../models/contacts';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-gl-create-contacts-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gl-create-contacts-form.component.html',
  styleUrl: './gl-create-contacts-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlCreateContactsFormComponent {
  private contactsService = inject(ContactsService);
  private router = inject(Router);

  newContact = { givenName: '', familyName: '', email: '' };
  error = signal<string | null>(null);

  async createContact() {
    try {
      console.log('Creating contact...');
      const contact: ContactCreateBody = {
        names: [
          {
            givenName: this.newContact.givenName,
            familyName: this.newContact.familyName,
          } as RequiredProperties<Name, 'givenName'>,
        ],
        emailAddresses: [{ value: this.newContact.email } as EmailAddress],
      };
      const response = await firstValueFrom(
        this.contactsService.createContact(contact),
      );
      console.log('Contact created:', response);
      this.newContact = { givenName: '', familyName: '', email: '' };
      this.error.set(null);
      this.router.navigate(['/google/contacts']);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to create contact');
      console.error('Error creating contact:', err);
    }
  }
}
