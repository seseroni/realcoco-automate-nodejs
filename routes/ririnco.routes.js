'use strict';
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.route('/crawl/ririnco/best').get(
        async (req, res) => {
            const save_path = "competitors/crawling/ririnco/best";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.removeSync(save_path);
            }

            // 새로운 폴더 생성
            fs.ensureDirSync(save_path);

            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };
            const url = 'https://ririnco.com/category/best/52/';
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            const all_item_info = [];

            const all_item = $('div.box').slice(0, 20);

            all_item.each((idx, item) => {
                const item_info = [];

                // thumbnail
                const img_elem = $(item).find('div.prdimg');
                const img_elem_img = $(img_elem).find('img');
                const thumbnail = $(img_elem_img).attr('ec-data-src');

                // product name
                const name_elem = $(item).find('p.name');
                const product_name_str = $(name_elem).text().trim();
                const product_name = product_name_str.replace(/[#\/%!~:]/g, '_').replace('%', 'persent');

                // default price
                const default_price_elem = $(item).find('li.custom');
                const default_price_str = $(default_price_elem).text().trim();
                const default_price = default_price_str.replace('판매가 : ', '');

                // sale price
                const sale_price_elem = $(item).find('li.price');
                const sale_price_elem_str = $(sale_price_elem).text().trim();
                const sale_price = sale_price_elem_str.replace('할인판매가 : ', '');

                // detail url
                const detail_elem_a = $(img_elem).find('a');
                const detail_url = 'https://ririnco.com' + $(detail_elem_a).attr('href');

                item_info.push(thumbnail);
                item_info.push(product_name);
                item_info.push(default_price);
                item_info.push(sale_price);
                item_info.push(detail_url);

                all_item_info.push(item_info);

                // 썸네일 이미지 다운로드
                axios.get(thumbnail, { responseType: 'arraybuffer' })
                    .then(response => {
                        fs.writeFileSync(path.join(save_path, `${idx + 1}_${product_name}.jpg`), response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            const csvContent = all_item_info.map(item => item.join(',')).join('');
            fs.writeFileSync(path.join(save_path, '리리앤코BESTtable.csv'), csvContent);

            // 크롤링 결과를 JSON으로 변환하여 반환
            res.json({
                "message": "Web crawling completed",
                "data": all_item_info  // 크롤링 결과를 data 키에 할당
            });
        }
    );

    app.route('/crawl/ririnco/new').get(
        async (req, res) => {
            const save_path = "competitors/crawling/ririnco/new";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.removeSync(save_path);
            }

            // 새로운 폴더 생성
            fs.ensureDirSync(save_path);

            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };
            const url = 'https://ririnco.com/category/new-5/69/';
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            const all_item_info = [];

            const all_item = $('div.box').slice(0, 20);

            all_item.each((idx, item) => {
                const item_info = [];

                // thumbnail
                const img_elem = $(item).find('div.prdimg');
                const img_elem_img = $(img_elem).find('img');
                const thumbnail = $(img_elem_img).attr('ec-data-src');

                // product name
                const name_elem = $(item).find('p.name');
                const product_name_str = $(name_elem).text().trim();
                const product_name = product_name_str.replace(/[#\/%!~:]/g, '_').replace('%', 'persent');

                // default price
                const default_price_elem = $(item).find('li.custom');
                const default_price_str = $(default_price_elem).text().trim();
                const default_price = default_price_str.replace('판매가 : ', '');

                // sale price
                const sale_price_elem = $(item).find('li.price');
                const sale_price_elem_str = $(sale_price_elem).text().trim();
                const sale_price = sale_price_elem_str.replace('할인판매가 : ', '');

                // detail url
                const detail_elem_a = $(img_elem).find('a');
                const detail_url = 'https://ririnco.com' + $(detail_elem_a).attr('href');

                item_info.push(thumbnail);
                item_info.push(product_name);
                item_info.push(default_price);
                item_info.push(sale_price);
                item_info.push(detail_url);

                all_item_info.push(item_info);

                // 썸네일 이미지 다운로드
                axios.get(thumbnail, { responseType: 'arraybuffer' })
                    .then(response => {
                        fs.writeFileSync(path.join(save_path, `${idx + 1}_${product_name}.jpg`), response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            const csvContent = all_item_info.map(item => item.join(',')).join('');
            fs.writeFileSync(path.join(save_path, '리리앤코NEWtable.csv'), csvContent);

            // 크롤링 결과를 JSON으로 변환하여 반환
            res.json({
                "message": "Web crawling completed",
                "data": all_item_info  // 크롤링 결과를 data 키에 할당
            });
        }
    );
}
