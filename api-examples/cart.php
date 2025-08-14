<?php
// API para manejo del carrito de compras
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de base de datos (misma que products.php)
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
        // Obtener carrito
        getCart($pdo);
        break;
    
    case 'POST':
        // Agregar item al carrito
        addToCart($pdo);
        break;
    
    case 'PUT':
        // Actualizar cantidad de item
        if (isset($pathParts[2])) {
            updateCartItem($pdo, $pathParts[2]);
        }
        break;
    
    case 'DELETE':
        // Eliminar item del carrito
        if (isset($pathParts[2])) {
            removeFromCart($pdo, $pathParts[2]);
        }
        break;
}

function getCart($pdo) {
    $sessionId = $_GET['session_id'] ?? null;
    $userId = $_GET['user_id'] ?? null;
    
    if (!$sessionId && !$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'Session ID or User ID required']);
        return;
    }
    
    try {
        // Buscar o crear carrito
        $cartStmt = $pdo->prepare("SELECT id FROM carts WHERE " . ($userId ? "user_id = ?" : "session_id = ?"));
        $cartStmt->execute([$userId ?? $sessionId]);
        $cart = $cartStmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$cart) {
            // Crear nuevo carrito
            $createCartStmt = $pdo->prepare("INSERT INTO carts (user_id, session_id) VALUES (?, ?)");
            $createCartStmt->execute([$userId, $sessionId]);
            $cartId = $pdo->lastInsertId();
        } else {
            $cartId = $cart['id'];
        }
        
        // Obtener items del carrito
        $itemsStmt = $pdo->prepare("SELECT ci.*, p.name, p.description, p.image_url, p.price as current_price 
                                   FROM cart_items ci 
                                   JOIN products p ON ci.product_id = p.id 
                                   WHERE ci.cart_id = ?");
        $itemsStmt->execute([$cartId]);
        $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
        
        $total = array_sum(array_map(function($item) {
            return $item['price'] * $item['quantity'];
        }, $items));
        
        echo json_encode([
            'cart_id' => $cartId,
            'items' => $items,
            'total' => $total,
            'item_count' => array_sum(array_column($items, 'quantity'))
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch cart']);
    }
}

function addToCart($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $sessionId = $input['session_id'] ?? null;
    $userId = $input['user_id'] ?? null;
    $productId = $input['product_id'];
    $quantity = $input['quantity'] ?? 1;
    
    try {
        $pdo->beginTransaction();
        
        // Buscar o crear carrito
        $cartStmt = $pdo->prepare("SELECT id FROM carts WHERE " . ($userId ? "user_id = ?" : "session_id = ?"));
        $cartStmt->execute([$userId ?? $sessionId]);
        $cart = $cartStmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$cart) {
            $createCartStmt = $pdo->prepare("INSERT INTO carts (user_id, session_id) VALUES (?, ?)");
            $createCartStmt->execute([$userId, $sessionId]);
            $cartId = $pdo->lastInsertId();
        } else {
            $cartId = $cart['id'];
        }
        
        // Obtener precio actual del producto
        $productStmt = $pdo->prepare("SELECT price FROM products WHERE id = ? AND in_stock = 1");
        $productStmt->execute([$productId]);
        $product = $productStmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$product) {
            throw new Exception('Product not found or out of stock');
        }
        
        // Verificar si el item ya existe en el carrito
        $existingItemStmt = $pdo->prepare("SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?");
        $existingItemStmt->execute([$cartId, $productId]);
        $existingItem = $existingItemStmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existingItem) {
            // Actualizar cantidad
            $updateStmt = $pdo->prepare("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?");
            $updateStmt->execute([$quantity, $existingItem['id']]);
        } else {
            // Agregar nuevo item
            $insertStmt = $pdo->prepare("INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
            $insertStmt->execute([$cartId, $productId, $quantity, $product['price']]);
        }
        
        $pdo->commit();
        echo json_encode(['message' => 'Item added to cart successfully']);
    } catch(Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add item to cart']);
    }
}

function updateCartItem($pdo, $itemId) {
    $input = json_decode(file_get_contents('php://input'), true);
    $quantity = $input['quantity'];
    
    try {
        if ($quantity <= 0) {
            $stmt = $pdo->prepare("DELETE FROM cart_items WHERE id = ?");
            $stmt->execute([$itemId]);
        } else {
            $stmt = $pdo->prepare("UPDATE cart_items SET quantity = ? WHERE id = ?");
            $stmt->execute([$quantity, $itemId]);
        }
        
        echo json_encode(['message' => 'Cart item updated successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update cart item']);
    }
}

function removeFromCart($pdo, $itemId) {
    try {
        $stmt = $pdo->prepare("DELETE FROM cart_items WHERE id = ?");
        $stmt->execute([$itemId]);
        
        echo json_encode(['message' => 'Item removed from cart successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to remove item from cart']);
    }
}
?>
