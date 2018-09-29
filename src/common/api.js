//数据接口
// const host = 'https://mainsite-restapi.ele.me';
const host = ''
//图片请求前缀
const imgHost = 'https://fuss10.elemecdn.com';

//首页接口api
//定位
//参数： latitude longitude
const geo = '/bgs/poi/reverse_geo_coding'; 

//天气
//参数： latitude longitude
const weather = '/bgs/weather/current';

//热门词
//参数： latitude longitude
const hotwords = '/shopping/v3/hot_search_words';

//轮播
//参数： latitude longitude  templates[]=main_template
const banner = '/shopping/v2/entries';

//列表
//轮播
//参数： latitude longitude  offset  limit
const list = '/shopping/restaurants';

//详情页
//参数restaurant_id
 const detail = '/shopping/v2/menu';

module.exports = {
	geoApi: host+geo,
	weatherApi: host+weather,
	hotwordsApi: host+hotwords,
	bannerApi: host+banner,
	listApi: host+list
}
