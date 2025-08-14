"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/mock-data"
import type { Product } from "@/types"

export function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(sorted)
  }, [sortBy])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Mostrando {filteredProducts.length} productos</p>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="name">Ordenar por nombre</option>
          <option value="price-low">Precio: menor a mayor</option>
          <option value="price-high">Precio: mayor a menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
