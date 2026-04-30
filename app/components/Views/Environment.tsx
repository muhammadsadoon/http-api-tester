"use client";

import { Title, Text, Paper, Stack, Group, Button, Table, Badge } from "@mantine/core";
import { Plus } from "lucide-react";

export default function EnvironmentView() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>API Environments & Variables</Title>
          <Text c="dimmed" size="sm">Manage global variables for Development, Staging, and Production API testing environments.</Text>
        </div>
        <Button leftSection={<Plus size={16} />} radius="md" color="teal">
          New Environment
        </Button>
      </Group>

      <Paper withBorder radius="md" p="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600}>Global Variables</Text>
            <Badge color="teal">Active</Badge>
          </Group>
          
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Variable Name</Table.Th>
                <Table.Th>Initial Value</Table.Th>
                <Table.Th>Current Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td><code>base_url</code></Table.Td>
                <Table.Td>https://api.example.com</Table.Td>
                <Table.Td>https://api.example.com</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </Stack>
  );
}
