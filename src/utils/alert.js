//  遮罩
var confimbox =
"<div class=\"confirm-box\" style = \"display:none\">"
	+ "<div class=\"shade-back\"></div>"
	+ "<div class=\"shade-div\">"
		+ "<div class=\"shade-content\">"
			+ "<div class=\"content\">失败原因：余额不足，如有疑问请拨打电话：021-25636589</div>"
			+ "<div class=\"bottom\">"
				+ "<div class=\"button-div\">"
					+ "<span class=\"button buttonleft\">取消</span>"
				+ "</div>"
				+ "<div class=\"button-div\">"
					+ "<span class=\"button buttonright\">确定</span>"
				+ "</div>"
			+ "</div>"
		+ "</div>"
	+ "</div>"
+ "</div>";


//遮罩

var alertbox =
"<div class=\"alert-box\" style = \"display:none\">"
	+ "<div class=\"shade-back\"></div>"
	+ "<div class=\"shade-div\">"
		+ "<div class=\"shade-content\">"
			+ "<div class=\"content\">失败原因：余额不足，如有疑问请拨打电话：021-25636589</div>"
			+ "<div class=\"button-div\">"
				+ "<span class=\"button\">确定</span>"
			+ "</div>"
		+ "</div>"
	+ "</div>"
+ "</div>";


//遮罩
var alertimgbox =
"<div class=\"alert-img-box\" style = \"display:none\">"
	+ "<div class=\"shade-back\"></div>"
	+ "<div class=\"shade-div\">"
		+ "<div class=\"shade-content\">"
			+ "<div class=\"shade-innercontent\">"
				+ "<div class=\"title\">查看图片</div>"
				+ "<div class=\"content\"><img style='width:100%'></div>"
				+ "<div class=\"button-div\">"
					+ "<span class=\"button\">关闭</span>"
				+ "</div>"
			+ "</div>"
		+ "</div>"
	+ "</div>"
+ "</div>";
window.boxes = [];//alert、confirm队列，每次执行一个
window.boxing = false;//判断当前是否有alert或者confirm正则执行
/**
 *重新confirm方法
 *options为json对象
 */
window.confirm = function(options) {
	options = $.extend({
		type : 'confirm',
		title : "请确认",//默认标题(标题不超过10个字)
		content : "请确认!",//默认内容 (内容不超过20个字)
		cancelTitle : "取消",//默认取消按钮内容 (取消按钮字符不超过4个字)
		cancelParam : null,//默认取消方法参数
		onCancel : function(data) {},//默认取消方法【 空方法】
		okTitle : "确定",//默认确定按钮内容  (取消按钮字符不超过4个字)
		okParam : null,//默认确定方法参数
		onOk : function(data) {}//默认确定方法【 空方法】
	}, options);

	if (window.boxing) {
		window.boxes.unshift(options);//unshift,pop联合使用，先进先出
		window.boxes[window.boxes.length] = options;
		return;
	}
	window.boxing = true;

	$('body').append(confimbox);

	$(".confirm-box  .title").html(options.title);
	$(".confirm-box  .content").html(options.content);
	$(".confirm-box  .button.buttonleft").html(options.cancelTitle);
	$(".confirm-box  .button.buttonleft").click(function() {
		$(".confirm-box").remove();//删除加载的confirm模块
		options.onCancel(options.cancelParam);//后台执行需要执行命令
		window.boxing = false;//此次执行结束
		if (window.boxes.length > 0) {//判断队列中是否还有没执行alert、confirm
			myop=window.boxes.pop();
			console.log(myop);
			window.callbox(myop);
		}
	});
	$(".confirm-box  .button.buttonright").html(options.okTitle);
	$(".confirm-box  .button.buttonright").click(function() {
		$(".confirm-box").remove();
		options.onOk(options.okParam);
		window.boxing = false;
		if (window.boxes.length > 0) {
			myop=window.boxes.pop();
			console.log(myop);
			window.callbox(myop);
		}
	});
	$(".confirm-box").show();

};

window.callbox = function(options){
	console.log(options);
	switch (options.type){
	case 'confirm':
		window.confirm(options);
	  return;
	case 'alert':
		window.alert(options);
		 return;
	}
};

/**
 *重新alert
 *options可以为字符串、json对象
 */
window.alert = function(options) {
	if (null === options) {
		options = {};
		options.content = "null";
	} else if (typeof options == 'string' || typeof options == 'number'
			|| typeof options == 'boolean' || typeof options == 'undefined') {
		console.info(typeof options );
		var str = options;
		options = {};
		options.content = String(str);
	}

	options = $.extend({
		type : 'alert',
		title : '提示',
		content : "请确认!",//默认内容 (内容不超过20个字)
		cancelParam : null,//默认取消方法参数
		okParam : null,//默认确定方法参数
		onOk : function(data) {}//默认确定方法【 空方法】
	}, options);

	if (window.boxing) {
		window.boxes.unshift(options);//unshift,pop联合使用，先进先出
		return;
	}
	window.boxing = true;
	if(options.title=='提示'){
		$('body').append(alertbox);
	}else{
		$('body').append(alertbox);
	}



	$(".alert-box  .title").html(options.title);
	$(".alert-box  .content").html(options.content);
	$(".alert-box  .button").html(options.okTitle);
	$(".alert-box  .button").click(function() {
		$(".alert-box").remove();//删除加载的confirm模块
		options.onOk(options.cancelParam);//后台执行需要执行命令
		window.boxing = false;//此次执行结束
		if (window.boxes.length > 0) {//判断队列中是否还有没执行alert、confirm0
			var	myop=window.boxes.pop();
			console.log(myop);
			window.callbox(myop);
		}
	});
	$(".alert-box").show();
	var alertboxheight = $(".alert-box .content").height();
	if (26 == alertboxheight) {
		$(".alert-box .content").css("text-align","center");
	}
};

/**
 *重新alert
 *options可以为字符串、json对象
 */
window.alertimg = function(options) {

	options = $.extend({
		type : 'alert',
		title : '查看图片',
		content : "请确认!",//默认内容 (内容不超过20个字)
		cancelParam : null,//默认取消方法参数
		okParam : null,//默认确定方法参数
		onOk : function(data) {}//默认确定方法【 空方法】
	}, options);

	$('body').append(alertimgbox);
	$(".alert-img-box  .title").html(options.title);
	$(".alert-img-box  .content img").attr("src",options.content);
	$(".alert-img-box  .button").html(options.okTitle);
	$(".alert-img-box  .button").click(function() {
		$(".alert-img-box").remove();//删除加载的confirm模块
		options.onOk(options.cancelParam);//后台执行需要执行命令
	});

	$(".alert-img-box").show();
};
/**
*toast方法，修改window.Toast调用，保持代码的一致行
*@调用方法举例：toast({context:$('body'),message:'删除成功'});
*不用考虑数据类型
*/
function toast(config){
	if (null === config) {
		new Toast({context:$('body'),message:config}).show();
	} else if (typeof config == 'string' || typeof config == 'number'
			|| typeof config == 'boolean' || typeof config == 'undefined') {
		new Toast({context:$('body'),message:config}).show();
	}else{
		new Toast(config).show();
	}
}
/**
 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据
 * @param config
 * @time 2016/11/15
 * @调用方法举例：new Toast({context:$('body'),message:'删除成功'}).show();
 * @return
 */
window.Toast = function(config){
	this.context = config.context==null?$('body'):config.context;	//上下文
	this.message = config.message;	//显示内容
	this.time = config.time==null?3000:config.time;	//持续时间
	this.left = config.left;	//距容器左边的距离
	this.top = config.top;	//距容器上方的距离
	this.init();
 };
var msgEntity;
window.Toast.prototype = {
	//初始化显示的位置内容等
	init : function(){
		$("#toastMessage").remove();
		 //设置消息体
		var msgDIV = new Array();
		msgDIV.push('<div id="toastMessage">');
		msgDIV.push('<span>'+this.message+'</span>');
		msgDIV.push('</div>');
		msgEntity = $(msgDIV.join('')).appendTo(this.context);
		//设置消息样式
		var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2-18: this.left;
//		var top = this.top == null ? '400px' : this.top;
		var top = document.body.clientHeight-150; //页面可见高度-150
		top=$(window).height()-150;
		msgEntity.css({position:'fixed',top:top,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'16px',padding:'10px',margin:'10px','border-radius':'10px'});
		msgEntity.hide();
	},
	//显示动画
	show :function(){
		msgEntity.fadeIn(this.time/2);
		msgEntity.fadeOut(this.time/2);
	}
};
