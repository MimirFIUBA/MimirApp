// Define los tipos para las configuraciones de JSON y Bytes
interface JSONDataConfiguration {
    name: string;
    path: string;
}

interface JSONValueConfiguration {
    idPath?: string;
    path?: string;
    additionalData: JSONDataConfiguration[];
}
  
interface BytesConfiguration {
    dataType: string;
    endianness: "big" | "little";
    size: number;
}

interface JSONHandler {
    type: "json";
    topic: string;
    configurations: JSONValueConfiguration[];
}
  
interface BytesHandler {
    type: "bytes";
    topic: string;
    configurations: BytesConfiguration[];
}
  
  // Unión discriminada de handlers
type Handler = JSONHandler | BytesHandler;
