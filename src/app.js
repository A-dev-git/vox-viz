// ******* manipulating scene objects ********
    getMicrophone();
    setupScene();
    setupLighting();    
    
    
    const floor = setupShape({            
        geometry: new THREE.PlaneGeometry(20,20,0),
        material: new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: sphereCamera.renderTarget, combine: THREE.MixOperation, reflectivity: 0.9 } ),
        pos: [0,-5,0],
        rotation: [300, 0, 0],
    });        
    
    const orb1 = setupShape({            
        geometry: new THREE.SphereGeometry(1,50,50),
        material: new THREE.MeshLambertMaterial( { color: '#9ec4ff', envMap: sphereCamera.renderTarget.texture, combine: THREE.MixOperation, reflectivity: 0.5 }),
        pos:[-4,0,-5],
    });        

    const orb2 = setupShape({
        geometry: new THREE.SphereGeometry(1,32,32),
        material: new THREE.MeshLambertMaterial( { color: '#9ec4ff', envMap: sphereCamera.renderTarget.texture, combine: THREE.MixOperation, reflectivity: 0.5 }),
        pos:[0,0,0],
    });    

    const orb3 = setupShape({
        geometry: new THREE.SphereGeometry(1,32,32),
        material: new THREE.MeshLambertMaterial({ color: '#9ec4ff', envMap: sphereCamera.renderTarget.texture, combine: THREE.MixOperation, reflectivity: 0.5 }),
        pos:[4,0,-5],
    });        

    // *** Adding objects to scenes
    const sceneObjects = [orb1,orb2,orb3];
    addObjectsToScene(sceneObjects);
    
    const orbObjects = [orb1,orb2,orb3]  

    const defaultObjSize = 1;
    const objSelectedSize = 1.5;

    const defaultGain = .1;
   
    let orbitRadius = 4;
    let orbitSpeed1 = 0;    
    let orbitSpeed2 = 0;    
    let orbitSpeed3 = 0;    

    const render = () =>{
        sphereCamera.update(renderer,scene);
        requestAnimationFrame(render);                                              

        if(audioData != undefined && playing){
            gainNode.gain.value = defaultGain + (meter.volume * 5);

            orbitSpeed1 += .005 + (meter.volume / 10);
            orbitSpeed2 += .004;
            orbitSpeed3 += .003;
            
            orb1.mesh.position.x = 0;                      
            orb1.mesh.position.y = orbitRadius * Math.sin(orbitSpeed1) + 0;
            orb1.mesh.position.z = orbitRadius * Math.sin(orbitSpeed1) + 0;

            orb2.mesh.position.x = orbitRadius * Math.cos(orbitSpeed1) + 0;                      
            orb2.mesh.position.y = 0;
            orb2.mesh.position.z = orbitRadius * Math.sin(orbitSpeed1) + 0;

            orb3.mesh.position.x = orbitRadius * Math.cos(orbitSpeed1) + 0;                      
            orb3.mesh.position.y = orbitRadius * Math.sin(orbitSpeed1) + 0;
            orb3.mesh.position.z = orbitRadius * Math.cos(orbitSpeed1) + 0;

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

                    // orb.mesh.position.y = meter.volume;
                    // orb.mesh.position.z = meter.volume; 
                }
            })
        }
        renderer.render(scene, camera);        
    }

    render();    
// ******* manipulating scene objects end ********
