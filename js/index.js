let savebtn = document.querySelector("#savebtn")
let canbtn = document.querySelector("#canbtn")
let addbtn = document.querySelector("#addbtn")
let popup = document.querySelector(".popup")

addbtn.addEventListener("click", () => {
    popup.classList.remove("d-none")
})
savebtn.addEventListener("click", () => {
    popup.classList.add("d-none")
    alert("Todo saved")
})
canbtn.addEventListener("click", () => {
    popup.classList.add("d-none")
    alert("Todo canceled")
})