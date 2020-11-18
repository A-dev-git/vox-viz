// ***************** Event Handling **************
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();        

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

window.addEventListener('click', onMouseClick, false);
// ***************** Event Hadnling End **************