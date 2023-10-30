'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

module.exports = function(app) {
    app.get('/crawl/baon/best', async (req, res) => {
        const save_path = "competitors/crawling/baon/best";

        // 이전에 저장된 폴더가 있다면 모두 제거
        if (fs.existsSync(save_path)) {
            fs.rmdirSync(save_path, { recursive: true });
        }

        // 새로운 폴더 생성
        fs.mkdirSync(save_path, { recursive: true });

        const url = 'https://ba-on.com/product/best.html?cate_no=132';
        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            let allItemInfo = [];

            $('li.xans-record-').slice(17, 37).each((idx, item) => {

                let thumbnail ='https:' + $(item).find('img').attr('src');

                let defaultProductName=$(item).find('.name a').text();
                let productName=defaultProductName.replace('/', '_');

                let price=$(item).find("s").eq(1).text();

                let detailUrl='https://ba-on.com' + $(item).find('.thumbnail a').attr('href');

                allItemInfo.push([thumbnail, productName, price,detailUrl]);

            });

            res.json({
                message: "Web crawling completed",
                data: allItemInfo,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });

    app.get('/crawl/baon/new', async (req, res) => {
        const save_path = "competitors/crawling/baon/new";

        // 이전에 저장된 폴더가 있다면 모두 제거
        if (fs.existsSync(save_path)) {
            fs.rmdirSync(save_path, { recursive: true });
        }

        // 새로운 폴더 생성
        fs.mkdirSync(save_path, { recursive: true });

        const url = 'https://ba-on.com/product/best.html?cate_no=85';
        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };

        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            let allItemInfo = [];

            $('li.xans-record-').slice(17, 37).each((idx, item) => {

                let thumbnail ='https:' + $(item).find('img').attr('src');

                let defaultProductName=$(item).find('.name a').text();
                let productName=defaultProductName.replace('/', '_');

                let price=$(item).find("s").eq(1).text();

                let detailUrl='https://ba-on.com' + $(item).find('.thumbnail a').attr('href');

                allItemInfo.push([thumbnail, productName, price,detailUrl]);

            });

            res.json({
                message: "Web crawling completed",
                data: allItemInfo,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
