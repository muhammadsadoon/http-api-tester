"use client";

import { Title, Text, Paper, Stack, Group, List, ThemeIcon, Tabs, Badge, Code, Box, Alert } from "@mantine/core";
import {
  BookOpen,
  Send,
  Layers,
  Database,
  Eye,
  Terminal,
  Code2,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function HelpView() {
  return (
    <Stack gap="lg" py="md">
      <Group justify="space-between">
        <div>
          <Badge variant="light" color="blue" mb="xs">Help Center & API Guide</Badge>
          <Title order={1}>Documentation</Title>
        </div>
        <ThemeIcon size={48} radius="md" variant="light" color="blue">
          <BookOpen size={24} />
        </ThemeIcon>
      </Group>

      <Tabs defaultValue="steps" orientation="vertical" variant="pills" radius="md">
        <Tabs.List w={200} mr="xl">
          <Tabs.Tab value="steps" leftSection={<Terminal size={16} />}>Getting Started</Tabs.Tab>
          <Tabs.Tab value="methods" leftSection={<Send size={16} />}>Request Methods</Tabs.Tab>
          <Tabs.Tab value="body" leftSection={<Code2 size={16} />}>Body Handler</Tabs.Tab>
          <Tabs.Tab value="headers" leftSection={<ShieldCheck size={16} />}>Headers & Auth</Tabs.Tab>
          <Tabs.Tab value="preview" leftSection={<Eye size={16} />}>Visual Preview</Tabs.Tab>
        </Tabs.List>

        <Box style={{ flex: 1 }}>
          {/* --- STEPS TAB --- */}
          <Tabs.Panel value="steps">
            <Paper withBorder p="xl" radius="md">
              <Stack gap="md">
                <Title order={3}>🚀 Step-by-Step Guide</Title>
                <Text size="sm">Follow these simple steps to execute your first API test on our platform:</Text>

                <List spacing="sm" size="sm" mt="md">
                  <List.Item>
                    <Text fw={700}>1. Initialize Tab</Text>
                    <Text c="dimmed">Click the '+' button in the header to create a new API request tab.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>2. Define Endpoint</Text>
                    <Text c="dimmed">Enter your full URL (e.g., https://jsonplaceholder.typicode.com/posts).</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>3. Select Method</Text>
                    <Text c="dimmed">Choose GET for fetching data or POST for sending new data.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>4. Execute</Text>
                    <Text c="dimmed">Press the 'Send' button and watch the magic happen in the preview section.</Text>
                  </List.Item>
                </List>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* --- METHODS TAB --- */}
          <Tabs.Panel value="methods">
            <Paper withBorder p="xl" radius="md">
              <Stack gap="md">
                <Title order={3}>🌐 Understanding HTTP Methods</Title>
                <Text size="sm">Our platform supports all standard RESTful actions:</Text>

                <Box mt="md">
                  <Group gap="xs" mb={5}>
                    <Badge color="green" variant="filled">GET</Badge>
                    <Text fw={600} size="sm">Retrieve Data</Text>
                  </Group>
                  <Text size="xs" c="dimmed">Used to fetch information from a server. GET requests should only retrieve data and have no other effect.</Text>
                </Box>

                <Box>
                  <Group gap="xs" mb={5}>
                    <Badge color="blue" variant="filled">POST</Badge>
                    <Text fw={600} size="sm">Create Resource</Text>
                  </Group>
                  <Text size="xs" c="dimmed">Used to send data to a server to create a new resource. The body typically contains the data to be saved.</Text>
                </Box>

                <Box>
                  <Group gap="xs" mb={5}>
                    <Badge color="orange" variant="filled">PUT / PATCH</Badge>
                    <Text fw={600} size="sm">Update Resource</Text>
                  </Group>
                  <Text size="xs" c="dimmed">PUT replaces the entire resource, while PATCH applies partial modifications.</Text>
                </Box>

                <Box>
                  <Group gap="xs" mb={5}>
                    <Badge color="red" variant="filled">DELETE</Badge>
                    <Text fw={600} size="sm">Remove Resource</Text>
                  </Group>
                  <Text size="xs" c="dimmed">Deletes the specified resource from the server.</Text>
                </Box>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* --- BODY HANDLER TAB --- */}
          <Tabs.Panel value="body">
            <Paper withBorder p="xl" radius="md">
              <Stack gap="md">
                <Title order={3}>📝 Working with JSON Body</Title>
                <Text size="sm">The Body Handler allows you to send complex data payloads to your API.</Text>

                <Alert icon={<AlertCircle size={16} />} title="JSON Formatting" color="blue" radius="md">
                  Our editor automatically validates your JSON. If there's a syntax error, you'll see a red warning below the text area.
                </Alert>

                <Stack gap="xs" mt="md">
                  <Text fw={600} size="sm">Standard JSON Format:</Text>
                  <Code block radius="md">
                    {`{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`}
                  </Code>
                  <Text size="xs" c="dimmed">Tip: Use the 'Format JSON' button to beautify your code instantly.</Text>
                </Stack>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* --- HEADERS TAB --- */}
          <Tabs.Panel value="headers">
            <Paper withBorder p="xl" radius="md">
              <Stack gap="md">
                <Title order={3}>🔑 Headers & Authentication</Title>
                <Text size="sm">Headers pass additional metadata with your request, such as Auth tokens or Content-Types.</Text>

                <List spacing="xs" size="sm" mt="md">
                  <List.Item>
                    <Text fw={600}>Authorization</Text>
                    <Text size="xs" c="dimmed">Key: <code>Authorization</code>, Value: <code>Bearer your_token_here</code></Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Content-Type</Text>
                    <Text size="xs" c="dimmed">Set to <code>application/json</code> automatically when sending a body.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Custom Headers</Text>
                    <Text size="xs" c="dimmed">You can add any custom X-Header required by your specific API.</Text>
                  </List.Item>
                </List>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* --- PREVIEW TAB --- */}
          <Tabs.Panel value="preview">
            <Paper withBorder p="xl" radius="md">
              <Stack gap="md">
                <Title order={3}>👁️ Visual Preview Engine</Title>
                <Text size="sm">Our platform features a unique rendering engine for web-based responses.</Text>

                <Group gap="lg" mt="md">
                  <Box style={{ flex: 1 }}>
                    <Text fw={600} size="sm" mb={5}>Visual Mode</Text>
                    <Text size="xs" c="dimmed">Automatically detects HTML and renders it inside a sandboxed iframe. Perfect for testing SSR pages.</Text>
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Text fw={600} size="sm" mb={5}>Raw Mode</Text>
                    <Text size="xs" c="dimmed">Switch to 'Raw' to see the exact code returned by the server, including all tags and scripts.</Text>
                  </Box>
                </Group>

                <Alert color="teal" mt="lg">
                  This feature is optimized for developers debugging backend error pages and template rendering.
                </Alert>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Stack>
  );
}
