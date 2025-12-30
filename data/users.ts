export type UserRow = {
  id: string;
  name: string;
  email: string;
  lastActiveLabel: string;
  lastActiveRaw: string;
};

export const userDataByAgent: Record<string, UserRow[]> = {
  bumperbuddy: [
    {
      id: "bb-user-1",
      name: "Mark Doe",
      email: "mark.doe@bumperbuddy.nl",
      lastActiveLabel: "10 minuten geleden",
      lastActiveRaw: "2024-05-05T10:50:00+02:00",
    },
    {
      id: "bb-user-2",
      name: "Sarah Doe",
      email: "sarah.doe@bumperbuddy.nl",
      lastActiveLabel: "2 uur geleden",
      lastActiveRaw: "2024-05-05T09:00:00+02:00",
    },
    {
      id: "bb-user-3",
      name: "Josh Doe",
      email: "josh.doe@bumperbuddy.nl",
      lastActiveLabel: "1 dag geleden",
      lastActiveRaw: "2024-05-04T12:30:00+02:00",
    },
    {
      id: "bb-user-4",
      name: "Chameli Doe",
      email: "chameli.doe@bumperbuddy.nl",
      lastActiveLabel: "3 dagen geleden",
      lastActiveRaw: "2024-05-02T12:00:00+02:00",
    },
    {
      id: "bb-user-5",
      name: "Jeremiah Doe",
      email: "jeremiah.doe@bumperbuddy.nl",
      lastActiveLabel: "2 weken geleden",
      lastActiveRaw: "2024-04-21T12:00:00+02:00",
    },
  ],
  fietsfix: [
    {
      id: "ff-user-1",
      name: "Jake Doe",
      email: "jake.doe@fietsfix.nl",
      lastActiveLabel: "30 minuten geleden",
      lastActiveRaw: "2024-05-05T10:30:00+02:00",
    },
    {
      id: "ff-user-2",
      name: "Juri Doe",
      email: "juri.doe@fietsfix.nl",
      lastActiveLabel: "4 uur geleden",
      lastActiveRaw: "2024-05-05T07:00:00+02:00",
    },
    {
      id: "ff-user-3",
      name: "John Doe",
      email: "john.doe@fietsfix.nl",
      lastActiveLabel: "2 dagen geleden",
      lastActiveRaw: "2024-05-03T12:00:00+02:00",
    },
    {
      id: "ff-user-4",
      name: "Sarah Doe",
      email: "sarah.doe@fietsfix.nl",
      lastActiveLabel: "1 week geleden",
      lastActiveRaw: "2024-04-28T12:00:00+02:00",
    },
  ],
};

export const fallbackUsers: UserRow[] = [
  {
    id: "default-user-1",
    name: "Onbekende gebruiker",
    email: "onbekend@example.com",
    lastActiveLabel: "Onbekend",
    lastActiveRaw: "2023-11-05T12:00:00+01:00",
  },
];
