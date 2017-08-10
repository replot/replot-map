import React from "react"
import ReactDOM from "react-dom"
import Map from "../src/index.jsx"

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
      <div>
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
        padding: "3px 4px",
        textAlign: "center",
        color: "white",
        backgroundColor: this.props.color,
        borderRadius: "15px",
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
        fontSize: "0.8rem",
        minHeight: "15px",
        verticalAlign: "top",
        boxSizing: "border-box",
        marginTop: "8px",
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
      {region: "US", state:"Alabama", code:"AL", ug1314:18, g1314:14, ug1415:18, g1415:14, ug1516:17, g1516:14, population:4853875},
      {region: "US", state:"Alaska", code:"AK", ug1314:9, g1314:7, ug1415:9, g1415:6, ug1516:10, g1516:4, population:737709},
      {region: "US", state:"Arizona", code:"AZ", ug1314:50, g1314:41, ug1415:52, g1415:39, ug1516:57, g1516:34, population:6817565},
      {region: "US", state:"Arkanasas", code:"AR", ug1314:7, g1314:6, ug1415:5, g1415:8, ug1516:6, g1516:9, population:2977853},
      {region: "US", state:"California", code:"CA", ug1314:685, g1314:568, ug1415:694, g1415:577, ug1516:702, g1516:572, population:38993940},
      {region: "US", state:"Colorado", code:"CO", ug1314:46, g1314:52, ug1415:55, g1415:44, ug1516:47, g1516:49, population:5448819},
      {region: "US", state:"Connecticut", code:"CT", ug1314:96, g1314:83, ug1415:85, g1415:83, ug1516:76, g1516:87, population:3584730},
      {region: "US", state:"Delaware", code:"DE", ug1314:12, g1314:9, ug1415:9, g1415:9, ug1516:11, g1516:10, population:944076},
      {region: "US", state:"District of Colombia", code:"DC", ug1314: 7, g1314: 54, ug1415: 7, g1415: 61, ug1516: 6, g1516: 61, population: 670377},
      {region: "US", state:"Florida", code:"FL", ug1314:226, g1314:119, ug1415:232, g1415:110, ug1516:232, g1516:123, population:20244914},
      {region: "US", state:"Georgia", code:"GA", ug1314:87, g1314:65, ug1415:86, g1415:69, ug1516:91, g1516:60, population:10199398},
      {region: "US", state:"Hawaii", code:"HI", ug1314:23, g1314:21, ug1415:25, g1415:21, ug1516:27, g1516:16, population:1425157},
      {region: "US", state:"Idaho", code:"ID", ug1314:8, g1314:7, ug1415:9, g1415:9, ug1516:13, g1516:10, population:1652828},
      {region: "US", state:"Illinois", code:"IL", ug1314:163, g1314:144, ug1415:148, g1415:156, ug1516:144, g1516:136, population:12839047},
      {region: "US", state:"Indiana", code:"IN", ug1314:37, g1314:36, ug1415:34, g1415:39, ug1516:36, g1516:40, population:6612768},
      {region: "US", state:"Iowa", code:"IA", ug1314:19, g1314:30, ug1415:16, g1415:36, ug1516:16, g1516:36, population:3121997},
      {region: "US", state:"Kansas", code:"KS", ug1314:13, g1314:10, ug1415:15, g1415:8, ug1516:14, g1516:13, population:2906721},
      {region: "US", state:"Kentucky", code:"KY", ug1314:20, g1314:16, ug1415:21, g1415:17, ug1516:19, g1516:20, population:4424611},
      {region: "US", state:"Louisiana", code:"LA", ug1314:18, g1314:14, ug1415:20, g1415:17, ug1516:19, g1516:16, population:4668960},
      {region: "US", state:"Maine", code:"ME", ug1314:20, g1314:17, ug1415:26, g1415:18, ug1516:25, g1516:21, population:1329453},
      {region: "US", state:"Maryland", code:"MD", ug1314:158, g1314:141, ug1415:142, g1415:133, ug1516:139, g1516:122, population:5994983},
      {region: "US", state:"Massachusetts", code:"MA", ug1314:340, g1314:652, ug1415:336, g1415:666, ug1516:340, g1516:688, population:6784240},
      {region: "US", state:"Michigan", code:"MI", ug1314:90, g1314:84, ug1415:104, g1415:90, ug1516:102, g1516:78, population:9917715},
      {region: "US", state:"Minnesota", code:"MN", ug1314:45, g1314:60, ug1415:40, g1415:56, ug1516:37, g1516:55, population:5482435},
      {region: "US", state:"Mississppi", code:"MS", ug1314:4, g1314:8, ug1415:7, g1415:4, ug1516:7, g1516:3, population:2989390},
      {region: "US", state:"Missouri", code:"MO", ug1314:37, g1314:33, ug1415:33, g1415:33, ug1516:34, g1516:35, population:6076204},
      {region: "US", state:"Montana", code:"MT", ug1314:5, g1314:5, ug1415:3, g1415:6, ug1516:5, g1516:3, population:1032073},
      {region: "US", state:"Nebraska", code:"NE", ug1314:10, g1314:7, ug1415:12, g1415:6, ug1516:13, g1516:5, population:1893765},
      {region: "US", state:"Nevada", code:"NV", ug1314:9, g1314:8, ug1415:9, g1415:10, ug1516:7, g1516:6, population:2883758},
      {region: "US", state:"New Hampshire", code:"NH", ug1314:44, g1314:42, ug1415:36, g1415:45, ug1516:37, g1516:39, population:1330111},
      {region: "US", state:"New Jersey", code:"NJ", ug1314:185, g1314:164, ug1415:191, g1415:160, ug1516:202, g1516:159, population:8935421},
      {region: "US", state:"New Mexico", code:"NM", ug1314:11, g1314:18, ug1415:16, g1415:23, ug1516:15, g1516:22, population:2080328},
      {region: "US", state:"New York", code:"NY", ug1314:380, g1314:360, ug1415:384, g1415:336, ug1516:374, g1516:339, population:19747183},
      {region: "US", state:"North Carolina", code:"NC", ug1314:75, g1314:68, ug1415:70, g1415:66, ug1516:64, g1516:61, population:10035186},
      {region: "US", state:"North Dakota", code:"ND", ug1314:7, g1314:3, ug1415:9, g1415:6, ug1516:10, g1516:6, population:756835},
      {region: "US", state:"Ohio", code:"OH", ug1314:81, g1314:70, ug1415:73, g1415:60, ug1516:65, g1516:49, population:11605090},
      {region: "US", state:"Oklahoma", code:"OK", ug1314:16, g1314:8, ug1415:17, g1415:9, ug1516:20, g1516:9, population:3907414},
      {region: "US", state:"Oregon", code:"OR", ug1314:32, g1314:48, ug1415:32, g1415:45, ug1516:30, g1516:32, population:4024634},
      {region: "US", state:"Pennsylvania", code:"PA", ug1314:129, g1314:149, ug1415:127, g1415:138, ug1516:133, g1516:116, population:12791904},
      {region: "US", state:"Rhode Island", code:"RI", ug1314:8, g1314:25, ug1415:11, g1415:26, ug1516:14, g1516:27, population:1055607},
      {region: "US", state:"South Carolina", code:"SC", ug1314:10, g1314:8, ug1415:9, g1415:6, ug1516:13, g1516:11, population:4894834},
      {region: "US", state:"South Dakota", code:"SD", ug1314:4, g1314:5, ug1415:3, g1415:4, ug1516:6, g1516:2, population:857919},
      {region: "US", state:"Tennessee", code:"TN", ug1314:27, g1314:21, ug1415:26, g1415:26, ug1516:22, g1516:25, population:6595056},
      {region: "US", state:"Texas", code:"TX", ug1314:287, g1314:155, ug1415:267, g1415:165, ug1516:263, g1516:164, population:27429639},
      {region: "US", state:"Utah", code:"UT", ug1314:12, g1314:33, ug1415:11, g1415:28, ug1516:16, g1516:23, population:2990632},
      {region: "US", state:"Vermont", code:"VT", ug1314:8, g1314:7, ug1415:9, g1415:9, ug1516:10, g1516:10, population:626088},
      {region: "US", state:"Virginia", code:"VA", ug1314:123, g1314:102, ug1415:126, g1415:96, ug1516:134, g1516:108, population:8367587},
      {region: "US", state:"Washington", code:"WA", ug1314:81, g1314:100, ug1415:76, g1415:101, ug1516:80, g1516:89, population:7160290},
      {region: "US", state:"West Virginia", code:"WV", ug1314:6, g1314:4, ug1415:5, g1415:2, ug1516:6, g1516:2, population:1841053},
      {region: "US", state:"Wisconson", code:"WI", ug1314:28, g1314:45, ug1415:34, g1415:39, ug1516:33, g1516:40, population:5767891},
      {region: "US", state:"Wyoming", code:"WY", ug1314:4, g1314:1, ug1415:6, g1415:2, ug1516:7, g1516:1, population:586555},
    ]

    return (
      <div>
        <Dropdown
          selected={this.state.weightKey}
          list={["ug1314", "g1314", "ug1415", "g1415", "ug1516", "g1516"]}
          handleChange={this.updateWeightKey.bind(this)}
          />
        <Map
          data={data}
          titleKey="region"
          weightKey={this.state.weightKey}
          IDKey="code"
          scale={this.state.scale}
          colorRange={["#f17e33", "#fdf4ee"]}
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
