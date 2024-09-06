// URL for bean variety api connection
const url = "https://localhost:5001/api/beanvariety/";

// Section of page that displays information
let displayContent = document.querySelector("#DOMContent");



// Variable to store Run It! button
const button = document.querySelector("#run-button");

// Event listener to get information about bean variety when Run It! button is clicked
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            beanVarieties.forEach(variety => {
                displayEachBeanVariety(variety);
        })
    })
})



// Variable to store Add Variety button
const addButton = document.querySelector("#addBeanForm");

// Event listener to populate the form to add another bean variety
addButton.addEventListener("click", () => {
    addBeanVarietyForm();
})



// Variable to store the submit button for the bean variety
const newBeanVarietyButton = document.querySelector("#newBeanVariety")

// Event listener that handles creation of bean object and submission of the bean object to db
document.addEventListener("click", (e) => {
    if (e.target.id === "newBeanVariety") {
        const beanObj = createBeanVarietyObject()
        
        saveBeanVariety(beanObj);
    } 
})



// Function to get bean info from db
function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}



// Function to create the HTML containing info about each bean variety
function displayEachBeanVariety(beanObj) {
    let html = `<div>`;
    if (beanObj.notes) {
        html += `Name: ${beanObj.name}, Region: ${beanObj.region}, Notes: ${beanObj.notes}</div>`;
    }
    else {
        html += `Name: ${beanObj.name}, Region: ${beanObj.region}</div>`;
    }
    displayContent.innerHTML += html;
}



// Function for creating the HTML for the new bean variety form
function addBeanVarietyForm() {
    let html = `<div>
                    <label for="beanName">Name: </label>
                    <input type="text" id="beanName" name="beanName"><br>
                    <label for="beanRegion">Region: </label>
                    <input type="text" id="beanRegion" name="beanRegion"><br>
                    <label for="beanNotes">Notes: </label>
                    <input type="text" id="beanNotes" name="beanNotes"><br>
                    <button id="newBeanVariety">Add Bean!</button>
                </div>`
    displayContent.innerHTML = html;
}



// Function to create the bean object to be submitted to db
function createBeanVarietyObject() {
    const beanVariety = {};

    beanVariety.Name = document.querySelector("#beanName").value;
    beanVariety.Region = document.querySelector("#beanRegion").value;
    beanVariety.Notes = document.querySelector("#beanNotes").value;

    return beanVariety;
}



// Function for posting the new bean variety object to the db
const saveBeanVariety = async (beanVarietyObj) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanVarietyObj)
    }

    const response = await fetch(url, postOptions);
}

