import { Vertex } from "../classes/Vertex";

export function AStar(grid: Vertex[][], startNode: Vertex, endNode: Vertex) {
  const openSet = [startNode];
  const visited: Vertex[] = [];
  startNode.distance = 0;

  while (!!openSet.length) {
    const current = pop(openSet);

    current.isVisited = true;
    visited.push(current);

    if (current === endNode) return visited;

    updateNeighbors(current);
  }

  return visited;

  function pop(nodes: Vertex[]) {
    nodes.sort(
      (nodeA, nodeB) =>
        nodeA.distance +
        calculateHeuristic(nodeA, endNode) -
        (nodeB.distance + calculateHeuristic(nodeB, endNode))
    );
    return nodes.shift()!;
  }

  function updateNeighbors(node: Vertex) {
    const neighbors = getNeighbors(node);

    for (const neighbor of neighbors) {
      const newDistance = node.distance + 1;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.prevNode = node;

        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }

  function getNeighbors(node: Vertex) {
    const neighbors = [];
    const { x, y } = node;

    if (x > 0) neighbors.push(grid[x - 1][y]);
    if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
    if (y > 0) neighbors.push(grid[x][y - 1]);
    if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);

    return neighbors.filter(
      (neighbor) => !neighbor.isWall() && !neighbor.isVisited
    );
  }

  function calculateHeuristic(node: Vertex, goalNode: Vertex) {
    // Implement your heuristic function here (e.g., Manhattan distance, Euclidean distance, etc.)
    // The heuristic function should estimate the cost to reach the goal node from the current node.
    // Make sure the heuristic is admissible (never overestimates the cost).
    // Example:
    return Math.abs(node.x - goalNode.x) + Math.abs(node.y - goalNode.y);
  }
}
