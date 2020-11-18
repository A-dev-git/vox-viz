// ***************** Event Handling **************
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); 
let playing = false;       

const onMouseClick = (event) => {            
    event.preventDefault();       

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);
    
    const intersects = raycaster.intersectObjects(scene.children, true);

    if(intersects.length > 0){
        let object = intersects[0].object;
        
        const selectedIndex = orbObjects.findIndex(({mesh}) => mesh === object);
        let newObject = sceneObjects[selectedIndex];                          
        
        if(newObject.selected){
            newObject.selected = false;
            object.scale.x = defaultObjSize;
            object.scale.y = defaultObjSize;
            object.scale.z = defaultObjSize;
        }else{
            newObject.selected = true;                        
            object.scale.x = objSelectedSize;
            object.scale.y = objSelectedSize;
            object.scale.z = objSelectedSize;
        }                   
    }
}

const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {  

    if(playing){
        playing = false;
    }else{
        playing = true;
    }
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);

window.addEventListener('click', onMouseClick, false);
// ***************** Event Hadnling End **************