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
    topic: string,
    isActive: boolean,
    dataLabel: string,
    dataName: string,
    unit: string,
    lastSensedReading: SensorReading,
    readings: Array<Object>,
    node: SensorNode,
    msgHandler: Handler | undefined
    triggers: Array<Trigger>
}

type SensorReading = {
    value: Object,
    topic: string,
    time: Date 
}

type Message = {
    type: string,
    id: string,
    body: string,
    read: boolean,
    createdDate: Date,
    additionalDetails: Object
}

type Variable = {
    id: string,
    name: string,
    value: any
}

type Action = {
    name: string | undefined,
    type: string | undefined,
    message: string | undefined,
    mqttMessage: string | undefined,
    topic: string | undefined,
    command: string | undefined,
    commandArgs: string | undefined,
    triggerName: string | undefined,
    triggerStatus: boolean | undefined   
}

type Trigger = {
    id: string,
    name: string,
    type: string,
    active: boolean,
    topics: Array<string>,
    condition: string | undefined,
    actions: Array<Action>,
}