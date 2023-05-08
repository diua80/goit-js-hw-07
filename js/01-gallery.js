import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

// const createGalleryItem = (item) => {
//     const li = document.createElement('li');
//     li.classList.add('gallery__item');

//     const a = document.createElement('a');
//     a.classList.add('gallery__link');
//     a.href = item.original;

//     const img = document.createElement('img');
//     img.classList.add('gallery__image');
//     img.src = item.preview;
//     img.alt = item.description;
//     img.dataset.source = item.original;

//     a.appendChild(img);
//     li.appendChild(a);
//     return li;
// };
const createGalleryItem = (item) => {
  const galleryItem = `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" alt="${item.description}" data-source="${item.original}">
      </a>
    </li>
  `;
  return gallery.insertAdjacentHTML('beforeend', galleryItem);
};
// функція, що перебиратиме наш масив об'єктів, та збережемо її результат(новий масив) у змінну,
// щоб потім зааппендити цей масив до нашого посилання на дом-об'єкт "gallery"..

const renderGallery = (items) => {
    const galleryItems = items.map((item) => createGalleryItem(item));
    gallery.append(...galleryItems);
};

renderGallery(galleryItems);

// встановимо слухача на галерею та створимо модальне вікно з великим зображенням

const galleryItemClick = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const largeItemUrl = event.target.dataset.source;
    const instance = basicLightbox.create(
        `<div class="modal">
        <img src = "${largeItemUrl}" alt = " "/>
        </div>`
    );
    instance.show();


  const closeOnEscape = (event) => {
    if (event.key === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeOnEscape);
    }
  };
    window.addEventListener('keydown', closeOnEscape);
};
gallery.addEventListener('click', galleryItemClick);

