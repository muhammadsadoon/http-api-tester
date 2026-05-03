"use client";

import { Group, Input, Paper, Button, Select, Text, Box, Tabs, Textarea, ActionIcon, Checkbox, Badge } from "@mantine/core";
import { useState, type ChangeEvent, useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useTabContext } from "../../context/tab-context";
import { TabScreenProps, DefualtMethods, handleSendReqType } from "../../types/type";

export default function TabScreen({ tabId, method, url, updateURLString, onsubmit, loading, headers, body: initialBody, response, status, statusText, contentType, setMethod, onCancel }: TabScreenProps) {
    const { updateTab } = useTabContext();
    const [headerMap, setHeaderMap] = useState<{ key: string; value: string; checked: boolean }[]>(headers && headers.length > 0 ? headers : [{ key: "", value: "", checked: true }]);
    const [body, setBody] = useState<string>(initialBody || "");
    const [jsonError, setJsonError] = useState<string | null>(null);
    const isHtml = contentType?.includes("text/html");

    const isMobile = useMediaQuery('(max-width: 768px)');

    // Derive header object for request submission
    const header = useMemo(() => {
        const newHeader: { [key: string]: string } = {};
        headerMap.forEach(({ key, value, checked }) => {
            if (key.trim() && checked) {
                newHeader[key] = value;
            }
        });
        return newHeader;
    }, [headerMap]);

    // Sync headers to context whenever they change
    const syncToContext = (updated: { key: string; value: string; checked: boolean }[]) => {
        setHeaderMap(updated);
        updateTab(tabId, { headers: updated });
    };

    const updateHeaderMap = (index: number, field: "key" | "value" | "checked", newValue: string | boolean) => {
        const updated = headerMap.map((item, i) =>
            i === index ? { ...item, [field]: newValue } : item
        );
        syncToContext(updated);
    };

    const addHeaderField = () => {
        syncToContext([...headerMap, { key: "", value: "", checked: true }]);
    };

    const removeHeaderField = (index: number) => {
        if (headerMap.length <= 1) return;
        const updated = headerMap.filter((_, i) => i !== index);
        syncToContext(updated);
    };

    const validateJson = (text: string) => {
        const trimmed = text.trim();
        if (trimmed.length === 0) {
            setJsonError(null);
            return;
        }
        try {
            JSON.parse(trimmed);
            setJsonError(null);
        } catch (err: any) {
            setJsonError(err.message || "Invalid JSON format");
        }
    };

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setBody(value);
        validateJson(value);
        updateTab(tabId, { body: value });
    };

    const handleFormatJson = () => {
        const text = body.trim();
        if (text.length === 0) return;

        try {
            const parsed = JSON.parse(text);
            const formatted = JSON.stringify(parsed, null, 2);
            setBody(formatted);
            setJsonError(null);
            updateTab(tabId, { body: formatted });
        } catch (err: any) {
            setJsonError(err.message || "Cannot format invalid JSON");
        }
    };

    const handleMethodChange = (val: string | null) => {
        if (val && ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(val)) {
            setMethod(val as DefualtMethods);
        }
    };

    return (
        <>
            <Paper bdrs={10} withBorder py={20} px={10}>
                <Text my={10} mx={0} fw={"bold"}>URL config</Text>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', width: '100%' }}>
                    <Select
                        placeholder="Pick value"
                        value={method}
                        onChange={handleMethodChange}
                        data={["GET", "POST", "DELETE", "PATCH", "PUT"]}
                        style={{ flex: isMobile ? '1' : '0 0 120px' }}
                    />
                    <Input 
                        value={url} 
                        style={{ flex: '1' }} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateURLString(e.target.value)} 
                        placeholder="type URL here..." 
                    />
                    <Button 
                        onClick={() => onsubmit({ url, method, body: body ? JSON.parse(body) : undefined, headers: header })} 
                        loading={loading}
                        style={{ flex: isMobile ? '1' : '0 0 100px' }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
            <Paper withBorder mt="md" p={10}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
                    <Paper w={isMobile ? "100%" : "50%"} h={400} p={10} radius={10} withBorder>
                        <Tabs defaultValue={"Headers"}>
                            <Tabs.List>
                                <Tabs.Tab value="Headers">
                                    Headers
                                </Tabs.Tab>
                                <Tabs.Tab value="Body">
                                    Body
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="Headers" p={10}>
                                <Text fz={"12px"} fw={"bold"} my={10}>
                                    Set Header:
                                </Text>
                                <div style={{ overflowY: 'auto', maxHeight: '280px' }}>
                                {
                                    headerMap.map((e, i) => {
                                        return (
                                            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                                <Checkbox
                                                    checked={e.checked}
                                                    onChange={(event) => updateHeaderMap(i, "checked", event.currentTarget.checked)}
                                                    title="Include in headers"
                                                />
                                                <Input
                                                    style={{ flex: 1 }}
                                                    placeholder="Key"
                                                    value={e.key}
                                                    onChange={(event) => updateHeaderMap(i, "key", event.currentTarget.value)}
                                                />
                                                <Text>:</Text>
                                                <Input
                                                    style={{ flex: 1 }}
                                                    placeholder="Value"
                                                    value={e.value}
                                                    onChange={(event) => updateHeaderMap(i, "value", event.currentTarget.value)}
                                                />
                                                {headerMap.length > 1 && (
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        size="sm"
                                                        onClick={() => removeHeaderField(i)}
                                                    >
                                                        ×
                                                    </ActionIcon>
                                                )}
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <Group my={10}>
                                    <ActionIcon
                                        variant="filled"
                                        color="blue"
                                        size="md"
                                        onClick={addHeaderField}
                                        title="Add Header"
                                    >
                                        +
                                    </ActionIcon>
                                </Group>

                            </Tabs.Panel>

                            <Tabs.Panel value="Body" p={10}>
                                <Text size="sm" fw={500} mb={5}>Request Body (JSON)</Text>
                                <Textarea
                                    placeholder="Enter JSON here..."
                                    styles={{ input: { height: '220px', fontFamily: 'monospace' } }}
                                    spellCheck={false}
                                    value={body}
                                    onChange={handleBodyChange}
                                />
                                <Group mt={5} justify="space-between">
                                    <Button
                                        size="xs"
                                        variant="light"
                                        color="blue"
                                        onClick={handleFormatJson}
                                        disabled={!!jsonError && body.trim().length > 0}
                                    >
                                        Format JSON
                                    </Button>
                                    {jsonError ? (
                                        <Text size="xs" c="red">
                                            {jsonError}
                                        </Text>
                                    ) : body.trim().length > 0 ? (
                                        <Text size="xs" c="green">
                                            Valid JSON
                                        </Text>
                                    ) : null}
                                </Group>
                            </Tabs.Panel>
                        </Tabs>
                    </Paper>
                    <Paper w={isMobile ? "100%" : "50%"} h={400} radius={10} withBorder p={10} style={{ position: 'relative' }}>
                        <Group justify="space-between" mb={5}>
                            <Text fw={500}>Preview</Text>
                            <Group gap={5}>
                                <Badge variant="light" color="blue" size="sm" radius="sm">
                                    {method}
                                </Badge>
                                {status && (
                                    <Badge 
                                        variant="filled" 
                                        color={status >= 200 && status < 300 ? "green" : status >= 400 ? "red" : "yellow"} 
                                        size="sm" 
                                        radius="sm"
                                    >
                                        {status} {statusText}
                                    </Badge>
                                )}
                            </Group>
                        </Group>
                        <Paper bg="var(--mantine-color-gray-light)" h={"90%"} w={"100%"} p={0} display={"flex"} className="items-center justify-center" style={{ position: 'relative', overflow: 'hidden' }}>
                            {response ? (
                                isHtml ? (
                                    <Tabs defaultValue="preview" w="100%" h="100%" styles={{ panel: { height: 'calc(100% - 40px)' } }}>
                                        <Tabs.List>
                                            <Tabs.Tab value="preview">Visual</Tabs.Tab>
                                            <Tabs.Tab value="raw">Raw</Tabs.Tab>
                                        </Tabs.List>

                                        <Tabs.Panel value="preview">
                                            <iframe
                                                srcDoc={typeof response === 'string' ? response : JSON.stringify(response)}
                                                style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                                                title="HTML Preview"
                                            />
                                        </Tabs.Panel>

                                        <Tabs.Panel value="raw">
                                            <pre style={{ width: '100%', height: '100%', overflow: 'auto', fontSize: 12, padding: 10 }}>
                                                {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
                                            </pre>
                                        </Tabs.Panel>
                                    </Tabs>
                                ) : (
                                    <pre style={{ width: '100%', height: '100%', overflow: 'auto', fontSize: 12, padding: 10 }}>
                                        {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
                                    </pre>
                                )
                            ) : (
                                <Text>Text not found</Text>
                            )}
                            {loading && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'var(--mantine-color-body)',
                                        opacity: 0.9,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        zIndex: 10,
                                        borderRadius: 4,
                                    }}
                                >
                                    <Text fw="bold" size="lg" c="blue">Loading...</Text>
                                    <Button color="red" variant="filled" onClick={onCancel} size="sm">
                                        Cancel Request
                                    </Button>
                                </div>
                            )}
                        </Paper>
                    </Paper>

                </div>
            </Paper>
        </>
    )
}

