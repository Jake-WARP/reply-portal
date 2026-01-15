export type AgentOption = {
  id: string;
  label: string;
};

export const agents: AgentOption[] = [
  { id: "bumperbuddy", label: "BumperBuddy" },
  { id: "fietsfix", label: "FietsFix" },
];

export const agentLabelById = Object.fromEntries(
  agents.map((agent) => [agent.id, agent.label])
);
