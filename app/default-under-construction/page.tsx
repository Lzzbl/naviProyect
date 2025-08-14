// import UnderConstruction from "@/components/under-construction"

// export default function UnderConstructionPage() {
//   return (
//     <UnderConstruction
//       title="Sección de Contacto"
//       message="Estamos mejorando nuestra página de contacto para ofrecerte múltiples formas de comunicarte con nosotros."
//     />
//   )
// }

import { Header } from "@/components/header"
import UnderConstruction from "@/components/under-construction"
import { Footer } from "@/components/footer"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <UnderConstruction />
      </div>
      <Footer />
    </div>
  )
}

