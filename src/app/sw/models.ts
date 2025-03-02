export interface Resource {
  readonly name: string;
  readonly created: string;
  readonly edited: string;
  readonly url: string;
}

export interface ResourcesList<T extends Resource> {
  readonly count: number;
  readonly previous: string | null;
  readonly next: string | null;
  readonly results: readonly T[];
}

export interface SearchData {
  readonly search?: string;
  readonly page?: string;
}

export interface Person extends Resource {
  readonly birth_year: string; // The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
  readonly eye_color: string; // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
  readonly gender: string; // The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  readonly hair_color: string; // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
  readonly height: string; // The height of the person in centimeters.
  readonly mass: string; // The mass of the person in kilograms.
  readonly skin_color: string; // The skin color of this person.
  readonly homeworld: string | null; // The URL of a planet resource, a planet that this person was born on or inhabits.
  readonly films: readonly string[]; // An array of film resource URLs that this person has been in.
  readonly species: readonly string[]; // An array of species resource URLs that this person belongs to.
  readonly starships: readonly string[]; // An array of starship resource URLs that this person has piloted.
  readonly vehicles: readonly string[]; // An array of vehicle resource URLs that this person has piloted.
}

export interface Species extends Resource {
  readonly classification: string; // The classification of this species, such as "mammal" or "reptile".
  readonly designation: string; // The designation of this species, such as "sentient".
  readonly average_height: string; // The average height of this species in centimeters.
  readonly average_lifespan: string; // The average lifespan of this species in years.
  readonly eye_colors: string; // A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
  readonly hair_colors: string; // A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
  readonly skin_colors: string; // A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
  readonly language: string; // The language commonly spoken by this species.
  readonly homeworld: string | null; // The URL of a planet resource, a planet that this species originates from.
  readonly people: string[]; // An array of People URL Resources that are a part of this species.
  readonly films: string[]; // An array of Film URL Resources that this species has appeared in.
}

export interface Planet extends Resource {
  readonly diameter: string; // The diameter of this planet in kilometers.
  readonly rotation_period: string; // The number of standard hours it takes for this planet to complete a single rotation on its axis.
  readonly orbital_period: string; // The number of standard days it takes for this planet to complete a single orbit of its local star.
  readonly gravity: string; // A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
  readonly population: string; // The average population of sentient beings inhabiting this planet.
  readonly climate: string; // The climate of this planet. Comma separated if diverse.
  readonly terrain: string; // The terrain of this planet. Comma separated if diverse.
  readonly surface_water: string; // The percentage of the planet surface that is naturally occurring water or bodies of water.
  readonly residents: string[]; // An array of People URL Resources that live on this planet.
  readonly films: string[]; // An array of Film URL Resources that this planet has appeared in.
}
