import PathWithNodes from "./pathWithNodes";
import PathFromArray from "./pathFromArray";
const Path = (props) => {
    
   
    if(props.showNodes){
        return(
          <PathWithNodes path={props.path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={props.setInfo} setEndPoint={props.setEndPoint} setFirstCtrl={props.setFirstCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
        )
      }else{
        return(
          <PathFromArray path={props.path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={props.setInfo} setEndPoint={props.setEndPoint} setFirstCtrl={props.setFirstCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight}  />
        )
      }
    
}

export default Path;