"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Loader2 } from "lucide-react"
import type { DigitalService } from "@/components/home/digital-services"
import { toast } from "@/components/ui/use-toast"

const iconOptions = [
  "Megaphone",
  "Search",
  "BarChart3",
  "Paintbrush",
  "Video",
  "PenTool",
  "Camera",
  "Layers",
  "Globe",
  "Sparkles",
]

export function DigitalServicesManager({ initialServices = [] }: { initialServices: DigitalService[] }) {
  const [services, setServices] = useState<DigitalService[]>(initialServices)
  const [loading, setLoading] = useState(false)
  const [editingService, setEditingService] = useState<DigitalService | null>(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/home-page/digital-services")
      if (!response.ok) throw new Error("Failed to fetch digital services")
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error("Error fetching digital services:", error)
      toast({
        title: "Error",
        description: "Failed to load digital services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleAddNew = () => {
    setEditingService({
      title: "",
      description: "",
      image: "/placeholder.svg?height=400&width=300",
      icon: "BarChart3",
    })
  }

  const handleEdit = (service: DigitalService) => {
    setEditingService({ ...service })
  }

  const handleChange = (field: keyof DigitalService, value: string) => {
    if (editingService) {
      setEditingService({ ...editingService, [field]: value })
    }
  }

  const handleSave = async () => {
    if (!editingService) return

    if (!editingService.title || !editingService.description || !editingService.image || !editingService.icon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      const isNew = !editingService.id
      const url = "/api/home-page/digital-services"
      const method = isNew ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      })

      if (!response.ok) throw new Error(`Failed to ${isNew ? "create" : "update"} digital service`)

      await fetchServices()
      setEditingService(null)

      toast({
        title: "Success",
        description: `Digital service ${isNew ? "created" : "updated"} successfully`,
      })
    } catch (error) {
      console.error("Error saving digital service:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingService.id ? "update" : "create"} digital service`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this digital service?")) return

    try {
      setLoading(true)

      const response = await fetch(`/api/home-page/digital-services?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete digital service")

      await fetchServices()

      if (editingService?.id === id) {
        setEditingService(null)
      }

      toast({
        title: "Success",
        description: "Digital service deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting digital service:", error)
      toast({
        title: "Error",
        description: "Failed to delete digital service",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingService(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Digital Services</h2>
        <Button onClick={handleAddNew} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {editingService && (
        <Card>
          <CardHeader>
            <CardTitle>{editingService.id ? "Edit" : "Add"} Digital Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingService.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Service Title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingService.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Service Description"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingService.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="/path/to/image.jpg"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={editingService.icon} onValueChange={(value) => handleChange("icon", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="link">Link (Optional)</Label>
                <Input
                  id="link"
                  value={editingService.link || ""}
                  onChange={(e) => handleChange("link", e.target.value)}
                  placeholder="/services/service-name"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => service.id && handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No digital services found. Click "Add New Service" to create one.
        </div>
      )}
    </div>
  )
}
