import React from "react"
import ReactDOM from "react-dom"
import Map from "../src/index.jsx"
import World from "../src/countries/World.jsx"

class ExampleApp extends React.Component {

  render() {
    let data = [
      {region: "World", country: "Albania", code: "AL", ug1314: 3, g1314: 1, ug1415: 2, g1415: 1, ug1516: 2, g1516: 1},
      {region: "World", country: "Argentina", code: "AR", ug1314: 0, g1314: 19, ug1415: 0, g1415: 27, ug1516: 0, g1516: 26},
      {region: "World", country: "Armenia", code: "AM", ug1314: 3, g1314: 2, ug1415: 2, g1415: 2, ug1516: 4, g1516: 2},
      {region: "World", country: "Australia", code: "AU", ug1314: 6, g1314: 32, ug1415: 7, g1415: 25, ug1516: 7, g1516: 27},
      {region: "World", country: "Austria", code: "AT", ug1314: 0, g1314: 11, ug1415: 0, g1415: 9, ug1516: 0, g1516: 6},
      {region: "World", country: "Azerbaijan", code: "AZ", ug1314: 0, g1314: 0, ug1415: 0, g1415: 0, ug1516: 0, g1516: 1},
      {region: "World", country: "Bangladesh", code: "BD", ug1314: 3, g1314: 7, ug1415: 5, g1415: 6, ug1516: 6, g1516: 10},
      {region: "World", country: "Belarus", code: "BY", ug1314: 1, g1314: 0, ug1415: 1, g1415: 2, ug1516: 1, g1516: 1},
      {region: "World", country: "Bolivia", code: "BO", ug1314: 0, g1314: 2, ug1415: 1, g1415: 1, ug1516: 1, g1516: 0},
      {region: "World", country: "Belgium", code: "BE", ug1314: 1, g1314: 8, ug1415: 1, g1415: 10, ug1516: 1, g1516: 6},
      {region: "World", country: "Bosnia-Hercegovina", code: "BA", ug1314: 1, g1314: 1, ug1415: 1, g1415: 1, ug1516: 1, g1516: 2},
      {region: "World", country: "Brazil", code: "BR", ug1314: 14, g1314: 62, ug1415: 19, g1415: 57, ug1516: 23, g1516: 69},
      {region: "World", country: "Bulgaria", code: "BG", ug1314: 7, g1314: 11, ug1415: 7, g1415: 12, ug1516: 5, g1516: 10},
      {region: "World", country: "Burkina Faso", code: "BF", ug1314: 0, g1314: 0, ug1415: 0, g1415: 1, ug1516: 0, g1516: 1},
      {region: "World", country: "Burundi", code: "BI", ug1314: 0, g1314: 0, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Cambodia", code: "KH", ug1314: 2, g1314: 1, ug1415: 3, g1415: 1, ug1516: 2, g1516: 2},
      {region: "World", country: "Cameroon", code: "CM", ug1314: 4, g1314: 3, ug1415: 4, g1415: 4, ug1516: 2, g1516: 2},
      {region: "World", country: "Canada", code: "CA", ug1314: 19, g1314: 238, ug1415: 23, g1415: 239, ug1516: 24, g1516: 234},
      {region: "World", country: "Chile", code: "CL", ug1314: 0, g1314: 47, ug1415: 1, g1415: 42, ug1516: 1, g1516: 34},
      {region: "World", country: "China",  code: "CN", ug1314: 52, g1314: 579, ug1415: 57, g1415: 607, ug1516: 53, g1516: 627},
      {region: "World", country: "Colombia",  code: "CO", ug1314: 5, g1314: 22, ug1415: 6, g1415: 25, ug1516: 6, g1516: 24},
      {region: "World", country: "Costa Rica",  code: "CR", ug1314: 5, g1314: 4, ug1415: 4, g1415: 8, ug1516: 4, g1516: 10},
      {region: "World", country: "Cote d'Ivoire",  code: "CI", ug1314: 0, g1314: 1, ug1415: 1, g1415: 1, ug1516: 1, g1516: 1},
      {region: "World", country: "Croatia", code: "HR", ug1314: 0, g1314: 1, ug1415: 0, g1415: 1, ug1516: 1, g1516: 1},
      {region: "World", country: "Cyprus", code: "CY", ug1314: 3, g1314: 2, ug1415: 4, g1415: 1, ug1516: 2, g1516: 2},
      {region: "World", country: "Czech Republic", code: "CZ", ug1314: 1, g1314: 1, ug1415: 1, g1415: 2, ug1516: 0, g1516: 2},
      {region: "World", country: "Denmark", code: "DK", ug1314: 0, g1314: 4, ug1415: 1, g1415: 3, ug1516: 0, g1516: 6},
      {region: "World", country: "Ecuador", code: "EC", ug1314: 3, g1314: 2, ug1415: 3, g1415: 3, ug1516: 2, g1516: 2},
      {region: "World", country: "Egypt", code: "EG", ug1314: 3, g1314: 14, ug1415: 5, g1415: 14, ug1516: 4, g1516: 19},
      {region: "World", country: "El Salvador", code: "SV", ug1314: 2, g1314: 1, ug1415: 1, g1415: 0, ug1516: 2, g1516: 1},
      {region: "World", country: "Estonia", code: "EE", ug1314: 3, g1314: 1, ug1415: 2, g1415: 2, ug1516: 2, g1516: 3},
      {region: "World", country: "Ethiopia", code: "ET", ug1314: 6, g1314: 1, ug1415: 4, g1415: 2, ug1516: 4, g1516: 1},
      {region: "World", country: "Finland", code: "FI", ug1314: 0, g1314: 3, ug1415: 0, g1415: 2, ug1516: 0, g1516: 5},
      {region: "World", country: "France", code: "FR", ug1314: 0, g1314: 87, ug1415: 1, g1415: 89, ug1516: 1, g1516: 92},
      {region: "World", country: "Georgia", code: "GE", ug1314: 2, g1314: 2, ug1415: 3, g1415: 1, ug1516: 3, g1516: 3},
      {region: "World", country: "Germany", code: "DE", ug1314: 2, g1314: 57, ug1415: 2, g1415: 67, ug1516: 4, g1516: 68},
      {region: "World", country: "Ghana", code: "GH", ug1314: 4, g1314: 4, ug1415: 6, g1415: 5, ug1516: 5, g1516: 2},
      {region: "World", country: "Guatemala", code: "GT", ug1314: 0, g1314: 2, ug1415: 0, g1415: 1, ug1516: 0, g1516: 1},
      {region: "World", country: "Greece", code: "GR", ug1314: 8, g1314: 38, ug1415: 8, g1415: 36, ug1516: 9, g1516: 39},
      {region: "World", country: "Haiti", code: "HT", ug1314: 0, g1314: 1, ug1415: 1, g1415: 0, ug1516: 2, g1516: 0},
      {region: "World", country: "Hungary", code: "HU", ug1314: 1, g1314: 6, ug1415: 0, g1415: 6, ug1516: 0, g1516: 7},
      {region: "World", country: "Iceland", code: "IS", ug1314: 1, g1314: 2, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "India", code: "IN", ug1314: 21, g1314: 291, ug1415: 21, g1415: 283, ug1516: 32, g1516: 304},
      {region: "World", country: "Indonesia", code: "ID", ug1314: 8, g1314: 11, ug1415: 5, g1415: 9, ug1516: 6, g1516: 9},
      {region: "World", country: "Iran", code: "IR", ug1314: 2, g1314: 35, ug1415: 1, g1415: 38, ug1516: 3, g1516: 37},
      {region: "World", country: "Iraq", code: "IQ", ug1314: 1, g1314: 0, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Ireland", code: "IE", ug1314: 1, g1314: 11, ug1415: 0, g1415: 11, ug1516: 0, g1516: 9},
      {region: "World", country: "Israel", code: "IL", ug1314: 4, g1314: 65, ug1415: 3, g1415: 67, ug1516: 3, g1516: 65},
      {region: "World", country: "Italy", code: "IT", ug1314: 3, g1314: 34, ug1415: 3, g1415: 41, ug1516: 5, g1516: 44},
      {region: "World", country: "Jamaica", code: "JM", ug1314: 4, g1314: 2, ug1415: 3, g1415: 1, ug1516: 2, g1516: 1},
      {region: "World", country: "Japan", code: "JP", ug1314: 4, g1314: 67, ug1415: 5, g1415: 62, ug1516: 5, g1516: 59},
      {region: "World", country: "Jordan", code: "JO", ug1314: 3, g1314: 1, ug1415: 3, g1415: 0, ug1516: 2, g1516: 2},
      {region: "World", country: "Kazakhstan", code: "KZ", ug1314: 6, g1314: 3, ug1415: 8, g1415: 4, ug1516: 7, g1516: 10},
      {region: "World", country: "Kenya", code: "KE", ug1314: 8, g1314: 4, ug1415: 7, g1415: 5, ug1516: 6, g1516: 1},
      {region: "World", country: "Korea", code: "KR", ug1314: 27, g1314: 225, ug1415: 28, g1415: 204, ug1516: 24, g1516: 187},
      {region: "World", country: "Kuwait", code: "KW", ug1314: 0, g1314: 1, ug1415: 0, g1415: 3, ug1516: 0, g1516: 2},
      {region: "World", country: "Kyrgyzstan", code: "KG", ug1314: 0, g1314: 0, ug1415: 0, g1415: 0, ug1516: 0, g1516: 1},
      {region: "World", country: "Latvia", code: "LV", ug1314: 0, g1314: 3, ug1415: 0, g1415: 3, ug1516: 0, g1516: 4},
      {region: "World", country: "Lebanon", code: "LB", ug1314: 2, g1314: 22, ug1415: 2, g1415: 20, ug1516: 4, g1516: 25},
      {region: "World", country: "Lithuania", code: "LT", ug1314: 1, g1314: 2, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Macedonia", code: "MK", ug1314: 1, g1314: 1, ug1415: 2, g1415: 1, ug1516: 2, g1516: 1},
      {region: "World", country: "Malaysia", code: "MY", ug1314: 5, g1314: 18, ug1415: 5, g1415: 21, ug1516: 4, g1516: 20},
      {region: "World", country: "Mexico", code: "MX", ug1314: 12, g1314: 59, ug1415: 12, g1415: 67, ug1516: 10, g1516: 67},
      {region: "World", country: "Moldova", code: "MD", ug1314: 3, g1314: 1, ug1415: 3, g1415: 0, ug1516: 4, g1516: 0},
      {region: "World", country: "Mongolia", code: "MN", ug1314: 0, g1314: 1, ug1415: 1, g1415: 4, ug1516: 5, g1516: 1},
      {region: "World", country: "Morocco", code: "MA", ug1314: 0, g1314: 3, ug1415: 4, g1415: 6, ug1516: 3, g1516: 4},
      {region: "World", country: "Nepal", code: "NP", ug1314: 5, g1314: 9, ug1415: 0, g1415: 0, ug1516: 5, g1516: 5},
      {region: "World", country: "Netherlands", code: "NL", ug1314: 1, g1314: 10, ug1415: 1, g1415: 14, ug1516: 2, g1516: 19},
      {region: "World", country: "New Zealand", code: "NZ", ug1314: 2, g1314: 9, ug1415: 1, g1415: 12, ug1516: 2, g1516: 13},
      {region: "World", country: "Nigeria", code: "NG", ug1314: 4, g1314: 13, ug1415: 4, g1415: 14, ug1516: 2, g1516: 15},
      {region: "World", country: "Norway", code: "NO", ug1314: 5, g1314: 10, ug1415: 5, g1415: 9, ug1516: 6, g1516: 9},
      {region: "World", country: "Oman", code: "OM", ug1314: 0, g1314: 0, ug1415: 0, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Pakistan", code: "PK", ug1314: 6, g1314: 23, ug1415: 6, g1415: 16, ug1516: 5, g1516: 22},
      {region: "World", country: "Panama", code: "PA", ug1314: 0, g1314: 0, ug1415: 1, g1415: 0, ug1516: 2, g1516: 0},
      {region: "World", country: "Paraguay", code: "PY", ug1314: 1, g1314: 1, ug1415: 1, g1415: 2, ug1516: 1, g1516: 2},
      {region: "World", country: "Peru", code: "PE", ug1314: 3, g1314: 8, ug1415: 1, g1415: 7, ug1516: 3, g1516: 9},
      {region: "World", country: "Philippines", code: "PH", ug1314: 2, g1314: 7, ug1415: 3, g1415: 2, ug1516: 3, g1516: 0},
      {region: "World", country: "Poland", code: "PL", ug1314: 3, g1314: 8, ug1415: 3, g1415: 9, ug1516: 3, g1516: 13},
      {region: "World", country: "Portugal", code: "PT", ug1314: 2, g1314: 3, ug1415: 2, g1415: 4, ug1516: 1, g1516: 8},
      {region: "World", country: "Qatar", code: "QA", ug1314: 0, g1314: 1, ug1415: 0, g1415: 0, ug1516: 0, g1516: 1},
      {region: "World", country: "Romania", code: "RO", ug1314: 3, g1314: 18, ug1415: 2, g1415: 14, ug1516: 4, g1516: 15},
      {region: "World", country: "Russia", code: "RU", ug1314: 5, g1314: 43, ug1415: 4, g1415: 59, ug1516: 3, g1516: 70},
      {region: "World", country: "Rwanda", code: "RW", ug1314: 3, g1314: 1, ug1415: 2, g1415: 1, ug1516: 1, g1516: 2},
      {region: "World", country: "Saudi Arabia", code: "SA", ug1314: 7, g1314: 23, ug1415: 14, g1415: 24, ug1516: 18, g1516: 28},
      {region: "World", country: "Serbia", code: "RS", ug1314: 3, g1314: 6, ug1415: 1, g1415: 9, ug1516: 0, g1516: 7},
      {region: "World", country: "Sierra Leone", code: "SL", ug1314: 0, g1314: 1, ug1415: 0, g1415: 1, ug1516: 0, g1516: 1},
      {region: "World", country: "Slovakia", code: "SK", ug1314: 0, g1314: 1, ug1415: 0, g1415: 0, ug1516: 0, g1516: 0},
      {region: "World", country: "Slovenia", code: "SI", ug1314: 0, g1314: 0, ug1415: 0, g1415: 1, ug1516: 0, g1516: 1},
      {region: "World", country: "Somalia", code: "SO", ug1314: 1, g1314: 0, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "South Africa", code: "ZA", ug1314: 1, g1314: 6, ug1415: 2, g1415: 11, ug1516: 1, g1516: 11},
      {region: "World", country: "Spain",  code: "ES", ug1314: 4, g1314: 48, ug1415: 1, g1415: 54, ug1516: 1, g1516: 52},
      {region: "World", country: "Sri Lanka", code: "LK", ug1314: 2, g1314: 9, ug1415: 0, g1415: 6, ug1516: 2, g1516: 5},
      {region: "World", country: "Sudan", code: "SD", ug1314: 0, g1314: 1, ug1415: 0, g1415: 1, ug1516: 0, g1516: 1},
      {region: "World", country: "Sweden", code: "SE", ug1314: 1, g1314: 9, ug1415: 2, g1415: 13, ug1516: 2, g1516: 10},
      {region: "World", country: "Switzerland", code: "CH", ug1314: 3, g1314: 14, ug1415: 3, g1415: 17, ug1516: 4, g1516: 21},
      {region: "World", country: "Syria", code: "SY", ug1314: 1, g1314: 4, ug1415: 1, g1415: 5, ug1516: 0, g1516: 5},
      {region: "World", country: "Taiwan", code: "TW", ug1314: 9, g1314: 70, ug1415: 9, g1415: 67, ug1516: 7, g1516: 70},
      {region: "World", country: "Tajikistan", code: "TJ", ug1314: 3, g1314: 0, ug1415: 2, g1415: 0, ug1516: 0, g1516: 1},
      {region: "World", country: "Thailand", code: "TH", ug1314: 21, g1314: 46, ug1415: 20, g1415: 44, ug1516: 20, g1516: 44},
      {region: "World", country: "Trinidad & Tobago", code: "TT", ug1314: 4, g1314: 0, ug1415: 6, g1415: 1, ug1516: 5, g1516: 1},
      {region: "World", country: "Tunisia", code: "TN", ug1314: 1, g1314: 1, ug1415: 1, g1415: 2, ug1516: 2, g1516: 3},
      {region: "World", country: "Turkey", code: "TR", ug1314: 7, g1314: 49, ug1415: 7, g1415: 58, ug1516: 10, g1516: 59},
      {region: "World", country: "Turkmenistan", code: "TM", ug1314: 0, g1314: 0, ug1415: 1, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Uganda", code: "UG", ug1314: 4, g1314: 2, ug1415: 3, g1415: 1, ug1516: 1, g1516: 1},
      {region: "World", country: "Ukraine", code: "UA", ug1314: 2, g1314: 9, ug1415: 2, g1415: 7, ug1516: 4, g1516: 8},
      {region: "World", country: "United Arab Emirates", code: "AE", ug1314: 1, g1314: 3, ug1415: 1, g1415: 3, ug1516: 1, g1516: 9},
      {region: "World", country: "United Kingdom", code: "GB", ug1314: 6, g1314: 50, ug1415: 9, g1415: 44, ug1516: 12, g1516: 52},
      {region: "World", country: "US", code: "US", ug1314: 4080, g1314: 3977, ug1415: 4046, g1415: 3971, ug1516: 4042, g1516: 3878},
      {region: "World", country: "Uruguay", code: "UY", ug1314: 0, g1314: 5, ug1415: 0, g1415: 5, ug1516: 0, g1516: 3},
      {region: "World", country: "Venezuela", code: "VE", ug1314: 0, g1314: 15, ug1415: 0, g1415: 9, ug1516: 0, g1516: 7},
      {region: "World", country: "Viet Nam", code: "VN", ug1314: 10, g1314: 9, ug1415: 8, g1415: 10, ug1516: 7, g1516: 12},
      {region: "World", country: "Zambia", code: "ZM", ug1314: 3, g1314: 0, ug1415: 3, g1415: 0, ug1516: 1, g1516: 0},
      {region: "World", country: "Zimbabwe", code: "ZW", ug1314: 4, g1314: 0, ug1415: 2, g1415: 1, ug1516: 3, g1516: 1},
    ]

// <World colors={[{color: "#f17e33"}]}/>

    return (
      <Map
        data={data}
        titleKey="region"
        weightKey="ug1314"
        IDKey="code"
        scale="log"
        colorLinear={["#f17e33", "#ffffff"]}
        />

    )
  }

}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
