const express = require('express');
const path = require('path');
const cors = require('cors'); // cors 미들웨어 추가

const app = express();

app.use(cors()); // 모든 URL을 허용하도록 cors 미들웨어를 추가
// EJS 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 'views' 폴더의 경로를 설정 (이 경로에 EJS 템플릿 파일을 넣어야 합니다)

var Crawling98doci = require('./routes/98doci.routes');
Crawling98doci(app);

var CrawlingAddmore = require('./routes/addmore.routes');
CrawlingAddmore(app);

var CrawlingBaon = require('./routes/baon.routes');
CrawlingBaon(app);

var CrawlingBeidelli = require('./routes/beidelli.routes');
CrawlingBeidelli(app);

var CrawlingBenito = require('./routes/benito.routes');
CrawlingBenito(app);

var CrawlingGanaesra = require('./routes/ganaesra.routes');
CrawlingGanaesra(app);

var CrawlingRirinco = require('./routes/ririnco.routes');
CrawlingRirinco(app);

var CrawlingSlowand = require('./routes/slowand.routes');
CrawlingSlowand(app);

var CrawlingWonlog = require('./routes/wonlog.routes');
CrawlingWonlog(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3001, () => {
    console.log(`Server is running on port 3000`);
});

module.exports = app;
