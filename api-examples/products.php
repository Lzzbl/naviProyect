<?php
// Ejemplo de API en PHP para la tienda de patinetas
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de base de datos
$serverName = "localhost";
$database = "SkateShop";
$username = "sa";
$password = "your_password";

try {
    $pdo = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        if (isset($pathParts[2])) {
            // Obtener producto específico
            getProduct($pdo, $pathParts[2]);
        } else {
            // Obtener todos los productos con filtros
            getProducts($pdo);
        }
        break;
    
    case 'POST':
        // Crear nuevo producto
        createProduct($pdo);
        break;
    
    case 'PUT':
        // Actualizar producto
        if (isset($pathParts[2])) {
            updateProduct($pdo, $pathParts[2]);
        }
        break;
    
    case 'DELETE':
        // Eliminar producto
        if (isset($pathParts[2])) {
            deleteProduct($pdo, $pathParts[2]);
        }
        break;
}

function getProducts($pdo) {
    $category = $_GET['category'] ?? null;
    $brand = $_GET['brand'] ?? null;
    $minPrice = $_GET['min_price'] ?? null;
    $maxPrice = $_GET['max_price'] ?? null;
    $search = $_GET['search'] ?? null;
    $sortBy = $_GET['sort_by'] ?? 'name';
    $sortOrder = $_GET['sort_order'] ?? 'ASC';
    $page = (int)($_GET['page'] ?? 1);
    $limit = (int)($_GET['limit'] ?? 20);
    $offset = ($page - 1) * $limit;

    $sql = "SELECT p.*, c.name as category_name, b.name as brand_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            LEFT JOIN brands b ON p.brand_id = b.id 
            WHERE p.in_stock = 1";
    
    $params = [];
    
    if ($category) {
        $sql .= " AND c.name = ?";
        $params[] = $category;
    }
    
    if ($brand) {
        $sql .= " AND b.name = ?";
        $params[] = $brand;
    }
    
    if ($minPrice) {
        $sql .= " AND p.price >= ?";
        $params[] = $minPrice;
    }
    
    if ($maxPrice) {
        $sql .= " AND p.price <= ?";
        $params[] = $maxPrice;
    }
    
    if ($search) {
        $sql .= " AND (p.name LIKE ? OR p.description LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }
    
    $sql .= " ORDER BY p.$sortBy $sortOrder OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";
    $params[] = $offset;
    $params[] = $limit;
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Obtener características de cada producto
        foreach ($products as &$product) {
            $featuresStmt = $pdo->prepare("SELECT feature_name, feature_value FROM product_features WHERE product_id = ?");
            $featuresStmt->execute([$product['id']]);
            $product['features'] = $featuresStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode($products);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch products']);
    }
}

function getProduct($pdo, $id) {
    try {
        $stmt = $pdo->prepare("SELECT p.*, c.name as category_name, b.name as brand_name 
                              FROM products p 
                              LEFT JOIN categories c ON p.category_id = c.id 
                              LEFT JOIN brands b ON p.brand_id = b.id 
                              WHERE p.id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            // Obtener características
            $featuresStmt = $pdo->prepare("SELECT feature_name, feature_value FROM product_features WHERE product_id = ?");
            $featuresStmt->execute([$id]);
            $product['features'] = $featuresStmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Obtener reseñas
            $reviewsStmt = $pdo->prepare("SELECT r.*, u.first_name, u.last_name 
                                        FROM reviews r 
                                        LEFT JOIN users u ON r.user_id = u.id 
                                        WHERE r.product_id = ? 
                                        ORDER BY r.created_at DESC");
            $reviewsStmt->execute([$id]);
            $product['reviews'] = $reviewsStmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch product']);
    }
}

function createProduct($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $pdo->beginTransaction();
        
        $stmt = $pdo->prepare("INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category_id, brand_id, stock_quantity, sku) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $input['name'],
            $input['description'],
            $input['price'],
            $input['original_price'] ?? null,
            $input['discount_percentage'] ?? 0,
            $input['image_url'],
            $input['category_id'],
            $input['brand_id'],
            $input['stock_quantity'] ?? 0,
            $input['sku']
        ]);
        
        $productId = $pdo->lastInsertId();
        
        // Insertar características si existen
        if (isset($input['features']) && is_array($input['features'])) {
            $featureStmt = $pdo->prepare("INSERT INTO product_features (product_id, feature_name, feature_value) VALUES (?, ?, ?)");
            foreach ($input['features'] as $feature) {
                $featureStmt->execute([$productId, $feature['name'], $feature['value']]);
            }
        }
        
        $pdo->commit();
        
        echo json_encode(['id' => $productId, 'message' => 'Product created successfully']);
    } catch(PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create product']);
    }
}

function updateProduct($pdo, $id) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, description = ?, price = ?, original_price = ?, discount_percentage = ?, image_url = ?, category_id = ?, brand_id = ?, stock_quantity = ?, updated_at = GETDATE() WHERE id = ?");
        
        $stmt->execute([
            $input['name'],
            $input['description'],
            $input['price'],
            $input['original_price'] ?? null,
            $input['discount_percentage'] ?? 0,
            $input['image_url'],
            $input['category_id'],
            $input['brand_id'],
            $input['stock_quantity'] ?? 0,
            $id
        ]);
        
        echo json_encode(['message' => 'Product updated successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update product']);
    }
}

function deleteProduct($pdo, $id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['message' => 'Product deleted successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete product']);
    }
}
?>
