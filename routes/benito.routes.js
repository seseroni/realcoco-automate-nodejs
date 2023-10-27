'use strict';
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require('path');

module.exports = function (app) {
    app.route('/crawl/benito/best').get(async (req, res) => {
        const save_path = "competitors/crawling/benito/best";

        // 이전에 저장된 폴더가 있다면 모두 제거
        if (fs.existsSync(save_path)) {
            fs.rmdirSync(save_path, { recursive: true });
        }

        // 새로운 폴더 생성
        fs.mkdirSync(save_path, { recursive: true });

        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

        let all_item_info = [];

        for (let page_id = 1; page_id < 2; page_id++) {
            const url = `https://benito.co.kr/product/list.html?cate_no=28&page=${page_id}`;
            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);

            $('li.xans-record-').each((idx, item) => {
                if (idx >= 12 && idx < 32) {
                    let item_info = [];

                    let thumbnail = $(item).find('img').attr('ec-data-src');

                    let product_name = $(item).find('li.name a').text().replace('/', '_');

                    let default_price = $(item).find('span.price').text().replace('원', '');

                    let sale_price = $(item).find('span.priceSalePercent').text().replace('원', '');

                    let detail_url = 'https://benito.co.kr' + $(item).find('div.thumbnail a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });
        }

        res.json({
            "message": "Web crawling completed",
            "data": all_item_info
        });
    });

    app.route('/crawl/benito/new').get(
        async (req, res) => {
        const save_path = "competitors/crawling/benito/new";

        // 이전에 저장된 폴더가 있다면 모두 제거
        if (fs.existsSync(save_path)) {
            fs.rmdirSync(save_path, { recursive: true });
        }

        // 새로운 폴더 생성
        fs.mkdirSync(save_path, { recursive: true });

        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

        let all_item_info = [];

        for (let page_id = 1; page_id < 2; page_id++) {
            const url = `https://benito.co.kr/product/list.html?cate_no=67&page=${page_id}`;
            let response = await axios.get(url, { headers });
            let $ = cheerio.load(response.data);

            $('li.xans-record-').each((idx, item) => {
                if (idx >= 12 && idx < 32) {
                    let item_info = [];

                    let thumbnail = $(item).find('img').attr('ec-data-src');

                    let product_name = $(item).find('li.name a').text().replace('/', '_');

                    let default_price = $(item).find('span.price').text().replace('원', '');

                    let sale_price = $(item).find('span.priceSalePercent').text().replace('원', '');

                    let detail_url = 'https://benito.co.kr' + $(item).find('div.thumbnail a').attr('href');

                    item_info.push(thumbnail, product_name, default_price, sale_price, detail_url);

                    all_item_info.push(item_info);
                }
            });
        }

        res.json({
            "message": "Web crawling completed",
            "data": all_item_info
        });
    });
}
