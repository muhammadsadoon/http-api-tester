"use client";

import { Title, Text, Paper, Stack, Anchor, Group, Badge, List, ThemeIcon } from "@mantine/core";
import { Info, Globe, Check } from "lucide-react";

export default function AboutView() {
  return (
    <Stack gap="lg" align="center" py="xl">
      <ThemeIcon size={64} radius="xl" variant="light" color="blue">
        <Info size={32} />
      </ThemeIcon>

      <Stack align="center" gap={0}>
        <Title order={1}>The Professional API Platform</Title>
        <Text c="dimmed">Advanced HTTP Client for Modern Developers</Text>
      </Stack>

      <Paper withBorder p="xl" maw={600} w="100%">
        <Stack gap="md">
          <Text size="sm">
            Our **API Platform** is the fastest, most reliable, and beautifully designed
            online HTTP client for developers. Built to optimize your API development
            workflow, it provides professional tools to test REST APIs, manage complex
            headers, and debug payloads with real-time visual feedback.
          </Text>

          <Title order={4} mt="sm">Key Features</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={20} radius="xl">
                <Check size={12} />
              </ThemeIcon>
            }
          >
            <List.Item>Multi-tab request management</List.Item>
            <List.Item>Visual HTML preview for responses</List.Item>
            <List.Item>Dark & Light mode support</List.Item>
            <List.Item>Environment variable synchronization</List.Item>
          </List>

          <Group gap="sm" mt="md">
            <Anchor href="https://github.com" target="_blank">
              <Badge leftSection={<Globe size={12} />} variant="outline" style={{ cursor: 'pointer' }}>
                GitHub
              </Badge>
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank">
              <Badge leftSection={<Globe size={12} />} variant="outline" color="blue" style={{ cursor: 'pointer' }}>
                Website
              </Badge>
            </Anchor>
          </Group>
        </Stack>
      </Paper>

      <Text size="xs" c="dimmed" mt="xl">
        © 2026 API Platform Team. All rights reserved.
      </Text>
    </Stack>
  );
}
