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


      // initializing variables. first four take the input of the four forms and put them in a variable
      // the next seven initialize id's and classes in the html as variables


      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let copilotStatus = document.querySelector("copilotStatus"); //should this be flightStatus or copilotStatus??? -- come back to this if error arises
      let pilotStatus = document.querySelector("pilotStatus");
      let faultyItems = document.querySelector("faultyItems");
      let statusText = document.querySelector("launchStatus");
      let fuelStatus = document.querySelector("fuelStatus");
      let cargoStatus = document.querySelector("cargoStatus");
      

      // if a field is empty, throw an error and refuse to load the input


      if (pilotInput.value === "" || copilotInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert("All fields are required.");
         event.preventDefault();


      // if the wrong type of input is entered in a field, throw an error and refuse to load the input


      }else if(isNaN(pilotInput.value) === false|| isNaN(copilotInput.value) === false || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) ){
         alert("Invalid Input... :(");
         event.preventDefault();


      //if all fields are filled with passable input, proceed


      }else{


            //update copilot and pilot status regardless of other inputs


            copilotStatus.innerHTML = `${copilotStatus.value} is ready for launch!`
            pilotStatus.innerHTML = `${pilotStatus.value} is ready for launch!`


            // if the fuel level is too low, or the cargo mass is too high, the box at the bottom of the screen changes its appearance, 
            // listing the un-passable values and letting the user know shuttle is not ready for launch


            if ( fuelLevelInput.value < 10000 || cargoMassInput.value > 10000){
               faultyItems.style.visibility = 'visible';
               statusText.style.color = 'red';
               statusText.innerHTML = 'Shuttle not ready for launch';


               //checks which attributes triggered faultyItems, then changes their status


               if (cargoMassInput.value > 10000){
                  cargoStatus.innerHTML = 'Cargo mass too high for launch.';
               }
               if (fuelLevelInput.value < 10000){
                  fuelStatus.innerHTML = 'Fuel level too low for launch';
               }

            //if all is good, shuttle is ready for launch and location is designated

            }else{
               
               //changes status text color to green, and what the text actually says


               statusText.style.color = "green";
               statusText.innerHTML = "Shuttle is ready for launch!"

               //fetch json from link, then post in missionTarget div

                  fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
                  response.json().then(function(json){
                  let missionTarget = document.querySelector("missionTarget");
                  missionTarget.innerHTML = 
                  `<h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[0].name}</li>
                     <li>Diameter: ${json[0].diameter}</li>
                     <li>Star: ${json[0].star}</li>
                     <li>Distance from Earth: ${json[0].distance}</li>
                     <li>Number of Moons: ${json[0].moons}</li>
                  </ol>
                  <img src='${json[0].image}'>`;
               });
            });
         }
      }
   });
});

