//make request to line 12
//three functions
//-get dinning data - 2 constants per request and data
//-windows action function - 

//This function fetches all dining halls and then populates the nearby restaurants on the home page

async function populateRestaurants(diningData){

    //const diningRequest = await fetch('/api/dining');
    //const diningData = await diningRequest.json();
    //console.log(diningData);
    const targetBox = document.querySelector('tbody');

    diningData.data.forEach((restaurant) => {
        const appendItem = document.createElement("tr");
        //appendItem.classList.add("tile", "has-text-centered", "is-parent", "is-3");
        appendItem.innerHTML = `

            <td>${restaurant.hall_id}</td>
            <td>${restaurant.hall_name}</td>
            <td>${restaurant.hall_address}</td>
            
            `;
        targetBox.append(appendItem);

        
    });

    // console.log(diningData);
    // console.table(diningData);

}


async function getDining(){
    console.log('data request');
    const diningRequest = await fetch('/api/dining');
    const diningData = await diningRequest.json();
    return diningData;

}

async function setBasicData(){
    localStorage.setItem('myCat','Tom');
}

function getBasicData(){
    return localStorage.getItem('myCat');

}

function setComplexData(data){
    localStorage.setItem('data', JSON.stringify(data));
}

async function windowActions(){
    console.log('loaded window');
    const dining = await getDining();
    //console.table(dining);


    //unrelated
    // setBasicData();
    // const cat = getBasicData();
    // console.log(cat);

    setComplexData(dining);
    const storedDinner = localStorage.getItem('data');
    const storedDinnerData = JSON.parse(storedDinner);
    console.log(storedDinner);
    console.log(storedDinnerData);
    populateRestaurants(storedDinnerData);



}

window.onload = windowActions;