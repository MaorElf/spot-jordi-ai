export type User = {
    name: string;
    userId: number;
}

export type ChatMessage = {
    message: string;
    sender: Source;
}

export const Source = {
    user:  'user',
    jordi: 'jordi'
} as const;

export type Source = typeof Source[keyof typeof Source];

export type UserCookie = {
        'id': number,
        'firstName': string,
        'lastName':string,
        'displayName':string,
        'email':string,
        'roleTitle':string,
        'roleBitMask': number,
        'mfaEnabled': boolean,
        'isCAPermissionsEnabled': boolean
}

export const SOCKET_EVENT = {
    NEW_MESSAGE: 'newMessage',
    CREATE_CHAT: 'createChat'
} as const;

export type SocketEvent = typeof SOCKET_EVENT[keyof typeof SOCKET_EVENT];

