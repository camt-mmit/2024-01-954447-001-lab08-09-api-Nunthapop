import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Species } from '../../../models';
import { SpeciesServiceService } from '../../../services/species-service.service';

@Component({
  selector: 'app-sw-species-view',
  imports: [],
  templateUrl: './sw-species-view.component.html',
  styleUrl: './sw-species-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private speciesService = inject(SpeciesServiceService);
  private cdr = inject(ChangeDetectorRef); // ✅ Inject ChangeDetectorRef
  species = signal<Species | undefined>(undefined);

  constructor() {
    effect(() => {
      console.log('species() updated:', this.species()); // ✅ Debug ถ้าค่าถูกอัปเดต
      this.cdr.markForCheck(); // ✅ Force UI Update
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Species ID from route:', id); // ✅ Debug ID

    if (id) {
      this.speciesService.getSpecies(+id).subscribe({
        next: (data: Species) => {
          console.log('Fetched species data:', data);
          this.species.set(data); // ✅ อัปเดตค่า
        },
        error: (err) => console.error('Error fetching species:', err),
      });
    } else {
      console.warn('No ID found in route parameters.');
    }
  }
}
