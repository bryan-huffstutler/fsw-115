let todoItems = ""
let output = document.getElementById("todos")

//GET
let getTodos = function () {axios.get("https://api.vschool.io/bryanhuffstutler/todo")
.then(res => {
  for (let i=0; i<res.data.length; i++){
    let li = document.createElement("li")
    let btn = document.createElement("button")
    let box = document.createElement("input")
    box.type = "checkbox"
    btn.textContent = "Delete"
    btn.classList.add("del")
    li.innerHTML = res.data[i].title
    if (res.data[i].completed === true){
      li.style.textDecoration = "line-through";
    }
    li.append(box)
    li.append(btn)
    output.append(li)
  }
})

.catch(()=> console.log("error"))}


getTodos()

//Code to reset list of todos to display new todo at end of list
let li = document.getElementsByTagName("li")
let deleteOutput = () => {
  document.body.output.removeChild(li)
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
  
  axios.post("https://api.vschool.io/bryanhuffstutler/todo", newTodo)
    .then (res => {
      console.log(res.data)    
    })
    .then(deleteOutput)
    .catch (error => console.log(error))
    .then(getTodos)
})

//PUT Completed

let id = "I SUCK"
let myVar = "https://api.vschool.io/bryanhuffstutler/todo/" + id

//Event Listeners on Delete Buttons
output.addEventListener("click", function (e){
  let deleteBtn = document.getElementsByClassName("del")
  for(i=0; i<deleteBtn.length; i++){
    if(e.target == deleteBtn[i]){
      console.log("hi")
    }
  }
})

console.log(todoItems)