import {
  _decorator,
  Component,
  Node,
  instantiate,
  Vec2,
  v2,
  v3,
  size,
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("NewComponent")
export class NewComponent extends Component {
  @property(Node)
  beadRoad: Node;

  @property(Prefab)
  tiger: Node = null!;
  @property(Prefab)
  dragon: Node = null!;
  @property(Prefab)
  draw: Node = null!;

  private beadRoadArray = [
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
    this.createBeadRoad();
  }
  update(deltaTime: number) {}

  addToBeadRoadArray(name: string) {
    this.beadRoadArray.push(name);
  }
  createBeadRoad() {
    for (var i = 0; i < this.beadRoadArray.length; i++) {
      if (this.beadRoadArray[i] == beadRoadNames.tiger) {
        this.createObject(this.tiger);
      } else if (this.beadRoadArray[i] == beadRoadNames.dragon) {
        this.createObject(this.dragon);
      } else {
        this.createObject(this.draw);
      }
    }
  }

  createObject(obj: Node) {
    let newtigerNode = instantiate(obj);
    this.beadRoad.addChild(newtigerNode);
  }
}
enum beadRoadNames {
  dragon = "dragon", // red
  tiger = "tiger", // blue
  draw = "draw", // green
}
