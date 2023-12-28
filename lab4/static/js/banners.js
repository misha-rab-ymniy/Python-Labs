items = [
    {
        img: 'https://images.wallpaperscraft.ru/image/single/kot_lezhat_kotenok_91882_1920x1080.jpg',
        link: 'https://catalog-photo.ru/картинки-на-заставку-котики-фото/',
    },
    {
        img: 'https://images.wallpaperscraft.ru/image/single/kot_zima_pushistyj_99366_1920x1080.jpg',
        link: 'https://top-fon.com/fony-dlja-prezentacii/6834-koty-fon-dlja-prezentacii-182-foto.html',
    },
    {
        img: 'https://images.wallpaperscraft.ru/image/single/kot_sneg_vzgliad_95615_1920x1080.jpg',
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