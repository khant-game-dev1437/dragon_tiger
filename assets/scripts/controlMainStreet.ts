import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Layout,
  UITransform,
  geometry,
  Camera,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("controlMainStreet")
export class controlMainStreet extends Component {
  @property(Camera)
  cam: Camera = null!;

  @property(Node)
  mainStreetTransform: Node;

  @property(Prefab)
  blue: Node = null!;

  @property(Prefab)
  red: Node = null!;

  private changeSuit: boolean = false;

  private mainStreetArray = [
    "tiger",
    "tiger",
    "tiger",

    "tiger",
    "dragon",

    "dragon",
    "dragon",
    "tiger",
    "tiger",
    "tiger",

    "tiger",
    "dragon",

    "dragon",
    "dragon",
    "tiger",
    "tiger",
    "tiger",

    "tiger",
  ];

  start() {}

  onLoad() {
    this.createMainStreet();
    this.checkDebug();
  }
  update(deltaTime: number) {}

  createMainStreet() {
    for (var i = 0; i < this.mainStreetArray.length; i++) {
      if (i == 1) {
        if (this.mainStreetArray[i] == this.mainStreetArray[i - 1]) {
          this.changeSuit = false;
        } else if (this.mainStreetArray[i] != this.mainStreetArray[i - 1]) {
          this.changeSuit = true;
        }
      } else {
        if (this.mainStreetArray[i] == this.mainStreetArray[i - 1]) {
          this.changeSuit = false;
        } else if (this.mainStreetArray[i] != this.mainStreetArray[i - 1]) {
          this.changeSuit = true;
        }
      }
      if (this.mainStreetArray[i] == mainStreetNames.tiger) {
        this.createObject(this.blue);
      } else if (this.mainStreetArray[i] == mainStreetNames.dragon) {
        this.createObject(this.red);
      }
    }
    console.log("Length", this.mainStreetTransform.children.length);
  }

  createObject(obj: Node) {
    let prefab = instantiate(obj);
    this.checkPosition(prefab);
  }

  checkPosition(objPos: Node) {
    console.log("transform count ", this.mainStreetTransform.children.length);
    if (this.mainStreetTransform.children.length == 0) {
      this.mainStreetTransform.addChild(objPos);
      objPos.setPosition(-101.7985, 40, 0);
    } else {
      let x =
        this.mainStreetTransform.children[0].getComponent(UITransform) // For Objects placing
          .contentSize.width;
      let x1 = Math.round(x);
      let y =
        this.mainStreetTransform.children[0].getComponent(UITransform) // For Objects placing
          .contentSize.height;
      let y1 = Math.round(y);

      if (this.changeSuit) {
        objPos.setPosition(
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.x + x1,
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.y,
          0
        );
        this.mainStreetTransform.addChild(objPos);
      } else {
        //check object is already created at the bottom of UI or not.

        // const outRay = new geometry.Ray(
        //   this.mainStreetTransform.children[
        //     this.mainStreetTransform.children.length - 1
        //   ].position.x,
        //   this.mainStreetTransform.children[
        //     this.mainStreetTransform.children.length - 1
        //   ].position.y - y1,
        //   0,
        //   0,
        //   0,
        //   1
        // );
        const camera = this.cam.getComponent(Camera);
        const outRay = new geometry.Ray();
        camera?.screenPointToRay(
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.x,
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.y - y1,
          outRay
        );

        objPos.setPosition(
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.x,
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.y - y1,
          0
        );
        this.mainStreetTransform.addChild(objPos);
      }
    }
  }

  checkRaycast() {}

  checkDebug() {
    setTimeout(() => {
      console.log("check length ", this.mainStreetTransform.children.length);
    }, 2000);
  }
}

enum mainStreetNames {
  dragon = "dragon", // red
  tiger = "tiger", // blue
  // green
}
