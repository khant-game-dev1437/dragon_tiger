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
  PhysicsSystem,
  physics,
} from "cc";
//const { PhysicsRayResult } = physics;
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
  private xArr = []; // save all x positions of objects
  private yArr = []; // save all y positions of objects
  private xFinalPosition: number; // last x position of an object
  private yFinalPosition: number; // last y position of an object
  private panelHeight = -40; // Panel edge point to add Objects
  private panelWidth = 104; // Panel width to add Objects

  private yBot;
  private xWidth;

  private mainStreetArray = [
    "tiger",
    "tiger",
    "tiger",
    "tiger",

    "dragon",
    "dragon",
    "dragon",

    "dragon",
    //"dragon",
    //"dragon",
    "tiger",
    "tiger",
    //"tiger",

    "dragon",

    "dragon",
    "dragon",
    "dragon",
    "dragon",
    "tiger",
    "tiger",
    "tiger",

    //"tiger",
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
      this.xArr.push(-101.7985);
      this.yArr.push(40);
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
        this.xFinalPosition = this.xArr[this.xArr.length - 1] + x1; // To adjust row height while change suit
        console.log("xFINALPOs ", this.xFinalPosition);
        this.xArr.push(this.xFinalPosition);

        this.yFinalPosition = this.yArr[this.yArr.length - 1]; // To adjust column height while change suit
        this.yArr.push(this.yFinalPosition);

        objPos.setPosition(this.xFinalPosition, this.yFinalPosition, 0);
        this.mainStreetTransform.addChild(objPos);
      } else {
        this.yBot =
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.y - y1;
        this.xWidth =
          this.mainStreetTransform.children[
            this.mainStreetTransform.children.length - 1
          ].position.x + x1;
        console.log("xWidth", this.xWidth);
        if (this.yBot <= this.panelHeight) {
          // Check there is an object already created or not ,  Check Panel height to adjust objects position
          objPos.setPosition(
            this.mainStreetTransform.children[
              this.mainStreetTransform.children.length - 1
            ].position.x + x1,
            this.mainStreetTransform.children[
              this.mainStreetTransform.children.length - 1
            ].position.y,
            0
          );
          this.yBot = 0;
        } else {
          objPos.setPosition(
            this.mainStreetTransform.children[
              this.mainStreetTransform.children.length - 1
            ].position.x,
            this.mainStreetTransform.children[
              this.mainStreetTransform.children.length - 1
            ].position.y - y1,
            0
          );
          this.yBot = 0;
        }
        this.mainStreetTransform.addChild(objPos);

        if (this.xWidth >= this.panelWidth) {
          objPos.destroy();
          console.log("destroyed");
        }

        // const worldRay = new geometry.Ray(
        //   this.mainStreetTransform.children[
        //     this.mainStreetTransform.children.length - 1
        //   ].position.x,
        //   this.mainStreetTransform.children[
        //     this.mainStreetTransform.children.length - 1
        //   ].position.y - y1,
        //   0,
        //   0,
        //   1,
        //   0
        // );
        // let ray = new geometry.Ray();
        // this.cam.screenPointToRay(0, 0, ray);
        // // The following parameters are optional
        // const mask = 0xffffffff;
        // const maxDistance = 10000000;
        // const queryTrigger = true;

        // if (
        //   PhysicsSystem.instance.raycastClosest(
        //     ray,
        //     mask,
        //     maxDistance,
        //     queryTrigger
        //   )
        // ) {
        //   const raycastClosestResult =
        //     PhysicsSystem.instance.raycastClosestResult;
        //   const hitPoint = raycastClosestResult.hitPoint;
        //   const hitNormal = raycastClosestResult.hitNormal;
        //   const collider = raycastClosestResult.collider;
        //   const distance = raycastClosestResult.distance;
        //   console.log("collider ", collider);
        // }
      }
    }
  }

  checkRaycast() {}

  checkDebug() {
    setTimeout(() => {
      console.log("check length ", this.mainStreetTransform.children.length);
      console.log("xArr ", this.xArr);
    }, 2000);
  }
}

enum mainStreetNames {
  dragon = "dragon", // red
  tiger = "tiger", // blue
  // green
}
