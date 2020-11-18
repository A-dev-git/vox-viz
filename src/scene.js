// ***************** Scene ******************
let scene, camera, renderer, composer;

const setupScene = () => {
    scene = new THREE.Scene();   
    scene.background = new THREE.Color(0xdddddd);
    
    camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000)            
    camera.position.z = 10;                              
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.toneMapping = THREE.ReinhardToneMapping;
    //renderer.toneMappingExposure = .5;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;             
    
    let materialsArray = [];
    let texture_bk = new THREE.TextureLoader().load('img/bluecloud_bk.jpg');
    let texture_dn = new THREE.TextureLoader().load('img/bluecloud_dn.jpg');
    let texture_ft = new THREE.TextureLoader().load('img/bluecloud_ft.jpg');
    let texture_lf = new THREE.TextureLoader().load('img/bluecloud_lf.jpg');
    let texture_rt = new THREE.TextureLoader().load('img/bluecloud_rt.jpg');
    let texture_up = new THREE.TextureLoader().load('img/bluecloud_up.jpg');

    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));
    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialsArray.push(new THREE.MeshBasicMaterial({map: texture_up}));

    let skyBoxGeo = new THREE.BoxGeometry(10000,10000,10000);
    

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    });        
}
// ***************** Scene End ******************