class Graph {
  constructor(public map) {

  }

  private extractKeys(obj) {
    var keys = [], key;
    for (key in obj) {
      Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
    }
    return keys;
  }

  private sorter(a, b) {
    return parseFloat(a) - parseFloat(b);
  }

  private findPaths(map, start, end, infinity?) {
    infinity = infinity || Infinity;

    var costs = {},
      open = { '0': [start] },
      predecessors = {},
      keys;

    var addToOpen = function (cost, vertex) {
      var key = "" + cost;
      if (!open[key]) open[key] = [];
      open[key].push(vertex);
    }

    costs[start] = 0;

    while (open) {
      if (!(keys = this.extractKeys(open)).length) break;

      keys.sort(this.sorter);

      var key = keys[0],
        bucket = open[key],
        node = bucket.shift(),
        currentCost = parseFloat(key),
        adjacentNodes = map[node] || {};

      if (!bucket.length) delete open[key];

      for (var vertex in adjacentNodes) {
        if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
          var cost = adjacentNodes[vertex],
            totalCost = cost + currentCost,
            vertexCost = costs[vertex];

          if ((vertexCost === undefined) || (vertexCost > totalCost)) {
            costs[vertex] = totalCost;
            addToOpen(totalCost, vertex);
            predecessors[vertex] = node;
          }
        }
      }
    }

    if (costs[end] === undefined) {
      return null;
    } else {
      return predecessors;
    }
  }

  private extractShortest(predecessors, end) {
    var nodes = [],
      u = end;

    while (u !== undefined) {
      nodes.push(u);
      u = predecessors[u];
    }

    nodes.reverse();
    return nodes;
  }

  private pfindShortestPath(map, nodes) {
    var start = nodes.shift(),
      end,
      predecessors,
      path = [],
      shortest;

    while (nodes.length) {
      end = nodes.shift();
      predecessors = this.findPaths(map, start, end);

      if (predecessors) {
        shortest = this.extractShortest(predecessors, end);
        if (nodes.length) {
          path.push.apply(path, shortest.slice(0, -1));
        } else {
          return path.concat(shortest);
        }
      } else {
        return null;
      }

      start = end;
    }
  }

  private toArray(list, offset?) {
    try {
      return Array.prototype.slice.call(list, offset);
    } catch (e) {
      var a = [];
      for (var i = offset || 0, l = list.length; i < l; ++i) {
        a.push(list[i]);
      }
      return a;
    }
  }

  public findShortestPath(start, end) {
    if (Object.prototype.toString.call(start) === '[object Array]') {
      return this.pfindShortestPath(this.map, start);
    } else if (arguments.length === 2) {
      return this.pfindShortestPath(this.map, [start, end]);
    } else {
      return this.pfindShortestPath(this.map, this.toArray(arguments));
    }
  }
}