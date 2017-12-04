import React from "react"
import ReactDOM from "react-dom"
import {Map} from "../src/index.jsx"
import WORLD from "./samples/World.js"

class Dropdown extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      listVisible: false
    }
  }

  select(item) {
    this.setState({ listVisible: false })
    this.props.handleChange(item)
  }

  show() {
    this.setState({ listVisible: true })
    document.addEventListener("click", this.hide.bind(this), {once:true})
  }

  hide() {
    this.setState({ listVisible: false })
  }

  render() {
    const style = {
      title: {
        display: "inline-block",
        margin: "8px",
        fontSize: ".9rem"
      },
      container: {
        display: "inline-block",
        position: "relative",
      },
      current: {
        cursor: "pointer",
        fontSize: "0.8rem",
        textAlign: "center",
        width: "10.5rem",
        padding: "5px",
        color: "#ffffff",
        background: "#f17e33",
        border: "1px solid #000000"
      }
    }

    return (
      <div style={{marginTop: "20px", display: "inline-block", verticalAlign: "top"}}>
        <div style={style.title}>Data: </div>
        <div style={style.container}>
          <div onClick={!this.state.listVisible? this.show.bind(this) : null}>
            <div style={style.current}>{this.props.selected}</div>
          </div>
          {this.renderListItems()}
        </div>
      </div>
    )
  }

  getStyle(index){
    return {
      fontSize: "0.8rem",
      color: "#ffffff",
      background: "#f17e33",
      zIndex: "10",
      border: "1px solid #000000",
      width: "10.5rem",
      padding: "5px",
      textAlign:"center",
      cursor:"pointer",
      position: "absolute",
      top:`${(index+1)*28}px`
    }
  }

  renderListItems() {
    const style = {
      hidden: {
        display: "none"
      }
    }

    var items = [];
    for (var i = 0; i < this.props.list.length; i++) {
      var item = this.props.list[i];
      items.push(
        <div key={item}
          onClick={this.select.bind(this,item)}
          style={this.state.listVisible ? this.getStyle(i) : style.hidden}>
          <span>{item}</span>
        </div>
      )
    }
    return <div>{items}</div>
  }

}

class StateButton extends React.Component {

  clickHandler() {
    this.props.updateFunc(this.props.title)
  }

  render() {
    let style = {
      button: {
        display: "inline-block",
        fontSize: "0.8rem",
        width: "10.5rem",
        float: "left",
        padding: "6px 4px",
        textAlign: "center",
        color: "white",
        backgroundColor: this.props.color,
      }
    }

    return (
      <div className="button" style={style.button}
        onClick={this.clickHandler.bind(this)}>
        {this.props.title}
      </div>
    )
  }

}

class StateSwitch extends React.Component {

  render() {
    const style = {
      outer: {
        display: "inline-block",
        verticalAlign: "top",
        fontSize: "0.8rem",
        minHeight: "15px",
        verticalAlign: "top",
        boxSizing: "border-box",
        marginTop: "20px",
        paddingBottom: "8px"
      },
      inner: {
        // textAlign: "center",
        // margin: "auto"
      },
      switchName: {
        display: "inline-block",
        margin: "8px",
        fontSize: "0.9rem"
      },
      switches: {
        display: "inline-block",
        verticalAlign: "middle",
      }
    }

    let types = this.props.states
    let buttons = []
    let color = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.switch) {
        color = "#f17e33"
      } else {
        color = "#1d1d1d"
      }
      buttons.push(
        <StateButton key={i} title={types[i]}
          width={1/this.props.states.length}
          updateFunc={this.props.updateFunc}
          color={color} />
      )
    }

    return(
      <div style={style.outer}>
        <div style={style.inner}>
          <div style= {style.switchName}>{this.props.name}:</div>
          <div className="switch" style={style.switches}>
            {buttons}
          </div>
        </div>
      </div>
    )
  }

}

class ExampleApp extends React.Component {

  constructor() {
    super()
    this.state = {
      scale: "log",
      weightKey: "ug1314"
    }
  }

  updateScale(newScale) {
    this.setState({scale: newScale})
  }

  updateWeightKey(newWeightKey) {
    this.setState({weightKey: newWeightKey})
  }

  render() {
    let data = [
      {region:"World", country:"Albania", code:"AL", ug1314:3, g1314:1, tot1314:4, ug1415:2, g1415:1, tot1415:3, ug1516:2, g1516:1, tot1516:3, population:2876100, gdp:11927, pop1516:10.4307917, gdp1516:25.15301417},
      {region:"World", country:"Argentina", code:"AR", ug1314:0, g1314:19, tot1314:19, ug1415:0, g1415:27, tot1415:27, ug1516:0, g1516:26, tot1516:26, population:43847430, gdp:545866, pop1516:5.929651977, gdp1516:4.763073721},
      {region:"World", country:"Armenia", code:"AM", ug1314:3, g1314:2, tot1314:5, ug1415:2, g1415:2, tot1415:4, ug1516:4, g1516:2, tot1516:6, population:2924820, gdp:10547, pop1516:20.51408292, gdp1516:56.88821466},
      {region:"World", country:"Australia", code:"AU", ug1314:6, g1314:32, tot1314:38, ug1415:7, g1415:25, tot1415:32, ug1516:7, g1516:27, tot1516:34, population:24127160, gdp:1204616, pop1516:14.09200254, gdp1516:2.822476208},
      {region:"World", country:"Austria", code:"AT", ug1314:0, g1314:11, tot1314:11, ug1415:0, g1415:9, tot1415:9, ug1516:0, g1516:6, tot1516:6, population:8747360, gdp:386428, pop1516:6.85921238, gdp1516:1.552682518},
      {region:"World", country:"Azerbaijan", code:"AZ", ug1314:0, g1314:0, tot1314:0, ug1415:0, g1415:0, tot1415:0, ug1516:0, g1516:1, tot1516:1, population:9762270, gdp:37848, pop1516:1.024351918, gdp1516:2.642147538},
      {region:"World", country:"Bangladesh", code:"BD", ug1314:3, g1314:7, tot1314:10, ug1415:5, g1415:6, tot1415:11, ug1516:6, g1516:10, tot1516:16, population:162951560, gdp:221415, pop1516:0.981886887, gdp1516:7.226249351},
      {region:"World", country:"Belarus", code:"BY", ug1314:1, g1314:0, tot1314:1, ug1415:1, g1415:2, tot1415:3, ug1516:1, g1516:1, tot1516:2, population:9507120, gdp:47433, pop1516:2.1036865, gdp1516:4.216473763},
      {region:"World", country:"Belgium", code:"BE", ug1314:1, g1314:8, tot1314:9, ug1415:1, g1415:10, tot1415:11, ug1516:1, g1516:6, tot1516:7, population:11348160, gdp:466366, pop1516:6.168400869, gdp1516:1.500967052},
      {region:"World", country:"Bolivia", code:"BO", ug1314:0, g1314:2, tot1314:2, ug1415:1, g1415:1, tot1415:2, ug1516:1, g1516:0, tot1516:1, population:10887880, gdp:33806, pop1516:0.918452444, gdp1516:2.958054783},
      {region:"World", country:"Bosnia-Hercegovina", code:"BA", ug1314:1, g1314:1, tot1314:2, ug1415:1, g1415:1, tot1415:2, ug1516:1, g1516:2, tot1516:3, population:3516820, gdp:16560, pop1516:8.530433744, gdp1516:18.11594203},
      {region:"World", country:"Brazil", code:"BR", ug1314:14, g1314:62, tot1314:76, ug1415:19, g1415:57, tot1415:76, ug1516:23, g1516:69, tot1516:92, population:207652860, gdp:1796187, pop1516:4.430471124, gdp1516:5.121961132},
      {region:"World", country:"Bulgaria", code:"BG", ug1314:7, g1314:11, tot1314:18, ug1415:7, g1415:12, tot1415:19, ug1516:5, g1516:10, tot1516:15, population:7127820, gdp:52395, pop1516:21.04430247, gdp1516:28.62868594},
      {region:"World", country:"Burkina Faso", code:"BF", ug1314:0, g1314:0, tot1314:0, ug1415:0, g1415:1, tot1415:1, ug1516:0, g1516:1, tot1516:1, population:18646430, gdp:12115, pop1516:0.536295688, gdp1516:8.254230293},
      {region:"World", country:"Burundi", code:"BI", ug1314:0, g1314:0, tot1314:0, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:10524120, gdp:3007, pop1516:0.950198211, gdp1516:33.25573661},
      {region:"World", country:"Cambodia", code:"KH", ug1314:2, g1314:1, tot1314:3, ug1415:3, g1415:1, tot1415:4, ug1516:2, g1516:2, tot1516:4, population:15762370, gdp:20017, pop1516:2.537689446, gdp1516:19.98301444},
      {region:"World", country:"Cameroon", code:"CM", ug1314:4, g1314:3, tot1314:7, ug1415:4, g1415:4, tot1415:8, ug1516:2, g1516:2, tot1516:4, population:23439190, gdp:24204, pop1516:1.706543613, gdp1516:16.52619402},
      {region:"World", country:"Canada", code:"CA", ug1314:19, g1314:238, tot1314:257, ug1415:23, g1415:239, tot1415:262, ug1516:24, g1516:234, tot1516:258, population:36286430, gdp:1529760, pop1516:71.10095978, gdp1516:16.86539065},
      {region:"World", country:"Chile", code:"CL", ug1314:0, g1314:47, tot1314:47, ug1415:1, g1415:42, tot1415:43, ug1516:1, g1516:34, tot1516:35, population:17909750, gdp:247028, pop1516:19.54242801, gdp1516:14.16843435},
      {region:"World", country:"China", code:"CN", ug1314:52, g1314:579, tot1314:631, ug1415:57, g1415:607, tot1415:664, ug1516:53, g1516:627, tot1516:680, population:1378665000, gdp:11199145, pop1516:4.932307703, gdp1516:6.071892095},
      {region:"World", country:"Colombia", code:"CO", ug1314:5, g1314:22, tot1314:27, ug1415:6, g1415:25, tot1415:31, ug1516:6, g1516:24, tot1516:30, population:48653420, gdp:282463, pop1516:6.166061913, gdp1516:10.62086008},
      {region:"World", country:"Costa Rica", code:"CR", ug1314:5, g1314:4, tot1314:9, ug1415:4, g1415:8, tot1415:12, ug1516:4, g1516:10, tot1516:14, population:4857270, gdp:57436, pop1516:28.82277493, gdp1516:24.37495647},
      {region:"World", country:"Cote d'Ivoire", code:"CI", ug1314:0, g1314:1, tot1314:1, ug1415:1, g1415:1, tot1415:2, ug1516:1, g1516:1, tot1516:2, population:23695920, gdp:36165, pop1516:0.844027157, gdp1516:5.530208765},
      {region:"World", country:"Croatia", code:"HR", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:1, tot1415:1, ug1516:1, g1516:1, tot1516:2, population:4170600, gdp:50425, pop1516:4.795473073, gdp1516:3.966286564},
      {region:"World", country:"Cyprus", code:"CY", ug1314:3, g1314:2, tot1314:5, ug1415:4, g1415:1, tot1415:5, ug1516:2, g1516:2, tot1516:4, population:1170130, gdp:19802, pop1516:34.18423594, gdp1516:20.1999798},
      {region:"World", country:"Czech Republic", code:"CZ", ug1314:1, g1314:1, tot1314:2, ug1415:1, g1415:2, tot1415:3, ug1516:0, g1516:2, tot1516:2, population:10561630, gdp:192925, pop1516:1.893647098, gdp1516:1.036672282},
      {region:"World", country:"Denmark", code:"DK", ug1314:0, g1314:4, tot1314:4, ug1415:1, g1415:3, tot1415:4, ug1516:0, g1516:6, tot1516:6, population:5731120, gdp:306143, pop1516:10.46915786, gdp1516:1.959868427},
      {region:"World", country:"Ecuador", code:"EC", ug1314:3, g1314:2, tot1314:5, ug1415:3, g1415:3, tot1415:6, ug1516:2, g1516:2, tot1516:4, population:16385070, gdp:97802, pop1516:2.441246818, gdp1516:4.089895912},
      {region:"World", country:"Egypt", code:"EG", ug1314:3, g1314:14, tot1314:17, ug1415:5, g1415:14, tot1415:19, ug1516:4, g1516:19, tot1516:23, population:95688680, gdp:336297, pop1516:2.403628099, gdp1516:6.839192737},
      {region:"World", country:"El Salvador", code:"SV", ug1314:2, g1314:1, tot1314:3, ug1415:1, g1415:0, tot1415:1, ug1516:2, g1516:1, tot1516:3, population:6344720, gdp:26797, pop1516:4.728341046, gdp1516:11.19528305},
      {region:"World", country:"Estonia", code:"EE", ug1314:3, g1314:1, tot1314:4, ug1415:2, g1415:2, tot1415:4, ug1516:2, g1516:3, tot1516:5, population:1316480, gdp:23137, pop1516:37.98006806, gdp1516:21.61040757},
      {region:"World", country:"Ethiopia", code:"ET", ug1314:6, g1314:1, tot1314:7, ug1415:4, g1415:2, tot1415:6, ug1516:4, g1516:1, tot1516:5, population:102403200, gdp:72374, pop1516:0.488265992, gdp1516:6.908558322},
      {region:"World", country:"Finland", code:"FI", ug1314:0, g1314:3, tot1314:3, ug1415:0, g1415:2, tot1415:2, ug1516:0, g1516:5, tot1516:5, population:5495100, gdp:236785, pop1516:9.099015487, gdp1516:2.111620246},
      {region:"World", country:"France", code:"FR", ug1314:0, g1314:87, tot1314:87, ug1415:1, g1415:89, tot1415:90, ug1516:1, g1516:92, tot1516:93, population:66896110, gdp:2465454, pop1516:13.90215365, gdp1516:3.772124728},
      {region:"World", country:"Georgia", code:"GE", ug1314:2, g1314:2, tot1314:4, ug1415:3, g1415:1, tot1415:4, ug1516:3, g1516:3, tot1516:6, population:3719300, gdp:14333, pop1516:16.13206786, gdp1516:41.86143864},
      {region:"World", country:"Germany", code:"DE", ug1314:2, g1314:57, tot1314:59, ug1415:2, g1415:67, tot1415:69, ug1516:4, g1516:68, tot1516:72, population:82667680, gdp:3466757, pop1516:8.709570657, gdp1516:2.076868959},
      {region:"World", country:"Ghana", code:"GH", ug1314:4, g1314:4, tot1314:8, ug1415:6, g1415:5, tot1415:11, ug1516:5, g1516:2, tot1516:7, population:28206730, gdp:42690, pop1516:2.481677245, gdp1516:16.39728274},
      {region:"World", country:"Greece", code:"GR", ug1314:8, g1314:38, tot1314:46, ug1415:8, g1415:36, tot1415:44, ug1516:9, g1516:39, tot1516:48, population:10746740, gdp:194559, pop1516:44.66470762, gdp1516:24.67117944},
      {region:"World", country:"Guatemala", code:"GT", ug1314:0, g1314:2, tot1314:2, ug1415:0, g1415:1, tot1415:1, ug1516:0, g1516:1, tot1516:1, population:16582470, gdp:68763, pop1516:0.60304647, gdp1516:1.454270465},
      {region:"World", country:"Haiti", code:"HT", ug1314:0, g1314:1, tot1314:1, ug1415:1, g1415:0, tot1415:1, ug1516:2, g1516:0, tot1516:2, population:10847330, gdp:8023, pop1516:1.843771693, gdp1516:24.92833105},
      {region:"World", country:"Hungary", code:"HU", ug1314:1, g1314:6, tot1314:7, ug1415:0, g1415:6, tot1415:6, ug1516:0, g1516:7, tot1516:7, population:9817960, gdp:124343, pop1516:7.12979071, gdp1516:5.62958912},
      {region:"World", country:"Iceland", code:"IS", ug1314:1, g1314:2, tot1314:3, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:334250, gdp:20047, pop1516:29.91772625, gdp1516:4.988277548},
      {region:"World", country:"India", code:"IN", ug1314:21, g1314:291, tot1314:312, ug1415:21, g1415:283, tot1415:304, ug1516:32, g1516:304, tot1516:336, population:1324171350, gdp:2263523, pop1516:2.537435959, gdp1516:14.84411689},
      {region:"World", country:"Indonesia", code:"ID", ug1314:8, g1314:11, tot1314:19, ug1415:5, g1415:9, tot1415:14, ug1516:6, g1516:9, tot1516:15, population:261115460, gdp:932259, pop1516:0.574458517, gdp1516:1.608994925},
      {region:"World", country:"Iran", code:"IR", ug1314:2, g1314:35, tot1314:37, ug1415:1, g1415:38, tot1415:39, ug1516:3, g1516:37, tot1516:40, population:80277430, gdp:393436, pop1516:4.982720548, gdp1516:10.16683781},
      {region:"World", country:"Iraq", code:"IQ", ug1314:1, g1314:0, tot1314:1, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:37202570, gdp:171489, pop1516:0.268798634, gdp1516:0.583127781},
      {region:"World", country:"Ireland", code:"IE", ug1314:1, g1314:11, tot1314:12, ug1415:0, g1415:11, tot1415:11, ug1516:0, g1516:9, tot1516:9, population:4773100, gdp:294054, pop1516:18.85567032, gdp1516:3.060662327},
      {region:"World", country:"Israel", code:"IL", ug1314:4, g1314:65, tot1314:69, ug1415:3, g1415:67, tot1415:70, ug1516:3, g1516:65, tot1516:68, population:8547100, gdp:318744, pop1516:79.55914872, gdp1516:21.33373491},
      {region:"World", country:"Italy", code:"IT", ug1314:3, g1314:34, tot1314:37, ug1415:3, g1415:41, tot1415:44, ug1516:5, g1516:44, tot1516:49, population:60600590, gdp:1849970, pop1516:8.085729858, gdp1516:2.6486916},
      {region:"World", country:"Jamaica", code:"JM", ug1314:4, g1314:2, tot1314:6, ug1415:3, g1415:1, tot1415:4, ug1516:2, g1516:1, tot1516:3, population:2881360, gdp:14027, pop1516:10.41175001, gdp1516:21.38732445},
      {region:"World", country:"Japan", code:"JP", ug1314:4, g1314:67, tot1314:71, ug1415:5, g1415:62, tot1415:67, ug1516:5, g1516:59, tot1516:64, population:126994510, gdp:4939384, pop1516:5.039587932, gdp1516:1.295708129},
      {region:"World", country:"Jordan", code:"JO", ug1314:3, g1314:1, tot1314:4, ug1415:3, g1415:0, tot1415:3, ug1516:2, g1516:2, tot1516:4, population:9455800, gdp:38655, pop1516:4.230207915, gdp1516:10.34794981},
      {region:"World", country:"Kazakhstan", code:"KZ", ug1314:6, g1314:3, tot1314:9, ug1415:8, g1415:4, tot1415:12, ug1516:7, g1516:10, tot1516:17, population:17797030, gdp:133657, pop1516:9.552155612, gdp1516:12.71912433},
      {region:"World", country:"Kenya", code:"KE", ug1314:8, g1314:4, tot1314:12, ug1415:7, g1415:5, tot1415:12, ug1516:6, g1516:1, tot1516:7, population:48461570, gdp:70529, pop1516:1.444443504, gdp1516:9.924995392},
      {region:"World", country:"Korea", code:"KR", ug1314:27, g1314:225, tot1314:252, ug1415:28, g1415:204, tot1415:232, ug1516:24, g1516:187, tot1516:211, population:51245710, gdp:1411246, pop1516:41.17417829, gdp1516:14.9513267},
      {region:"World", country:"Kuwait", code:"KW", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:3, tot1415:3, ug1516:0, g1516:2, tot1516:2, population:4052580, gdp:114041, pop1516:4.935127746, gdp1516:1.753755228},
      {region:"World", country:"Kyrgyzstan", code:"KG", ug1314:0, g1314:0, tot1314:0, ug1415:0, g1415:0, tot1415:0, ug1516:0, g1516:1, tot1516:1, population:6082700, gdp:6551, pop1516:1.644006773, gdp1516:15.26484506},
      {region:"World", country:"Latvia", code:"LV", ug1314:0, g1314:3, tot1314:3, ug1415:0, g1415:3, tot1415:3, ug1516:0, g1516:4, tot1516:4, population:1960420, gdp:27677, pop1516:20.40379102, gdp1516:14.45243343},
      {region:"World", country:"Lebanon", code:"LB", ug1314:2, g1314:22, tot1314:24, ug1415:2, g1415:20, tot1415:22, ug1516:4, g1516:25, tot1516:29, population:6006670, gdp:47537, pop1516:48.27966244, gdp1516:61.00511181},
      {region:"World", country:"Lithuania", code:"LT", ug1314:1, g1314:2, tot1314:3, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:2872300, gdp:42739, pop1516:3.481530481, gdp1516:2.339783336},
      {region:"World", country:"Macedonia", code:"MK", ug1314:1, g1314:1, tot1314:2, ug1415:2, g1415:1, tot1415:3, ug1516:2, g1516:1, tot1516:3, population:2081210, gdp:10900, pop1516:14.41469145, gdp1516:27.52293578},
      {region:"World", country:"Malaysia", code:"MY", ug1314:5, g1314:18, tot1314:23, ug1415:5, g1415:21, tot1415:26, ug1516:4, g1516:20, tot1516:24, population:31187260, gdp:296359, pop1516:7.695450001, gdp1516:8.0982862},
      {region:"World", country:"Mexico", code:"MX", ug1314:12, g1314:59, tot1314:71, ug1415:12, g1415:67, tot1415:79, ug1516:10, g1516:67, tot1516:77, population:127540420, gdp:1045998, pop1516:6.037301743, gdp1516:7.361390748},
      {region:"World", country:"Moldova", code:"MD", ug1314:3, g1314:1, tot1314:4, ug1415:3, g1415:0, tot1415:3, ug1516:4, g1516:0, tot1516:4, population:3552000, gdp:6750, pop1516:11.26126126, gdp1516:59.25925926},
      {region:"World", country:"Mongolia", code:"MN", ug1314:0, g1314:1, tot1314:1, ug1415:1, g1415:4, tot1415:5, ug1516:5, g1516:1, tot1516:6, population:3027400, gdp:11160, pop1516:19.81898659, gdp1516:53.76344086},
      {region:"World", country:"Morocco", code:"MA", ug1314:0, g1314:3, tot1314:3, ug1415:4, g1415:6, tot1415:10, ug1516:3, g1516:4, tot1516:7, population:35276790, gdp:101445, pop1516:1.984307529, gdp1516:6.900290798},
      {region:"World", country:"Nepal", code:"NP", ug1314:5, g1314:9, tot1314:14, ug1415:0, g1415:0, tot1415:0, ug1516:5, g1516:5, tot1516:10, population:28982770, gdp:21144, pop1516:3.450325832, gdp1516:47.29474082},
      {region:"World", country:"Netherlands", code:"NL", ug1314:1, g1314:10, tot1314:11, ug1415:1, g1415:14, tot1415:15, ug1516:2, g1516:19, tot1516:21, population:17018410, gdp:770845, pop1516:12.33957814, gdp1516:2.724283092},
      {region:"World", country:"New Zealand", code:"NZ", ug1314:2, g1314:9, tot1314:11, ug1415:1, g1415:12, tot1415:13, ug1516:2, g1516:13, tot1516:15, population:4692700, gdp:185017, pop1516:31.96454067, gdp1516:8.107363107},
      {region:"World", country:"Nigeria", code:"NG", ug1314:4, g1314:13, tot1314:17, ug1415:4, g1415:14, tot1415:18, ug1516:2, g1516:15, tot1516:17, population:185989640, gdp:405083, pop1516:0.914029405, gdp1516:4.196670806},
      {region:"World", country:"Norway", code:"NO", ug1314:5, g1314:10, tot1314:15, ug1415:5, g1415:9, tot1415:14, ug1516:6, g1516:9, tot1516:15, population:5232930, gdp:370557, pop1516:28.66462957, gdp1516:4.047960233},
      {region:"World", country:"Oman", code:"OM", ug1314:0, g1314:0, tot1314:0, ug1415:0, g1415:0, tot1415:0, ug1516:1, g1516:0, tot1516:1, population:4424760, gdp:66293, pop1516:2.260009582, gdp1516:1.50845489},
      {region:"World", country:"Pakistan", code:"PK", ug1314:6, g1314:23, tot1314:29, ug1415:6, g1415:16, tot1415:22, ug1516:5, g1516:22, tot1516:27, population:193203480, gdp:283660, pop1516:1.397490356, gdp1516:9.518437566},
      {region:"World", country:"Panama", code:"PA", ug1314:0, g1314:0, tot1314:0, ug1415:1, g1415:0, tot1415:1, ug1516:2, g1516:0, tot1516:2, population:4034120, gdp:55188, pop1516:4.957710727, gdp1516:3.623976227},
      {region:"World", country:"Paraguay", code:"PY", ug1314:1, g1314:1, tot1314:2, ug1415:1, g1415:2, tot1415:3, ug1516:1, g1516:2, tot1516:3, population:6725310, gdp:27441, pop1516:4.460760917, gdp1516:10.93254619},
      {region:"World", country:"Peru", code:"PE", ug1314:3, g1314:8, tot1314:11, ug1415:1, g1415:7, tot1415:8, ug1516:3, g1516:9, tot1516:12, population:31773840, gdp:192094, pop1516:3.776691769, gdp1516:6.246941602},
      {region:"World", country:"Philippines", code:"PH", ug1314:2, g1314:7, tot1314:9, ug1415:3, g1415:2, tot1415:5, ug1516:3, g1516:0, tot1516:3, population:103320220, gdp:304905, pop1516:0.290359428, gdp1516:0.983913022},
      {region:"World", country:"Poland", code:"PL", ug1314:3, g1314:8, tot1314:11, ug1415:3, g1415:9, tot1415:12, ug1516:3, g1516:13, tot1516:16, population:37948020, gdp:469509, pop1516:4.216293762, gdp1516:3.407815399},
      {region:"World", country:"Portugal", code:"PT", ug1314:2, g1314:3, tot1314:5, ug1415:2, g1415:4, tot1415:6, ug1516:1, g1516:8, tot1516:9, population:10324610, gdp:204565, pop1516:8.717036285, gdp1516:4.399579596},
      {region:"World", country:"Qatar", code:"QA", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:0, tot1415:0, ug1516:0, g1516:1, tot1516:1, population:2569800, gdp:152469, pop1516:3.891353413, gdp1516:0.65587103},
      {region:"World", country:"Romania", code:"RO", ug1314:3, g1314:18, tot1314:21, ug1415:2, g1415:14, tot1415:16, ug1516:4, g1516:15, tot1516:19, population:19705300, gdp:186691, pop1516:9.64207599, gdp1516:10.17724475},
      {region:"World", country:"Russia", code:"RU", ug1314:5, g1314:43, tot1314:48, ug1415:4, g1415:59, tot1415:63, ug1516:3, g1516:70, tot1516:73, population:144342400, gdp:1283162, pop1516:5.057419026, gdp1516:5.689071216},
      {region:"World", country:"Rwanda", code:"RW", ug1314:3, g1314:1, tot1314:4, ug1415:2, g1415:1, tot1415:3, ug1516:1, g1516:2, tot1516:3, population:11917510, gdp:8376, pop1516:2.51730437, gdp1516:35.81661891},
      {region:"World", country:"Saudi Arabia", code:"SA", ug1314:7, g1314:23, tot1314:30, ug1415:14, g1415:24, tot1415:38, ug1516:18, g1516:28, tot1516:46, population:32275690, gdp:646438, pop1516:14.25221273, gdp1516:7.115918309},
      {region:"World", country:"Serbia", code:"RS", ug1314:3, g1314:6, tot1314:9, ug1415:1, g1415:9, tot1415:10, ug1516:0, g1516:7, tot1516:7, population:7057410, gdp:37745, pop1516:9.918652877, gdp1516:18.54550272},
      {region:"World", country:"Sierra Leone", code:"SL", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:1, tot1415:1, ug1516:0, g1516:1, tot1516:1, population:7396190, gdp:3669, pop1516:1.352047473, gdp1516:27.25538294},
      // {region:"World", country:"Slovakia", code:"SK", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:0, tot1415:0, ug1516:0, g1516:0, tot1516:0, population:5428700, gdp:89552, pop1516:0, gdp1516:0},
      {region:"World", country:"Slovenia", code:"SI", ug1314:0, g1314:0, tot1314:0, ug1415:0, g1415:1, tot1415:1, ug1516:0, g1516:1, tot1516:1, population:2064840, gdp:43991, pop1516:4.842990256, gdp1516:2.273192244},
      {region:"World", country:"Somalia", code:"SO", ug1314:1, g1314:0, tot1314:1, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:14318000, gdp:6217, pop1516:0.698421567, gdp1516:16.08492842},
      {region:"World", country:"South Africa", code:"ZA", ug1314:1, g1314:6, tot1314:7, ug1415:2, g1415:11, tot1415:13, ug1516:1, g1516:11, tot1516:12, population:55908860, gdp:294841, pop1516:2.146350328, gdp1516:4.069990266},
      {region:"World", country:"Spain", code:"ES", ug1314:4, g1314:48, tot1314:52, ug1415:1, g1415:54, tot1415:55, ug1516:1, g1516:52, tot1516:53, population:46443960, gdp:1232088, pop1516:11.41160228, gdp1516:4.301640792},
      {region:"World", country:"Sri Lanka", code:"LK", ug1314:2, g1314:9, tot1314:11, ug1415:0, g1415:6, tot1415:6, ug1516:2, g1516:5, tot1516:7, population:21203000, gdp:81322, pop1516:3.30141961, gdp1516:8.607756819},
      {region:"World", country:"Sudan", code:"SD", ug1314:0, g1314:1, tot1314:1, ug1415:0, g1415:1, tot1415:1, ug1516:0, g1516:1, tot1516:1, population:39578830, gdp:95584, pop1516:0.252660324, gdp1516:1.046200201},
      {region:"World", country:"Sweden", code:"SE", ug1314:1, g1314:9, tot1314:10, ug1415:2, g1415:13, tot1415:15, ug1516:2, g1516:10, tot1516:12, population:9903120, gdp:511000, pop1516:12.11739331, gdp1516:2.348336595},
      {region:"World", country:"Switzerland", code:"CH", ug1314:3, g1314:14, tot1314:17, ug1415:3, g1415:17, tot1415:20, ug1516:4, g1516:21, tot1516:25, population:8372100, gdp:659827, pop1516:29.86108623, gdp1516:3.788871932},
      {region:"World", country:"Syria", code:"SY", ug1314:1, g1314:4, tot1314:5, ug1415:1, g1415:5, tot1415:6, ug1516:0, g1516:5, tot1516:5, population:17185170, gdp:73670, pop1516:2.90948533, gdp1516:6.787023212},
      {region:"World", country:"Taiwan", code:"TW", ug1314:9, g1314:70, tot1314:79, ug1415:9, g1415:67, tot1415:76, ug1516:7, g1516:70, tot1516:77, population:23464787, gdp:523010, pop1516:32.81512847, gdp1516:14.72247185},
      {region:"World", country:"Tajikistan", code:"TJ", ug1314:3, g1314:0, tot1314:3, ug1415:2, g1415:0, tot1415:2, ug1516:0, g1516:1, tot1516:1, population:8734950, gdp:6952, pop1516:1.144826244, gdp1516:14.38434983},
      {region:"World", country:"Thailand", code:"TH", ug1314:21, g1314:46, tot1314:67, ug1415:20, g1415:44, tot1415:64, ug1516:20, g1516:44, tot1516:64, population:68863510, gdp:406840, pop1516:9.293746427, gdp1516:15.7309999},
      {region:"World", country:"Trinidad & Tobago", code:"TT", ug1314:4, g1314:0, tot1314:4, ug1415:6, g1415:1, tot1415:7, ug1516:5, g1516:1, tot1516:6, population:1364960, gdp:20989, pop1516:43.95733208, gdp1516:28.5864024},
      {region:"World", country:"Tunisia", code:"TN", ug1314:1, g1314:1, tot1314:2, ug1415:1, g1415:2, tot1415:3, ug1516:2, g1516:3, tot1516:5, population:11403250, gdp:42063, pop1516:4.384714884, gdp1516:11.88693151},
      {region:"World", country:"Turkey", code:"TR", ug1314:7, g1314:49, tot1314:56, ug1415:7, g1415:58, tot1415:65, ug1516:10, g1516:59, tot1516:69, population:79512430, gdp:857749, pop1516:8.677888476, gdp1516:8.044311331},
      {region:"World", country:"Turkmenistan", code:"TM", ug1314:0, g1314:0, tot1314:0, ug1415:1, g1415:0, tot1415:1, ug1516:1, g1516:0, tot1516:1, population:5662540, gdp:36180, pop1516:1.76599194, gdp1516:2.763957988},
      {region:"World", country:"Uganda", code:"UG", ug1314:4, g1314:2, tot1314:6, ug1415:3, g1415:1, tot1415:4, ug1516:1, g1516:1, tot1516:2, population:41487960, gdp:25528, pop1516:0.482067569, gdp1516:7.834534629},
      {region:"World", country:"Ukraine", code:"UA", ug1314:2, g1314:9, tot1314:11, ug1415:2, g1415:7, tot1415:9, ug1516:4, g1516:8, tot1516:12, population:45004640, gdp:93270, pop1516:2.666391732, gdp1516:12.86587327},
      {region:"World", country:"United Arab Emirates", code:"AE", ug1314:1, g1314:3, tot1314:4, ug1415:1, g1415:3, tot1415:4, ug1516:1, g1516:9, tot1516:10, population:9269610, gdp:348743, pop1516:10.78794038, gdp1516:2.867441067},
      {region:"World", country:"United Kingdom", code:"GB", ug1314:6, g1314:50, tot1314:56, ug1415:9, g1415:44, tot1415:53, ug1516:12, g1516:52, tot1516:64, population:65637240, gdp:2618886, pop1516:9.750562333, gdp1516:2.443787168},
      {region:"World", country:"Uruguay", code:"UY", ug1314:0, g1314:5, tot1314:5, ug1415:0, g1415:5, tot1415:5, ug1516:0, g1516:3, tot1516:3, population:3444010, gdp:52420, pop1516:8.710776101, gdp1516:5.723006486},
      // {region:"World", country:"US", code:"US", ug1314:4080, g1314:3977, tot1314:8057, ug1415:4046, g1415:3971, tot1415:8017, ug1516:4042, g1516:3878, tot1516:7920, population:323127510, gdp:18569100, pop1516:245.104479, gdp1516:42.65150169},
      {region:"World", country:"Venezuela", code:"VE", ug1314:0, g1314:15, tot1314:15, ug1415:0, g1415:9, tot1415:9, ug1516:0, g1516:7, tot1516:7, population:31568180, gdp:509970, pop1516:2.217422734, gdp1516:1.372629763},
      {region:"World", country:"Viet Nam", code:"VN", ug1314:10, g1314:9, tot1314:19, ug1415:8, g1415:10, tot1415:18, ug1516:7, g1516:12, tot1516:19, population:92701100, gdp:202616, pop1516:2.049598117, gdp1516:9.377344336},
      {region:"World", country:"Zambia", code:"ZM", ug1314:3, g1314:0, tot1314:3, ug1415:3, g1415:0, tot1415:3, ug1516:1, g1516:0, tot1516:1, population:16591390, gdp:19551, pop1516:0.602722255, gdp1516:5.114827886},
      {region:"World", country:"Zimbabwe", code:"ZW", ug1314:4, g1314:0, tot1314:4, ug1415:2, g1415:1, tot1415:3, ug1516:3, g1516:1, tot1516:4, population:16150360, gdp:16289, pop1516:2.476724977, gdp1516:24.55644914}
    ]

    return (
      <div>
        <Map
          data={data}
          paths={WORLD.svg.g.path}
          weightKey={this.state.weightKey}
          IDKey="code"
          scale={this.state.scale}
          colorRangeLow="#f17e33"
          colorRangeHigh="#fdf4ee"
          width={900}
          />
        <Dropdown
          selected={this.state.weightKey}
          list={["ug1314", "g1314", "tot1314", "ug1415", "g1415", "tot1415", "ug1516", "g1516", "tot1516", "pop1516", "gdp1516"]}
          handleChange={this.updateWeightKey.bind(this)}
          />
        <StateSwitch
          name="Scale"
          states={["lin","log"]}
          switch={this.state.scale}
          updateFunc={this.updateScale.bind(this)}
          />
      </div>
    )
  }

}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
