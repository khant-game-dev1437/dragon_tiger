import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Layout,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("controlMainStreet")
export class controlMainStreet extends Component {
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
    console.log("create");
    let prefab = instantiate(obj);
    this.checkPosition(prefab);
  }

  checkPosition(objPos: Node) {
    console.log("transform count ", this.mainStreetTransform.children.length);
    if (this.mainStreetTransform.children.length == 0) {
      this.mainStreetTransform.addChild(objPos);
      objPos.setPosition(-101.7985, 40, 0);

      console.log("hi");
    } else {
      let x =
        this.mainStreetTransform.children[0].getComponent(UITransform)
          .contentSize.width;
      let x1 = Math.round(x);
      let y =
        this.mainStreetTransform.children[0].getComponent(UITransform)
          .contentSize.height;
      let y1 = Math.round(y);

      console.log("before pos", objPos.position);
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
      console.log("pos ", objPos.position);
    }
  }

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
