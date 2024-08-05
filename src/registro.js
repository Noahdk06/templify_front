// registrationForm.js
export function renderRegistrationForm() {
    const head = document.head;
    const body = document.body;

    // Add meta tags
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    head.appendChild(metaCharset);

    const metaViewport = document.createElement('meta');
    metaViewport.setAttribute('name', 'viewport');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    head.appendChild(metaViewport);

    // Add title
    const title = document.createElement('title');
    title.textContent = 'Registro de cuenta';
    head.appendChild(title);

    // Add CSS links
    const linkCss = document.createElement('link');
    linkCss.setAttribute('rel', 'stylesheet');
    linkCss.setAttribute('href', 'App.css');
    head.appendChild(linkCss);

    const linkFontAwesome = document.createElement('link');
    linkFontAwesome.setAttribute('rel', 'stylesheet');
    linkFontAwesome.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    head.appendChild(linkFontAwesome);

    // Create registration form container
    const registrationForm = document.createElement('div');
    registrationForm.className = 'registration-form';
    body.appendChild(registrationForm);

    // Create left-half div
    const leftHalf = document.createElement('div');
    leftHalf.className = 'left-half';
    registrationForm.appendChild(leftHalf);

    // Create form
    const form = document.createElement('form');
    form.id = 'registerForm';
    leftHalf.appendChild(form);

    // Create and append form fields
    const fields = [
        { label: 'Nombre', type: 'text', id: 'name', name: 'name' },
        { label: 'Apellido', type: 'text', id: 'surname', name: 'surname' },
        { label: 'Usuario', type: 'text', id: 'username', name: 'username' },
        { label: 'Contraseña', type: 'password', id: 'password', name: 'password' },
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.setAttribute('type', field.type);
        input.id = field.id;
        input.name = field.name;
        form.appendChild(input);
    });

    // Create and append buttons
    const registerButton = document.createElement('button');
    registerButton.setAttribute('type', 'submit');
    registerButton.textContent = 'Registrarse';
    form.appendChild(registerButton);

    const loginButton = document.createElement('button');
    loginButton.setAttribute('type', 'button');
    loginButton.className = 'toggle-button';
    loginButton.textContent = 'Iniciar sesión';
    loginButton.addEventListener('click', () => {

    });
    form.appendChild(loginButton);

    // Create right-half div
    const rightHalf = document.createElement('div');
    rightHalf.className = 'right-half';
    registrationForm.appendChild(rightHalf);

    // Create and append social buttons
    const socialButtons = [
        { className: 'google', icon: 'fa-google', text: 'Usar Google' },
        { className: 'apple', icon: 'fa-apple', text: 'Usar Apple' },
        { className: 'facebook', icon: 'fa-facebook', text: 'Usar Facebook' },
    ];

    socialButtons.forEach(button => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = `social-button ${button.className}`;
        a.innerHTML = `<i class="fa ${button.icon}"></i> ${button.text}`;
        rightHalf.appendChild(a);
    });

    // Add script
    const script = document.createElement('script');
    script.src = 'script.js';
    body.appendChild(script);
}
