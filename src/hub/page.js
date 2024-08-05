document.addEventListener('DOMContentLoaded', () => {
    // Crear y agregar el enlace al archivo CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'page.moudules.css';
    document.head.appendChild(link);
  
    const body = document.body;
    body.classList.add('hub');
  
    const container = document.createElement('div');
    container.classList.add('container');
    body.appendChild(container);
  
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = 'Templates';
    container.appendChild(title);
  
    const sections = [
      'Publicidad',
      'Productos',
      'Promoción',
      'Eventos',
      'Novedades',
      'Ofertas',
      'Descuentos',
      'Exclusivos',
    ];
  
    sections.forEach((sectionName) => {
      const section = document.createElement('div');
      section.classList.add('section', sectionName.toLowerCase());
  
      const sectionTitle = document.createElement('div');
      sectionTitle.classList.add('section-title');
      sectionTitle.textContent = sectionName;
      section.appendChild(sectionTitle);
  
      const imagesContainer = document.createElement('div');
      imagesContainer.classList.add('images');
      section.appendChild(imagesContainer);
  
      for (let i = 0; i < 8; i++) {
        const img = document.createElement('img');
        img.src = 'image.jpg';
        img.alt = 'Black Jack Pepper';
        imagesContainer.appendChild(img);
      }
  
      container.appendChild(section);
    });
  });
  