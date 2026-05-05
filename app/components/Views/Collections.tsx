"use client";

import { Title, Text, Paper, Stack, Group, Button, TextInput } from "@mantine/core";
import { FolderPlus, Search } from "lucide-react";

export default function CollectionsView() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>API Collections & Requests</Title>
          <Text c="dimmed" size="sm">The best way to organize, share, and reuse your REST API requests in professional libraries.</Text>
        </div>
        <Button leftSection={<FolderPlus size={16} />}>
          New Collection
        </Button>
      </Group>

      <Paper withBorder p="md" >
        <Stack gap="md">
          <TextInput
            placeholder="Search collections..."
            leftSection={<Search size={16} />}
          />

          <Paper bg="var(--mantine-color-gray-light)" p="xl" style={{ border: '1px dashed var(--mantine-color-gray-5)' }}>
            <Stack align="center" gap="xs">
              <Text fw={500}>No collections yet</Text>
              <Text size="sm" c="dimmed" ta="center">Create a collection to start organizing your API tests and share them with your team.</Text>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Stack>
  );
}
