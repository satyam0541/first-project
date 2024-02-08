let savebtn = document.querySelector("#savebtn")
let canbtn = document.querySelector("#canbtn")
let addbtn = document.querySelector("#addbtn")
let popup = document.querySelector(".popup")
let Name = document.querySelector("#name")
let description = document.querySelector("#description")
let priority = document.querySelector("#priority")
let list = document.querySelector("#list")
let todolist = []
addbtn.addEventListener("click", () => {
    popup.classList.remove("d-none")
})
canbtn.addEventListener("click", () => {
    popup.classList.add("d-none")
    alert("Todo canceled")
})
savebtn.addEventListener("click", () => {
    let cname = "";
    let p = "";
    switch (priority.value) {
        case "high":
            p = "!!!"
            cname = "#EA3D2F"
            break;
        case "medium":
            p = "!!"
            cname = "#367BF5"
            break;
        case "low":
            p = "!"
            cname = "#2FA84F"
            break;
    }
    todolist.push({
        Name: Name.value,
        Description: description.value,
        priority: p,
        pricolor: cname,
        dateid: Date.now()
    })
    localStorage.setItem("todolist", JSON.stringify(todolist))
    let displaylist = JSON.parse(localStorage.getItem("todolist"))
    let d = []
    displaylist.forEach((value) => {
        d.push(`<section class="todo-item">
        <section class="todo-detail">
            <section class="pri">
                <p>${value.Name}</p><button style="background-color: ${value.pricolor} ;">${value.priority}</button>
            </section>
            <div>${value.Description}</div>
        </section>
        <section class="del-btn"><button><i class="fa fa-trash" aria-hidden="true"></i></button>
        </section>
    </section>`
        )
    });
    d = d.join("")
    list.innerHTML = d
    popup.classList.add("d-none")
    alert("Todo saved")
})