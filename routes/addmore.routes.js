'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    app.route('/crawl/addmore/best').get(
        async (req, res) => {
            const save_path = "competitors/crawling/addmore/best";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.rmdirSync(save_path, { recursive: true });
            }

            // 새로운 폴더 생성
            fs.mkdirSync(save_path, { recursive: true });

            const url = 'https://addmore.co.kr/product/list.html?cate_no=24';
            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);
            let all_item_info = [];

            $('div.thumbnail').each((idx, item) => {
                if (idx < 20) {
                    let item_info = [];

                    let thumbnail = 'https:' + $(item).find('img').attr('src');

                    let product_name = $(item).find('div.description p.name').text().replace('상품명 : ', '').replace('#', '_').replace('/', '_').replace('%', 'percent');

                    let default_price = $(item).find('div.description li[rel="판매가"]').text().replace('판매가 : ', '');

                    let sale_price_elem = $(item).find('div.description li[rel="할인판매가"]');
                    let sale_price = sale_price_elem.length ? sale_price_elem.text().replace('할인판매가 : ', '') : default_price;

                    let detail_url = 'https://addmore.co.kr' + $(item).find('a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });

            res.json({
                "message": "Web crawling completed",
                "data": all_item_info
            });
        }
    )

    app.route('/crawl/addmore/new').get(
        async (req, res) => {
            const save_path = "competitors/crawling/addmore/new";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.rmdirSync(save_path, { recursive: true });
            }

            // 새로운 폴더 생성
            fs.mkdirSync(save_path, { recursive: true });

            const url = 'https://addmore.co.kr/product/list.html?cate_no=65';
            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);
            let all_item_info = [];

            $('div.thumbnail').each((idx, item) => {
                if (idx < 20) {
                    let item_info = [];

                    let thumbnail = 'https:' + $(item).find('img').attr('src');

                    let product_name = $(item).find('div.description p.name').text().replace('상품명 : ', '').replace('#', '_').replace('/', '_').replace('%', 'percent');

                    let default_price = $(item).find('div.description li[rel="판매가"]').text().replace('판매가 : ', '');

                    let sale_price_elem = $(item).find('div.description li[rel="할인판매가"]');
                    let sale_price = sale_price_elem.length ? sale_price_elem.text().replace('할인판매가 : ', '') : default_price;

                    let detail_url = 'https://addmore.co.kr' + $(item).find('a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });

            res.json({
                "message": "Web crawling completed",
                "data": all_item_info
            });
        }
    )
}
