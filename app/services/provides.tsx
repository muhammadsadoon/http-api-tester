"use client";

import { AppShell, Burger, Tabs, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import TabScreen from '../components/UI/tab-screen';
import axios from "axios";
import { useTabContext } from '../context/tab-context';

export default function AppShellProvider() {
  const { tabs, activeTab, addTab, closeTab, setActiveTab, updateTab } = useTabContext();
  
  // Track if mobile view is active
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => setIsMobile(window.innerWidth < 640);
  const [opened, { toggle }] = useDisclosure();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeTabData = tabs.find(t => t.id === activeTab);

  // Tab close handler
  const handleCloseTab = (tabValue: string) => {
    closeTab(tabValue);
  };

  const handleAddTab = (method: DefualtMethods) => {
    addTab(method);
  };

  const handleSendURL = async ({headers,method,url,body}:handleSendReqType) =>{
    try{
      if(body){
        const res = await axios({
          headers,
          method,
          url,
          data: JSON.stringify(body)
        })

        if (activeTabData) {
          updateTab(activeTabData.id, { response: res });
        }
      }
    }catch(err){
      if (activeTabData) {
        updateTab(activeTabData.id, { response: err });
      }
    }
  }

  const handleUpdateURL = (url: string) => {
    if (activeTabData) {
      updateTab(activeTabData.id, { url });
    }
  };

  const handleUpdateMethod = (method: DefualtMethods) => {
    if (activeTabData) {
      updateTab(activeTabData.id, { method, label: method });
    }
  };

  useEffect(() => {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div style={{ fontWeight: 'bold', fontSize: 20, margin: "0px 20px" }}>HTTP.</div>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'start', gap: '2rem', width: '100%' }}>
              {/* Tabs with + button and horizontal scroll */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  maxWidth: '100%',
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
                          <Menu.Item key={method + (Math.random() * 10000).toString()} onClick={() => handleAddTab(method)}>
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
        </AppShell.Header>

        <AppShell.Navbar>
          <nav>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none', margin: 0, padding: '1rem 1rem' }}>
              <li style={{ cursor: 'pointer' }}>Home</li>
              <li style={{ cursor: 'pointer' }}>Tools</li>
              <li style={{ cursor: 'pointer' }}>Service</li>
            </ul>
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
          </nav>
        </AppShell.Navbar>

        <AppShell.Main>
          {activeTabData && (
            <TabScreen
              tabId={activeTabData.id}
              updateURLString={handleUpdateURL}
              method={activeTabData.method}
              setMethod={handleUpdateMethod}
              url={activeTabData.url}
              setUrl={handleUpdateURL}
              key={activeTabData.id}
              onsubmit={handleSendURL}
              loading={false}
              headers={{
                authentication: "bearer 12312312kdmflakdfdfsdf"
              }}
              response={activeTabData.response}
            />
          )}
        </AppShell.Main>
      </AppShell>

    </>
  )
}