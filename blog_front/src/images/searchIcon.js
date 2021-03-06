import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
const springConif={
  stiffness: 120, 
  damping: 17
}
class SearchIcon extends Component {
  getStyle=()=>{
    const{open}=this.props;
    return{
      x:spring(open?1:0)
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.open===true){
    return this.input.focus()
  }
  }
  render() {
    const{open}=this.props;
    return (
      <Motion 
      
      style={{
        postion:spring(open?5:0,springConif),
        size:spring(open?250:30,springConif),
        array:spring(open?300:62,springConif),
        offset:spring(open?-62:0,springConif),
        closeAction:spring(open?0:-180,springConif),
        opacity:spring(open?1:0,springConif),
        scale:spring(open?1:0,springConif),
        inputSize:spring(open?100:0,springConif),
      }}>
      {value => 
        <div className="search-icon" 
        onClick={this.props.onClick}
        style={{
          top:`${value.postion}px`,
          width:`${value.size}px`,
        }}>
          <div className="search-svg" >
            <svg x="0px" y="0px" width={250}  viewBox={`0 0 300 26`}fill={`none`} 
            stroke={`#333`} 
            strokeWidth={1.2}
            strokeDasharray={`${value.array},${value.array}`}
            strokeDashoffset={`${value.offset}`}
            strokeLinecap={`round`}
            strokeLinejoin={`round`}
            strokeMiterlimit={10}>
            <path 
            d={`M288.2,19.6c-1,0.4-2,0.6-3.1,0.6c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1s9.1,4.1,9.1,9.1
            c0,2.5-1,4.8-2.7,6.4L298,24H3`}/>
            </svg>
          </div>
          
          <div className="search-input" 
          style={{
            opacity:value.opacity,
            width:`${open?'100':0}%`
            }}>
              <input type="text" placeholder="Search" 
              ref={(input) => { this.input = input; }}
              onFocus={this.props.onFocus} onChange={this.props.onChange} value={this.props.value} onKeyDown={this.props.onKeyDown}/>
              <div className="search-close" 
              style={{
                transform:`rotate(${value.closeAction}deg) scale(${value.scale})`
              }}
              onClick={open?this.props.searchClose:null}>
                <span/>
                <span/>
              </div>
          </div>
        </div>
    }
      </Motion>
    );
  }
}

export default SearchIcon;
