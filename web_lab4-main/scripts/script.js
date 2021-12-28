import Work from "./Work.js"
import WorkTransform from "./WorkTransform.js"
import URL from "./URL.js"





// 4 задание

/*const radio1 = document.getElementById("radio1")
const radio2 = document.getElementById("radio2")
const segment2 = document.getElementById("left-box")
segment2.setAttribute("style", "font-style:normal")

radio1.addEventListener("change", () => {
    localStorage.setItem("case" , "i")
})
radio2.addEventListener("change", () => {
    localStorage.setItem("case" , "ni")
})
segment2.addEventListener("mouseover", () => {
    if(localStorage.getItem("case") == "i"){
        segment2.setAttribute("style", "font-style:italic")
    } else {
        segment2.setAttribute("style", "font-style:normal") }
})
if(localStorage.getItem("case") == "i"){
    segment2.setAttribute("style", "font-style:italic")
} else {
    segment2.setAttribute("style", "font-style:normal")
}
*/
// 5 задание


for(let i = 0; i< localStorage.length; i++) {
    let key = localStorage.key(i)
    if(key.substring(key.length-3,key.length) == "box") {
        let container = document.querySelector(`.${key}`)
        container.innerHTML = `<ol>${localStorage.getItem(key)}</ol>`
    }

}

function createForm() {
    let tableForm = document.createElement("form")
    tableForm.className = "textForm"
    tableForm.appendChild(createInput("data","text"))
    tableForm.appendChild(createInput("Add","Button"))
    return tableForm
}
const clickers = document.querySelectorAll(".former")

function createInput(name,type) {
    let input = document.createElement("input")
    input.setAttribute("type",type)
    input.setAttribute("name",name)
    input.setAttribute("value", name)
    return input
}

clickers.forEach((clicker) => {
    clicker.addEventListener("click", () => {
        let target = clicker.getAttribute("target")
        target = document.querySelector(`.${target}`)
        if(target.querySelector(".textForm")){
            return
        }
        let form = createForm()
        target.appendChild(form,target)
        form.setAttribute("target",clicker.getAttribute("target"))
        form.elements.Add.addEventListener("click", () => {
            let container = document.querySelector(`.${form.getAttribute("target")}`)
            if(!container.querySelector(".ol")){
                let list = document.createElement("ol")
                list.className = "ol"
                container.appendChild(list)
            }
            let list = container.querySelector(".ol")
            let li = document.createElement("li")
            li.innerHTML = form.elements.data.value
            list.appendChild(li)
            addSaveButton(list,container)
        })
    })
})

function addSaveButton(list, container) {
    let button = list.querySelector("button")
    if(!button){
        button = document.createElement("button")
        button.addEventListener("click", () => {
            list.removeChild(button)
            localStorage.setItem(container.className,list.innerHTML)
        })
        button.innerHTML = "Save"
    }
    list.appendChild(button)
}
const output = document.querySelector(".controller")
const middle_segment = document.querySelector(".middle-box")
const data = {
    begin: "Begin",
    start: "start",
    stop: "stop",
    reload: "reload",
    left: "left",
    right: "right",
    close: "close",
    end: "end",
    bottom:"bot",
    top:"top",
    speed: 100
}
const segment3 = document.querySelector(".right-box")

const work = new WorkTransform(middle_segment, output,data)

document.querySelector(".Play").addEventListener("click", () => {
    if(middle_segment.querySelector(".work")!=null) {
        return
    } 
    if(output.querySelector("span")) {
        output.removeChild(output.querySelector("span"))
    }
    work.mount()
})

document.querySelector(".Save").addEventListener("click", () => {
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    
    }).then(r => r.text()).then(r => console.log(r))
})