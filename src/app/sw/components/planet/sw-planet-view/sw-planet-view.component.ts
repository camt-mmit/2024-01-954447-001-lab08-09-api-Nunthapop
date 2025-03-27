import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../../../models';
import { PlanetService } from '../../../services/planet.service';

@Component({
  selector: 'app-sw-planet-view',
  imports: [],
  templateUrl: './sw-planet-view.component.html',
  styleUrl: './sw-planet-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private planetsService = inject(PlanetService);
  planet = signal<Planet | undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.planetsService.getPlanet(+id).subscribe({
        next: (data: Planet) => this.planet.set(data),
        error: (err) => console.error('Error fetching planet:', err),
      });
    }
  }
}
