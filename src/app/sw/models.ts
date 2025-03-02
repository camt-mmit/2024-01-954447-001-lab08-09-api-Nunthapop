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
