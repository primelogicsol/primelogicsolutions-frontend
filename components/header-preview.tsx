"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface NavigationItem {
  id: string
  _id: string
  title: string
  slug: string
  type: "link" | "dropdown" | "button" | "subheading" | "subitem" | "three-level-hierarchy"
  url?: string
  order: number
  isActive: boolean
  parentId?: string | null
  level?: number
  children?: NavigationItem[]
  subItems?: NavigationItem[]
}

export function HeaderPreview() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNavigationItems()
  }, [])

  async function fetchNavigationItems() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/navigation")
      if (!response.ok) {
        throw new Error("Failed to fetch navigation items")
      }
      const data = await response.json()

      // Organize items into a hierarchical structure
      const rootItems: NavigationItem[] = []
      const childMap = new Map<string, NavigationItem[]>()
      const subItemMap = new Map<string, NavigationItem[]>()

      // Group items by their parent
      data.forEach((item: NavigationItem) => {
        const id = item.id || item._id.toString()
        item.id = id

        if (!item.parentId) {
          rootItems.push(item)
        } else {
          const parentId = item.parentId.toString()
          if (item.level === 1) {
            if (!childMap.has(parentId)) {
              childMap.set(parentId, [])
            }
            childMap.get(parentId)!.push(item)
          } else if (item.level === 2) {
            if (!subItemMap.has(parentId)) {
              subItemMap.set(parentId, [])
            }
            subItemMap.get(parentId)!.push(item)
          }
        }
      })

      // Sort items by order
      rootItems.sort((a, b) => a.order - b.order)

      // Attach children to their parents
      rootItems.forEach((item) => {
        const id = item.id || item._id.toString()
        if (childMap.has(id)) {
          item.children = childMap.get(id)!.sort((a, b) => a.order - b.order)

          // Attach sub-items to their parents (subheadings)
          item.children.forEach((child) => {
            const childId = child.id || child._id.toString()
            if (subItemMap.has(childId)) {
              child.subItems = subItemMap.get(childId)!.sort((a, b) => a.order - b.order)
            }
          })
        }
      })

      setNavigationItems(rootItems)
    } catch (error) {
      console.error("Error fetching navigation items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  // Function to render navigation items based on type
  const renderNavItem = (item: NavigationItem) => {
    if (!item.isActive) return null

    switch (item.type) {
      case "link":
        return (
          <Link href={item.url || "#"} className="text-white hover:text-gray-300 font-medium">
            {item.title}
          </Link>
        )
      case "button":
        return (
          <Link
            href={item.url || "#"}
            className="border border-white text-white hover:bg-white hover:text-[#002B5B] px-4 py-2 rounded transition-colors"
          >
            {item.title}
          </Link>
        )
      case "dropdown":
        return (
          <div className="relative">
            <button
              className={`flex items-center font-medium ${activeDropdown === item.id ? "text-[#003087]" : "text-white hover:text-gray-300"}`}
              onClick={() => toggleDropdown(item.id)}
            >
              {item.title} <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        )
      case "three-level-hierarchy":
        return (
          <div className="relative">
            <button
              className={`flex items-center font-medium ${activeDropdown === item.id ? "text-[#003087]" : "text-white hover:text-gray-300"}`}
              onClick={() => toggleDropdown(item.id)}
            >
              {item.title} <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        )
      default:
        return null
    }
  }

  // Group children by category (for three-level-hierarchy)
  const groupChildrenByCategory = (children: NavigationItem[]) => {
    const categories: { [key: string]: NavigationItem[] } = {}

    children.forEach((child) => {
      if (!categories[child.title]) {
        categories[child.title] = []
      }

      if (child.subItems) {
        categories[child.title] = [...child.subItems]
      }
    })

    return categories
  }

  // Get dropdown image based on category
  const getDropdownImage = (title: string) => {
    // Map titles to image paths - you can customize these paths
    const imageMap: { [key: string]: string } = {
      Services: "/images/services-dropdown.jpg",
      Industries: "/images/industries-dropdown.jpg",
      Technologies: "/images/technologies-dropdown.jpg",
      Products: "/images/products-dropdown.jpg",
      Solutions: "/images/solutions-dropdown.jpg",
      // Add more mappings as needed
    }

    // Return the image path or a default one if not found
    return imageMap[title] || "/images/default-dropdown.jpg"
  }

  return (
    <div className="w-full">
      {/* Main Navigation */}
      <div className="bg-[#002B5B] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="mr-10">
            <Link href="/">
              <div className="text-white font-bold text-2xl flex items-center">
                <span className="text-3xl mr-1">P</span>
                <span className="italic">Logic</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center">
            <div className="flex-1"></div> {/* Spacer */}
            <div className="flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-8">
                {navigationItems
                  .filter((item) => item.type !== "button") // Filter out buttons from main navigation
                  .map((item) => (
                    <div key={item.id}>{renderNavItem(item)}</div>
                  ))}
              </nav>
            </div>
            <div className="flex-1 flex justify-end">
              {" "}
              {/* Right aligned container for CTA buttons */}
              {/* CTA Buttons - Filter out button type items from navigation */}
              <div className="flex items-center space-x-4">
                {!isLoading &&
                  navigationItems
                    .filter((item) => item.type === "button" && item.isActive)
                    .map((button) => (
                      <Link
                        key={button.id}
                        href={button.url || "#"}
                        className="border border-white text-white hover:bg-white hover:text-[#002B5B] px-4 py-2 rounded transition-colors"
                      >
                        {button.title}
                      </Link>
                    ))}
              </div>
            </div>{" "}
            {/* Close the right-aligned container */}
          </div>

          {/* Mobile Menu Button (not implemented) */}
          <button className="lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdowns for each navigation item */}
      {navigationItems.map((item) => {
        if (
          (item.type === "dropdown" || item.type === "three-level-hierarchy") &&
          item.children &&
          item.children.length > 0 &&
          activeDropdown === item.id
        ) {
          // Common dropdown layout for both types
          return (
            <div
              key={`dropdown-${item.id}`}
              className="absolute z-50 w-full bg-white shadow-lg border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex">
                  {/* Left sidebar with gradient background and image */}
                  <div className="w-1/4 rounded-l-lg p-6 flex flex-col justify-center relative overflow-hidden">
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={getDropdownImage(item.title) || "/placeholder.svg"}
                        alt={`${item.title} background`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#002B5B]/70 to-[#003087]/70"></div>
                    </div>

                    {/* Content on top of the image */}
                    <div className="relative z-10">
                      <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                      <p className="text-white text-sm">
                        Explore our comprehensive range of {item.title.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  {/* Right content area */}
                  <div className="w-3/4 p-6">
                    <div className="grid grid-cols-3 gap-8">
                      {item.type === "three-level-hierarchy"
                        ? // For three-level hierarchy, organize by categories
                          Object.entries(groupChildrenByCategory(item.children)).map(
                            ([categoryName, categoryItems]) => (
                              <div key={`category-${categoryName}`} className="mb-6">
                                <h3 className="text-gray-800 font-semibold text-lg mb-3">{categoryName}</h3>
                                <ul className="space-y-2">
                                  {categoryItems.map((subItem) => (
                                    <li key={subItem.id}>
                                      <Link href={subItem.url || "#"} className="text-gray-700 hover:text-[#003087]">
                                        {subItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )
                        : // For regular dropdown
                          item.children.map((child) => (
                            <div key={child.id} className="mb-6">
                              <h3 className="text-gray-800 font-semibold text-lg mb-3">{child.title}</h3>
                              {child.subItems && child.subItems.length > 0 && (
                                <ul className="space-y-2">
                                  {child.subItems.map((subItem) => (
                                    <li key={subItem.id}>
                                      <Link href={subItem.url || "#"} className="text-gray-700 hover:text-[#003087]">
                                        {subItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                    </div>
                  </div>
                </div>

                {/* Navigation buttons - Previous button moved to right side below menu */}
                <div className="flex justify-end mt-4 space-x-4">
                  <button className="bg-gray-200 px-6 py-2 rounded text-gray-600 hover:bg-gray-300">Previous</button>
                  <button className="bg-gray-200 px-6 py-2 rounded text-gray-600 hover:bg-gray-300">Next</button>
                </div>
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
