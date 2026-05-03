"use client";

import { Title, Text, Paper, Stack, Group, ActionIcon, Tooltip, Table } from "@mantine/core";
import { Trash2, Clock } from "lucide-react";

export default function HistoryView() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>Request History & Logs</Title>
          <Text c="dimmed" size="sm">Track and audit your previous HTTP requests with our detailed API activity logs.</Text>
        </div>
        <Tooltip label="Clear all history">
          <ActionIcon variant="light" color="red" size="lg" radius="md">
            <Trash2 size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Paper withBorder radius="md">
        <Table.ScrollContainer minWidth={500}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Method</Table.Th>
                <Table.Th>URL</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Time</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td colSpan={4}>
                   <Stack align="center" py="xl" gap="xs">
                      <Clock size={32} color="var(--mantine-color-gray-4)" />
                      <Text fw={500} c="dimmed">No history available</Text>
                   </Stack>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </Stack>
  );
}
