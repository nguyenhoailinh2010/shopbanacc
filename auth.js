// Lưu trữ người dùng trong localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Các phần tử DOM
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const authButtons = document.getElementById('auth-buttons');
const usernameDisplay = document.getElementById('username-display');

const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeButtons = document.querySelectorAll('.close');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

// Kiểm tra nếu người dùng đã đăng nhập
function checkLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        userInfo.classList.remove('hidden');
        authButtons.classList.add('hidden');
        usernameDisplay.textContent = currentUser.username;
        
        // Hiển thị giỏ hàng nếu đã đăng nhập
        document.getElementById('cart-icon').style.display = 'block';
    } else {
        userInfo.classList.add('hidden');
        authButtons.classList.remove('hidden');
        
        // Ẩn giỏ hàng nếu chưa đăng nhập
        document.getElementById('cart-icon').style.display = 'none';
    }
}

// Hiển thị modal đăng nhập
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Hiển thị modal đăng ký
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Đóng modal khi nhấn nút đóng
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Đóng modal khi nhấn bên ngoài
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Chuyển đổi giữa đăng nhập và đăng ký
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Xử lý đăng ký
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    // Kiểm tra tên người dùng đã tồn tại chưa
    if (users.some(user => user.username === username)) {
        alert('Tên người dùng đã tồn tại!');
        return;
    }
    
    // Kiểm tra email đã tồn tại chưa
    if (users.some(user => user.email === email)) {
        alert('Email đã được sử dụng!');
        return;
    }
    
    // Tạo người dùng mới
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password
    };
    
    // Thêm người dùng vào mảng và lưu vào localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Đăng nhập người dùng mới
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Cập nhật giao diện
    checkLoggedIn();
    
    // Đóng modal
    registerModal.style.display = 'none';
    
    // Thông báo thành công
    alert('Đăng ký thành công!');
    
    // Reset form
    registerForm.reset();
});

// Xử lý đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Tìm người dùng
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Lưu người dùng hiện tại vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Cập nhật giao diện
        checkLoggedIn();
        
        // Đóng modal
        loginModal.style.display = 'none';
        
        // Thông báo thành công
        alert('Đăng nhập thành công!');
        
        // Reset form
        loginForm.reset();
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Xử lý đăng xuất
logoutBtn.addEventListener('click', () => {
    // Xóa người dùng hiện tại khỏi localStorage
    localStorage.removeItem('currentUser');
    
    // Cập nhật giao diện
    checkLoggedIn();
    
    // Thông báo
    alert('Đã đăng xuất!');
});

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    checkLoggedIn();
});
