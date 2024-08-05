// navbar.js
export default function RenderNavbar() {
    // Crear y agregar el enlace al archivo CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'App.css';
    document.head.appendChild(link);

    const body = document.body;

    // Crear la navbar
    const nav = document.createElement('nav');

    const logo = document.createElement('a');
    logo.href = '#';
    logo.classList.add('logo');
    const logoImg = document.createElement('img');
    logoImg.src = 'Captura_de_pantalla_2024-06-24_082542-removebg-preview.png';
    logo.appendChild(logoImg);
    nav.appendChild(logo);

    const links = [
        { href: '#', text: 'Qué hacemos' },
        { href: '#', text: 'Templates Hub' },
        { href: '#', text: 'Soporte Técnico' },
        { href: '#', text: 'Nuestros Planes' },
    ];

    links.forEach(linkInfo => {
        const link = document.createElement('a');
        link.href = linkInfo.href;
        link.textContent = linkInfo.text;
        nav.appendChild(link);
    });

    const loginBtn = document.createElement('a');
    loginBtn.href = '#';
    loginBtn.classList.add('login-btn');
    loginBtn.textContent = 'Iniciar Sesión';
    nav.appendChild(loginBtn);

    body.appendChild(nav);
}
    