import React, { Component } from 'react';
import Box from './boxComponent';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxes : [],
            selectedBox : null,
            etoggle:true

        }
    }


    selectBoxHandler = (event) => {
        this.setState({selectedBox : event.target.id});
        
    }

 
    movement = e => {

        e.preventDefault();
        if(this.state.selectedBox == null || !this.state.etoggle){
            return false;
        }

        //delete block
        if(e.keyCode == 46){
            let boxes = [...this.state.boxes];
            const selectedBox = this.state.selectedBox;
            
            const index = boxes.indexOf(boxes[selectedBox]);
            boxes.splice(index,1);


            this.setState({boxes : boxes , selectedBox: null});
        }

        //upkey
        if(e.keyCode == 38){
   
            let updatedBoxes = [...this.state.boxes];
            const selectedBoxId = this.state.selectedBox;

            let selectedBox;
            updatedBoxes.map( (element,index) => {
                if(element.boxId == selectedBoxId){
                    selectedBox = index;
                    return  index
                }
            })

            let bodyStyle = {...updatedBoxes[selectedBox].boxStyle};
            bodyStyle.top = updatedBoxes[selectedBox].boxStyle.top - 10;

            updatedBoxes[selectedBox].boxStyle = bodyStyle;

   
            this.setState({ boxes : updatedBoxes}) ; 
            
            
        }
        //downkey
        if(e.keyCode == 40){
            let updatedBoxes = [...this.state.boxes];
            const selectedBoxId = this.state.selectedBox;

            let selectedBox;
            updatedBoxes.map( (element,index) => {
                if(element.boxId == selectedBoxId){
                    selectedBox = index;
                    return  index
                }
            })

            let bodyStyle = {...updatedBoxes[selectedBox].boxStyle};
            bodyStyle.top = updatedBoxes[selectedBox].boxStyle.top + 10;

            updatedBoxes[selectedBox].boxStyle = bodyStyle;


            this.setState({ boxes : updatedBoxes}) ; 
        }

        //left
        if(e.keyCode == 37){
            let updatedBoxes = [...this.state.boxes];
                     const selectedBoxId = this.state.selectedBox;

            let selectedBox;
            updatedBoxes.map( (element,index) => {
                if(element.boxId == selectedBoxId){
                    selectedBox = index;
                    return  index
                }
            })

            let bodyStyle = {...updatedBoxes[selectedBox].boxStyle};
            bodyStyle.left = updatedBoxes[selectedBox].boxStyle.left - 10;

            updatedBoxes[selectedBox].boxStyle = bodyStyle;

            this.setState({ boxes : updatedBoxes}) ; 
        }

        //right
        if(e.keyCode == 39){
            let updatedBoxes = [...this.state.boxes];
            const selectedBoxId = this.state.selectedBox;

            let selectedBox;
            updatedBoxes.map( (element,index) => {
                if(element.boxId == selectedBoxId){
                    selectedBox = index;
                    return  index
                }
            })

            let bodyStyle = {...updatedBoxes[selectedBox].boxStyle};
            bodyStyle.left = updatedBoxes[selectedBox].boxStyle.left + 10;

            updatedBoxes[selectedBox].boxStyle = bodyStyle;

            this.setState({ boxes : updatedBoxes}) ; 
        }
        return false;
    };

    addBox = () => {
        let boxes = [...this.state.boxes];
        
        let last_element = boxes[boxes.length - 1 ];
        let newBoxId;
        if(last_element == undefined){
            newBoxId = 0;
        }else{
            newBoxId = last_element.boxId + 1 ;
        }

        const box = {
                    boxId : newBoxId,
                    boxStyle : {
                        top : 100,
                        left : 0,
                        zIndex: newBoxId
                    }
                }

        boxes.push(box);

        this.setState({ boxes : boxes}) ; 
    }

    
    

    render(){
        document.addEventListener('keydown', this.movement);

        const boxes = this.state.boxes.map((box)=>{
            return <Box 
                    key={box.boxId} 
                    boxId={box.boxId} 
                    selectBox={ this.selectBoxHandler } 
                    boxStyle={box.boxStyle} 
                    selectedBox={this.state.selectedBox}
                />
        })
        return(
            <div className="App">
                <div className="row">
                    <div className="col-6">
                        <button onClick={this.addBox}>Add Box</button>
                    </div>
                    <div className="col-6">
                        <div className="custom-control custom-switch">
                            <input 
                                type="checkbox" 
                                className="custom-control-input" 
                                id="etoggleID"
                                onChange={()=>{this.setState({etoggle : !this.state.etoggle} )}}
                                checked={this.state.etoggle}
                            />
                            <label className="custom-control-label" htmlFor="etoggleID" >OFF/ON Controls</label>
                        </div>
                    </div>
                </div>
                {boxes}
            </div>
        )    
    };
}

export default App;
