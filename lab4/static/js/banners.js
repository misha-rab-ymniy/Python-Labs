items = [
    {
        img: 'https://phonoteka.org/uploads/posts/2022-06/1654154583_27-phonoteka-org-p-kotiki-oboi-na-rabochii-stol-krasivo-32.jpg',
        link: 'https://catalog-photo.ru/картинки-на-заставку-котики-фото/',
    },
    {
        img: 'https://top-fon.com/uploads/posts/2023-02/1675327302_top-fon-com-p-koti-fon-dlya-prezentatsii-213.jpg',
        link: 'https://top-fon.com/fony-dlja-prezentacii/6834-koty-fon-dlja-prezentacii-182-foto.html',
    },
    {
        img: 'https://i.artfile.ru/1920x1080_1315239_[www.ArtFile.ru].jpg',
        link: 'https://www.artfile.ru/i.php?i=1315239',
    },
];

function bannersMain() {
    const defaultInterval = 3000;

    let currentItemIndex = 0;

    const bannerLink = document.getElementById('banner-link');
    const bannerImage = document.getElementById('banner-img');
    const intervalForm = document.getElementById('interval-form');
    const intervalInput = document.getElementById('interval');

    const handleBannerSwitch = () => {
        if (document.hasFocus()) {
            const currentBanner = items[currentItemIndex % items.length];
            ++currentItemIndex;
            bannerImage.src = currentBanner.img;
            bannerLink.href = currentBanner.link;
        }
    };

    let intervalId = setInterval(handleBannerSwitch, defaultInterval);

    intervalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearInterval(intervalId);
        const newInterval = Number(intervalInput.value);
        intervalId = setInterval(handleBannerSwitch, newInterval);
    });
}

bannersMain();