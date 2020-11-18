 // ***************** Shapes ******************
const defaultShape = {
    geometry: new THREE.BoxGeometry(1,1,1),
    material: new THREE.MeshLambertMaterial({color: '#84cccf'}),
    pos: [0, 0, 0],
    rotation: [0,0,0],       
};

const setupShape = (params) => {
    const { geometry, material, pos, rotation} = {
        ...defaultShape,
        ...params,
    };

    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(...pos);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const shapeObject = {
        mesh : mesh,
        selected : false,                
    }

    return shapeObject;
}

const addObjectsToScene = (objects) =>{
    objects.forEach(obj => {
        scene.add(obj.mesh);
    })
}
// ***************** Shapes End ******************