import {
  IonButton,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef } from "react";
// import { DirectionalLight } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Ex: React.FC = (props) => {
  const animationRef = useRef(null);

  useEffect(() => {
    let scene: THREE.Scene, renderer: any, camera: any;
    let model, skeleton, mixer: THREE.AnimationMixer, clock: THREE.Clock;

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color();
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    // // ground

    // const mesh = new THREE.Mesh(
    //   new THREE.PlaneGeometry(100, 100),
    //   new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    // );
    // mesh.rotation.x = -Math.PI ;
    // mesh.receiveShadow = true;
    // scene.add(mesh);

    const loader = new GLTFLoader();
    loader.load(
      "/assets/exercises/burpees.glb",
      function (gltf) {
        model = gltf.scene;
        // model.position.set(1, 1, 0);
        model.scale.set(0.018, 0.018, 0.018);
        scene.add(model);

        model.traverse(function (object: any) {
          if (object.isMesh) object.castShadow = true;
        });

        skeleton = new THREE.SkeletonHelper(model);
        skeleton.visible = false;
        scene.add(skeleton);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(390, 844);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    (animationRef.current as any).appendChild(renderer.domElement);

    // camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(-1, 2, 3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set(0, 1, 0);
    controls.update();

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(390, 844); //390    844
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      renderer.render(scene, camera);
    };
  }, []);

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Squat</IonTitle>
      </IonToolbar>
      <IonContent>
        <div>
          <div
            ref={animationRef}
            style={{ position: "absolute", width: "100vh", height: "100vh" }}
          />
        </div>
        <div className="ion-text-center">
          <IonButton>Próximo</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ex;
