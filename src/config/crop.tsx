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
    description: string,
    sensors: Array<Sensor>
    group: Crop
}

type Sensor = {
    id: string,
    name: string,
    lastSensedReading: SensorReading,
    readings: Array<Object>,
    node: SensorNode
}

type SensorReading = {
    value: Object,
    topic: string,
    time: Date 
}