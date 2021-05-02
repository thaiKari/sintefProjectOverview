export interface Data {
  Name: string,
  Id: string,
  Samples: number,
  Assignments: number,
  coordinates?: any[]
}

export const data: Data[] = [
  {
    Name: "United States of America",
    Id: "USA",
    Samples: 50,
    Assignments: 4,
  },
  {
    Name: "Norway",
    Id: "NOR",
    Samples: 500,
    Assignments: 40,
  },
  {
    Name: "Thailand",
    Id: "THA",
    Samples: 3,
    Assignments: 1,
  },
  {
    Name: "Egypt",
    Id: "EGY",
    Samples: 20,
    Assignments: 3,
  },
];
