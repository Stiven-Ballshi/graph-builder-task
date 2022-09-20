import React from 'react';
import { useStoreApi, useReactFlow } from 'react-flow-renderer';

const Sidebar = () => {
  const store = useStoreApi();
  const {setCenter} = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.55;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return (
    <aside>
      <button onClick={focusNode}>Focus Main Node</button>
    </aside>
  );
};

export default Sidebar;