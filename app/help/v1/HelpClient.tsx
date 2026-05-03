"use client";

import HelpView from "../../components/Views/Help";
import { Button, Group, Text, Anchor } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

export default function HelpClient() {
  return (
    <div style={{ padding: '2rem' }}>
      <Group justify="space-between" mb="xl">
        <Anchor href="/" style={{ textDecoration: 'none' }}>
            <Button variant="subtle" leftSection={<ArrowLeft size={16} />} radius="md">
                Back to API Tester
            </Button>
        </Anchor>
        <Text size="sm" c="dimmed" fw={500}>Documentation v1.0</Text>
      </Group>

      <HelpView />

      <footer style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <Group justify="space-between">
            <Text size="xs" c="dimmed">© 2026 API Platform. Built for developers.</Text>
            <Group gap="xs">
                <Anchor href="/" size="xs" c="dimmed">Home</Anchor>
                <Anchor href="https://github.com" size="xs" c="dimmed">GitHub</Anchor>
            </Group>
        </Group>
      </footer>
    </div>
  );
}
