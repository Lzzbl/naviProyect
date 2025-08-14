"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/lib/mock-data"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const product = products.find((p) => p.id === productId)

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Producto no encontrado</div>
  }

  const images = [product.image, product.image, product.image] // Mock multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-orange-600" : "border-gray-200"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reseñas)</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-3xl font-bold text-orange-600">${product.price}</span>
              {product.discount && <Badge className="bg-red-500">-{product.discount}% OFF</Badge>}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Cantidad:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-orange-600 hover:bg-orange-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Agregar al Carrito
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Favoritos
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              Compartir
            </Button>
          </div>

          {/* Product Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Características del Producto</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Material: Maple canadiense de 7 capas</li>
                <li>• Tamaño: 31" x 8"</li>
                <li>• Trucks: Aleación de aluminio</li>
                <li>• Ruedas: PU 52mm 99A</li>
                <li>• Rodamientos: ABEC-7</li>
                <li>• Peso máximo: 100kg</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Descripción Detallada</h3>
                <p className="text-gray-600 leading-relaxed">
                  Esta patineta profesional está diseñada para riders de todos los niveles. Construida con maple
                  canadiense de alta calidad y componentes premium, ofrece la durabilidad y rendimiento que necesitas
                  para dominar cualquier trick. El diseño gráfico único la convierte en una pieza destacada tanto en el
                  skatepark como en la calle.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Especificaciones Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Tabla</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Material: Maple canadiense 7 capas</li>
                      <li>Longitud: 31 pulgadas</li>
                      <li>Ancho: 8 pulgadas</li>
                      <li>Concave: Medium</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Componentes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Trucks: Aleación de aluminio 5.25"</li>
                      <li>Ruedas: PU 52mm 99A</li>
                      <li>Rodamientos: ABEC-7</li>
                      <li>Hardware: Acero inoxidable</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Reseñas de Clientes</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span className="font-medium">Usuario {review}</span>
                        <span className="text-sm text-gray-500">hace 2 días</span>
                      </div>
                      <p className="text-gray-600">
                        Excelente calidad y muy buena relación precio-calidad. La recomiendo totalmente para
                        principiantes y riders intermedios.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
