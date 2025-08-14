-- Crear base de datos para la tienda de patinetas
CREATE DATABASE SkateShop;
USE SkateShop;

-- Tabla de categorías
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    image_url NVARCHAR(255),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de marcas
CREATE TABLE brands (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    logo_url NVARCHAR(255),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de productos
CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    description NVARCHAR(1000),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percentage INT DEFAULT 0,
    image_url NVARCHAR(255),
    category_id INT FOREIGN KEY REFERENCES categories(id),
    brand_id INT FOREIGN KEY REFERENCES brands(id),
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INT DEFAULT 0,
    in_stock BIT DEFAULT 1,
    stock_quantity INT DEFAULT 0,
    sku NVARCHAR(50) UNIQUE,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de características de productos
CREATE TABLE product_features (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT FOREIGN KEY REFERENCES products(id) ON DELETE CASCADE,
    feature_name NVARCHAR(100) NOT NULL,
    feature_value NVARCHAR(200) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(100),
    last_name NVARCHAR(100),
    phone NVARCHAR(20),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de direcciones
CREATE TABLE addresses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    type NVARCHAR(20) CHECK (type IN ('billing', 'shipping')) NOT NULL,
    street NVARCHAR(200) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    state NVARCHAR(100) NOT NULL,
    postal_code NVARCHAR(20) NOT NULL,
    country NVARCHAR(100) NOT NULL,
    is_default BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de carritos
CREATE TABLE carts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    session_id NVARCHAR(255),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de items del carrito
CREATE TABLE cart_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cart_id INT FOREIGN KEY REFERENCES carts(id) ON DELETE CASCADE,
    product_id INT FOREIGN KEY REFERENCES products(id),
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de órdenes
CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id),
    order_number NVARCHAR(50) UNIQUE NOT NULL,
    status NVARCHAR(20) CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    billing_address_id INT FOREIGN KEY REFERENCES addresses(id),
    shipping_address_id INT FOREIGN KEY REFERENCES addresses(id),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabla de items de órdenes
CREATE TABLE order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT FOREIGN KEY REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT FOREIGN KEY REFERENCES products(id),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

-- Tabla de reseñas
CREATE TABLE reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT FOREIGN KEY REFERENCES products(id) ON DELETE CASCADE,
    user_id INT FOREIGN KEY REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title NVARCHAR(200),
    comment NVARCHAR(1000),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Índices para mejorar rendimiento
CREATE INDEX IX_products_category_id ON products(category_id);
CREATE INDEX IX_products_brand_id ON products(brand_id);
CREATE INDEX IX_products_price ON products(price);
CREATE INDEX IX_products_rating ON products(rating);
CREATE INDEX IX_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IX_order_items_order_id ON order_items(order_id);
CREATE INDEX IX_reviews_product_id ON reviews(product_id);
