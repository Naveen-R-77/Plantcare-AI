"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, BellRing, AlertTriangle, CheckCircle, Clock, Leaf, Mail, Smartphone, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "disease_detected" | "treatment_reminder" | "health_alert" | "system_update"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high" | "critical"
  actionRequired?: boolean
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  diseaseAlerts: boolean
  treatmentReminders: boolean
  healthReports: boolean
  systemUpdates: boolean
  quietHours: boolean
  quietStart: string
  quietEnd: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    diseaseAlerts: true,
    treatmentReminders: true,
    healthReports: false,
    systemUpdates: true,
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "08:00",
  })
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Load mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "disease_detected",
        title: "Disease Detected",
        message: "Late blight detected in Tomato Garden A with 92% confidence. Immediate treatment recommended.",
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        priority: "critical",
        actionRequired: true,
      },
      {
        id: "2",
        type: "treatment_reminder",
        title: "Treatment Reminder",
        message: "Apply copper fungicide to Pepper plants as scheduled. Treatment due in 2 hours.",
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        priority: "high",
        actionRequired: true,
      },
      {
        id: "3",
        type: "health_alert",
        title: "Health Score Update",
        message: "Overall plant health score improved to 87% (+5% from last week).",
        timestamp: new Date(Date.now() - 86400000),
        read: true,
        priority: "medium",
      },
      {
        id: "4",
        type: "system_update",
        title: "AI Model Updated",
        message: "Disease detection accuracy improved with latest AI model update (v2.1.3).",
        timestamp: new Date(Date.now() - 172800000),
        read: true,
        priority: "low",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    const notification = notifications.find((n) => n.id === id)
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const updateSettings = (key: keyof NotificationSettings, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "disease_detected":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "treatment_reminder":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "health_alert":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "system_update":
        return <Settings className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BellRing className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Notifications</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-lg transition-colors",
                        !notification.read && "bg-primary/5 border-l-4 border-l-primary",
                      )}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                        {getTypeIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn("font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </h4>
                          <Badge className={cn("text-xs", getPriorityColor(notification.priority))}>
                            {notification.priority}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          ×
                        </Button>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Customize how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Delivery Methods */}
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSettings("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSettings("pushNotifications", checked)}
                  />
                </div>
              </div>

              <Separator />

              {/* Notification Types */}
              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <Label htmlFor="disease-alerts">Disease Alerts</Label>
                  </div>
                  <Switch
                    id="disease-alerts"
                    checked={settings.diseaseAlerts}
                    onCheckedChange={(checked) => updateSettings("diseaseAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <Label htmlFor="treatment-reminders">Treatment Reminders</Label>
                  </div>
                  <Switch
                    id="treatment-reminders"
                    checked={settings.treatmentReminders}
                    onCheckedChange={(checked) => updateSettings("treatmentReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <Label htmlFor="health-reports">Health Reports</Label>
                  </div>
                  <Switch
                    id="health-reports"
                    checked={settings.healthReports}
                    onCheckedChange={(checked) => updateSettings("healthReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <Label htmlFor="system-updates">System Updates</Label>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => updateSettings("systemUpdates", checked)}
                  />
                </div>
              </div>

              <Separator />

              {/* Quiet Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <Switch
                    id="quiet-hours"
                    checked={settings.quietHours}
                    onCheckedChange={(checked) => updateSettings("quietHours", checked)}
                  />
                </div>

                {settings.quietHours && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="quiet-start" className="text-xs">
                        From
                      </Label>
                      <input
                        id="quiet-start"
                        type="time"
                        value={settings.quietStart}
                        onChange={(e) => updateSettings("quietStart", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiet-end" className="text-xs">
                        To
                      </Label>
                      <input
                        id="quiet-end"
                        type="time"
                        value={settings.quietEnd}
                        onChange={(e) => updateSettings("quietEnd", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
