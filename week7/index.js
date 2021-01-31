let todoList = document.getElementById('todos')
let planet = ""

//GET
let getData = async function () {
  try {
    const todos = await axios.get("https://api.vschool.io/bryanhuffstutler/todo/")
    const pl = await axios.get("https://swapi.dev/api/planets/")
    getPlanet(pl)
    displayTodo(todos)
  }
  
  catch {
    console.log("error")
  }
  
}

getData()


//Get planets from SWAPI api and save them to a variable
let getPlanet = (p)=>{
  planet = p.data.results  
}

//Randomize the Planet from SWAPI Api
let randomPlanet = (arr) => {
  let x = Math.floor(Math.random() * 9 + 1)
  return arr[x].name
}

//Display Todos
let displayTodo = (apiData) => {
  for (let i = 0; i < apiData.data.length; i++) {
    let li = document.createElement("li")
    let btn = document.createElement("button")
    let box = document.createElement("input")
    let price = apiData.data[i].price
    let description = apiData.data[i].description
    let desc = `-----Description: ` + description;
    let listPrice = `-----Price; ${price}`
    let location = `-----Location: ` + randomPlanet(planet);
    box.type = "checkbox"
    box.setAttribute("id", "box")
    box.classList.add('checkBox')
    box.onchange = updateComplete
    btn.textContent = "Delete"
    btn.classList.add("del")
    li.setAttribute(`id`, apiData.data[i]._id)
    li.innerHTML = apiData.data[i].title
    if (apiData.data[i].completed === true){
      li.style.textDecoration = "line-through";
      box.checked = true;
    }
    li.append(desc)
    li.append(location)
    li.append(listPrice)
    li.append(box)
    li.append(btn)
    todoList.appendChild(li)
  }
}

//PUT Complete
let updateComplete = (e) =>{
  let boxes = document.getElementsByClassName("checkBox")
  for (i=0; i<boxes.length; i++){
  if(boxes[i].type === "checkbox"){    
      if (e.target == boxes[i]){
              
                let x = boxes[i].parentNode
                if (boxes[i].checked){
                  x.style.textDecoration='line-through'
                } else {
                  x.style.textDecoration='none'
                }
                
                let id = x.id
                let comp = {
                  completed: boxes[i].checked
                }
                axios.put(`https://api.vschool.io/bryanhuffstutler/todo/${id}`, comp)
    }
  }
}}

//DELETE
todoList.addEventListener("click", function (e){
  let deleteBtn = document.getElementsByClassName("del")
  for(i=0; i<deleteBtn.length; i++){
    if(e.target == deleteBtn[i]){
      let x = deleteBtn[i].parentNode
      let id = x.id
      axios.delete(`https://api.vschool.io/bryanhuffstutler/todo/${id}`)
      todoList.removeChild(x)
    }
  }
})


//Code to reset list before new GET
let deleteData = () => {
  while (todoList.firstChild) todoList.removeChild(todoList.firstChild)
}

//POST
const form = document.myForm
form.addEventListener("submit", function (e){
  e.preventDefault()
  let title = form.title.value
  let description = form.description.value
  let price = form.price.value
  let newTodo =
    {title: title,
    description: description,
    price: price}
  
  axios.post("https://api.vschool.io/bryanhuffstutler/todo/", newTodo)
      .then(deleteData)
      .then(getData)
      .catch(()=> console.log("error"))
    
})