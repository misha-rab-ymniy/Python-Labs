function couponsMain() {
    const coupons = new Map([
        ['SCHOOL', {percents: 50}],
        ['STUDENT', {percents: 20}],
        ['FRIENDS', {percents: 25}],
        ['FAMILY', {percents: 10, expired: true}],
    ]);

    const prices = document.querySelectorAll('.price');
    const newPrices = document.querySelectorAll('.new-price');

    const couponInput = document.getElementById('coupon-input');
    const couponForm = document.getElementById('coupon-form');
    const couponFormText = document.getElementById('coupon-form-text');

    couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const coupon = couponInput.value.toUpperCase();
        const discount = coupons.get(coupon);
        if (!discount) {
            couponFormText.textContent = 'Coupon not found';
            for (let i = 0; i < prices.length; ++i) {
                prices[i].classList.remove('crossed');
                newPrices[i].textContent = '';
            }
            return;
        }
        if (discount.expired) {
            couponFormText.textContent = 'Coupon expired...';
            for (let i = 0; i < prices.length; ++i) {
                prices[i].classList.remove('crossed');
                newPrices[i].textContent = '';
            }
            return;
        }

        for (let i = 0; i < prices.length; ++i) {
            prices[i].classList.add('crossed');
            newPrices[i].textContent = ' ' + (Number(prices[i].textContent) * (1 - discount.percents / 100)).toFixed(2).toString();
        }
        couponFormText.textContent = 'Coupon applied!';
    });

}

couponsMain();