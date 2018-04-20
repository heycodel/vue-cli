var systemtype = null;

function getSystemType() {
	if(null == systemtype) {
		var u = navigator.userAgent;
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			systemtype = 'android'
		} else if(u.indexOf('iPhone') > -1) {
			systemtype = 'ios'
		} else if(u.indexOf('Windows Phone') > -1) {
			systemtype = 'wp'
		}
	}
	return systemtype
}

function getRequestParams() {
	console.log('getRequestParams-url↓');
	console.log(url);
	var theRequest = {};
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		if(str.indexOf("&") != -1) {
			strs = str.split("&");
			for(var i = 0; i < strs.length; i += 1) {
				theRequest[strs[i].split("=")[0]] = unescape(decodeURI(strs[i].split("=")[1]))
			}
		} else {
			theRequest[str.split("=")[0]] = unescape(decodeURI(str.split("=")[1]))
		}
	}
	return theRequest
}

function getCurrPos(opts) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var coords = position.coords;
			if(opts.callback) {
				opts.callback.call(this, coords.longitude, coords.latitude)
			}
		}, function showError(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					alert("您拒绝了定位服务!");
					break;
				case error.POSITION_UNAVAILABLE:
					alert("请开启GPS定位服务或网络定位服务");
					break;
				case error.TIMEOUT:
					alert("请求超时");
					break;
				case error.UNKNOWN_ERROR:
					alert("未知异常");
					break
			}
		}, {
			timeout: 10000
		})
	} else {
		alert('您的浏览器不支持定位服务')
	}
}

function setCookie(name, value) {
	var Days = 60;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/"
}

function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for(var i = 0; i < arrStr.length; i += 1) {
		var temp = arrStr[i].split("=");
		if(temp[0] == objName) {
			return decodeURIComponent(temp[1])
		}
	}
}

function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i += 1) {
		c = str.charCodeAt(i);
		if((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i)
		} else if(c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
		}
	}
	return out
}

function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while(i < len) {
		c = str.charCodeAt(i++);
		switch(c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
				break
		}
	}
	return out
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	
	var r = window.location.search.substr(1).match(reg);
	console.log("r  ↓");
	console.log(r);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
};





function formatDate(date, format) { 
	var v = ""; 
	if (typeof date == "string" || typeof date != "object") { 
	  return; 
	} 
	var year  = date.getFullYear(); 
	var month  = date.getMonth()+1; 
	var day   = date.getDate(); 
	var hour  = date.getHours(); 
	var minute = date.getMinutes(); 
	var second = date.getSeconds(); 
	var weekDay = date.getDay(); 
	var ms   = date.getMilliseconds(); 
	var weekDayString = ""; 
	  
	if (weekDay == 1) { 
	  weekDayString = "星期一"; 
	} else if (weekDay == 2) { 
	  weekDayString = "星期二"; 
	} else if (weekDay == 3) { 
	  weekDayString = "星期三"; 
	} else if (weekDay == 4) { 
	  weekDayString = "星期四"; 
	} else if (weekDay == 5) { 
	  weekDayString = "星期五"; 
	} else if (weekDay == 6) { 
	  weekDayString = "星期六"; 
	} else if (weekDay == 7) { 
	  weekDayString = "星期日"; 
	} 

	v = format; 
	//Year 
	v = v.replace(/yyyy/g, year); 
	v = v.replace(/YYYY/g, year); 
	v = v.replace(/yy/g, (year+"").substring(2,4)); 
	v = v.replace(/YY/g, (year+"").substring(2,4)); 

	//Month 
	var monthStr = ("0"+month); 
	v = v.replace(/MM/g, monthStr.substring(monthStr.length-2)); 

	//Day 
	var dayStr = ("0"+day); 
	v = v.replace(/dd/g, dayStr.substring(dayStr.length-2)); 

	//hour 
	var hourStr = ("0"+hour); 
	v = v.replace(/HH/g, hourStr.substring(hourStr.length-2)); 
	v = v.replace(/hh/g, hourStr.substring(hourStr.length-2)); 

	//minute 
	var minuteStr = ("0"+minute); 
	v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2)); 

	//Millisecond 
	v = v.replace(/sss/g, ms); 
	v = v.replace(/SSS/g, ms); 
	  
	//second 
	var secondStr = ("0"+second); 
	v = v.replace(/ss/g, secondStr.substring(secondStr.length-2)); 
	v = v.replace(/SS/g, secondStr.substring(secondStr.length-2)); 
	  
	//weekDay 
	v = v.replace(/E/g, weekDayString); 
	return v; 
  } 



  function getNowFormatDate(date) {
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + strHours + seperator2 + strMinutes
        + seperator2 + strSeconds;
    return currentdate;
}










export default {
	getCookie: getCookie,
	setCookie: setCookie,
	getSystemType: getSystemType,
	getUrlParam:getUrlParam,
	formatDate:formatDate,
	getRequestParams:getRequestParams,
	getNowFormatDate:getNowFormatDate
}