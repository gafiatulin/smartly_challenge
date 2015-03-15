#dbApiEndpoint

##Dependencies
- [Koa](https://github.com/koajs/koa)
- [Mariasql](https://github.com/mscdex/node-mariasql)

##API request format
`GET /api/stats?ad_ids=id1,id2,id3&start_time=YYYY-MM-DD&end_time=YYYY-MM-DD`

##Running API endpoint
Test API with data provided in [ad_statistics.tsv (52572 rows)](https://dl.dropboxusercontent.com/u/31019/smartly-challenge/ad_statistics.tsv) and [ad_actions.tsv (103602 rows)](https://dl.dropboxusercontent.com/u/31019/smartly-challenge/ad_actions.tsv)

API endpoint: **http://188.166.20.32:3000**

Example: http://188.166.20.32:3000/api/stats?ad_ids=3,4,5&start_time=2013-09-01&end_time=2013-10-01
