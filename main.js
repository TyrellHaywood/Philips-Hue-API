//philips hue bridge ip address: 192.168.0.22
//debugger ip address: https://192.168.0.22/debug/clip.html
//newest user id: s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt

//sample scene = cSt4xDglSTLR9lp (homework)
//green bug = g3Y6E1wtnkUZJV8



const lightsOn = document.getElementById('on-button');
const lightsOff = document.getElementById('off-button');
const sceneOne = document.getElementById('scene')
const getData = document.getElementById('data')
const currentScene = document.getElementById('myScene')
const lightOne = 'http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/lights/1/state';
const groupAction = 'http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/groups/Tyrell\'s Room/action'
const sceneData = 'http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes'

lightsOn.addEventListener('click', function() {

  const data = {"on" : true};
  const json = JSON.stringify(data);

  fetch(lightOne, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: json
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));  

})

lightsOff.addEventListener('click', function() {
  
  const data = {"on" : false};
  const json = JSON.stringify(data);

  fetch(lightOne, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: json
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));  

})

sceneOne.addEventListener('click', function() {

  const data = {"scene": "g3Y6E1wtnkUZJV8"};
  const json = JSON.stringify(data);

  fetch(groupAction, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: json
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error)); 

})

getData.addEventListener('click', function() {
  fetch('http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  .then(response => response.json())
  .then(data => {
    const sceneObject = {}; // Object to store scene IDs and names
    
    // Iterate over each scene in the data
    for (const sceneId in data) {
      if (data.hasOwnProperty(sceneId)) {
        const scene = data[sceneId];
        const sceneName = scene.name;
        
        // Log scene ID and name into the sceneObject
        sceneObject[sceneId] = sceneName;
        
        console.log(`Scene ID: ${sceneId}, Scene Name: ${sceneName}`);
      }
    }
    
    console.log(sceneObject); // Log the sceneObject
  })
  .catch(error => console.log(error)); 

})


/* currentScene.addEventListener('click', function() {

  // Get the list of all scenes
  fetch(`http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes`)
    .then(response => response.json())
    .then(scenes => {
      let currentSceneId = null;
      let lastUpdated = 0;

      // Find the scene with the most recent "lastupdated" timestamp
      scenes.forEach(scene => {
        if (scene.lastupdated > lastUpdated) {
          lastUpdated = scene.lastupdated;
          currentSceneId = scene.id;
        }
      });

      if (currentSceneId) {
        // Retrieve the light states of the currently active scene
        fetch(`http://192.168.0.22/api/s8sE1qlfsYiewwC4bc7UFr11adcvoEpWRtxOxaBt/scenes/${currentSceneId}`)
          .then(response => response.json())
          .then(scene => {
            const currentLightStates = scene.lightstates;
            console.log(currentLightStates);
          })
          .catch(error => console.error(error));
      } else {
        console.log("No active scenes found.");
      }
    })
    .catch(error => console.error(error));
})
*/

