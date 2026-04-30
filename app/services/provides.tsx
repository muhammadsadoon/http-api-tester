"use client";

import { AppShell, Burger, Tabs, Menu, ActionIcon, useMantineColorScheme, NavLink, Tooltip, Stack, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sun,
  Moon,
  Settings,
  History,
  Layers,
  Info,
  Database,
  TestTube2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import TabScreen from '../components/UI/tab-screen';
import axios from "axios";
import { useTabContext } from '../context/tab-context';
import { DefualtMethods, handleSendReqType } from '../types/type';
import CollectionsView from '../components/Views/Collections';
import HistoryView from '../components/Views/History';
import EnvironmentView from '../components/Views/Environment';
import SettingsView from '../components/Views/Settings';
import AboutView from '../components/Views/About';
import HelpView from '../components/Views/Help';

export default function AppShellProvider() {
  const { tabs, activeTab, addTab, closeTab, setActiveTab, updateTab } = useTabContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  // Track if mobile view is active
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => setIsMobile(window.innerWidth < 640);
  const [opened, { toggle }] = useDisclosure();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"tester" | "collections" | "history" | "environment" | "settings" | "about" | "help">("tester");
  const [mounted, setMounted] = useState(false);

  const activeTabData = tabs.find(t => t.id === activeTab);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Tab close handler
  const handleCloseTab = useCallback((tabValue: string) => {
    closeTab(tabValue);
  }, [closeTab]);

  const handleAddTab = useCallback((method: DefualtMethods) => {
    addTab(method);
  }, [addTab]);

  const handleSendURL = useCallback(async ({ headers, method, url, body }: handleSendReqType) => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    updateTab(activeTab, { loading: true, response: null });
    try {
      console.log(body)
      const res = await axios({
        headers,
        method,
        url,
        data: body,
        signal: controller.signal
      });
      updateTab(activeTab, { 
        response: res.data, 
        status: res.status,
        statusText: res.statusText,
        contentType: res.headers['content-type']?.toString(),
        loading: false 
      });
    } catch (err: any) {
      if (axios.isCancel(err)) {
        updateTab(activeTab, { response: "Request cancelled", loading: false, status: undefined });
      } else {
        updateTab(activeTab, { 
          response: err.response?.data ?? err.message, 
          status: err.response?.status,
          statusText: err.response?.statusText,
          contentType: err.response?.headers?.['content-type']?.toString(),
          loading: false 
        });
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, [activeTab, updateTab]);

  const handleCancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const handleUpdateURL = useCallback((url: string) => {
    updateTab(activeTab, { url });
  }, [activeTab, updateTab]);

  const handleUpdateMethod = useCallback((method: DefualtMethods) => {
    updateTab(activeTab, { method, label: method });
  }, [activeTab, updateTab]);

  useEffect(() => {
    setMounted(true);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
      {/* Custom scrollbar style for 1px height */}
      <style>{`
        .custom-tabs-scroll::-webkit-scrollbar {
          height: 1px !important;
        }
        .custom-tabs-scroll::-webkit-scrollbar-thumb {
          background: #bbb;
          border-radius: 1px;
        }
        .custom-tabs-scroll::-webkit-scrollbar-track {
          background: #fff;
        }
        .custom-tabs-scroll {
          scrollbar-width: thin;
          scrollbar-color: #bbb #fff;
        }
      `}</style>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>HTTP.</div>
          </div>

          <div style={{ flex: 1, margin: '0 2rem', overflow: 'hidden' }}>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'start', width: '100%' }}>
                {/* Tabs with + button and horizontal scroll */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                  }}
                  className="custom-tabs-scroll"
                >
                  <Tabs
                    value={activeTab}
                    onChange={(val) => val && setActiveTab(val)}
                    variant="outline"
                    style={{ marginTop: 0, marginBottom: 0 }}
                  >
                    <Tabs.List
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        minWidth: '200px',
                        gap: '0.5rem',
                      }}
                    >
                      {tabs.map((tab) => (
                        <Tabs.Tab
                          key={tab.id}
                          value={tab.id}
                          style={{
                            minWidth: '90px',
                            flex: '0 0 auto',
                            textAlign: 'center',
                            position: 'relative',
                            paddingRight: 24,
                          }}
                          onMouseEnter={() => setHoveredTab(tab.id)}
                          onMouseLeave={() => setHoveredTab(null)}
                        >
                          {tab.label}
                          {hoveredTab === tab.id && tabs.length > 1 && (
                            <span
                              onClick={e => {
                                e.stopPropagation();
                                handleCloseTab(tab.id);
                              }}
                              style={{
                                position: 'absolute',
                                right: 6,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: '#888',
                                fontWeight: 'bold',
                                fontSize: 14,
                                padding: '0 2px',
                                borderRadius: 2,
                                background: 'rgba(255,255,255,0.7)',
                              }}
                              title="Close tab"
                            >
                              ×
                            </span>
                          )}
                        </Tabs.Tab>
                      ))}
                      <Menu position="bottom-end" withArrow>
                        <Menu.Target>
                          <div
                            style={{
                              fontWeight: 'bold',
                              minWidth: '50px',
                              flex: '0 0 auto',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '8px 12px',
                              borderRadius: '4px',
                              border: '1px solid #dee2e6',
                            }}
                          >
                            +
                          </div>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as DefualtMethods[]).map((method) => (
                            <Menu.Item key={method} onClick={() => handleAddTab(method)}>
                              {method}
                            </Menu.Item>
                          ))}
                        </Menu.Dropdown>
                      </Menu>
                    </Tabs.List>
                  </Tabs>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!isMobile && (
              <Tooltip label={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <ActionIcon
                  onClick={() => toggleColorScheme()}
                  variant="default"
                  size="lg"
                  radius="md"
                  aria-label="Toggle color scheme"
                >
                  {mounted && (dark ? <Sun size={20} /> : <Moon size={20} />)}
                </ActionIcon>
              </Tooltip>
            )}
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="xs">
          <AppShell.Section grow>
            <Stack gap={4}>
              <NavLink
                label="API Tester"
                leftSection={<TestTube2 size={18} />}
                active={activeView === "tester"}
                onClick={() => setActiveView("tester")}
                variant="filled"
              />
              <NavLink
                label="Collections"
                leftSection={<Layers size={18} />}
                active={activeView === "collections"}
                onClick={() => setActiveView("collections")}
                description="Organize your requests"
              />
              <NavLink
                label="History"
                leftSection={<History size={18} />}
                active={activeView === "history"}
                onClick={() => setActiveView("history")}
              />
              <NavLink
                label="Environment"
                leftSection={<Database size={18} />}
                active={activeView === "environment"}
                onClick={() => setActiveView("environment")}
              />
              
              <Divider my="sm" label="System" labelPosition="center" />
              
              <NavLink
                label="Settings"
                leftSection={<Settings size={18} />}
                active={activeView === "settings"}
                onClick={() => setActiveView("settings")}
              />
              <NavLink
                label="Help & Docs"
                leftSection={<BookOpen size={18} />}
                component="a"
                href="/help"
                target="_blank"
              />
              <NavLink
                label="About"
                leftSection={<Info size={18} />}
                active={activeView === "about"}
                onClick={() => setActiveView("about")}
              />
            </Stack>
          </AppShell.Section>

          <AppShell.Section>
            <Divider my="sm" />
            <NavLink
              label="Documentation"
              leftSection={<ExternalLink size={18} />}
              component="a"
              href="https://github.com"
              target="_blank"
            />
          </AppShell.Section>

          {isMobile && (
            <AppShell.Section mt="md">
              <Divider my="sm" label="Views" labelPosition="center" />
              <NavLink
                label="API Tester"
                leftSection={<TestTube2 size={18} />}
                active={activeView === "tester"}
                onClick={() => { setActiveView("tester"); toggle(); }}
              />
              <NavLink
                label="Collections"
                leftSection={<Layers size={18} />}
                active={activeView === "collections"}
                onClick={() => { setActiveView("collections"); toggle(); }}
              />
              <NavLink
                label="History"
                leftSection={<History size={18} />}
                active={activeView === "history"}
                onClick={() => { setActiveView("history"); toggle(); }}
              />
              
              <Divider my="sm" label="Theme" labelPosition="center" />
              <NavLink
                label={dark ? "Light Mode" : "Dark Mode"}
                leftSection={mounted && (dark ? <Sun size={18} /> : <Moon size={18} />)}
                onClick={() => toggleColorScheme()}
              />
            </AppShell.Section>
          )}
          {/* Show tabs in navbar on mobile */}
          {isMobile && (
            <div style={{ marginTop: '2rem' }}>
              <div
                style={{
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  maxHeight: '300px',
                  maxWidth: '100%',
                }}
                className="custom-tabs-scroll"
              >
                <Tabs
                  value={activeTab}
                  onChange={(val) => val && setActiveTab(val)}
                  variant="outline"
                  orientation="vertical"
                  style={{ marginTop: 0, marginBottom: 0 }}
                >
                  <Tabs.List
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      minWidth: '120px',
                      width: '100%',
                    }}
                  >
                    {tabs.map((tab) => (
                      <Tabs.Tab
                        key={tab.id}
                        value={tab.id}
                        style={{
                          minWidth: '90px',
                          textAlign: 'left',
                          position: 'relative',
                          paddingRight: 24,
                        }}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                      >
                        {tab.label}
                        {hoveredTab === tab.id && tabs.length > 1 && (
                          <span
                            onClick={e => {
                              e.stopPropagation();
                              handleCloseTab(tab.id);
                            }}
                            style={{
                              position: 'absolute',
                              right: 6,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              cursor: 'pointer',
                              color: '#888',
                              fontWeight: 'bold',
                              fontSize: 14,
                              padding: '0 2px',
                              borderRadius: 2,
                              background: 'rgba(255,255,255,0.7)',
                            }}
                            title="Close tab"
                          >
                            ×
                          </span>
                        )}
                      </Tabs.Tab>
                    ))}
                    <Menu position="right" withArrow>
                      <Menu.Target>
                        <div
                          style={{
                            fontWeight: 'bold',
                            minWidth: '50px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #dee2e6',
                            marginTop: '0.5rem',
                          }}
                        >
                          +
                        </div>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as DefualtMethods[]).map((method) => (
                          <Menu.Item key={method} onClick={() => handleAddTab(method)}>
                            {method}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Tabs.List>
                </Tabs>
              </div>
            </div>
          )}
        </AppShell.Navbar>

        <AppShell.Main>
          {activeView === "tester" && activeTabData && (
            <TabScreen
              tabId={activeTabData.id}
              updateURLString={handleUpdateURL}
              method={activeTabData.method}
              setMethod={handleUpdateMethod}
              url={activeTabData.url}
              key={activeTabData.id}
              onsubmit={handleSendURL}
              loading={activeTabData.loading}
              headers={activeTabData.headers}
              body={activeTabData.body}
              response={activeTabData.response}
              status={activeTabData.status}
              statusText={activeTabData.statusText}
              contentType={activeTabData.contentType}
              onCancel={handleCancelRequest}
            />
          )}
          {activeView === "collections" && <CollectionsView />}
          {activeView === "history" && <HistoryView />}
          {activeView === "environment" && <EnvironmentView />}
          {activeView === "settings" && <SettingsView />}
          {activeView === "help" && <HelpView />}
          {activeView === "about" && <AboutView />}
        </AppShell.Main>
      </AppShell>

    </>
  )
}