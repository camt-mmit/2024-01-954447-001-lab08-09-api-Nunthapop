import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Species } from '../../../models';
import { SpeciesServiceService } from '../../../services/species-service.service';

@Component({
  selector: 'app-sw-species-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './sw-species-list.component.html',
  styleUrl: './sw-species-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesListComponent implements OnInit {
  private speciesService = inject(SpeciesServiceService);

  // Signals for reactive state
  species = signal<Species[]>([]);
  nextUrl = signal<string | null>(null);
  previousUrl = signal<string | null>(null);

  ngOnInit() {
    this.loadSpecies();
  }

  loadSpecies(url?: string) {
    this.speciesService.getSpeciesList(url).subscribe({
      next: (data) => {
        this.species.set(data.results);
        this.nextUrl.set(data.next);
        this.previousUrl.set(data.previous);
      },
      error: (err) => console.error('Error fetching species:', err),
    });
  }

  goToNextPage() {
    const next = this.nextUrl();
    if (next) {
      this.loadSpecies(next);
    }
  }

  goToPreviousPage() {
    const prev = this.previousUrl();
    if (prev) {
      this.loadSpecies(prev);
    }
  }
}
