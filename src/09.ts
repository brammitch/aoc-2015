import { open } from "node:fs/promises";

type LocationChecklist = Record<string, boolean>;
type Route = { locationA: string; locationB: string; distance: number };
type RouteMap = Map<string, Record<string, number>>;
type RouteTracker = [Set<string>, number];

export async function findRequestedRoutes(
  filename: string
): Promise<{ longest: number; shortest: number }> {
  const file = await open(filename);

  const routeMap: RouteMap = new Map<string, Record<string, number>>();

  for await (const line of file.readLines()) {
    const r = parseRoute(line);
    updateRouteMap(routeMap, r);
  }

  const shortestRouteTrackers: RouteTracker[] = [];
  const longestRouteTrackers: RouteTracker[] = [];

  Array.from(routeMap.entries()).forEach(([location, obj]) => {
    // Initialize a list with all locations false (unvisited)
    const shortestLocationChecklist: LocationChecklist = {};
    Array.from(routeMap.keys()).forEach(
      (k) => (shortestLocationChecklist[k] = false)
    );
    const longestLocationChecklist: LocationChecklist = {
      ...shortestLocationChecklist,
    };

    shortestRouteTrackers.push(
      determineShortestRoute(
        location,
        shortestLocationChecklist,
        obj,
        routeMap,
        [new Set<string>(), 0]
      )
    );

    longestRouteTrackers.push(
      determineLongestRoute(location, longestLocationChecklist, obj, routeMap, [
        new Set<string>(),
        0,
      ])
    );
  });

  console.log("\nShortest routes for each starting location:");
  shortestRouteTrackers.forEach((rt) => {
    console.log([...rt[0]].join(" -> "), rt[1]);
  });
  console.log("\nLongest routes for each starting location:");
  longestRouteTrackers.forEach((rt) => {
    console.log([...rt[0]].join(" -> "), rt[1]);
  });

  return {
    longest: longestRouteTrackers.sort((a, b) => b[1] - a[1])[0]?.[1] ?? 0,
    shortest: shortestRouteTrackers.sort((a, b) => a[1] - b[1])[0]?.[1] ?? 0,
  };
}

function parseRoute(line: string): Route {
  const result = line.split(" ");

  return {
    locationA: result[0] as string,
    locationB: result[2] as string,
    distance: parseInt(result[4] as string),
  };
}

function updateRouteMap(m: RouteMap, r: Route) {
  const a = m.get(r.locationA);
  if (a) {
    a[r.locationB] = r.distance;
    m.set(r.locationA, a);
  } else {
    m.set(r.locationA, { [r.locationB]: r.distance });
  }

  const b = m.get(r.locationB);
  if (b) {
    b[r.locationA] = r.distance;
    m.set(r.locationB, b);
  } else {
    m.set(r.locationB, { [r.locationA]: r.distance });
  }
}

function determineShortestRoute(
  location: string,
  locationChecklist: LocationChecklist,
  obj: Record<string, number>,
  routeMap: RouteMap,
  routeTracker: RouteTracker
): RouteTracker {
  let destinationName: string | undefined;
  // Using the location as a starting point, find the closest known direct route that has not yet been visited
  const closestDestination = Object.entries(obj)
    .sort(([, vA], [, vB]) => vA - vB)
    .find(([k]) => locationChecklist[k] === false);

  if (closestDestination) {
    destinationName = closestDestination[0];
    const distance = closestDestination[1];
    locationChecklist[location] = true;
    locationChecklist[closestDestination[0]] = true;
    routeTracker[0].add(location);
    routeTracker[0].add(destinationName);
    routeTracker[1] = routeTracker[1] + distance;

    // If we've already visited every location
    if (Object.values(locationChecklist).every((v) => v === true)) {
      return routeTracker;
    }

    // Starting from the location we just visited, find the next location to visit
    return determineShortestRoute(
      destinationName,
      locationChecklist,
      routeMap.get(destinationName)!,
      routeMap,
      routeTracker
    );
  }

  // No more destinations to visit
  return routeTracker;
}

function determineLongestRoute(
  location: string,
  locationChecklist: LocationChecklist,
  obj: Record<string, number>,
  routeMap: RouteMap,
  routeTracker: RouteTracker
): RouteTracker {
  let destinationName: string | undefined;
  const farthestDestination = Object.entries(obj)
    .sort(([, vA], [, vB]) => vB - vA)
    .find(([k]) => locationChecklist[k] === false);

  if (farthestDestination) {
    destinationName = farthestDestination[0];
    const distance = farthestDestination[1];
    locationChecklist[location] = true;
    locationChecklist[farthestDestination[0]] = true;
    routeTracker[0].add(location);
    routeTracker[0].add(destinationName);
    routeTracker[1] = routeTracker[1] + distance;

    if (Object.values(locationChecklist).every((v) => v === true)) {
      return routeTracker;
    }

    return determineLongestRoute(
      destinationName,
      locationChecklist,
      routeMap.get(destinationName)!,
      routeMap,
      routeTracker
    );
  }

  return routeTracker;
}
