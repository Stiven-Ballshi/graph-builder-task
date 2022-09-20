import { Handle, Position } from "react-flow-renderer";

const handleStyle = { left: 10 };

function HandleAddNode({ data }) {
  const { addNode, addCrossroad } = data;

  return (
    <div className="nodeActions">
      <Handle type="target" position={Position.Top} />

      <button onClick={addNode}>Add Tool</button>
      <button onClick={addCrossroad}>Add Crossroad</button>

      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}

export default HandleAddNode;
