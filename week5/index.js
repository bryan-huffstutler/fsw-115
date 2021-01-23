let output = document.getElementById("todos")

//GET
let getTodos = function () {axios.get("https://api.vschool.io/bryanhuffstutler/todo")
.then(res => {
  for (let i=0; i<res.data.length; i++){
    let li = document.createElement("li")
    let btn = document.createElement("button")
    let box = document.createElement("input")
    box.type = "checkbox"
    box.setAttribute("id", "box")
    box.classList.add('checkBox')
    box.onchange = updateComplete
    btn.textContent = "Delete"
    btn.classList.add("del")
    li.setAttribute(`id`, res.data[i]._id)
    li.innerHTML = res.data[i].title
    if (res.data[i].completed === true){
      li.style.textDecoration = "line-through";
      box.checked = true;
    }
    li.append(box)
    li.append(btn)
    output.appendChild(li)
  }
})

.catch(()=> console.log("error"))}

getTodos()

//Code to reset list before new GET
let deleteData = () => {
  while (output.firstChild) output.removeChild(output.firstChild)
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
      .then(deleteData)
      .then(getTodos)
      .catch(()=> console.log("error"))
    
})


//PUT Completed
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
output.addEventListener("click", function (e){
  let deleteBtn = document.getElementsByClassName("del")
  for(i=0; i<deleteBtn.length; i++){
    if(e.target == deleteBtn[i]){
      let x = deleteBtn[i].parentNode
      let id = x.id
      axios.delete(`https://api.vschool.io/bryanhuffstutler/todo/${id}`)
      output.removeChild(x)
    }
  }
})