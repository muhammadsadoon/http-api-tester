"use client";

import { Title, Text, Paper, Stack, Group, Button, Table, Badge, TextInput, ActionIcon, Checkbox } from "@mantine/core";
import { Plus, Trash2 } from "lucide-react";
import { useEnvContext } from "../../context/env-context";

export default function EnvironmentView() {
  const { variables, addVariable, updateVariable, removeVariable } = useEnvContext();

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>API Environments & Variables</Title>
          <Text c="dimmed" size="sm">Manage global variables for Development, Staging, and Production API testing environments.</Text>
        </div>
        <Button leftSection={<Plus size={16} />} radius="md" color="teal" onClick={addVariable}>
          New Variable
        </Button>
      </Group>

      <Paper withBorder radius="md" p="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600}>Global Variables</Text>
            <Badge color="teal">Active</Badge>
          </Group>
          
          <Table.ScrollContainer minWidth={500}>
            <Table withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={60}>Active</Table.Th>
                  <Table.Th>Variable Key</Table.Th>
                  <Table.Th>Value</Table.Th>
                  <Table.Th w={80}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {variables.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={4} align="center">
                      <Text c="dimmed" py="sm">No variables defined. Click "New Variable" to add one.</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  variables.map((v) => (
                    <Table.Tr key={v.id}>
                      <Table.Td>
                        <Checkbox 
                          checked={v.isActive} 
                          onChange={(e) => updateVariable(v.id, "isActive", e.currentTarget.checked)}
                          color="teal"
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput 
                          variant="unstyled"
                          placeholder="e.g. base_url"
                          value={v.key}
                          onChange={(e) => updateVariable(v.id, "key", e.currentTarget.value)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput 
                          variant="unstyled"
                          placeholder="value"
                          value={v.value}
                          onChange={(e) => updateVariable(v.id, "value", e.currentTarget.value)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon color="red" variant="subtle" onClick={() => removeVariable(v.id)}>
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Stack>
      </Paper>
    </Stack>
  );
}
