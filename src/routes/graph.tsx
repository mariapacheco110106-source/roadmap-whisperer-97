import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";
import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { TOPICS, DOMAIN_BY_ID } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/graph")({
  head: () => ({ meta: [{ title: "Grafo de dependencias — AI SWE Roadmap" }] }),
  component: GraphPage,
});

function layout(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 30, ranksep: 80 });
  nodes.forEach((n) => g.setNode(n.id, { width: 180, height: 50 }));
  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);
  return nodes.map((n) => {
    const pos = g.node(n.id);
    return { ...n, position: { x: pos.x - 90, y: pos.y - 25 } };
  });
}

function GraphPage() {
  const p = useProgress();
  const navigate = useNavigate();

  const { nodes, edges } = useMemo(() => {
    const rawNodes: Node[] = TOPICS.map((t) => {
      const d = DOMAIN_BY_ID[t.domain];
      const done = p.done[t.id];
      return {
        id: t.id,
        data: { label: t.title },
        position: { x: 0, y: 0 },
        style: {
          background: done ? d.color : "var(--color-card)",
          color: done ? "#fff" : "var(--color-foreground)",
          border: `1px solid ${d.color}`,
          borderRadius: 6,
          fontSize: 11,
          padding: 6,
          width: 180,
        },
      };
    });
    const rawEdges: Edge[] = TOPICS.flatMap((t) =>
      t.prerequisites.map((pid) => ({
        id: `${pid}->${t.id}`,
        source: pid,
        target: t.id,
        animated: false,
        style: { stroke: "var(--color-border)", strokeWidth: 1 },
      })),
    );
    return { nodes: layout(rawNodes, rawEdges), edges: rawEdges };
  }, [p.done]);

  useEffect(() => {}, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="pb-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Grafo</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Dependencias del roadmap</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cada nodo es un tema. Las flechas indican prerrequisitos. Los nodos coloreados están completados.
        </p>
      </header>
      <div className="h-[75vh] w-full overflow-hidden rounded-lg border border-border bg-card">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_e, n) => navigate({ to: "/topic/$topicId", params: { topicId: n.id } })}
          fitView
          minZoom={0.2}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
    </main>
  );
}
