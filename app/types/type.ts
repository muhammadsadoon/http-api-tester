export type DefualtMethods = ("GET" | "POST" | "PUT" | "DELETE" | "PATCH")

export interface handleSendReqType {
    method: DefualtMethods;
    url:string;
    body?: any;
    headers?: {
        [key:string]: string | boolean | number;
    };
}

export interface TabData {
    id: string;
    label: string;
    method: DefualtMethods;
    url: string;
    body: string;
    headers: { key: string; value: string; checked: boolean }[];
    response: any;
    status?: number;
    statusText?: string;
    contentType?: string;
    jsonError: string | null;
    loading: boolean;
}

export interface TabContextType {
    tabs: TabData[];
    activeTab: string;
    addTab: (method: DefualtMethods) => void;
    closeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    updateTab: (id: string, data: Partial<Omit<TabData, 'id'>>) => void;
}

export interface AppShellContextType {
    url: string;
    method: DefualtMethods;
    updateURLString : (url: string) => String;
    updateMethod : (method: DefualtMethods) => DefualtMethods;
}

export interface TabScreenProps {
    tabId: string;
    url: string;
    method: DefualtMethods;
    updateURLString : (url: string) => void;
    onsubmit: (e: handleSendReqType) => void;
    loading?: boolean;
    headers?: { key: string; value: string; checked: boolean }[];
    body: string;
    response: any;
    status?: number;
    statusText?: string;
    contentType?: string;
    setMethod: (method: DefualtMethods) => void;
    onCancel: () => void;
}
