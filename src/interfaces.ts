export interface Subrace {
  name: string;
}

export interface Race {
  name: string;
  subraces?: Subrace[];
}

export interface Ability {
  name: string;
  acronym: string;
  score: number;
  plusOne: boolean;
  plusTwo: boolean;
}
