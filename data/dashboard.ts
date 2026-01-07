export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
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
