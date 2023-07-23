import { NodeType } from "../types/NodeType";

export class Vertex {
  constructor(
    readonly x: number,
    readonly y: number,
    public nodeType: NodeType = NodeType.Default,
    public distance: number = Infinity,
    public prevNode: Vertex | null = null,
    public isVisited: boolean = false
  ) {}

  public reset() {
    this.distance = Infinity;
    this.prevNode = null;
    this.isVisited = false;
  }

  public isStartOrEnd() {
    return this.nodeType === NodeType.Start || this.nodeType === NodeType.End;
  }

  public isWall() {
    return this.nodeType === NodeType.Wall;
  }

  public setWall() {
    this.nodeType = NodeType.Wall;
  }

  public clearWall() {
    this.nodeType = NodeType.Default;
  }
}
