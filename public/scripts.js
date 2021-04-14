
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min); //The maximum and minimum are inclusive
}


async function getMeals(){
    console.log('data request');
    const diningRequest = await fetch('/api/wholeMeal');
    const diningData = await diningRequest.json();

    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map(element =>{ //.map replaces for loop. It is a disguised for each loop
        
        const random = getRandomIntInclusive(0, meals.length -1);
        return meals[random];
    });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Meals and Macros"
        },
        axisX: {
            valueFormatString: "DD"
        },
        axisY: {
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Meals",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x:[ 'meal_id', 'meal_name', 'meal_category' ], y: 56 }
            ]
        },

        {
            type: "stackedBar",
            name: "Macro",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x:[ 'meal_id', 'meal_name', 'meal_category' ], y: 56  }
         
            ]
        }]
    });
    chart.render();

    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
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

    //console.log(diningData);
    //console.table(diningData);

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
    const results = await getMeals();
    const meals = results.data;
    
    setComplexData(selectedMeals);
    populateRestaurants(selectedMeals);
    console.table(selectedMeals);



}

window.onload = windowActions;