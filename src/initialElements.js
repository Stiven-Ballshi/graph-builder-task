const initialNodes = [
  {
    id: "1",
    data: {
      label: (
        <div className="nodeActions">
          <button>Add Tool</button>
          <button>Add Crossroad</button>
        </div>
      ),
    },
    position: { x: 0, y: 0 },
    style: {
      width: "270px",
    },
  },
  // {
  //   id: "499",
  //   data: {
  //     label: (
  //       <>
  //         <div>
  //           <b>Scenario 5</b>
  //         </div>
  //         Information Node
  //         <div style={{ color: "#23BB9F" }}>[1]</div>
  //       </>
  //     )
  //   },
  //   position: { x: 250, y: -200 },
  //   style: {
  //     "borderColor": "#23BB9F"
  //   }
  // },
];

export default initialNodes;
