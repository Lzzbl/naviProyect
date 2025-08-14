import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "completas",
    name: "Patinetas Completas",
    description: "Listas para usar",
    image: "/complete-skateboard.png",
    count: 45,
  },
  {
    id: "tablas",
    name: "Tablas",
    description: "Decks de alta calidad",
    image: "/skateboard-deck.png",
    count: 78,
  },
  {
    id: "trucks",
    name: "Trucks",
    description: "Ejes profesionales",
    image: "/skateboard-trucks.png",
    count: 32,
  },
  {
    id: "ruedas",
    name: "Ruedas",
    description: "Para todo tipo de terreno",
    image: "/skateboard-wheels.png",
    count: 56,
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorías</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestra amplia gama de productos para skateboarding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <p className="text-orange-600 font-medium">{category.count} productos</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
