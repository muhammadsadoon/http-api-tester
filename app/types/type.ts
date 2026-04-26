

type DefualtMethods = ("GET" | "POST" | "PUT" | "DELETE" | "PATCH")

interface handleSendReqType {
    method: DefualtMethods;
    url:string;
    body?: any;
    headers?: {
        [key:string]: string | boolean | number;
    };
}

interface TabData {
    id: string;
    label: string;
    method: DefualtMethods;
    url: string;
    body: string;
    headers: { key: string; value: string; checked: boolean }[];
    response: any;
    jsonError: string | null;
}

interface TabContextType {
    tabs: TabData[];
    activeTab: string;
    addTab: (method: DefualtMethods) => void;
    closeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    updateTab: (id: string, data: Partial<Omit<TabData, 'id'>>) => void;
}

interface AppShellContextType {
    url: string;
    method: DefualtMethods;
    updateURLString : (url: string) => String;
    updateMethod : (method: DefualtMethods) => DefualtMethods;
}

interface TabScreenProps {
    tabId: string;
    url: string;
    method: DefualtMethods;
    updateURLString : (url: string) => void;
    onsubmit: (e: handleSendReqType) => void;
    loading?: boolean;
    headers?: {
        [key:string]: string | boolean | number;
    }
    response: any;
    setMethod: (method: DefualtMethods) => void;
    setUrl: (url: string) => void;
}
