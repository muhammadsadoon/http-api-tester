"use client";

import { Title, Text, Paper, Stack, Group, List, ThemeIcon, Tabs, Badge, Code, Box, Alert } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  BookOpen,
  Send,
  Layers,
  Database,
  Eye,
  Terminal,
  Code2,
  ShieldCheck,
  AlertCircle,
  History
} from "lucide-react";

export default function HelpView() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Stack gap="lg" py="md">
      <Group justify="space-between">
        <div>
          <Badge variant="light" color="blue" mb="xs">Help Center & API Guide</Badge>
          <Title order={1}>Documentation</Title>
        </div>
        <ThemeIcon size={48}  variant="light" color="blue">
          <BookOpen size={24} />
        </ThemeIcon>
      </Group>

      <Tabs defaultValue="steps" orientation={isMobile ? "horizontal" : "vertical"} variant="pills"  >
        <Tabs.List w={isMobile ? "100%" : 200} mr={isMobile ? 0 : "xl"} mb={isMobile ? "md" : 0} style={{ overflowX: isMobile ? 'auto' : 'visible', flexWrap: isMobile ? 'nowrap' : 'wrap' }}>
          <Tabs.Tab value="steps" leftSection={<Terminal size={16} />}>Getting Started</Tabs.Tab>
          <Tabs.Tab value="methods" leftSection={<Send size={16} />}>Request Methods</Tabs.Tab>
          <Tabs.Tab value="body" leftSection={<Code2 size={16} />}>Body Handler</Tabs.Tab>
          <Tabs.Tab value="headers" leftSection={<ShieldCheck size={16} />}>Headers & Auth</Tabs.Tab>
          <Tabs.Tab value="preview" leftSection={<Eye size={16} />}>Visual Preview</Tabs.Tab>
          <Tabs.Tab value="collections" leftSection={<Layers size={16} />}>Collections</Tabs.Tab>
          <Tabs.Tab value="environment" leftSection={<Database size={16} />}>Environments</Tabs.Tab>
          <Tabs.Tab value="history" leftSection={<History size={16} />}>History</Tabs.Tab>
        </Tabs.List>

        <Box style={{ flex: 1 }}>
          <Tabs.Panel value="steps">
            <Paper withBorder p="xl" >
              <Stack gap="md">
                <Title order={3}>Step-by-Step Guide</Title>
                <Text size="sm">Follow these simple steps to execute your first API test on our platform:</Text>

                <List spacing="sm" size="sm" mt="md">
                  <List.Item>
                    <Text fw={700}>1. Initialize Tab</Text>
                    <Text c="dimmed">Click the '+' button in the header or in the sidebar to create a new API request tab.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>2. Define Endpoint</Text>
                    <Text c="dimmed">Enter your full API URL in the URL bar.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>3. Select Method</Text>
                    <Text c="dimmed">Choose a method (GET, POST, PUT, DELETE, PATCH) from the dropdown list.</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={700}>4. Execute</Text>
                    <Text c="dimmed">Press the 'Send' button. The platform will fetch the data and display it in the response section.</Text>
                  </List.Item>
                </List>
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="methods">
            <Paper withBorder p="xl" >
              <Stack gap="md">
                <Title order={3}>Understanding HTTP Methods</Title>
                <Text size="sm">Our API Platform supports all standard RESTful actions directly from the method selector:</Text>

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
          </Tabs.Panel >

    <Tabs.Panel value="body">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Working with JSON Body</Title>
        <Text size="sm">The Body Handler allows you to send complex data payloads to your API, supporting JSON format specifically tailored for modern REST APIs.</Text>

        <Alert icon={<AlertCircle size={16} />} title="JSON Formatting" color="blue" >
        Our editor automatically formats and validates your JSON. Ensure you provide well-formed JSON objects to avoid parsing errors.
      </Alert>

      <Stack gap="xs" mt="md">
        <Text fw={600} size="sm">Standard JSON Format:</Text>
        <Code block >
        {`{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`}
      </Code>
      <Text size="xs" c="dimmed">Tip: You can use JSON structures to send deeply nested data, arrays, or primitive values.</Text>
    </Stack>
              </Stack >
            </Paper >
          </Tabs.Panel >

    <Tabs.Panel value="headers">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Headers & Authentication</Title>
        <Text size="sm">Headers pass additional metadata with your request, such as Auth tokens or custom client configurations.</Text>

        <List spacing="xs" size="sm" mt="md">
          <List.Item>
            <Text fw={600}>Authorization</Text>
            <Text size="xs" c="dimmed">Pass tokens using the Authorization header. For example: Key: <code>Authorization</code>, Value: <code>Bearer your_token_here</code>.</Text>
          </List.Item>
          <List.Item>
            <Text fw={600}>Content-Type</Text>
            <Text size="xs" c="dimmed">Our platform automatically handles standard content types like <code>application/json</code> when you provide a request body.</Text>
          </List.Item>
          <List.Item>
            <Text fw={600}>Custom Headers</Text>
            <Text size="xs" c="dimmed">Add multiple custom headers using our key-value header builder for specific API requirements.</Text>
          </List.Item>
        </List>
      </Stack>
    </Paper>
          </Tabs.Panel >

    <Tabs.Panel value="preview">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Visual Preview Engine</Title>
        <Text size="sm">Our platform features an intuitive rendering engine to display API responses effectively.</Text>

        <Group gap="lg" mt="md">
          <Box style={{ flex: 1 }}>
            <Text fw={600} size="sm" mb={5}>JSON Viewer</Text>
            <Text size="xs" c="dimmed">Automatically formats and highlights JSON responses for easy reading and debugging.</Text>
          </Box>
          <Box style={{ flex: 1 }}>
            <Text fw={600} size="sm" mb={5}>Raw Output</Text>
            <Text size="xs" c="dimmed">Switch to view the exact raw text or code returned by the server.</Text>
          </Box>
        </Group>

        <Alert color="teal" mt="lg">
          This feature helps developers quickly inspect response data, headers, and status codes all in one place.
        </Alert>
      </Stack>
    </Paper>
          </Tabs.Panel >

    <Tabs.Panel value="collections">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Collections</Title>
        <Text size="sm">Organize your API requests into logical folders and collections.</Text>
        <Text size="xs" c="dimmed">Using collections helps you manage multiple endpoints for a single project. You can save a request directly to a collection and load it anytime with a single click, preserving its URL, method, headers, and body.</Text>
      </Stack>
    </Paper>
          </Tabs.Panel >

    <Tabs.Panel value="environment">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Environments</Title>
        <Text size="sm">Manage dynamic variables across multiple API requests.</Text>
        <Text size="xs" c="dimmed">Instead of hardcoding URLs or authentication tokens, define them in the Environments section. You can switch between 'Development', 'Staging', and 'Production' environments instantly without modifying your saved requests.</Text>
      </Stack>
    </Paper>
          </Tabs.Panel >

    <Tabs.Panel value="history">
      <Paper withBorder p="xl" >
      <Stack gap="md">
        <Title order={3}>Request History</Title>
        <Text size="sm">Never lose track of the API calls you have made.</Text>
        <Text size="xs" c="dimmed">The History tab automatically logs every request you send. You can review past requests, check their response status, and restore them into a new tab for re-testing with just one click.</Text>
      </Stack>
    </Paper>
          </Tabs.Panel >
        </Box >
      </Tabs >
    </Stack >
  );
}
