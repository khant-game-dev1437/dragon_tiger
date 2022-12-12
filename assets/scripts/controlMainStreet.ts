import { _decorator, Component, Node, Prefab, instantiate, Layout } from "cc";
const { ccclass, property } = _decorator;

@ccclass("controlMainStreet")
export class controlMainStreet extends Component {
  @property(Node)
  mainStreetTransform: Node;

  @property(Prefab)
  blue: Node = null!;

  private mainStreetArray = [
    "tiger",
    "tiger",
    "tiger",
    "draw",
    "tiger",
    "dragon",
    "draw",
    "dragon",
    "dragon",
    "tiger",
    "tiger",
    "tiger",
    "draw",
    "tiger",
    "dragon",
    "draw",
    "dragon",
    "dragon",
    "tiger",
    "tiger",
    "tiger",
    "draw",
    "tiger",
  ];

  start() {}

  onLoad() {
    this.createMainStreet();
  }
  update(deltaTime: number) {}

  createMainStreet() {
    for (var i = 0; i < this.mainStreetArray.length; i++) {
      if (this.mainStreetArray[i] == mainStreetNames.tiger) {
        this.createObject(this.blue);
      }
    }
  }

  createObject(obj: Node) {
    let prefab = instantiate(obj) as Node;
    this.checkPosition(prefab);
  }

  checkPosition(objPos: Node) {
    console.log("transform count ", this.mainStreetTransform.children.length);
    if (this.mainStreetTransform.children.length == 0) {
      this.mainStreetTransform.addChild(objPos);
      this.mainStreetTransform.getComponent(Layout).enabled = false;
      console.log("hi");
    }
  }
}

enum mainStreetNames {
  dragon = "dragon", // red
  tiger = "tiger", // blue
  draw = "draw", // green
}
