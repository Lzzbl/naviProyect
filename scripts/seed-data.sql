-- Insertar datos de ejemplo para la tienda de patinetas
USE SkateShop;

-- Insertar categorías
INSERT INTO categories (name, description, image_url) VALUES
('Patinetas Completas', 'Patinetas listas para usar con todos los componentes', '/images/categories/complete.jpg'),
('Tablas', 'Decks de skateboard de diferentes marcas y estilos', '/images/categories/decks.jpg'),
('Trucks', 'Ejes para skateboard de alta calidad', '/images/categories/trucks.jpg'),
('Ruedas', 'Ruedas para todo tipo de terreno y estilo', '/images/categories/wheels.jpg'),
('Rodamientos', 'Rodamientos de precisión para máximo rendimiento', '/images/categories/bearings.jpg'),
('Accesorios', 'Hardware, lijas y otros accesorios', '/images/categories/accessories.jpg');

-- Insertar marcas
INSERT INTO brands (name, description, logo_url) VALUES
('Element', 'Marca icónica de skateboarding desde 1992', '/images/brands/element.png'),
('Santa Cruz', 'Pioneros del skateboarding desde 1973', '/images/brands/santa-cruz.png'),
('Powell Peralta', 'Leyenda del skateboarding desde los 70s', '/images/brands/powell-peralta.png'),
('Independent', 'Los mejores trucks del mundo desde 1978', '/images/brands/independent.png'),
('Bones', 'Rodamientos y ruedas de máxima calidad', '/images/brands/bones.png');

-- Insertar productos
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category_id, brand_id, rating, review_count, in_stock, stock_quantity, sku) VALUES
('Element Section Complete Skateboard', 'Patineta completa profesional perfecta para principiantes y riders intermedios.', 89.99, 119.99, 25, '/images/products/element-section.jpg', 1, 1, 5.0, 124, 1, 15, 'ELE-SEC-001'),
('Santa Cruz Classic Dot Deck', 'Tabla clásica de Santa Cruz con diseño icónico y construcción premium.', 54.99, NULL, 0, '/images/products/sc-classic-dot.jpg', 2, 2, 5.0, 89, 1, 8, 'SC-DOT-001'),
('Independent Stage 11 Trucks', 'Trucks profesionales Independent con tecnología de última generación.', 64.99, NULL, 0, '/images/products/indy-stage11.jpg', 3, 4, 5.0, 156, 1, 12, 'IND-S11-001'),
('Bones Reds Bearings', 'Rodamientos Bones Reds, los más populares del mundo del skateboarding.', 19.99, NULL, 0, '/images/products/bones-reds.jpg', 5, 5, 5.0, 234, 1, 25, 'BON-RED-001'),
('Powell Peralta Dragon Formula Wheels', 'Ruedas de alta calidad con fórmula Dragon para máximo rendimiento.', 39.99, NULL, 0, '/images/products/pp-dragon.jpg', 4, 3, 4.0, 78, 1, 18, 'PP-DRG-001'),
('Element Nyjah Huston Pro Model', 'Modelo pro de Nyjah Huston con gráfico exclusivo y specs profesionales.', 129.99, 149.99, 13, '/images/products/element-nyjah.jpg', 1, 1, 5.0, 67, 1, 6, 'ELE-NYJ-001'),
('Santa Cruz Screaming Hand Deck', 'Icónica tabla Screaming Hand de Santa Cruz, un clásico atemporal.', 59.99, NULL, 0, '/images/products/sc-screaming.jpg', 2, 2, 5.0, 145, 1, 10, 'SC-SCR-001'),
('Bones Swiss Bearings', 'Los rodamientos más precisos de Bones, fabricados en Suiza.', 89.99, NULL, 0, '/images/products/bones-swiss.jpg', 5, 5, 5.0, 198, 1, 8, 'BON-SWI-001'),
('Element Grip Tape', 'Lija de alta calidad Element con adhesivo duradero.', 9.99, NULL, 0, '/images/products/element-grip.jpg', 6, 1, 4.0, 89, 1, 30, 'ELE-GRP-001'),
('Independent Hardware Set', 'Set completo de tornillos y tuercas Independent para tu setup.', 7.99, NULL, 0, '/images/products/indy-hardware.jpg', 6, 4, 4.0, 45, 1, 20, 'IND-HRD-001');

-- Insertar características de productos
INSERT INTO product_features (product_id, feature_name, feature_value) VALUES
(1, 'Material', 'Maple canadiense 7 capas'),
(1, 'Tamaño', '31" x 8"'),
(1, 'Trucks', 'Aleación de aluminio'),
(1, 'Ruedas', 'PU 52mm 99A'),
(1, 'Rodamientos', 'ABEC-7'),
(2, 'Material', 'Maple canadiense'),
(2, 'Concave', 'Medium'),
(2, 'Gráfico', 'Classic Dot'),
(3, 'Material', 'Aleación de aluminio'),
(3, 'Geometría', 'Stage 11'),
(3, 'Bushings', 'Premium'),
(4, 'Precisión', 'ABEC-5'),
(4, 'Lubricación', 'Speed Cream'),
(4, 'Cantidad', 'Set de 8 rodamientos'),
(5, 'Fórmula', 'Dragon'),
(5, 'Tamaño', '56mm 93A'),
(5, 'Característica', 'Grip excepcional');

-- Insertar usuario de ejemplo
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('admin@skateshop.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', '+1234567890');

-- Insertar algunas reseñas de ejemplo
INSERT INTO reviews (product_id, user_id, rating, title, comment) VALUES
(1, 1, 5, 'Excelente para principiantes', 'Perfecta calidad y muy buena relación precio-calidad. La recomiendo totalmente.'),
(2, 1, 5, 'Clásico atemporal', 'El diseño es icónico y la calidad de construcción es excepcional.'),
(3, 1, 5, 'Los mejores trucks', 'Suaves, duraderos y con excelente geometría. No hay mejor opción.'),
(4, 1, 5, 'Rodamientos confiables', 'Giran perfecto y duran mucho tiempo. Los uso en todas mis patinetas.');
