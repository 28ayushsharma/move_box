
function Box(props) {

    return (
        <div 
            id={props.boxId} 
            onClick={props.selectBox} 
            style={props.boxStyle}

            className={props.selectedBox == props.boxId ? "box selected_box" : "box"}
            
            >
                {props.boxId}
        </div>
    );
  }
  
  export default Box;
  