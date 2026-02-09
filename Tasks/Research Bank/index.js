const addItemButton = document.getElementById("add-button")
const modalOverlay = document.getElementById("modal-overlay")
const nameOfItem = document.getElementById("name-of-item")
const closeIcon = document.getElementById("close-icon")
const form = document.getElementById("form")
const linkToItem = document.getElementById("link-to-item")
const descriptionOfItem = document.getElementById("description-of-item")
const itemSection = document.getElementById("items-section")

// Reveal and hide modal overlay
addItemButton.addEventListener("click", revealModalOverlay)
function revealModalOverlay(){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfItem.focus()
}

closeIcon.addEventListener("click", closeModalOverlay)
function closeModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")
    }
}

// Collect data, handle form data and store data in LS
let researchItems = []

form.addEventListener("submit", handleFormData)
function handleFormData(event){
    event.preventDefault()
    // input data collection
    let itemName = nameOfItem.value
    let itemLink = linkToItem.value
    let itemDescription = descriptionOfItem.value

    const researchItem = {
        itemNAME : itemName,
        itemLINK : itemLink,
        itemDESCRIPTION : itemDescription
    }

    researchItems.push(researchItem)
    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    form.reset()
    closeModalOverlay()
    fetchItems()
}

// Fetch data from LS
function fetchItems(){
    if(localStorage.getItem("itemsOfResearch")){
        researchItems = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }
    printItemsOnUI()
}
fetchItems()


// Print Data from LS on the UI
function printItemsOnUI(){
    itemSection.innerHTML = ` `
    researchItems.forEach(function(item){
        let itemNameTOPRINT = item.itemNAME
        let itemLinkTOPRINT = item.itemLINK
        let itemDescrTOPRINT = item.itemDESCRIPTION

        // HTML Section
        let researchItemDiv = document.createElement("div")
        researchItemDiv.classList.add("research-item")

        let titleAndDeleteContainerDiv = document.createElement("div")
        titleAndDeleteContainerDiv.classList.add("title-and-delete-container")

        let itemTitle = document.createElement("a")
        itemTitle.setAttribute("href", `${itemLinkTOPRINT}`)
        itemTitle.setAttribute("target", "_blank")
        itemTitle.textContent = itemNameTOPRINT

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute("onclick", `deleteItem('${itemLinkTOPRINT}')`)

        let descriptionOfItemDiv = document.createElement("div")
        descriptionOfItemDiv.classList.add("description-of-item")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = itemDescrTOPRINT

        // Appending
        descriptionOfItemDiv.append(descriptionText)
        titleAndDeleteContainerDiv.append(itemTitle, deleteIcon)
        researchItemDiv.append(titleAndDeleteContainerDiv, descriptionOfItemDiv)
        itemSection.append(researchItemDiv)
    })
}

// Delete
function deleteItem(researchLink){
    researchItems.forEach(function(item, index){
        if(item.itemLINK === researchLink){
            researchItems.splice(index, 1)
        }
    })
    // Updating local storage
    localStorage.setItem("itemsOfResearch",JSON.stringify(researchItems) )
    // Fetch Items from local storage
    fetchItems()
}