let main = document.getElementById("main")
let planetsButton = document.getElementById("planetsButton")

planetsButton.addEventListener("click", function(){
  axios.get("https://swapi.dev/api/planets")
  .then(res => { console.log(res)
    for(i=0; res.data.results.length; i++){
      const h3 = document.createElement("h3")
      h3.innerHTML = res.data.results[i].name
      main.append(h3)
    }
  })
  .catch(() => console.log("error"))
  
})