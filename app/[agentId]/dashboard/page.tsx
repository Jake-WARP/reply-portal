import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardCharts from "@/components/dashboard-charts";
import {
  dashboardDataByAgent,
  dashboardChartsByAgent,
  fallbackDashboardCharts,
  fallbackDashboardMetrics,
} from "@/data/dashboard";

interface PageProps {
  params: {
    agentId: string;
  };
}

const deltaToneStyles = {
  up: "text-emerald-600",
  down: "text-red-600",
  neutral: "text-zinc-600",
} as const;

function metricValueNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default async function DashboardPage({ params }: PageProps) {
  const { agentId } = await params;
  const metrics = dashboardDataByAgent[agentId] ?? fallbackDashboardMetrics;
  const charts = dashboardChartsByAgent[agentId] ?? fallbackDashboardCharts;
  const metricMap = Object.fromEntries(
    metrics.map((metric) => [metric.id, metricValueNumber(metric.value)])
  );
  const alignedCharts = {
    ...charts,
    cpu: [...charts.cpu],
    memory: [...charts.memory],
    requests: [...charts.requests],
  };
  if (alignedCharts.cpu.length > 0) {
    alignedCharts.cpu[alignedCharts.cpu.length - 1] =
      metricMap.cpu ?? alignedCharts.cpu[alignedCharts.cpu.length - 1];
  }
  if (alignedCharts.memory.length > 0) {
    alignedCharts.memory[alignedCharts.memory.length - 1] =
      metricMap.memory ?? alignedCharts.memory[alignedCharts.memory.length - 1];
  }
  if (alignedCharts.requests.length > 0) {
    alignedCharts.requests[alignedCharts.requests.length - 1] =
      metricMap.requests ?? alignedCharts.requests[alignedCharts.requests.length - 1];
  }

  return (
    <section className="space-y-6 text-zinc-900">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-600">
          Overzicht voor {agentId}.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle>{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{metric.value}</div>
              {metric.delta ? (
                <p
                  className={`text-sm ${
                    deltaToneStyles[metric.deltaTone ?? "neutral"]
                  }`}
                >
                  {metric.delta}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
      <DashboardCharts charts={alignedCharts} />
    </section>
  );
}
