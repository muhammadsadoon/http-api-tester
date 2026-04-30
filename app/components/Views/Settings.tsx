"use client";

import { Title, Text, Paper, Stack, Switch, Divider, Select, Group } from "@mantine/core";
import { Settings } from "lucide-react";

export default function SettingsView() {
  return (
    <Stack gap="lg">
      <Group gap="xs">
        <Settings size={28} />
        <Title order={2}>Settings</Title>
      </Group>

      <Paper withBorder p="xl" radius="md">
        <Stack gap="md">
          <div>
            <Text fw={600} mb={5}>General Settings</Text>
            <Text size="xs" c="dimmed">Configure the overall behavior of the API platform</Text>
          </div>
          
          <Divider />
          
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>Request Timeout</Text>
              <Text size="xs" c="dimmed">Maximum time to wait for a response (ms)</Text>
            </div>
            <Select 
              defaultValue="30000"
              data={["5000", "10000", "30000", "60000"]}
              w={120}
              radius="md"
            />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>Auto-save requests</Text>
              <Text size="xs" c="dimmed">Automatically save modified requests to history</Text>
            </div>
            <Switch defaultChecked size="md" />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>SSL Verification</Text>
              <Text size="xs" c="dimmed">Verify SSL certificates for outgoing requests</Text>
            </div>
            <Switch defaultChecked size="md" />
          </Group>

          <Divider />
          
          <div>
            <Text fw={600} mb={5} c="red">Danger Zone</Text>
            <Text size="xs" c="dimmed">Critical actions that cannot be undone</Text>
          </div>
          
          <Group justify="space-between">
             <Text size="sm">Clear all local data</Text>
             <Switch color="red" />
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
