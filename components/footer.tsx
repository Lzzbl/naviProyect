import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-600 mb-4">NorthSkate Co</h3>
            <p className="text-gray-400 mb-4">
              Tu tienda de confianza para todo lo relacionado con skateboarding. Calidad, estilo y pasión en cada
              producto.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/default-under-construction" className="hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/default-under-construction" className="hover:text-white">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/default-under-construction" className="hover:text-white">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/default-under-construction" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Suscríbete para recibir ofertas exclusivas y novedades.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-orange-600"
              />
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-r-md">Suscribir</button>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 NorthSkate Co. Todos los derechos reservados.</p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white">
              Términos
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
