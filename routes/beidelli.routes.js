'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

module.exports = function (app) {
    app.route('/crawl/beidelli/best').get(
        async (req, res) => {
            const save_path = "competitors/crawling/beidelli/best";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.rmdirSync(save_path, { recursive: true });
            }

            // 새로운 폴더 생성
            fs.mkdirSync(save_path, { recursive: true });

            const url = 'https://beidelli.com/product/list.html?cate_no=24';
            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);
            let all_item_info = [];

            $('div.box').each((idx, item) => {
                if (idx >= 6 && idx < 26) {
                    let item_info = [];

                    let thumbnail = 'https:' + $(item).find('img.lazyload').attr('data-src');

                    let product_name = $(item).find('div.name').text().replace('상품명 : ', '').replace('#', '_').replace('/', '_').replace('%', 'persent');

                    let default_price = $(item).find('li[rel="판매가"]').text().replace('판매가 : ', '');

                    let sale_price_elem = $(item).find('li[rel="할인판매가"]');
                    let sale_price = sale_price_elem.length ? sale_price_elem.text().replace('할인판매가 : ', '') : default_price;

                    let detail_url = 'https://beidelli.com' + $(item).find('div.thumbnail a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });

            res.json({
                "message": "Web crawling completed",
                "data": all_item_info
            });
        }
    );

    app.route('/crawl/beidelli/new').get(
        async (req, res) => {
            const save_path = "competitors/crawling/beidelli/new";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.rmdirSync(save_path, { recursive: true });
            }

            // 새로운 폴더 생성
            fs.mkdirSync(save_path, { recursive: true });

            const url = 'https://beidelli.com/product/list.html?cate_no=59';
            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);
            let all_item_info = [];

            $('div.box').each((idx, item) => {
                if (idx >= 6 && idx < 26) {
                    let item_info = [];

                    let thumbnail = 'https:' + $(item).find('img.lazyload').attr('data-src');

                    let product_name = $(item).find('div.name').text().replace('상품명 : ', '').replace('#', '_').replace('/', '_').replace('%', 'persent');

                    let default_price = $(item).find('li[rel="판매가"]').text().replace('판매가 : ', '');

                    let sale_price_elem = $(item).find('li[rel="할인판매가"]');
                    let sale_price = sale_price_elem.length ? sale_price_elem.text().replace('할인판매가 : ', '') : default_price;

                    let detail_url = 'https://beidelli.com' + $(item).find('div.thumbnail a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });

            res.json({
                "message": "Web crawling completed",
                "data": all_item_info
            });
        }
    );
}
