//TODO: rename file

type Crop = {
    id: string,
    name: string,
    type: string,
    description: string,
    nodes: Array<SensorNode>
}

type SensorNode = {
    id: string,
    name: string,
    sensors: Array<Sensor>
}

type Sensor = {
    id: string,
    name: string,
    readings: Array<Object>
}