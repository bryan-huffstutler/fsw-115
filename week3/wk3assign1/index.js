const xhr = new XMLHttpRequest()

xhr.open("GET",  "https://api.vschool.io/pokemon", true)
xhr.send()

xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200){
    const JSONdata = xhr.responseText
    const data = JSON.parse(JSONdata)
    const obj = data.objects[0]
    const poke = obj.pokemon
    console.log(poke)
    pokemon(poke)
    
  }
}

function pokemon (arr){
  arr.map(function(pokemon){
    let h3 = document.createElement("h3")
    h3.innerHTML = pokemon.name
    document.body.append(h3)
  })    
}
