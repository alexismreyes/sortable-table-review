export interface Person {
  Name: string;
  'Favorite Food': string;
  'Favorite Movie': string;
  Status: 'Active' | 'Inactive';
  Date?: string;
}

export interface sortableState {
  people: Person[];
  sortedPeople: Person[];
  selectedKey: keyof Person;
  sortOrder: 'asc' | 'desc';
}

export type Action =
  | { type: 'UPDATE_PEOPLE'; payload: Person[] }
  | { type: 'UPDATE_SORTEDPEOPLE'; payload: Person[] }
  | { type: 'UPDATE_SELECTEDKEY'; payload: keyof Person }
  | { type: 'UPDATE_SORTORDER'; payload: 'asc' | 'desc' };
