// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event){
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let copilotStatus = document.querySelector("flightStatus");
      let pilotStatus = document.querySelector("pilotStatus");
      let faulty = document.querySelector("faultyItems");
      let statusText = document.querySelector("launchStatus");
      let fuelStatus = document.querySelector('fuelStatus');
      let cargoStatus = document.querySelector('cargoStatus');
      let missionTarget = document.querySelector('missionTarget');

      // <li id="pilotStatus">Pilot Ready</li>
      //               <li id="copilotStatus">Co-pilot Ready</li>

      //fuelLevelInput = Number(fuelLevelInput.value);
      // let inputTest = Number(fuelLevelInput.value);
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      //cargoMassInput = Number(cargoMassInput.value);
      // let cargoMassTest = Number(cargoMassInput.value);

      if (pilotInput.value === "" || copilotInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert("All fields are required.");
         event.preventDefault();
      }else if(isNaN(pilotInput.value) === false|| isNaN(copilotInput.value) === false || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) ){
         alert("Invalid Input... :(");
         event.preventDefault();
      }else{
         
         if ( fuelLevelInput.value < 10000){
            fuelStatus.addEventListener('submit', function(event){
               faulty.style.visibility = 'visible';
            statusText.style.color = 'red';
            statusText.innerHTML = 'Shuttle not ready for launch';
            fuelStatus.innerHTML = 'Fuel level too low for launch.';
            })
            
         if(cargoMassInput.value > 10000){
            cargoStatus.addEventListener('submit', function(event){
               cargoStatus.innerHTML = 'Fuel level too low for launch.';
            })
         }
         copilotInput.addEventListener("submit", function(event){
            copilotStatus.innerHTML = `${copilotStatus.value} is ready for launch!`
         })
         pilotInput.addEventListener("submit", function(event){
            pilotStatus.innerHTML = `${pilotStatus.value} is ready for launch!`
         })
         }else{
         statusText.style.color = 'green';
         statusText.innerHTML = 'Shuttle is ready for launch!'
         let json = []

            fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(json){
            missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[0].name}</li>
               <li>Diameter: ${json[0].diameter}</li>
               <li>Star: ${json[0].star}</li>
               <li>Distance from Earth: ${json[0].distance}</li>
               <li>Number of Moons: ${json[0].moons}</li>
            </ol>
            <img src="${json[0].image}">`;
            });
       });
         //put your pictures in here, nested if/else statement
      }
   };
});
});
