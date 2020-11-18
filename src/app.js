// ******* manipulating scene objects ********
    getMicrophone();
    setupScene();
    setupLighting();        
    
    const floor = setupShape({            
        geometry: new THREE.PlaneGeometry(20,20,0),
        material: new THREE.MeshStandardMaterial({color : '#ffffff', roughness: 0}),
        pos: [0,-2,0],
        rotation: [-171, 0, 0],
    });        

    const orb1 = setupShape({            
        geometry: new THREE.SphereGeometry(1,32,32),
        material: new THREE.MeshStandardMaterial({color : '#7ca2de', roughness: 0}),
        pos:[-4,0,0],
    });    

    const orb2 = setupShape({
        geometry: new THREE.SphereGeometry(1,32,32),
        material: new THREE.MeshStandardMaterial({color : '#9ec4ff', roughness: 0}),
        pos:[0,0,0],
    });    

    const orb3 = setupShape({
        geometry: new THREE.SphereGeometry(1,32,32),
        material: new THREE.MeshStandardMaterial({color : '#93d1fa', roughness: 0}),
        pos:[4,0,0],
    });    

    // *** Adding objects to scenes
    const sceneObjects = [orb1,orb2,orb3,floor];
    addObjectsToScene(sceneObjects);
    
    const orbObjects = [orb1,orb2,orb3]  

    const defaultObjSize = 1;
    const objSelectedSize = 1.5;
   
    const render = () =>{
        requestAnimationFrame(render);                                      
        
        orbObjects.forEach(obj => {
            obj.mesh.rotation.x += .003;
            obj.mesh.rotation.y += .003;            
        })

        if(audioData != undefined){

            // Adjust lighting depending on volume of input
            directionalLight.intensity = ((meter.volume + .3) * 1.2);
            spotLight.intensity = ((meter.volume + .3) * 1.2);
            ambientLight.intensity = ((meter.volume + .3) * 1.2);
            hemiLight.intensity = ((meter.volume + .3) * 1.2);                        

            orbObjects.forEach(orb => {
                if(!orb.selected){
                    orb.mesh.scale.x = meter.volume + defaultObjSize;
                    orb.mesh.scale.y = meter.volume + defaultObjSize;
                    orb.mesh.scale.z = meter.volume + defaultObjSize;

                    orb.mesh.position.y = meter.volume;
                    orb.mesh.position.z = meter.volume; 
                }
            })            
        }            

        renderer.render(scene, camera);        
    }      

    render();
// ******* manipulating scene objects end ********
