import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LEVELS } from "../data/levels";
import {
  ArrowLeft,
  BookOpen,
  Map,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Download,
  Loader2,
} from "lucide-react";

// Custom Node Component matching the site's dark matte premium UI
const CustomNode = ({ data, isConnectable }: any) => {
  const Icon = data.icon || BookOpen;
  const isExpandable = data.isExpandable;
  const isExpanded = data.isExpanded;

  return (
    <div
      className={`px-4 py-3 shadow-2xl rounded-2xl bg-[#1e1e1e] border border-white/10 min-w-[180px] flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/10 hover:border-blue-500/50 group relative`}
      onClick={data.onClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-blue-500 !border-none"
      />
      <div
        className={`p-2.5 rounded-xl flex-shrink-0 ${
          data.fallbackColor
            ? data.fallbackColor
            : "bg-white/5 group-hover:bg-blue-500/20"
        } transition-colors`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
          {data.label}
        </div>
        {data.description && (
          <div className="text-xs text-neutral-400 max-w-[150px] truncate mt-0.5">
            {data.description}
          </div>
        )}
      </div>
      {isExpandable && (
        <div className="text-neutral-500 group-hover:text-blue-400 transition-colors absolute -right-3 bg-[#1e1e1e] rounded-full border border-white/10">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-blue-500 !border-none"
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const MindMapPage = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Function to recursively find all descendants of a node
  const getDescendants = useCallback(
    (nodeId: string, currentEdges: Edge[]): string[] => {
      const children = currentEdges
        .filter((e) => e.source === nodeId)
        .map((e) => e.target);
      const descendants = [...children];
      children.forEach((childId) => {
        descendants.push(...getDescendants(childId, currentEdges));
      });
      return descendants;
    },
    [],
  );

  // Handle click on a node
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // If this node is a module (leaf node with navigation), navigate to it
      if (node.data.navTo) {
        navigate(node.data.navTo as string);
        return;
      }

      setNodes((nds) => {
        const isCurrentlyExpanded = !!node.data.isExpanded;

        // Update the clicked node's expanded state
        let nextNodes = nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: { ...n.data, isExpanded: !isCurrentlyExpanded },
            };
          }
          return n;
        });

        if (isCurrentlyExpanded) {
          // Collapsing: Hide all descendants
          const descendants = getDescendants(node.id, edges);
          nextNodes = nextNodes.map((n) => {
            if (descendants.includes(n.id)) {
              return {
                ...n,
                hidden: true,
                data: { ...n.data, isExpanded: false }, // Reset their expanded state too
              };
            }
            return n;
          });
        } else {
          // Expanding: Show direct children only
          const directChildrenIds = edges
            .filter((e) => e.source === node.id)
            .map((e) => e.target);
          nextNodes = nextNodes.map((n) => {
            if (directChildrenIds.includes(n.id)) {
              return { ...n, hidden: false };
            }
            return n;
          });
        }

        // Persist state
        const newlyExpanded = nextNodes
          .filter((n) => n.data.isExpanded)
          .map((n) => n.id);
        sessionStorage.setItem(
          "mindMapExpanded",
          JSON.stringify(newlyExpanded),
        );

        return nextNodes;
      });

      setEdges((eds) => {
        const isCurrentlyExpanded = !!node.data.isExpanded;
        let nextEdges = [...eds];

        if (isCurrentlyExpanded) {
          // Hide edges leading to descendants
          const descendants = getDescendants(node.id, eds);
          nextEdges = nextEdges.map((e) => {
            if (descendants.includes(e.target)) {
              return { ...e, hidden: true };
            }
            return e;
          });
        } else {
          // Show edges leading to direct children
          const directChildrenIds = eds
            .filter((e) => e.source === node.id)
            .map((e) => e.target);
          nextEdges = nextEdges.map((e) => {
            if (directChildrenIds.includes(e.target)) {
              return { ...e, hidden: false };
            }
            return e;
          });
        }
        return nextEdges;
      });
    },
    [edges, getDescendants, navigate, setNodes, setEdges],
  );

  const initGraph = useCallback(
    (reset: boolean = false) => {
      if (reset) {
        sessionStorage.removeItem("mindMapExpanded");
      }

      const initialNodes: Node[] = [];
      const initialEdges: Edge[] = [];
      let yOffset = 0;

      // Root Node
      initialNodes.push({
        id: "root",
        type: "custom",
        position: { x: 0, y: 500 },
        data: {
          label: "Learning Universe",
          description: "Your journey starts here",
          icon: Map,
          fallbackColor: "bg-blue-600",
          isExpandable: true,
        },
      });

      const activeLevels = levelId
        ? LEVELS.filter((l) => l.id === levelId)
        : LEVELS.filter((l) => l.modules.length > 0);

      activeLevels.forEach((level, levelIndex) => {
        const levelY = yOffset + levelIndex * 800;
        const levelIdStr = `level-${level.id}`;

        initialNodes.push({
          id: levelIdStr,
          type: "custom",
          parentId: "root",
          position: { x: 450, y: levelY - 500 }, // Relative to root
          data: {
            label: level.title,
            description: level.description,
            fallbackColor: level.fallback,
            isExpandable: true,
          },
        });

        initialEdges.push({
          id: `e-root-${levelIdStr}`,
          source: "root",
          target: levelIdStr,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
        });

        // Group modules by category
        const categories = ["words", "grammar", "sentences", "tests"];

        categories.forEach((cat, catIndex) => {
          const catModules = level.modules.filter((m) => m.category === cat);
          if (catModules.length === 0) return;

          const catIdStr = `cat-${level.id}-${cat}`;
          const catY = levelY + (catIndex - 1.5) * 250;

          initialNodes.push({
            id: catIdStr,
            type: "custom",
            parentId: levelIdStr,
            position: { x: 450, y: catY - levelY }, // Relative to level
            data: {
              label: cat.charAt(0).toUpperCase() + cat.slice(1),
              fallbackColor: "bg-white/10",
              isExpandable: true,
            },
          });

          initialEdges.push({
            id: `e-${levelIdStr}-${catIdStr}`,
            source: levelIdStr,
            target: catIdStr,
            type: "smoothstep",
            style: { stroke: "#404040", strokeWidth: 2 },
          });

          catModules.forEach((mod, modIndex) => {
            const modIdStr = `mod-${level.id}-${cat}-${modIndex}`;
            const modY = catY + (modIndex - catModules.length / 2) * 100;

            initialNodes.push({
              id: modIdStr,
              type: "custom",
              parentId: catIdStr,
              position: { x: 450, y: modY - catY }, // Relative to category
              data: {
                label: mod.title,
                icon: mod.icon,
                fallbackColor: level.fallback,
                navTo: mod.to,
                isExpandable: false,
              },
            });

            initialEdges.push({
              id: `e-${catIdStr}-${modIdStr}`,
              source: catIdStr,
              target: modIdStr,
              type: "smoothstep",
              style: { stroke: "#404040", strokeWidth: 1.5 },
            });
          });
        });
      });

      // Apply visibility and expanded state from sessionStorage
      const savedExpandedStr = sessionStorage.getItem("mindMapExpanded");
      const savedExpanded: string[] = savedExpandedStr
        ? JSON.parse(savedExpandedStr)
        : ["root"];

      const visibleNodes = new Set<string>(["root"]);
      const queue = ["root"];

      while (queue.length > 0) {
        const current = queue.shift()!;
        if (savedExpanded.includes(current)) {
          const children = initialEdges
            .filter((e) => e.source === current)
            .map((e) => e.target);
          children.forEach((child) => {
            visibleNodes.add(child);
            queue.push(child);
          });
        }
      }

      initialNodes.forEach((n) => {
        n.hidden = !visibleNodes.has(n.id);
        if (n.data) {
          n.data.isExpanded = savedExpanded.includes(n.id);
        }
      });

      initialEdges.forEach((e) => {
        e.hidden = !visibleNodes.has(e.target);
      });

      setNodes(initialNodes);
      setEdges(initialEdges);
    },
    [levelId, setNodes, setEdges],
  );

  // Initial Setup
  useEffect(() => {
    initGraph();
  }, [initGraph]);

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = useCallback(() => {
    const flowElement = document.querySelector(
      ".react-flow__viewport",
    ) as HTMLElement;
    if (!flowElement) return;

    // Filter only visible nodes
    const visibleNodes = nodes.filter((n) => !n.hidden);
    if (visibleNodes.length === 0) return;

    setIsDownloading(true);

    // Calculate absolute positions for nodes with parentId
    const absoluteNodes = visibleNodes.map((n) => {
      let x = n.position.x;
      let y = n.position.y;
      let parentId = n.parentId;

      while (parentId) {
        const parentNode = nodes.find((pn) => pn.id === parentId);
        if (parentNode) {
          x += parentNode.position.x;
          y += parentNode.position.y;
          parentId = parentNode.parentId;
        } else {
          break;
        }
      }
      return { ...n, position: { x, y } };
    });

    const nodesBounds = getNodesBounds(absoluteNodes);
    const width = nodesBounds.width + 150;
    const height = nodesBounds.height + 150;

    const transform = getViewportForBounds(
      nodesBounds,
      width,
      height,
      0.1, // min zoom
      2, // max zoom
      0.2, // padding
    );

    import("html-to-image").then(({ toPng }) => {
      toPng(flowElement, {
        backgroundColor: "#0a0a0a",
        width: width,
        height: height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
        },
        pixelRatio: 2, // High resolution
      })
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute("download", "learning-mindmap.png");
          a.setAttribute("href", dataUrl);
          a.click();
          setIsDownloading(false);
        })
        .catch(() => setIsDownloading(false));
    });
  }, [nodes]);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col animate-in fade-in duration-700 fixed inset-0 z-50">
      {/* Floating Transparent UI */}
      <div className="absolute top-4 md:top-6 left-0 w-full px-4 md:px-8 z-10 pointer-events-none flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
        {/* Title Area */}
        <div className="flex items-center gap-4 drop-shadow-xl pointer-events-auto">
          {/* Back button for Desktop */}
          <button
            onClick={() => navigate(-1)}
            className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2 md:gap-3">
              <Map className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              Learning Universe
            </h1>
            <p className="text-xs md:text-sm font-medium text-neutral-400">
              Explore visually. Click nodes to expand.
            </p>
          </div>
        </div>

        {/* Action Buttons Area */}
        <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          {/* Back button for Mobile */}
          <button
            onClick={() => navigate(-1)}
            className="md:hidden flex-shrink-0 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95 shadow-lg"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={downloadImage}
            disabled={isDownloading}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-xl transition-all text-xs md:text-sm font-bold text-blue-400 group disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:shadow-[0_0_25px_rgba(37,99,235,0.2)]"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
              <Download className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            <span className="whitespace-nowrap">
              {isDownloading ? "Preparing..." : "Export Map"}
            </span>
          </button>

          <button
            onClick={() => initGraph(true)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-xs md:text-sm font-bold text-white hover:text-blue-400 group active:scale-95 shadow-lg"
          >
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-700" />
            <span className="whitespace-nowrap">Reset View</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          className="bg-[#0a0a0a]"
        >
          <Background color="#262626" gap={20} size={1.5} />
          <Controls className="!bg-[#1a1a1a]/95 backdrop-blur-2xl !border-2 !border-white/5 !shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-full h-24 w- [&>button]:!bg-transparent [&>button]:!border-none" />
        </ReactFlow>
      </div>
    </div>
  );
};
