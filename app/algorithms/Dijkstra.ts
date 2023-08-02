// Import the Vertex class from the "./Vertex" file
import { Vertex } from "../classes/Vertex";

// Diykstra's algorithm implementation to find the shortest path in a grid-based graph
export function Dijkstra(grid: Vertex[][], startNode: Vertex, endNode: Vertex) {
  // Initialize the openSet with the startNode and an empty visited array
  const openSet = [startNode];
  const visited: Vertex[] = [];

  // Set the distance of the startNode to 0
  startNode.distance = 0;

  // Main loop: continue until there are nodes in the openSet
  while (!!openSet.length) {
    // Pop the node with the smallest distance from the openSet
    const current = pop(openSet);

    // If the current node is the destination node, the shortest path is found
    if (current === endNode) return visited;

    // Mark the current node as visited and add it to the visited array
    current.isVisited = true;
    visited.push(current);

    // Update the distances of the neighbors of the current node and add them to the openSet
    updateNeighbors(current);
  }

  // If the loop completes without finding the destination node, return the visited array (path not found)
  return visited;

  // Priority queue-like function to pop the node with the smallest distance from the nodes array
  function pop(nodes: Vertex[]) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    return nodes.shift()!;
  }

  // Function to update distances and previous nodes of the neighbors of the given node
  function updateNeighbors(node: Vertex) {
    // Get the neighboring nodes
    const neighbors = getNeighbors(node);

    // Iterate through the neighbors
    for (const neighbor of neighbors) {
      // Update the distance of the neighbor to be the distance of the current node plus 1 (assumes unweighted graph)
      neighbor.distance = node.distance + 1;
      // Set the previous node of the neighbor to be the current node
      neighbor.prevNode = node;

      // If the neighbor is not already in the openSet, add it to the openSet
      if (!openSet.includes(neighbor)) openSet.push(neighbor);
    }
  }

  // Function to get the neighboring nodes of the given node
  function getNeighbors(node: Vertex) {
    const neighbors = [];
    const { x, y } = node;

    // Check the top, bottom, left, and right neighbors
    if (x > 0) neighbors.push(grid[x - 1][y]);
    if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
    if (y > 0) neighbors.push(grid[x][y - 1]);
    if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);

    // Filter out neighbors that are walls or have already been visited
    return neighbors.filter(
      (neighbor) => !neighbor.isWall() && !neighbor.isVisited
    );
  }
}
