// ***************** Scene ******************
let scene, camera, renderer, composer, sphereCamera;

const setupScene = () => {
    scene = new THREE.Scene();   
    //scene.background = new THREE.Color(0xdddddd);
    
    camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,5000);            
    camera.position.set(0,0,10);                              
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.toneMapping = THREE.ReinhardToneMapping;
    //renderer.toneMappingExposure = .5;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;           
    
    let controls = new THREE.OrbitControls(camera,renderer.domElement);
    //controls.enableZoom = false;

    let urls = [        
        'img/bluecloud_ft.jpg',
        'img/bluecloud_bk.jpg',
        'img/bluecloud_up.jpg',       
        'img/bluecloud_dn.jpg',
        'img/bluecloud_rt.jpg',
        'img/bluecloud_lf.jpg',
    ]

    let loader = new THREE.CubeTextureLoader();
    scene.background = loader.load(urls);

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

    sphereCamera = new THREE.CubeCamera(1,1000,cubeRenderTarget);
    sphereCamera.position.set(0,0,0);
    scene.add(sphereCamera);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    });        
}
// ***************** Scene End ******************