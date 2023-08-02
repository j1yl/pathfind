import { Vertex } from "../classes/Vertex";

export function backtrackToStart(node: Vertex) {
  const path = [node];

  while (node.prevNode) {
    path.unshift(node.prevNode);
    node = node.prevNode!;
  }

  return path;
}
