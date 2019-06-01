import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class CmCanvas extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isDown: false,
            previousPointX:'',
            previousPointY:''
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    render() {
        return (
            <div>
                <canvas id="canvas" ref="canvas"
                    width={640}
                    height={425}
                    onMouseDown={
                        e => {
                            let nativeEvent = e.nativeEvent;
                            this.handleMouseDown(nativeEvent);
                        }}
                    onMouseMove={
                        e => {
                            let nativeEvent = e.nativeEvent;
                            this.handleMouseMove(nativeEvent);
                        }}
                    onMouseUp={
                        e => {
                            let nativeEvent = e.nativeEvent;
                            this.handleMouseUp(nativeEvent);
                        }}
                />
            </div>
        );
    }

    handleMouseDown(event){
        console.log(event);
        this.setState({
            isDown: true,
            previousPointX:event.offsetX,
            previousPointY:event.offsetY
        },()=>{
            const canvas = ReactDOM.findDOMNode(this.refs.canvas);
            let x = event.offsetX;
            let y = event.offsetY;
            let ctx = canvas.getContext("2d");

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        })
    }
    handleMouseMove(event){
        if(!this.state.isDown) return;

        //if(this.state.isDown){
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let x = event.offsetX;
        let y = event.offsetY;
        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        this.setState({
            previousPointX:event.offsetX,
            previousPointY:event.offsetY
        });
    }
    handleMouseUp(event){
        this.setState({
            isDown: false
        });

        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let x = event.offsetX;
        let y = event.offsetY;
        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgb(200,255,255)';
        ctx.fillRect(0, 0, 640, 425);
        ctx.fillStyle = 'rgb(0,0,0)';
    }
}