const updateTime = new Date('2020-05-21 03:34:54.000');
const t = updateTime.getTime();
console.log(t);
const day1 = day(updateTime);
console.log(day1);


function day(updateTime) {
    console.log('------');
    console.log(updateTime);
    console.log(new Date());
    const second = (new Date().getTime() - updateTime.getTime()) / 1000;

    const d = Math.floor(second / (3600 * 24));
    const h = Math.floor(second % (3600 * 24) / 3600);
    const m = Math.floor(second % 3600 / 60);

    const dDisplay = d > 0 ? d + (d === 1 ? ' day' : ' days') : '';
    if (dDisplay) {
        return dDisplay;
    }
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour' : ' hours') : '';
    if (hDisplay) {
        return hDisplay;
    }
    const mDisplay = m + (m === 1 ? ' minute' : ' minutes');
    return mDisplay;
}


