import { signal, Signal, untracked } from '@angular/core';
import { Person, Planet, Resource, ResourceList, Species } from './models';

export const apiURL = 'https://swapi.dev/api/';

export function readonlyArray<T>(values: T[]): readonly T[] {
  return values;
}

export async function fetchResource<T>(
  url: URL | null,
): Promise<T | undefined> {
  if (url !== null) {
    const res = await fetch(url);
    const json = await res.json();

    if (res.ok) {
      return json;
    }
  }

  return undefined;
}

export function resourceSignal<T>(
  url: URL | null,
): Signal<T | null | undefined>;

export function resourceSignal<T, R>(
  url: URL | null,
  tranform: (value: T) => R | Promise<R>,
): Signal<T | null | undefined>;

export function resourceSignal<T, R>(
  url: URL | null,
  tranform?: (value: T) => R | Promise<R>,
): Signal<T | null | undefined> {
  return untracked(() => {
    const resource = signal<T | null | undefined>(undefined);

    (async () => {
      if (url !== null) {
        const res = await fetch(url);
        const json = await res.json();

        if (res.ok) {
          return resource.set(tranform ? await tranform(json) : json);
        }
      }

      return resource.set(null);
    })();

    return resource.asReadonly();
  });
}

export function parseResource(resource: Resource) {
  const { url, created, edited } = resource;
  const id = `swapi${url
    .slice(apiURL.length)
    .split('/')
    .filter((path) => !!path)
    .join('/')}`;

  return {
    ...resource,
    id,
    url: new URL(url),
    created: new Date(created),
    edited: new Date(edited),
  } as const;
}

function parseGenericResourceList<T extends Resource>(
  resourceList: ResourceList<T>,
) {
  const { previous, next } = resourceList;
  return {
    ...resourceList,
    previous: previous != null ? new URL(previous) : null,
    next: next !== null ? new URL(next) : null,
  } as const;
}
export function parseResourceList(resourceList: ResourceList<Resource>) {
  const parsedResourceList = parseGenericResourceList(resourceList);
  const { previous, next } = resourceList;
  return {
    ...resourceList,
    previous: previous != null ? new URL(previous) : null,
    next: next !== null ? new URL(next) : null,
  } as const;
}

export function parsePerson(resource: Person) {
  const { homeworld, films, species, starships, vehicles } = resource;
  return {
    ...resource,
    ...parseResource(resource),
    homeworld: homeworld !== null ? new URL(homeworld) : null,
    films: readonlyArray(films.map((url) => new URL(url))),
    species: readonlyArray(species.map((url) => new URL(url))),
    starships: readonlyArray(starships.map((url) => new URL(url))),
    vehicles: readonlyArray(vehicles.map((url) => new URL(url))),
  } as const;
}

export function parsePersonList(resourceList: ResourceList<Person>) {
  const parsedResourceList = parseGenericResourceList(resourceList);
  const { results } = parsedResourceList;
  return {
    ...parsedResourceList,
    results: readonlyArray(results.map(parsePerson)),
  } as const;
}

export function parseSpecies(data: any): Species {
  if (!data) return {} as Species; // ✅ ป้องกัน undefined
  return {
    name: data.name || '',
    classification: data.classification || '',
    designation: data.designation || '',
    average_height: data.average_height || '',
    skin_colors: data.skin_colors || '',
    hair_colors: data.hair_colors || '',
    eye_colors: data.eye_colors || '',
    average_lifespan: data.average_lifespan || '',
    homeworld: data.homeworld || '',
    language: data.language || '',
    people: data.people || [],
    films: data.films || [],
    created: data.created || '',
    edited: data.edited || '',
    url: data.url || '',
  };
}

export function parseSpeciesList(data: any): Species[] {
  if (!data || !Array.isArray(data.results)) {
    console.warn('Invalid species list format:', data);
    return [];
  }
  return data.results.map((item: any) => parseSpecies(item));
}

export function parsePlanet(data: any): Planet {
  return {
    name: data.name || '',
    rotation_period: data.rotation_period || '',
    orbital_period: data.orbital_period || '',
    diameter: data.diameter || '',
    climate: data.climate || '',
    gravity: data.gravity || '',
    terrain: data.terrain || '',
    surface_water: data.surface_water || '',
    population: data.population || '',
    residents: data.residents || [],
    films: data.films || [],
    created: data.created || '',
    edited: data.edited || '',
    url: data.url || '',
  };
}

export function parsePlanetsList(data: any): Planet[] {
  return data.results.map((item: any) => parsePlanet(item));
}
