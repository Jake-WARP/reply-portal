export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
};

export type DashboardCharts = {
  hours: string[];
  cpu: number[];
  memory: number[];
  requests: number[];
};

export const dashboardDataByAgent: Record<string, DashboardMetric[]> = {
  bumperbuddy: [
    {
      id: "cpu",
      label: "CPU-gebruik",
      value: "42%",
      delta: "+3% sinds vorig uur",
      deltaTone: "up",
    },
    {
      id: "memory",
      label: "Geheugengebruik",
      value: "68%",
      delta: "+1% sinds vorig uur",
      deltaTone: "up",
    },
    {
      id: "requests",
      label: "Verzoeken/uur",
      value: "312",
      delta: "-6% sinds vorig uur",
      deltaTone: "down",
    },
    {
      id: "uptime",
      label: "Up-time",
      value: "99,8%",
      delta: "18 dagen",
      deltaTone: "neutral",
    },
  ],
  fietsfix: [
    {
      id: "cpu",
      label: "CPU-gebruik",
      value: "27%",
      delta: "-2% sinds vorig uur",
      deltaTone: "down",
    },
    {
      id: "memory",
      label: "Geheugengebruik",
      value: "54%",
      delta: "+4% sinds vorig uur",
      deltaTone: "up",
    },
    {
      id: "requests",
      label: "Verzoeken/uur",
      value: "188",
      delta: "+9% sinds vorig uur",
      deltaTone: "up",
    },
    {
      id: "uptime",
      label: "Up-time",
      value: "99,5%",
      delta: "9 dagen",
      deltaTone: "neutral",
    },
  ],
};

export const dashboardChartsByAgent: Record<string, DashboardCharts> = {
  bumperbuddy: {
    hours: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    cpu: [35, 33, 30, 28, 31, 40, 52, 61, 68, 72, 75, 78, 76, 71, 69, 73, 77, 70, 58, 49, 44, 41, 38, 36],
    memory: [52, 51, 49, 47, 46, 50, 55, 60, 66, 70, 73, 76, 78, 77, 75, 76, 78, 72, 66, 62, 60, 58, 57, 56],
    requests: [210, 190, 160, 130, 120, 140, 180, 260, 340, 410, 460, 520, 560, 540, 530, 510, 480, 420, 360, 310, 280, 260, 240, 220],
  },
  fietsfix: {
    hours: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    cpu: [24, 22, 20, 19, 21, 26, 30, 34, 38, 41, 44, 46, 45, 43, 41, 39, 36, 33, 30, 28, 27, 26, 25, 24],
    memory: [46, 45, 44, 42, 41, 43, 46, 50, 54, 57, 60, 63, 65, 64, 62, 61, 59, 57, 55, 53, 52, 51, 50, 49],
    requests: [120, 110, 95, 85, 80, 90, 120, 170, 230, 280, 320, 360, 380, 370, 360, 330, 300, 260, 220, 190, 170, 150, 140, 130],
  },
};

export const fallbackDashboardMetrics: DashboardMetric[] = [
  {
    id: "cpu",
    label: "CPU-gebruik",
    value: "11%",
    delta: "+1% sinds vorig uur",
    deltaTone: "up",
  },
  {
    id: "memory",
    label: "Geheugengebruik",
    value: "27%",
    delta: "-3% sinds vorig uur",
    deltaTone: "down",
  },
  {
    id: "requests",
    label: "Verzoeken/uur",
    value: "62",
    delta: "+6% sinds vorig uur",
    deltaTone: "up",
  },
  {
    id: "uptime",
    label: "Up-time",
    value: "99,7%",
    delta: "12 dagen",
    deltaTone: "neutral",
  },
];

export const fallbackDashboardCharts: DashboardCharts = {
  hours: [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  cpu: [22, 21, 20, 19, 20, 24, 29, 33, 36, 40, 43, 45, 46, 44, 42, 40, 37, 35, 32, 30, 28, 27, 26, 25],
  memory: [48, 47, 46, 45, 44, 46, 49, 52, 56, 59, 62, 64, 66, 65, 63, 61, 59, 57, 55, 53, 52, 51, 50, 49],
  requests: [140, 130, 120, 110, 105, 120, 150, 200, 260, 320, 360, 400, 420, 410, 390, 360, 330, 300, 260, 230, 210, 190, 170, 160],
};
