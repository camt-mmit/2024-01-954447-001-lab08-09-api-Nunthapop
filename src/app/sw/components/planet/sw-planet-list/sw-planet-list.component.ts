import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Planet } from '../../../models';
import { PlanetService } from '../../../services/planet.service';

@Component({
  selector: 'app-sw-planet-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './sw-planet-list.component.html',
  styleUrl: './sw-planet-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetListComponent implements OnInit {
  private planetsService = inject(PlanetService);

  planets = signal<Planet[]>([]);
  nextUrl = signal<string | null>(null);
  previousUrl = signal<string | null>(null);

  ngOnInit() {
    this.loadPlanets();
  }

  loadPlanets(url?: string) {
    this.planetsService.getPlanetsList(url).subscribe({
      next: (data) => {
        this.planets.set(data.results);
        this.nextUrl.set(data.next);
        this.previousUrl.set(data.previous);
      },
      error: (err) => console.error('Error fetching planets:', err),
    });
  }

  goToNextPage() {
    const next = this.nextUrl();
    if (next) {
      this.loadPlanets(next);
    }
  }

  goToPreviousPage() {
    const prev = this.previousUrl();
    if (prev) {
      this.loadPlanets(prev);
    }
  }
}
