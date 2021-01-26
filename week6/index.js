let people = document.getElementById("people")
let planets = document.getElementById("planets")
let starShips = document.getElementById("starships")

async function getData (){
  try {
    const swPeople = await axios.get("https://swapi.dev/api/people")
    const swPlanets = await axios.get("https://swapi.dev/api/planets")
    const swStarShips = await axios.get("https://swapi.dev/api/starships")
    makePeopleUl(swPeople)
    makePlanetsUl(swPlanets)
    makeStarShipsUl(swStarShips)
  }
  
  catch(error) {
    console.log(error)
  }

}

getData()

let makePeopleUl = (apiData) => {
  let peopleData = apiData.data.results
  let header = document.createElement("h2")
  header.innerHTML = "PEOPLE"
  people.appendChild(header)
  peopleData.map(function (person){
    let x = document.createElement("li")
    x.innerHTML = person.name
    people.appendChild(x)
  })
  
  }

let makePlanetsUl = (apiData) => {
  let planetsData = apiData.data.results
  let header = document.createElement("h2")
  header.innerHTML = "PLANETS"
  planets.appendChild(header)
    planetsData.map(function (planet){
      let x = document.createElement("li")
      x.innerHTML = planet.name
      planets.appendChild(x)
    })
  }

let makeStarShipsUl = (apiData) => {
  let starShipsData = apiData.data.results
  let header = document.createElement("h2")
  header.innerHTML = "STARSHIPS"
  starShips.appendChild(header)
    starShipsData.map(function (starship){
      let x = document.createElement("li")
      x.innerHTML = starship.name
      starShips.appendChild(x)
    })
  }