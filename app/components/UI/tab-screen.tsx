"use client";

import { Group, Input, Paper, Button, Select, Text, Box, Tabs, Textarea, ActionIcon, Checkbox } from "@mantine/core";
import { useState, type ChangeEvent } from "react";
import { useTabContext } from "../../context/tab-context";

export default function TabScreen({ tabId, method, url, updateURLString, onsubmit, loading, response, setMethod }: TabScreenProps) {
    const { updateTab } = useTabContext();
    const [header, setHeader] = useState<{ [key: string]: string }>({ "content": "applicarion" })
    const [headerMap, setHeaderMap] = useState<{ key: string; value: string; checked: boolean }[]>([{ key: "", value: "", checked: true }]);
    const [body, setBody] = useState<string>("");
    const [jsonError, setJsonError] = useState<string | null>(null);

    const syncHeaderObject = (data: { key: string; value: string; checked: boolean }[]) => {
        const newHeader: { [key: string]: string } = {};
        data.forEach(({ key, value, checked }) => {
            if (key.trim() && checked) {
                newHeader[key] = value;
            }
        });
        setHeader(newHeader);
    };

    const updateHeaderMap = (index: number, field: "key" | "value" | "checked", newValue: string | boolean) => {
        const updated = headerMap.map((item, i) =>
            i === index ? { ...item, [field]: newValue } : item
        );
        setHeaderMap(updated);
        syncHeaderObject(updated);
    };

    const addHeaderField = () => {
        setHeaderMap([...headerMap, { key: "", value: "", checked: true }]);
    };

    const removeHeaderField = (index: number) => {
        if (headerMap.length <= 1) return;
        const updated = headerMap.filter((_, i) => i !== index);
        setHeaderMap(updated);
        syncHeaderObject(updated);
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
    };

    const handleFormatJson = () => {
        const text = body.trim();
        if (text.length === 0) return;

        try {
            const parsed = JSON.parse(text);
            const formatted = JSON.stringify(parsed, null, 2);
            setBody(formatted);
            setJsonError(null);
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
            <Paper bdrs={10} bd={"1px solid #dadada"} py={20} px={10}>
                <Text my={10} mx={0} fw={"bold"}>URL config</Text>
                <Group>
                    <Select
                        placeholder="Pick value"
                        value={method}
                        onChange={handleMethodChange}
                        data={["GET", "POST", "DELETE", "PATCH", "PUT"]}
                    />
                    <Input value={url} w={"65%"} onChange={(e: ChangeEvent<HTMLInputElement>) => updateURLString(e.target.value)} placeholder="type URL here..." />
                    <Button onClick={() => onsubmit({ url, method, body: body ? JSON.parse(body) : undefined, headers: header })} loading={loading}>Send</Button>
                </Group>
            </Paper>
            <Paper>
                <Group>
                    <Box w={"49%"} h={400} p={10} my={10} bdrs={10} bd={"1px solid #dadada"}>
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
                                {
                                    headerMap.map((e, i) => {
                                        return (
                                            <Group key={i} my={5}>
                                                <Checkbox
                                                    checked={e.checked}
                                                    onChange={(event) => updateHeaderMap(i, "checked", event.currentTarget.checked)}
                                                    title="Include in headers"
                                                />
                                                <Input
                                                    w={"35%"}
                                                    placeholder="Key"
                                                    value={e.key}
                                                    onChange={(event) => updateHeaderMap(i, "key", event.currentTarget.value)}
                                                />
                                                {":"}
                                                <Input
                                                    w={"35%"}
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
                                            </Group>
                                        )
                                    })
                                }
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
                    </Box>
                    <Box w={"49%"} h={400} my={10} bdrs={10} bd={"1px solid #dadada"} p={10}>
                        <Text>Preview</Text>
                        <Paper bg={"#f2f2f2"} h={"90%"} w={"100%"} p={10} display={"flex"} className="items-center justify-center">
                            {response ? (
                                <pre style={{ width: '100%', height: '100%', overflow: 'auto', fontSize: 12 }}>
                                    {JSON.stringify(response, null, 2)}
                                </pre>
                            ) : (
                                <Text>Text not found</Text>
                            )}
                        </Paper>
                    </Box>

                </Group>
            </Paper>
        </>
    )
}

