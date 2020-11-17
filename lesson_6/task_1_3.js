/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие картинки по указанному в src адресу.
3) *Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки должны быть стрелки «вперед» и «назад»,
по нажатию на которые происходит замена изображения на следующее или предыдущее.
*/

const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageArrowLeftClass: 'galleryWrapper__arrow_left',
        openedImageArrowRightClass: 'galleryWrapper__arrow_right',
        openedImageArrowLeftSrc: 'images/gallery/arrow_left.png',
        openedImageArrowRightSrc: 'images/gallery/arrow_right.png',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
    },

    srcList: [],

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        document.querySelector(this.settings.previewSelector)
            .addEventListener('click', (event) => {
                this.containerClickHandler(event);
            });
        this.initSrcList();
    },

    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') return;

        this.openImage(event.target.dataset.full_image_url);
    },

    openImage(src) {

        const image = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
        image.src = src;
        // добавил обработчик ошибок, надеюсь правильно сделал, т.к. не совсем понял, что требовалось по заданию
        // обработчки ошибок на js мы вообще не проходили даже чуть чуть, странное задание...
        image.onerror = function () {
            alert('картинка не существует');
            // image.src = 'images/gallery/error.jpg';
        };
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) return galleryWrapperElement;

        return this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const arrowLeftElement = new Image();
        arrowLeftElement.classList.add(this.settings.openedImageArrowLeftClass);
        arrowLeftElement.src = this.settings.openedImageArrowLeftSrc;
        arrowLeftElement.addEventListener('click', () => this.shiftLeft());
        galleryWrapperElement.appendChild(arrowLeftElement);

        const arrowRightElement = new Image();
        arrowRightElement.classList.add(this.settings.openedImageArrowRightClass);
        arrowRightElement.src = this.settings.openedImageArrowRightSrc;
        arrowRightElement.addEventListener('click', () => this.shiftRight());
        galleryWrapperElement.appendChild(arrowRightElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);


        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    initSrcList() {
        const allImg = document.querySelector(this.settings.previewSelector)
            .querySelectorAll('img');
        allImg.forEach((item) => {
            this.srcList.push(item.dataset.full_image_url);
        });

    },

    shiftLeft(event) {
        const currIdx = this.getCurrIdx();
        currIdx > 0 ? this.openImage(this.srcList[currIdx - 1])
            : this.openImage(this.srcList[this.srcList.length - 1]);
    },

    shiftRight(event) {
        const currIdx = this.getCurrIdx();
        currIdx < this.srcList.length - 1
            ? this.openImage(this.srcList[currIdx + 1])
            : this.openImage(this.srcList[0]);
    },

    getCurrIdx() {
        let currSrc = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src;
        currSrc = currSrc.slice(currSrc.lastIndexOf('images'));
        return this.srcList.indexOf(currSrc);
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};

gallery.init({ previewSelector: '.galleryPreviewsContainer' })

