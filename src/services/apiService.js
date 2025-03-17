import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Download, RefreshCw, MessageSquare, Settings, AlertTriangle } from 'lucide-react';

/**
 * Account Guardian Component - Manages follower backups and recovery
 */
const AccountGuardian = () => {
  const [accounts, setAccounts] = useState([]);
  const [backups, setBackups] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Fetch accounts and backup data
  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchData = async () => {
      try {
        // Simulated API response
        const accountsData = [
          {
            id: 'acc_123',
            platform: 'instagram',
            handle: 'yourbrand',
            displayName: 'Your Brand',
            followerCount: 12450,
            hasBackup: true,
            lastBackupDate: '2025-03-17T08:30:00Z',
            status: 'active'
          },
          {
            id: 'acc_124',
            platform: 'twitter',
            handle: 'yourbrand',
            displayName: 'Your Brand',
            followerCount: 8712,
            hasBackup: true,
            lastBackupDate: '2025-03-17T09:15:00Z',
            status: 'active'
          },
          {
            id: 'acc_125',
            platform: 'facebook',
            handle: null,
            displayName: 'Your Brand Page',
            followerCount: 0,
            hasBackup: false,
            lastBackupDate: null,
            status: 'disconnected'
          }
        ];
        
        setAccounts(accountsData);
        
        // Set first account as selected by default
        if (accountsData.length > 0) {
          setSelectedAccount(accountsData[0]);
          // Fetch backup history for the first account
          fetchBackupHistory(accountsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
        setStatusMessage({
          type: 'error',
          text: 'Failed to load account data. Please try again.'
        });
      }
    };
    
    fetchData();
  }, []);

  // Fetch backup history for a specific account
  const fetchBackupHistory = async (accountId) => {
    try {
      // Simulated API response
      const backupData = [
        {
          id: 'bkp_123',
          accountId: 'acc_123',
          backupDate: '2025-03-17T08:30:00Z',
          followerCount: 12450,
          change: 56,
          status: 'complete',
          size: '2.4 MB'
        },
        {
          id: 'bkp_122',
          accountId: 'acc_123',
          backupDate: '2025-03-16T08:30:00Z',
          followerCount: 12394,
          change: 42,
          status: 'complete',
          size: '2.3 MB'
        },
        {
          id: 'bkp_121',
          accountId: 'acc_123',
          backupDate: '2025-03-15T08:30:00Z',
          followerCount: 12352,
          change: 37,
          status: 'complete',
          size: '2.3 MB'
        }
      ];
      
      setBackups(backupData);
    } catch (error) {
      console.error('Error fetching backup history:', error);
      setStatusMessage({
        type: 'error',
        text: 'Failed to load backup history. Please try again.'
      });
    }
  };

  // Handle account selection
  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    fetchBackupHistory(account.id);
  };

  // Initiate manual backup
  const startManualBackup = async () => {
    if (!selectedAccount || selectedAccount.status !== 'active') return;
    
    setIsBackingUp(true);
    setStatusMessage({
      type: 'info',
      text: 'Backup in progress... This may take a few minutes.'
    });
    
    try {
      // Simulated API call
      // await api.createBackup(selectedAccount.id);
      
      // Simulate delay for backup process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update the local data
      const updatedAccounts = accounts.map(account => 
        account.id === selectedAccount.id 
          ? { 
              ...account, 
              hasBackup: true, 
              lastBackupDate: new Date().toISOString() 
            } 
          : account
      );
      
      setAccounts(updatedAccounts);
      setSelectedAccount(updatedAccounts.find(a => a.id === selectedAccount.id));
      
      // Add new backup to the history
      const newBackup = {
        id: `bkp_${Date.now()}`,
        accountId: selectedAccount.id,
        backupDate: new Date().toISOString(),
        followerCount: selectedAccount.followerCount,
        change: 0,
        status: 'complete',
        size: '2.4 MB'
      };
      
      setBackups([newBackup, ...backups]);
      
      setStatusMessage({
        type: 'success',
        text: 'Backup completed successfully!'
      });
    } catch (error) {
      console.error('Error creating backup:', error);
      setStatusMessage({
        type: 'error',
        text: 'Failed to create backup. Please try again.'
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  // Generate recovery messages
  const generateRecoveryMessages = () => {
    // Navigation would happen here in a real app
    setStatusMessage({
      type: 'info',
      text: 'Redirecting to recovery message generator...'
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get icon for platform
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return 'IG';
      case 'twitter':
        return 'TW';
      case 'facebook':
        return 'FB';
      default:
        return '?';
    }
  };

  // Get color for platform
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-br from-purple-600 to-pink-500';
      case 'twitter':
        return 'bg-blue-500';
      case 'facebook':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              Account Guardian
            </h1>
            <p className="text-gray-500 mt-1">
              Protect your social audience with secure follower backups
            </p>
          </div>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>

        {/* Status message */}
        {statusMessage && (
          <Alert variant={statusMessage.type === 'error' ? 'destructive' : 'default'}>
            <AlertDescription>{statusMessage.text}</AlertDescription>
          </Alert>
        )}

        {/* Account status cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card 
              key={account.id}
              className={`cursor-pointer hover:border-blue-400 ${selectedAccount?.id === account.id ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
              onClick={() => handleAccountSelect(account)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getPlatformColor(account.platform)}`}>
                    {getPlatformIcon(account.platform)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {account.handle ? `@${account.handle}` : account.displayName}
                    </h3>
                    {account.hasBackup ? (
                      <div className="text-sm text-gray-500">
                        Last backup: {formatDate(account.lastBackupDate)}
                      </div>
                    ) : (
                      <div className="text-sm text-amber-600">Not backed up</div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    {account.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {account.hasBackup ? 'Protected' : 'Connected'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Not connected
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    {account.followerCount > 0 
                      ? `${new Intl.NumberFormat().format(account.followerCount)} followers` 
                      : 'Connect account'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Backup details section */}
        {selectedAccount && selectedAccount.status === 'active' && (
          <Card>
            <CardHeader>
              <CardTitle>
                {getPlatformIcon(selectedAccount.platform)} {selectedAccount.handle} Backup Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="history">
                <TabsList className="mb-4">
                  <TabsTrigger value="history">Backup History</TabsTrigger>
                  <TabsTrigger value="settings">Backup Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="history">
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Followers Protected</span>
                        <span className="text-xl font-semibold">
                          {new Intl.NumberFormat().format(selectedAccount.followerCount)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Last Backup</span>
                        <span className="text-xl font-semibold">
                          {formatDate(selectedAccount.lastBackupDate) || 'Never'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Backup Size</span>
                        <span className="text-xl font-semibold">
                          {backups.length > 0 ? backups[0].size : 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Followers</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell>{formatDate(backup.backupDate)}</TableCell>
                            <TableCell>{new Intl.NumberFormat().format(backup.followerCount)}</TableCell>
                            <TableCell>
                              {backup.change > 0 && (
                                <span className="text-green-600">+{backup.change}</span>
                              )}
                              {backup.change === 0 && (
                                <span className="text-gray-500">0</span>
                              )}
                              {backup.change < 0 && (
                                <span className="text-red-600">{backup.change}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={backup.status === 'complete' ? 'success' : 'secondary'}>
                                {backup.status === 'complete' ? 'Complete' : backup.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="space-x-2">
                              <Button variant="link" size="sm" className="h-8 px-2 text-blue-600">
                                View
                              </Button>
                              <Button variant="link" size="sm" className="h-8 px-2 text-blue-600">
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {backups.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                              No backup history available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="default" 
                        className="gap-2"
                        disabled={isBackingUp}
                        onClick={startManualBackup}
                      >
                        {isBackingUp ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Backing up...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4" />
                            Manual Backup Now
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={generateRecoveryMessages}
                        disabled={!selectedAccount.hasBackup}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Generate Recovery Messages
                      </Button>
                      
                      <Button variant="ghost" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export All Data
                      </Button>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500 p-2 bg-blue-50 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
                      Auto-backup is enabled. Your followers are backed up daily at 08:30 AM (VIP Plan feature)
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-4 p-2">
                    <p className="text-gray-500">
                      Configure your backup settings and preferences
                    </p>
                    
                    {/* Settings would go here - simplified for this example */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h3 className="font-medium">Automatic Backups</h3>
                          <p className="text-sm text-gray-500">Create automatic backups of your followers</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Enabled</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h3 className="font-medium">Backup Frequency</h3>
                          <p className="text-sm text-gray-500">How often to create new backups</p>
                        </div>
                        <div>
                          <Badge>Daily</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h3 className="font-medium">Data Retention</h3>
                          <p className="text-sm text-gray-500">How long to keep your backup data</p>
                        </div>
                        <div>
                          <Badge>90 days</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
        {/* Not connected notice */}
        {selectedAccount && selectedAccount.status !== 'active' && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold">Account Not Connected</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This social account needs to be connected before you can create backups.
                  Connect your account to protect your followers.
                </p>
                <Button className="mt-2">Connect Account</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AccountGuardian;
