// Dữ liệu sản phẩm mẫu
const products = [
    {
        id: 'acc1',
        name: 'Tài khoản Blox Fruit Level Max',
        price: 500000,
        category: 'accounts',
        image: 'images/products/account1.jpg',
        description: 'Tài khoản Blox Fruit đã đạt level tối đa, có nhiều trái ác quỷ hiếm và vũ khí mạnh.'
    },
    {
        id: 'acc2',
        name: 'Tài khoản Blox Fruit Premium',
        price: 800000,
        category: 'accounts',
        image: 'images/products/account2.jpg',
        description: 'Tài khoản cao cấp với nhiều trái ác quỷ hiếm, vũ khí tối thượng và nhiều tài nguyên quý giá.'
    },
    {
        id: 'fruit1',
        name: 'Trái Ác Quỷ Dragon',
        price: 300000,
        category: 'fruits',
        image: 'images/products/fruit1.jpg',
        description: 'Trái ác quỷ Dragon siêu hiếm, sức mạnh hủy diệt.'
    },
    {
        id: 'fruit2',
        name: 'Trái Ác Quỷ Venom',
        price: 250000,
        category: 'fruits',
        image: 'images/products/fruit1.jpg',
        description: 'Trái ác quỷ Venom với khả năng gây sát thương độc mạnh mẽ.'
    },
    {
        id: 'service1',
        name: 'Dịch vụ cày thuê Level',
        price: 100000,
        category: 'services',
        image: 'images/products/service1.jpg',
        description: 'Dịch vụ cày thuê level cho tài khoản của bạn, nhanh chóng và an toàn.'
    },
    {
        id: 'service2',
        name: 'Dịch vụ săn Boss',
        price: 150000,
        category: 'services',
        image: 'images/products/service1.jpg',
        description: 'Dịch vụ săn boss khó, đảm bảo chiến lợi phẩm giá trị.'
    }
];

// Hiển thị sản phẩm
function renderProducts(category = 'all') {
    const productGrid = document.getElementById('product-grid');
    
    // Lọc sản phẩm theo danh mục
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Xóa nội dung cũ
    productGrid.innerHTML = '';
    
    // Thêm sản phẩm mới
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <div class="product-actions">
                    <button class="view-btn" data-id="${product.id}">Chi tiết</button>
                    <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Thêm sự kiện cho nút chi tiết
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
    
    // Thêm sự kiện cho nút thêm vào giỏ hàng
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}

// Hiển thị chi tiết sản phẩm
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const productModal = document.getElementById('product-modal');
    const productDetails = document.getElementById('product-details');
    
    if (product) {
        productDetails.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2 class="product-detail-title">${product.name}</h2>
                <p class="product-detail-price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <div class="product-detail-description">
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-actions">
                    <button id="add-to-cart-detail" class="btn">Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;
        
        // Hiển thị modal
        productModal.style.display = 'block';
        
        // Thêm sự kiện cho nút thêm vào giỏ hàng
        document.getElementById('add-to-cart-detail').addEventListener('click', () => {
            addToCart(product);
        });
        
        // Đóng modal khi nhấn nút đóng
        productModal.querySelector('.close').addEventListener('click', () => {
            productModal.style.display = 'none';
        });
        
        // Đóng modal khi nhấn bên ngoài
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.style.display = 'none';
            }
        });
    }
}

// Hiển thị tài khoản Blox Fruit
function renderAccounts() {
    const accountGrid = document.querySelector('.account-grid');
    const accountProducts = products.filter(product => product.category === 'accounts');
    
    accountGrid.innerHTML = '';
    
    accountProducts.forEach(product => {
        const accountCard = document.createElement('div');
        accountCard.className = 'product-card';
        accountCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <div class="product-actions">
                    <button class="view-btn" data-id="${product.id}">Chi tiết</button>
                    <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        
        accountGrid.appendChild(accountCard);
    });
    
    // Thêm sự kiện cho nút chi tiết
    accountGrid.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
    
    // Thêm sự kiện cho nút thêm vào giỏ hàng
    accountGrid.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}

// Hiển thị dịch vụ Blox Fruit
function renderServices() {
    const serviceGrid = document.querySelector('.service-grid');
    const serviceProducts = products.filter(product => product.category === 'services');
    
    serviceGrid.innerHTML = '';
    
    serviceProducts.forEach(product => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'product-card';
        serviceCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <div class="product-actions">
                    <button class="view-btn" data-id="${product.id}">Chi tiết</button>
                    <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        
        serviceGrid.appendChild(serviceCard);
    });
    
    // Thêm sự kiện cho nút chi tiết
    serviceGrid.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
    
    // Thêm sự kiện cho nút thêm vào giỏ hàng
    serviceGrid.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}

// Xử lý chuyển đổi danh mục sản phẩm
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Xóa lớp active từ tất cả các nút
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Thêm lớp active cho nút được nhấp
        button.classList.add('active');
        
        // Lấy danh mục từ thuộc tính data-category
        const category = button.getAttribute('data-category');
        
        // Hiển thị sản phẩm theo danh mục
        renderProducts(category);
    });
});

// Xử lý cuộn mượt khi nhấp vào liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#cart') return; // Bỏ qua xử lý cho liên kết giỏ hàng
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Khởi tạo trang khi tải
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderAccounts();
    renderServices();
});
