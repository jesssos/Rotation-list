export interface ShiftLog {
  date: string;
  personId: string;
  category: string;
}

export interface CalledOutShift {
  date: string;
  calledOutPersonId: string;
  coveredByPersonId: string | null;
  category: string;
  shift: string;
  notes: string;
  reason: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  movedOn: string;
  notes: string;
  shiftCount: number;
  shiftStatus: 'picked_up' | 'called' | null;
}

export interface BiweeklyRecord {
  startDate: string;
  endDate: string;
  categories: Record<string, Person[]>;
  pickedUpShifts: ShiftLog[];
  calledShifts: ShiftLog[];
  calledOutShifts: CalledOutShift[];
}

export const categories = {
  fullTimeStaff: [
    { id: "ft1", firstName: "John", lastName: "Smith", phone: "(123) 555-0101", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "ft2", firstName: "Sarah", lastName: "Johnson", phone: "(123) 555-0102", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "ft3", firstName: "Michael", lastName: "Brown", phone: "(123) 555-0103", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "ft4", firstName: "Emily", lastName: "Davis", phone: "(123) 555-0104", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "ft5", firstName: "James", lastName: "Wilson", phone: "(123) 555-0105", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  partTimeStaff: [
    { id: "pt1", firstName: "Emma", lastName: "Taylor", phone: "(123) 555-0201", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "pt2", firstName: "Daniel", lastName: "Anderson", phone: "(123) 555-0202", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "pt3", firstName: "Sophia", lastName: "Martinez", phone: "(123) 555-0203", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "pt4", firstName: "Oliver", lastName: "Thompson", phone: "(123) 555-0204", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "pt5", firstName: "Ava", lastName: "White", phone: "(123) 555-0205", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category1: [
    { id: "1", firstName: "Alice", lastName: "Johnson", phone: "(123) 456-7890", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "2", firstName: "Bob", lastName: "Smith", phone: "(234) 567-8901", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "3", firstName: "Charlie", lastName: "Brown", phone: "(345) 678-9012", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "4", firstName: "David", lastName: "Williams", phone: "(456) 789-0123", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "5", firstName: "Eve", lastName: "Davis", phone: "(567) 890-1234", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category2: [
    { id: "6", firstName: "Frank", lastName: "Miller", phone: "(678) 901-2345", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "7", firstName: "Grace", lastName: "Wilson", phone: "(789) 012-3456", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "8", firstName: "Helen", lastName: "Moore", phone: "(890) 123-4567", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "9", firstName: "Ivan", lastName: "Taylor", phone: "(901) 234-5678", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "10", firstName: "Judy", lastName: "Anderson", phone: "(012) 345-6789", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category3: [
    { id: "11", firstName: "Kevin", lastName: "Lee", phone: "(123) 987-6543", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "12", firstName: "Laura", lastName: "King", phone: "(234) 876-5432", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "13", firstName: "Megan", lastName: "Scott", phone: "(345) 765-4321", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "14", firstName: "Nina", lastName: "Young", phone: "(456) 654-3210", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "15", firstName: "Oscar", lastName: "Harris", phone: "(567) 543-2109", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category4: [
    { id: "16", firstName: "Paul", lastName: "Garcia", phone: "(678) 432-1098", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "17", firstName: "Quincy", lastName: "Martinez", phone: "(789) 321-0987", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "18", firstName: "Rita", lastName: "Lopez", phone: "(890) 210-9876", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "19", firstName: "Sam", lastName: "Gonzalez", phone: "(901) 109-8765", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "20", firstName: "Tina", lastName: "Perez", phone: "(012) 098-7654", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category5: [
    { id: "21", firstName: "Uma", lastName: "Singh", phone: "(123) 765-4321", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "22", firstName: "Vera", lastName: "Patel", phone: "(234) 654-3210", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "23", firstName: "Will", lastName: "Chen", phone: "(345) 543-2109", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "24", firstName: "Xander", lastName: "Zhang", phone: "(456) 432-1098", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "25", firstName: "Yara", lastName: "Kim", phone: "(567) 321-0987", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ],
  category6: [
    { id: "26", firstName: "Lisa", lastName: "Johnson", phone: "(123) 476-7891", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "27", firstName: "Richard", lastName: "Smith", phone: "(234) 123-8901", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "28", firstName: "Charles", lastName: "Pink", phone: "(345) 699-9012", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "29", firstName: "Joseph", lastName: "Willias", phone: "(456) 123-0123", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null },
    { id: "30", firstName: "Evie", lastName: "Davis", phone: "(567) 890-4321", movedOn: "", notes: "", shiftCount: 0, shiftStatus: null }
  ]
} as const;