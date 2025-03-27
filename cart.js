// Khởi tạo giỏ hàng từ localStorage hoặc tạo mới
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Kiểm tra người dùng đã đăng nhập chưa
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Vui lòng đăng nhập để mua hàng!');
        document.getElementById('login-modal').style.display = 'block';
        return;
    }
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // Nếu đã có, tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu chưa có, thêm mới với số lượng 1
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật số lượng hiển thị
    updateCartCount();
    
    // Thông báo
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Nếu số lượng = 0, xóa sản phẩm khỏi giỏ hàng
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Hiển thị giỏ hàng
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartSection = document.querySelector('.cart-section');
    
    // Kiểm tra người dùng đã đăng nhập chưa
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        cartSection.classList.add('hidden');
        return;
    }
    
    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống.</p>';
        cartTotalPrice.textContent = '0';
        return;
    }
    
    // Hiển thị các sản phẩm trong giỏ hàng
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">${item.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Xóa</button>
                </div>
            </div>
        `;
        
        cartItems.innerHTML += cartItemHTML;
    });
    
    // Cập nhật tổng tiền
    cartTotalPrice.textContent = total.toLocaleString('vi-VN');
}

// Xử lý thanh toán
function checkout() {
    // Kiểm tra người dùng đã đăng nhập chưa
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Vui lòng đăng nhập để thanh toán!');
        document.getElementById('login-modal').style.display = 'block';
        return;
    }
    
    // Kiểm tra giỏ hàng có sản phẩm không
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    // Xử lý thanh toán (đây chỉ là mô phỏng)
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
    
    // Xóa giỏ hàng sau khi thanh toán
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật giao diện
    renderCart();
    updateCartCount();
}

// Hiển thị/ẩn giỏ hàng khi nhấp vào biểu tượng giỏ hàng
document.getElementById('cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    const cartSection = document.querySelector('.cart-section');
    cartSection.classList.toggle('hidden');
    
    // Nếu hiển thị giỏ hàng, cập nhật nội dung
    if (!cartSection.classList.contains('hidden')) {
        renderCart();
    }
});

// Xử lý nút thanh toán
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Cập nhật giỏ hàng khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
