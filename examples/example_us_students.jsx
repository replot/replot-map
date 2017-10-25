import React from "react"
import ReactDOM from "react-dom"
import Map from "../src/index.jsx"
import USA from "./samples/USA.js"

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
        background: "#ca0004",
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
      background: "#ca0004",
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
        marginTop: "20px",
        verticalAlign: "top",
        boxSizing: "border-box",
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
        color = "#ca0004"
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
      {region:"US", state:"Alabama", code:"AL", ug1314:18, g1314:14, total1314:32, ug1415:18, g1415:14, total1415:32, ug1516:17, g1516:14, total1516:31, population:4853875, pop1314:6.592670804, pop1415:6.592670804, pop1516:6.386649842},
      {region:"US", state:"Alaska", code:"AK", ug1314:9, g1314:7, total1314:16, ug1415:9, g1415:6, total1415:15, ug1516:10, g1516:4, total1516:14, population:737709, pop1314:21.68876888, pop1415:20.33322082, pop1516:18.97767277},
      {region:"US", state:"Arizona", code:"AZ", ug1314:50, g1314:41, total1314:91, ug1415:52, g1415:39, total1415:91, ug1516:57, g1516:34, total1516:91, population:6817565, pop1314:13.3478742, pop1415:13.3478742, pop1516:13.3478742},
      {region:"US", state:"Arkanasas", code:"AR", ug1314:7, g1314:6, total1314:13, ug1415:5, g1415:8, total1415:13, ug1516:6, g1516:9, total1516:15, population:2977853, pop1314:4.365561362, pop1415:4.365561362, pop1516:5.037186187},
      {region:"US", state:"California", code:"CA", ug1314:685, g1314:568, total1314:1253, ug1415:694, g1415:577, total1415:1271, ug1516:702, g1516:572, total1516:1274, population:38993940, pop1314:32.13319813, pop1415:32.59480832, pop1516:32.67174335},
      {region:"US", state:"Colorado", code:"CO", ug1314:46, g1314:52, total1314:98, ug1415:55, g1415:44, total1415:99, ug1516:47, g1516:49, total1516:96, population:5448819, pop1314:17.9855488, pop1415:18.1690748, pop1516:17.61849678},
      {region:"US", state:"Connecticut", code:"CT", ug1314:96, g1314:83, total1314:179, ug1415:85, g1415:83, total1415:168, ug1516:76, g1516:87, total1516:163, population:3584730, pop1314:49.93402571, pop1415:46.8654543, pop1516:45.47064911},
      {region:"US", state:"District of Colombia", code:"DC", ug1314:7, g1314:54, total1314:61, ug1415:7, g1415:61, total1415:68, ug1516:6, g1516:61, total1516:68, population:670377, pop1314:90.99357526, pop1415:101.4354609, pop1516:101.4354609},
      {region:"US", state:"Delaware", code:"DE", ug1314:12, g1314:9, total1314:21, ug1415:9, g1415:9, total1415:18, ug1516:11, g1516:10, total1516:21, population:944076, pop1314:22.24397188, pop1415:19.06626161, pop1516:22.24397188},
      {region:"US", state:"Florida", code:"FL", ug1314:226, g1314:119, total1314:345, ug1415:232, g1415:110, total1415:342, ug1516:232, g1516:123, total1516:355, population:20244914, pop1314:17.04131714, pop1415:16.89313178, pop1516:17.53526836},
      {region:"US", state:"Georgia", code:"GA", ug1314:87, g1314:65, total1314:152, ug1415:86, g1415:69, total1415:155, ug1516:91, g1516:60, total1516:151, population:10199398, pop1314:14.90284034, pop1415:15.19697535, pop1516:14.80479534},
      {region:"US", state:"Hawaii", code:"HI", ug1314:23, g1314:21, total1314:44, ug1415:25, g1415:21, total1415:46, ug1516:27, g1516:16, total1516:43, population:1425157, pop1314:30.87379145, pop1415:32.27714561, pop1516:30.17211437},
      {region:"US", state:"Idaho", code:"ID", ug1314:8, g1314:7, total1314:15, ug1415:9, g1415:9, total1415:18, ug1516:13, g1516:10, total1516:23, population:1652828, pop1314:9.075354483, pop1415:10.89042538, pop1516:13.91554354},
      {region:"US", state:"Illinois", code:"IL", ug1314:163, g1314:144, total1314:307, ug1415:148, g1415:156, total1415:304, ug1516:144, g1516:136, total1516:280, population:12839047, pop1314:23.91143206, pop1415:23.67776985, pop1516:21.80847223},
      {region:"US", state:"Indiana", code:"IN", ug1314:37, g1314:36, total1314:73, ug1415:34, g1415:39, total1415:73, ug1516:36, g1516:40, total1516:76, population:6612768, pop1314:11.03925013, pop1415:11.03925013, pop1516:11.49291794},
      {region:"US", state:"Iowa", code:"IA", ug1314:19, g1314:30, total1314:49, ug1415:16, g1415:36, total1415:52, ug1516:16, g1516:36, total1516:52, population:3121997, pop1314:15.69508235, pop1415:16.65600576, pop1516:16.65600576},
      {region:"US", state:"Kansas", code:"KS", ug1314:13, g1314:10, total1314:23, ug1415:15, g1415:8, total1415:23, ug1516:14, g1516:13, total1516:27, population:2906721, pop1314:7.912696127, pop1415:7.912696127, pop1516:9.288817193},
      {region:"US", state:"Kentucky", code:"KY", ug1314:20, g1314:16, total1314:36, ug1415:21, g1415:17, total1415:38, ug1516:19, g1516:20, total1516:39, population:4424611, pop1314:8.13630848, pop1415:8.588325618, pop1516:8.814334187},
      {region:"US", state:"Louisiana", code:"LA", ug1314:18, g1314:14, total1314:32, ug1415:20, g1415:17, total1415:37, ug1516:19, g1516:16, total1516:35, population:4668960, pop1314:6.853774716, pop1415:7.924677016, pop1516:7.496316096},
      {region:"US", state:"Maine", code:"ME", ug1314:20, g1314:17, total1314:37, ug1415:26, g1415:18, total1415:44, ug1516:25, g1516:21, total1516:46, population:1329453, pop1314:27.83099515, pop1415:33.09631856, pop1516:34.60069668},
      {region:"US", state:"Maryland", code:"MD", ug1314:158, g1314:141, total1314:299, ug1415:142, g1415:133, total1415:275, ug1516:139, g1516:122, total1516:261, population:5994983, pop1314:49.87503718, pop1415:45.87168971, pop1516:43.53640369},
      {region:"US", state:"Massachusetts", code:"MA", ug1314:340, g1314:652, total1314:992, ug1415:336, g1415:666, total1415:1002, ug1516:340, g1516:688, total1516:1028, population:6784240, pop1314:146.2212422, pop1415:147.6952466, pop1516:151.5276582},
      {region:"US", state:"Michigan", code:"MI", ug1314:90, g1314:84, total1314:174, ug1415:104, g1415:90, total1415:194, ug1516:102, g1516:78, total1516:180, population:9917715, pop1314:17.5443638, pop1415:19.56095734, pop1516:18.14934186},
      {region:"US", state:"Minnesota", code:"MN", ug1314:45, g1314:60, total1314:105, ug1415:40, g1415:56, total1415:96, ug1516:37, g1516:55, total1516:92, population:5482435, pop1314:19.15207385, pop1415:17.51046752, pop1516:16.78086471},
      {region:"US", state:"Mississppi", code:"MS", ug1314:4, g1314:8, total1314:12, ug1415:7, g1415:4, total1415:11, ug1516:7, g1516:3, total1516:10, population:2989390, pop1314:4.014196876, pop1415:3.67968047, pop1516:3.345164064},
      {region:"US", state:"Missouri", code:"MO", ug1314:37, g1314:33, total1314:70, ug1415:33, g1415:33, total1415:66, ug1516:34, g1516:35, total1516:69, population:6076204, pop1314:11.52035053, pop1415:10.86204479, pop1516:11.3557741},
      {region:"US", state:"Montana", code:"MT", ug1314:5, g1314:5, total1314:10, ug1415:3, g1415:6, total1415:9, ug1516:5, g1516:3, total1516:8, population:1032073, pop1314:9.689237099, pop1415:8.720313389, pop1516:7.751389679},
      {region:"US", state:"Nebraska", code:"NE", ug1314:10, g1314:7, total1314:17, ug1415:12, g1415:6, total1415:18, ug1516:13, g1516:5, total1516:18, population:1893765, pop1314:8.976826586, pop1415:9.504875209, pop1516:9.504875209},
      {region:"US", state:"Nevada", code:"NV", ug1314:9, g1314:8, total1314:17, ug1415:9, g1415:10, total1415:19, ug1516:7, g1516:6, total1516:13, population:2883758, pop1314:5.89508551, pop1415:6.588624982, pop1516:4.508006566},
      {region:"US", state:"New Hampshire", code:"NH", ug1314:44, g1314:42, total1314:86, ug1415:36, g1415:45, total1415:81, ug1516:37, g1516:39, total1516:76, population:1330111, pop1314:64.65625801, pop1415:60.89717324, pop1516:57.13808848},
      {region:"US", state:"New Jersey", code:"NJ", ug1314:185, g1314:164, total1314:349, ug1415:191, g1415:160, total1415:351, ug1516:202, g1516:159, total1516:361, population:8935421, pop1314:39.05803655, pop1415:39.28186484, pop1516:40.40100629},
      {region:"US", state:"New Mexico", code:"NM", ug1314:11, g1314:18, total1314:29, ug1415:16, g1415:23, total1415:39, ug1516:15, g1516:22, total1516:37, population:2080328, pop1314:13.94010944, pop1415:18.74704374, pop1516:17.78565688},
      {region:"US", state:"New York", code:"NY", ug1314:380, g1314:360, total1314:740, ug1415:384, g1415:336, total1415:720, ug1516:374, g1516:339, total1516:713, population:19747183, pop1314:37.47369941, pop1415:36.46089673, pop1516:36.10641579},
      {region:"US", state:"North Carolina", code:"NC", ug1314:75, g1314:68, total1314:143, ug1415:70, g1415:66, total1415:136, ug1516:64, g1516:61, total1516:125, population:10035186, pop1314:14.24986044, pop1415:13.55231483, pop1516:12.45617171},
      {region:"US", state:"North Dakota", code:"ND", ug1314:7, g1314:3, total1314:10, ug1415:9, g1415:6, total1415:15, ug1516:10, g1516:6, total1516:16, population:756835, pop1314:13.21291959, pop1415:19.81937939, pop1516:21.14067135},
      {region:"US", state:"Ohio", code:"OH", ug1314:81, g1314:70, total1314:151, ug1415:73, g1415:60, total1415:133, ug1516:65, g1516:49, total1516:114, population:11605090, pop1314:13.01153201, pop1415:11.46048846, pop1516:9.823275821},
      {region:"US", state:"Oklahoma", code:"OK", ug1314:16, g1314:8, total1314:24, ug1415:17, g1415:9, total1415:26, ug1516:20, g1516:9, total1516:29, population:3907414, pop1314:6.142169732, pop1415:6.654017209, pop1516:7.421788426},
      {region:"US", state:"Oregon", code:"OR", ug1314:32, g1314:48, total1314:80, ug1415:32, g1415:45, total1415:77, ug1516:30, g1516:32, total1516:62, population:4024634, pop1314:19.8775839, pop1415:19.1321745, pop1516:15.40512752},
      {region:"US", state:"Pennsylvania", code:"PA", ug1314:129, g1314:149, total1314:278, ug1415:127, g1415:138, total1415:265, ug1516:133, g1516:116, total1516:249, population:12791904, pop1314:21.7324958, pop1415:20.71622801, pop1516:19.46543689},
      {region:"US", state:"Rhode Island", code:"RI", ug1314:8, g1314:25, total1314:33, ug1415:11, g1415:26, total1415:37, ug1516:14, g1516:27, total1516:41, population:1055607, pop1314:31.2616343, pop1415:35.05092331, pop1516:38.84021231},
      {region:"US", state:"South Carolina", code:"SC", ug1314:10, g1314:8, total1314:18, ug1415:9, g1415:6, total1415:15, ug1516:13, g1516:11, total1516:24, population:4894834, pop1314:3.677346361, pop1415:3.064455301, pop1516:4.903128482},
      {region:"US", state:"South Dakota", code:"SD", ug1314:4, g1314:5, total1314:9, ug1415:3, g1415:4, total1415:7, ug1516:6, g1516:2, total1516:8, population:857919, pop1314:10.49050085, pop1415:8.15927844, pop1516:9.324889646},
      {region:"US", state:"Tennessee", code:"TN", ug1314:27, g1314:21, total1314:48, ug1415:26, g1415:26, total1415:52, ug1516:22, g1516:25, total1516:47, population:6595056, pop1314:7.278179291, pop1415:7.884694232, pop1516:7.126550555},
      {region:"US", state:"Texas", code:"TX", ug1314:287, g1314:155, total1314:442, ug1415:267, g1415:165, total1415:432, ug1516:263, g1516:164, total1516:427, population:27429639, pop1314:16.11395615, pop1415:15.749387, pop1516:15.56710243},
      {region:"US", state:"Utah", code:"UT", ug1314:12, g1314:33, total1314:45, ug1415:11, g1415:28, total1415:39, ug1516:16, g1516:23, total1516:39, population:2990632, pop1314:15.04698672, pop1415:13.04072183, pop1516:13.04072183},
      {region:"US", state:"Vermont", code:"VT", ug1314:8, g1314:7, total1314:15, ug1415:9, g1415:9, total1415:18, ug1516:10, g1516:10, total1516:20, population:626088, pop1314:23.9582934, pop1415:28.74995208, pop1516:31.9443912},
      {region:"US", state:"Virginia", code:"VA", ug1314:123, g1314:102, total1314:225, ug1415:126, g1415:96, total1415:222, ug1516:134, g1516:108, total1516:242, population:8367587, pop1314:26.88947244, pop1415:26.53094614, pop1516:28.92112147},
      {region:"US", state:"Washington", code:"WA", ug1314:81, g1314:100, total1314:181, ug1415:76, g1415:101, total1415:177, ug1516:80, g1516:89, total1516:169, population:7160290, pop1314:25.27830577, pop1415:24.71966918, pop1516:23.60239599},
      {region:"US", state:"West Virginia", code:"WV", ug1314:6, g1314:4, total1314:10, ug1415:5, g1415:2, total1415:7, ug1516:6, g1516:2, total1516:8, population:1841053, pop1314:5.431674156, pop1415:3.802171909, pop1516:4.345339325},
      {region:"US", state:"Wisconson", code:"WI", ug1314:28, g1314:45, total1314:73, ug1415:34, g1415:39, total1415:73, ug1516:33, g1516:40, total1516:73, population:5767891, pop1314:12.65627246, pop1415:12.65627246, pop1516:12.65627246},
      {region:"US", state:"Wyoming", code:"WY", ug1314:4, g1314:1, total1314:5, ug1415:6, g1415:2, total1415:8, ug1516:7, g1516:1, total1516:8, population:586555, pop1314:8.524349805, pop1415:13.63895969, pop1516:13.63895969}
    ]

    return (
      <div>
        <Map
          data={data}
          paths={USA.svg.g.path}
          weightKey={this.state.weightKey}
          IDKey="code"
          scale={this.state.scale}
          colorRange={["#ca0004", "#f1e8e8"]}
          />
        <Dropdown
          selected={this.state.weightKey}
          list={["ug1314", "g1314", "ug1415", "g1415", "ug1516", "g1516", "pop1314", "pop1415", "pop1516"]}
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
