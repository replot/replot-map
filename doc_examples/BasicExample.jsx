import React from "react"
import {Map, USA} from "../index.js"

class BasicExample extends React.Component {

  render() {
    const populations = [
      {state:"Alabama", code:"US-AL", population:4853875},
      {state:"Alaska", code:"US-AK", population:737709},
      {state:"Arizona", code:"US-AZ", population:6817565},
      {state:"Arkanasas", code:"US-AR", population:2977853},
      {state:"California", code:"US-CA", population:38993940},
      {state:"Colorado", code:"US-CO", population:5448819},
      {state:"Connecticut", code:"US-CT", population:3584730},
      {state:"District of Colombia", code:"US-DC", population:670377},
      {state:"Delaware", code:"US-DE", population:944076},
      {state:"Florida", code:"US-FL", population:20244914},
      {state:"Georgia", code:"US-GA", population:10199398},
      {state:"Hawaii", code:"US-HI", population:1425157},
      {state:"Idaho", code:"US-ID", population:1652828},
      {state:"Illinois", code:"US-IL", population:12839047},
      {state:"Indiana", code:"US-IN", population:6612768},
      {state:"Iowa", code:"US-IA", population:3121997},
      {state:"Kansas", code:"US-KS", population:2906721},
      {state:"Kentucky", code:"US-KY", population:4424611},
      {state:"Louisiana", code:"US-LA", population:4668960},
      {state:"Maine", code:"US-ME", population:1329453},
      {state:"Maryland", code:"US-MD", population:5994983},
      {state:"Massachusetts", code:"US-MA", population:6784240},
      {state:"Michigan", code:"US-MI", population:9917715},
      {state:"Minnesota", code:"US-MN", population:5482435},
      {state:"Mississppi", code:"US-MS", population:2989390},
      {state:"Missouri", code:"US-MO", population:6076204},
      {state:"Montana", code:"US-MT", population:1032073},
      {state:"Nebraska", code:"US-NE", population:1893765},
      {state:"Nevada", code:"US-NV", population:2883758},
      {state:"New Hampshire", code:"US-NH", population:1330111},
      {state:"New Jersey", code:"US-NJ", population:8935421},
      {state:"New Mexico", code:"US-NM", population:2080328},
      {state:"New York", code:"US-NY", population:19747183},
      {state:"North Carolina", code:"US-NC", population:10035186},
      {state:"North Dakota", code:"US-ND", population:756835},
      {state:"Ohio", code:"US-OH", population:11605090},
      {state:"Oklahoma", code:"US-OK", population:3907414},
      {state:"Oregon", code:"US-OR", population:4024634},
      {state:"Pennsylvania", code:"US-PA", population:12791904},
      {state:"Rhode Island", code:"US-RI", population:1055607},
      {state:"South Carolina", code:"US-SC", population:4894834},
      {state:"South Dakota", code:"US-SD", population:857919},
      {state:"Tennessee", code:"US-TN", population:6595056},
      {state:"Texas", code:"US-TX", population:27429639},
      {state:"Utah", code:"US-UT", population:2990632},
      {state:"Vermont", code:"US-VT", population:626088},
      {state:"Virginia", code:"US-VA", population:8367587},
      {state:"Washington", code:"US-WA", population:7160290},
      {state:"West Virginia", code:"US-WV", population:1841053},
      {state:"Wisconson", code:"US-WI", population:5767891},
      {state:"Wyoming", code:"US-WY", population:586555}
    ]

    return(
      <div>
        <Map data={populations}
            IDKey="code"
            weightKey="population"
            paths={USA}
        />
      </div>
    )
  }
}


export default BasicExample
