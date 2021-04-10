
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min); //The maximum and minimum are inclusive
}


async function getMeals(){
    console.log('data request');
    const diningRequest = await fetch('/api/wholeMeal');
    const diningData = await diningRequest.json();
    return diningData;
}

async function populateRestaurants(diningData){

    //const diningRequest = await fetch('/api/dining');
    //const diningData = await diningRequest.json();
    //console.log(diningData);
    const targetBox = document.querySelector('tbody');

    diningData.data.forEach((restaurant) => {
        const appendItem = document.createElement("tr");
        //appendItem.classList.add("tile", "has-text-centered", "is-parent", "is-3");
        appendItem.innerHTML = `

            <td>${restaurant.meal_id}</td>
            <td>${restaurant.meal_name}</td>
            <td>${restaurant.meal_category}</td>
            <td>${restaurant.macro_id}</td>
            <td>${restaurant.calories}</td>
            <td>${restaurant.serving_size}</td>
            <td>${restaurant.cholesterol}</td>
            <td>${restaurant.sodium}</td>
            <td>${restaurant.carbs}</td>
            <td>${restaurant.protein}</td>
            <td>${restaurant.fat}</td>
            
            `;
        targetBox.append(appendItem);

        
    });

    // console.log(diningData);
    // console.table(diningData);

}


async function windowActions(){
    console.log('loaded window');
    const results = await getMeals();
    const meals = results.data;
    
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map(element =>{ //.map replaces for loop. It is a disguised for each loop
        const random = getRandomIntInclusive(0, meals.length -1);
        return meals[random];
    });

    console.table(selectedMeals);


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
    const dining = await getMeals();
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