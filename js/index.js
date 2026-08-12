let savebtn = document.querySelector("#savebtn")
let canbtn = document.querySelector("#canbtn")
let addbtn = document.querySelector("#addbtn")
let popup = document.querySelector(".popup")
let nameInput = document.querySelector("#name")
let description = document.querySelector("#description")
function getPriority() {
    const el = document.querySelector('input[name="priority"]:checked')
    return el ? el.value : ''
}
let list = document.querySelector("#list")
let todolist = JSON.parse(localStorage.getItem("todolist")) || []

function renderList() {
    if (!todolist.length) {
        list.innerHTML = ""
        return
    }
    const d = todolist.map((value) => `
    <section class="todo-item" data-id="${value.dateid}">
        <section class="todo-detail">
            <section class="pri">
                <p>${value.Name}</p><button style="background-color: ${value.pricolor} ;">${value.priority}</button>
            </section>
            <div>${value.Description}</div>
        </section>
        <section class="del-btn"><button class="del-btn-el"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </section>
    </section>`).join("")
    list.innerHTML = d
    document.querySelectorAll(".del-btn-el").forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = btn.closest('.todo-item')
            const id = Number(item.getAttribute('data-id'))
            todolist = todolist.filter(i => i.dateid !== id)
            localStorage.setItem("todolist", JSON.stringify(todolist))
            renderList()
        })
    })
}

function showToast(msg, timeout = 2000) {
    const t = document.createElement('div')
    t.className = 'toast-notice'
    t.textContent = msg
    document.body.appendChild(t)
    // trigger fade-in
    requestAnimationFrame(() => t.classList.add('show'))
    setTimeout(() => {
        t.classList.remove('show')
        setTimeout(() => t.remove(), 300)
    }, timeout)
}

addbtn.addEventListener("click", () => {
    popup.classList.remove("d-none")
    // ensure the input is focused reliably after popup appears
    try {
        nameInput.tabIndex = 0
        // wait for next paint cycles then focus and select
        requestAnimationFrame(() => requestAnimationFrame(() => {
            try { nameInput.focus(); nameInput.select() } catch (e) { }
        }))
    } catch (e) { }
})

canbtn.addEventListener("click", () => {
    popup.classList.add("d-none")
    showToast('Todo canceled')
})

savebtn.addEventListener("click", () => {
    let cname = "";
    let p = "";
    const prVal = (getPriority() || "").toLowerCase()
    switch (prVal) {
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
    const item = {
        Name: nameInput.value,
        Description: description.value,
        priority: p,
        pricolor: cname,
        dateid: Date.now()
    }
    todolist.push(item)
    localStorage.setItem("todolist", JSON.stringify(todolist))
    renderList()
    popup.classList.add("d-none")
    showToast('Todo saved')
    // clear form
    nameInput.value = ''
    description.value = ''
    const checked = document.querySelector('input[name="priority"]:checked')
    if (checked) checked.checked = false
})

// initial render
renderList()