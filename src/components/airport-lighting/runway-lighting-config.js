// Local headings follow the baked orientations in the airport model.
const amber = mesh => [{ mesh, color: 'amber' }]
const amberPair = mesh => [0, 1].map(part => ({ mesh, color: 'amber', part, parts: 2 }))
const emergency = (red, blue) => [{ mesh: red, color: 'red' }, { mesh: blue, color: 'blue' }]

export const runwayLights = [
    { name: 'conveyor-truck', front: 3.7, height: -0.75, halfWidth: 0.75, forward: 1, heading: Math.PI / 2, beacons: amber('Cube009_3') },
    { name: 'fuelTruck', front: 1.44, height: -0.49, halfWidth: 0.7, forward: 1, heading: Math.PI / 2, beacons: amber('Cube197_3') },
    { name: 'Bus', front: 5.88, height: -0.3, halfWidth: 1, forward: 1, heading: -Math.PI / 2, beacons: [] },
    { name: 'luggageTrailer', front: 5.7, height: 0.25, halfWidth: 0.75, forward: 1, heading: -Math.PI / 2, beacons: [{ mesh: 'trailer-added-beacon', color: 'amber', added: true, position: [-4.8, 1.85, 0] }] },
    { name: 'orangeRunwayCar1', front: 1.5, height: 0.28, halfWidth: 0.64, forward: 1, heading: -Math.PI * 3 / 4, beacons: amberPair('Cube171_2') },
    { name: 'orangeRunwayCar2', front: 1.5, height: 0.28, halfWidth: 0.64, forward: 1, heading: -Math.PI * 3 / 4, beacons: amber('Cube185_2') },
    { name: 'runwayWhiteCar', front: 1.55, height: 0.06, halfWidth: 0.72, forward: 1, heading: -Math.PI / 4, beacons: amber('Cube183_2') },
    { name: 'runwayBackup', front: 2.01, height: -0.4, halfWidth: 0.7, forward: 1, beacons: amberPair('Cube199_1') },
    { name: 'runwayPolice', front: -1.66, height: -0.98, halfWidth: 0.7, forward: -1, beacons: emergency('Cube002_4', 'Cube002_3') },
    { name: 'firefighter1', front: 4.1, height: -0.08, halfWidth: 0.93, forward: 1, heading: Math.PI / 2, beacons: emergency('Cube120_2', 'Cube120_3') },
    { name: 'firefighter2', front: 4.1, height: -0.08, halfWidth: 0.93, forward: 1, heading: Math.PI / 2, beacons: emergency('Cube159_1', 'Cube159_2') },
]
