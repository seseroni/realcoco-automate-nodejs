const express = require('express');

const app = express();

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

app.listen(3000, () => {
    console.log(`Server is running on port`);
});

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

module.exports = app;
