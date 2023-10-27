'use strict';
const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.route('/crawl/slowand/best').get(
        async (req, res) => {
            const save_path = "competitors/crawling/slowand/best";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.removeSync(save_path);
            }

            // 새로운 폴더 생성
            fs.ensureDirSync(save_path);

            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };
            const url = 'https://www.slowand.com/category/best/66/';
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            const all_item_info = [];

            // 썸네일 정보와 설명 정보 가져오기
            const all_thumbnail_elem = $('div.thumbnail').slice(0, 20);
            const all_description_elem = $('div.description').slice(0, 20);

            for (let idx = 0; idx < all_thumbnail_elem.length; idx++) {
                const item_info = [];

                // 썸네일 이미지 URL 가져오기
                const thumbnail = $(all_thumbnail_elem[idx]).find('img').attr('src');
                item_info.push(thumbnail);

                // 상품 이름 가져오기
                const product_name_str = $(all_description_elem[idx]).find('strong.name').text().trim();
                const product_name = product_name_str.replace(/[#\/%!~:]/g, '_').replace('%', 'persent');
                item_info.push(product_name);

                // 기본 가격 가져오기
                const default_price_elem = $(all_description_elem[idx]).find('span[style="font-size:12px;color:#555555;text-decoration:line-through;"]').text().trim();
                const default_price = default_price_elem ? default_price_elem.replace('판매가 : ', '').replace('원', '') : '';
                item_info.push(default_price);

                // 할인 가격 가져오기
                const sale_price_elem = $(all_description_elem[idx]).find('span[style="font-size:12px;color:#555555;"]').last().text().trim();
                const sale_price = sale_price_elem.replace('할인판매가 : ', '').replace('원', '');
                item_info.push(sale_price);

                // 상세 URL 가져오기
                const detail_url = 'https://www.slowand.com' + $(all_thumbnail_elem[idx]).find('a').attr('href');
                item_info.push(detail_url);

                // 아이템 정보 리스트에 추가
                all_item_info.push(item_info);

                // 썸네일 이미지 다운로드
                const response = await axios.get(thumbnail, { responseType: 'arraybuffer' });
                fs.writeFileSync(path.join(save_path, `${idx + 1}_${product_name}.jpg`), response.data);
            }

            const csvContent = all_item_info.map(item => item.join(',')).join('');
            fs.writeFileSync(path.join(save_path, '슬로우앤드BESTtable.csv'), csvContent);

            // 크롤링 결과를 JSON으로 변환하여 반환
            res.json({
                "message": "Web crawling completed",
                "data": all_item_info  // 크롤링 결과를 data 키에 할당
            });
        }
    );

    app.route('/crawl/slowand/new').get(
        async (req, res) => {
            const save_path = "competitors/crawling/slowand/new";

            // 이전에 저장된 폴더가 있다면 모두 제거
            if (fs.existsSync(save_path)) {
                fs.removeSync(save_path);
            }

            // 새로운 폴더 생성
            fs.ensureDirSync(save_path);

            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' };
            const url = 'https://www.slowand.com/category/best/122/';
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);
            const all_item_info = [];

            // 썸네일 정보와 설명 정보 가져오기
            const all_thumbnail_elem = $('div.thumbnail').slice(0, 20);
            const all_description_elem = $('div.description').slice(0, 20);

            for (let idx = 0; idx < all_thumbnail_elem.length; idx++) {
                const item_info = [];

                // 썸네일 이미지 URL 가져오기
                const thumbnail = $(all_thumbnail_elem[idx]).find('img').attr('src');
                item_info.push(thumbnail);

                // 상품 이름 가져오기
                const product_name_str = $(all_description_elem[idx]).find('strong.name').text().trim();
                const product_name = product_name_str.replace(/[#\/%!~:]/g, '_').replace('%', 'persent');
                item_info.push(product_name);

                // 기본 가격 가져오기
                const default_price_elem = $(all_description_elem[idx]).find('span[style="font-size:12px;color:#555555;text-decoration:line-through;"]').text().trim();
                const default_price = default_price_elem ? default_price_elem.replace('판매가 : ', '').replace('원', '') : '';
                item_info.push(default_price);

                // 할인 가격 가져오기
                const sale_price_elem = $(all_description_elem[idx]).find('span[style="font-size:12px;color:#555555;"]').last().text().trim();
                const sale_price = sale_price_elem.replace('할인판매가 : ', '').replace('원', '');
                item_info.push(sale_price);

                // 상세 URL 가져오기
                const detail_url = 'https://www.slowand.com' + $(all_thumbnail_elem[idx]).find('a').attr('href');
                item_info.push(detail_url);

                // 아이템 정보 리스트에 추가
                all_item_info.push(item_info);

                // 썸네일 이미지 다운로드
                const response = await axios.get(thumbnail, { responseType: 'arraybuffer' });
                fs.writeFileSync(path.join(save_path, `${idx + 1}_${product_name}.jpg`), response.data);
            }

            const csvContent = all_item_info.map(item => item.join(',')).join('');
            fs.writeFileSync(path.join(save_path, '슬로우앤드NEWtable.csv'), csvContent);

            // 크롤링 결과를 JSON으로 변환하여 반환
            res.json({
                "message": "Web crawling completed",
                "data": all_item_info  // 크롤링 결과를 data 키에 할당
            });
        }
    );

}
