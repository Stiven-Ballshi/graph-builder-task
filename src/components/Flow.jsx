import { useState, useCallback, useRef, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Background,
} from "react-flow-renderer";
import { faker } from "@faker-js/faker";
import Sidebar from "./Sidebar";
// import { HandlerNode } from "./handler";
// import HandleAddNode from "./HandlerAddNode";

// import AddNode from "./AddNode";
// Generate random character ID for Node
function getRandomUppercaseChar() {
  var r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}
const initialEdges = [];
const initialNodes = [
  {
    id: `${getRandomUppercaseChar()}`,
    position: { x: 0, y: 0 },
    sourcePosition: "bottom",
    style: {
      width: 100,
    },
    data: {
      label: faker.name.fullName(),
    },
  },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeId, setNodeId] = useState(undefined);
  const [nodePos, setNodePos] = useState(null);
  const yPos = useRef(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalForNodes, SetopenModalForNodes] = useState(false);
  const [prevNode, setPrevNode] = useState(false);

  // const nodeTypes = useMemo(
  //   () => ({ handleNode: HandlerNode }, { handleAddNode: HandleAddNode }),
  //   []
  // );

  // Controlled component react node functions
  const onNodesChange = useCallback(
    (changes) => {
      // setNodePos({ x: changes[0]?.position?.x, y:changes[0]?.position?.y});
      // setNodePos(changes[0]?.position);
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Get node position on drag end ( when dropping node )
  const onNodeDragStop = (_, node) => {
    const x = node.position.x + node.width / 2;
    const y = node.position.y + node.height / 2;
    setNodePos({ x, y });
  };

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  // Get clicked node ids
  const onNodeClick = (e) => {
    const _nodeId_ = e.target.getAttribute("data-id");
    setNodeId(_nodeId_);
  };

  // Add 1 node
  const addNode = useCallback(
    (prev) => {
      yPos.current += 50;
      const defaultPos = { x: 0, y: 76 };
      const _prevNode_ = prev.getAttribute("data-id");

      const node = {
        id: `${getRandomUppercaseChar()}`,
        position: defaultPos,
        sourcePosition: "bottom",
        parentNode: _prevNode_,
        style: {
          width: 100,
        },
        data: {
          label: faker.name.fullName(),
        },
      };

      setNodes((nodes) => {
        return [...nodes, node];
      });

      if (prev) {
        const _prevNode_id = prev.getAttribute("data-id");
        setEdges((edges) => {
          return [
            ...edges,
            // For connecting edges , 'source' is the current node added and 'target' is the previous node
            {
              id: `${node.id}-${_prevNode_id}`,
              source: `${node.id}`,
              target: `${_prevNode_id}`,
              type: "step",
            },
          ];
        });
      }
      setOpenModal(false);
    },
    [nodePos]
  );

  const addCrossroad = useCallback(
    (prev) => {
      yPos.current += 50;
      const _prevNode_ = prev.getAttribute("data-id");
      const node = [
        {
          id: `${getRandomUppercaseChar()}-${getRandomUppercaseChar()}`,
          position: { x: -60, y: 76 },
          parentNode: _prevNode_,
          data: { label: faker.name.fullName() },
          style: { width: 100 },
        },
        {
          id: `${getRandomUppercaseChar()}-${getRandomUppercaseChar()}`,
          position: { x: 60, y: 76 },
          parentNode: _prevNode_,
          data: {
            label: faker.name.fullName(),
          },
          style: {
            width: 100,
          },
        },
      ];
      setNodes((nodes) => {
        return [...nodes, ...node];
      });
      if (prev) {
        setEdges((edges) => {
          return [
            ...edges,
            // For connecting edges , 'source' is the current node added and 'target' is the previous node
            {
              id: `${node[0].id}-${nodeId}`,
              source: `${node[0].id}`,
              target: `${nodeId}`,
              type: "step",
              animated: true,
            },
            {
              id: `${node[1].id}-${nodeId}`,
              source: `${node[1].id}`,
              target: `${nodeId}`,
              type: "step",
              animated: true,
            },
          ];
        });
      }
      setOpenModal(false);
    },
    [nodeId]
  );

  // Track node
  const TrackNode = (e) => {
    if (e.target.getAttribute("data-id")) {
      setPrevNode(e.target);
      SetopenModalForNodes((prev) => !prev);
    }
  };

  return (
    <div>
      {!nodes.length ? (
        <div className="plusIcon" onClick={() => setOpenModal((prev) => !prev)}>
          <span>+</span>
        </div>
      ) : null}

      {openModal && !nodes?.length ? (
        <div className="actionsModal">
          <button className="tool" onClick={() => addNode(prevNode)}>
            Add Tool
          </button>
          <button className="crossroad" onClick={() => addCrossroad(prevNode)}>
            Add Crossroad
          </button>
        </div>
      ) : null}

      {openModalForNodes ? (
        <div className="actionsModal">
          <button className="tool" onClick={() => addNode(prevNode)}>
            Add Tool{" "}
          </button>
          <button className="crossroad" onClick={() => addCrossroad(prevNode)}>
            Add Crossroad
          </button>
        </div>
      ) : null}

      <div style={{ height: "100vh" }}>
        <ReactFlowProvider>
          <Sidebar />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            onConnect={onConnect}
            onClick={(e) => TrackNode(e)}
            // nodeTypes={nodeTypes}
            fitView
          >
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Flow;
