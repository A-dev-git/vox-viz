// ***************** Lighting ******************
let hemiLight, spotLight, directionalLight,ambientLight;

const setupLighting = () => {
    hemiLight = new THREE.HemisphereLight( 0x16BAE8, 0x850CB4, 1.3);
    scene.add( hemiLight ); 

    spotLight = new THREE.SpotLight(0x16BAE8, 3);            
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024*4;
    spotLight.shadow.mapSize.height = 1024*4;
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );
    scene.add(spotLight);

    ambientLight = new THREE.AmbientLight( 0x404040 );
    ambientLight.intesity = .3;            
    scene.add( ambientLight );                             

    directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
    directionalLight.position.set(0,1,0);            
    directionalLight.castShadow = true;            

    //Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024; 
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;             

    scene.add( directionalLight );
}
// ***************** Lighting End ******************