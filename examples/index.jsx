import React from "react"
import ReactDOM from "react-dom"
import Radium from "radium"
import colors from "./colors.js"
import ExamplesSection from "./components/ExamplesSection.jsx"

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      password: "",
      theme: "dark"
    }
    this.passwordHandler = this.passwordHandler.bind(this)
  }

  passwordHandler(e) {
    this.setState({password: e.target.value})
  }

  setDarkTheme() {
    this.setState({
      theme: "dark"
    })
    document.getElementById("body").style.backgroundColor = colors["dark"].body.bg
    document.getElementById("body").style.backgroundImage = colors["dark"].body.gradient
  }

  setLightTheme() {
    this.setState({
      theme: "light"
    })
    document.getElementById("body").style.backgroundColor = colors["light"].bodyBg
  }

  render() {
    const style = {
      body: {
        backgroundColor: colors[this.state.theme].bodyBg,
        color: colors[this.state.theme].body.text,
        maxWidth: "100%"
      },
    }

    let app =
      <Radium.StyleRoot>
        <ExamplesSection
          palette={this.state.theme}/>
      </Radium.StyleRoot>

    return(
      <div style={style.body}>
        {app}
      </div>
    )
  }
}

ExampleApp = Radium(ExampleApp)


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
