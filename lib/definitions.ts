export type Command = {
    id: number;
    type: string;
    startPoint: {key: string, value: number};
    controlPoints?: Array<{key: string, value: number}>;
    endPoint: {key: string, value: number};
}
