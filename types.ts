export interface Student {
  id: number;
}

export interface Group {
  id: number;
  name: string;
  members: number[];
}

export interface GroupingConfig {
  totalStudents: number;
  numberOfGroups: number;
  isRandom: boolean;
}
