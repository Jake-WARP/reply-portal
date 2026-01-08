"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardCharts, DashboardInsights } from "@/data/dashboard";

type DashboardChartsProps = {
  charts: DashboardCharts;
  insights: DashboardInsights;
};

function formatTooltipValue(value: number) {
  return value.toString();
}

function formatNumber(value: number) {
  return value.toLocaleString("nl-NL");
}

function formatCurrency(value: number) {
  return value.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const levelStyles = {
  error: "bg-red-500 text-white",
  warning: "bg-slate-200 text-slate-800",
  info: "border border-slate-300 text-slate-700",
} as const;

export default function DashboardCharts({
  charts,
  insights,
}: DashboardChartsProps) {
  const chartData = charts.hours.map((hour, index) => ({
    hour,
    cpu: charts.cpu[index],
    memory: charts.memory[index],
    requests: charts.requests[index],
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>CPU- & geheugengebruik per uur</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis
                dataKey="hour"
                interval={2}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                formatter={formatTooltipValue}
                contentStyle={{
                  borderRadius: "8px",
                  borderColor: "#e4e4e7",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="memory"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="mt-3 flex items-center gap-6 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              CPU %
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Geheugen %
            </span>
          </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verzoeken per uur</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis
                dataKey="hour"
                interval={2}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                formatter={formatTooltipValue}
                contentStyle={{
                  borderRadius: "8px",
                  borderColor: "#e4e4e7",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="requests" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Token &amp; kosten overzicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-sm text-slate-600">
                Totaal tokens (deze maand)
              </p>
              <p className="text-2xl font-semibold">
                {formatNumber(insights.tokenSummary.totalTokens)}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-sm text-slate-600">
                Totale kosten (deze maand)
              </p>
              <p className="text-2xl font-semibold">
                {formatCurrency(insights.tokenSummary.totalCost)}
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            {insights.tokenRows.map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <span className="font-medium text-slate-900">{row.month}</span>
                <span className="text-slate-600">
                  {formatNumber(row.tokens)} tokens
                </span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(row.cost)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Foutmeldingen log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.errorLog.map((item) => (
            <div key={item.id} className="flex gap-4">
              <span
                className={`inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold ${
                  levelStyles[item.level]
                }`}
              >
                {item.level === "error"
                  ? "Fout"
                  : item.level === "warning"
                  ? "Waarsch."
                  : "Info"}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.meta}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
