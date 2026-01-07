import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  dashboardDataByAgent,
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

export default async function DashboardPage({ params }: PageProps) {
  const { agentId } = await params;
  const metrics = dashboardDataByAgent[agentId] ?? fallbackDashboardMetrics;

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
    </section>
  );
}
