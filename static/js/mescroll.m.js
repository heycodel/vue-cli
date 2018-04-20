/*!
 * mescroll -- 精致的下拉刷新和上拉加载js框架  ( a great JS framework for pull-refresh and pull-up-loading )
 * version 1.3.2
 * 2018-01-01
 * 
 * 您如果在vue,angular等环境中,因作用域的问题未能正常引入或初始化Mescroll对象,则可引用mescroll.m.js;
 * mescroll.m.js去掉了mescroll.min.js套的一层模块规范的代码
 * 因为没有闭包限制作用域,所以能解决某些情况下引用mescroll.min.js报'Mescroll' undefined的问题
 * 具体请参考: https://github.com/mescroll/mescroll/issues/56
 */
function MeScroll(a, d) {
	var f = this;
	f.version = "1.3.2";
	f.isScrollBody = (!a || a == "body");
	f.scrollDom = f.isScrollBody ? document.body : f.getDomById(a);
	if(!f.scrollDom) {
		return
	}
	f.options = d || {};
	var c = navigator.userAgent;
	var b = !!c.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var g = typeof window.orientation == "undefined";
	var e = c.indexOf("Android") > -1 || c.indexOf("Adr") > -1;
	f.os = {
		ios: b,
		pc: g,
		android: e
	};
	f.isDownScrolling = false;
	f.isUpScrolling = false;
	f.initDownScroll();
	f.initUpScroll();
	setTimeout(function() {
		if(f.optDown.use && f.optDown.auto) {
			if(f.optDown.autoShowLoading) {
				f.triggerDownScroll()
			} else {
				f.optDown.callback && f.optDown.callback(f)
			}
		}
		f.optUp.use && f.optUp.auto && !f.isUpAutoLoad && f.triggerUpScroll()
	}, 30)
}
MeScroll.prototype.extendDownScroll = function(a) {
	MeScroll.extend(a, {
		use: true,
		auto: true,
		autoShowLoading: false,
		isLock: false,
		isBoth: false,
		offset: 80,
		outOffsetRate: 0.2,
		bottomOffset: 20,
		minAngle: 45,
		hardwareClass: "mescroll-hardware",
		warpId: null,
		warpClass: "mescroll-downwarp",
		resetClass: "mescroll-downwarp-reset",
		htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',
		inited: function(c, b) {
			c.downTipDom = b.getElementsByClassName("downwarp-tip")[0];
			c.downProgressDom = b.getElementsByClassName("downwarp-progress")[0]
		},
		inOffset: function(b) {
			if(b.downTipDom) {
				b.downTipDom.innerHTML = "下拉刷新"
			}
			if(b.downProgressDom) {
				b.downProgressDom.classList.remove("mescroll-rotate")
			}
		},
		outOffset: function(b) {
			if(b.downTipDom) {
				b.downTipDom.innerHTML = "释放更新"
			}
		},
		onMoving: function(c, e, b) {
			if(c.downProgressDom) {
				var d = 360 * e;
				c.downProgressDom.style.webkitTransform = "rotate(" + d + "deg)";
				c.downProgressDom.style.transform = "rotate(" + d + "deg)"
			}
		},
		beforeLoading: function(c, b) {
			return false
		},
		showLoading: function(b) {
			if(b.downTipDom) {
				b.downTipDom.innerHTML = "加载中 ..."
			}
			if(b.downProgressDom) {
				b.downProgressDom.classList.add("mescroll-rotate")
			}
		},
		callback: function(b) {
			b.resetUpScroll()
		}
	})
};
MeScroll.prototype.extendUpScroll = function(a) {
	var b = this.os.pc;
	MeScroll.extend(a, {
		use: true,
		auto: true,
		isLock: false,
		isBoth: false,
		isBounce: true,
		callback: null,
		page: {
			num: 0,
			size: 10,
			time: null
		},
		noMoreSize: 5,
		offset: 100,
		toTop: {
			warpId: null,
			src: null,
			html: null,
			offset: 1000,
			warpClass: "mescroll-totop",
			showClass: "mescroll-fade-in",
			hideClass: "mescroll-fade-out",
			duration: 300,
			supportTap: false
		},
		loadFull: {
			use: false,
			delay: 500
		},
		empty: {
			warpId: null,
			icon: null,
			tip: "暂无相关数据~",
			btntext: "",
			btnClick: null,
			supportTap: false
		},
		clearId: null,
		clearEmptyId: null,
		hardwareClass: "mescroll-hardware",
		warpId: null,
		warpClass: "mescroll-upwarp",
		htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
		htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
		inited: function(c, d) {},
		showLoading: function(c, d) {
			d.innerHTML = c.optUp.htmlLoading
		},
		showNoMore: function(c, d) {
			d.innerHTML = c.optUp.htmlNodata
		},
		onScroll: null,
		scrollbar: {
			use: b,
			barClass: "mescroll-bar"
		}
	})
};
MeScroll.extend = function(b, a) {
	if(!b) {
		return a
	}
	for(var key in a) {
		if(b[key] == null) {
			b[key] = a[key]
		} else {
			if(typeof b[key] == "object") {
				MeScroll.extend(b[key], a[key])
			}
		}
	}
	return b
};
MeScroll.prototype.initDownScroll = function() {
	var b = this;
	b.optDown = b.options.down || {};
	b.extendDownScroll(b.optDown);
	b.touchstartEvent = function(c) {
		if(b.isScrollTo) {
			c.preventDefault()
		}
		b.startPoint = b.getPoint(c);
		b.lastPoint = b.startPoint;
		b.maxTouchmoveY = b.getBodyHeight() - b.optDown.bottomOffset;
		b.inTouchend = false;
		if(b.os.pc && b.getScrollTop() <= 0) {
			b.scrollDom.addEventListener("mousemove", b.touchmoveEvent);
			document.ondragstart = function() {
				return false
			}
		}
	};
	b.scrollDom.addEventListener("mousedown", b.touchstartEvent);
	b.scrollDom.addEventListener("touchstart", b.touchstartEvent);
	b.touchmoveEvent = function(k) {
		var c = b.getScrollTop();
		var g = b.getPoint(k);
		var d = g.y - b.startPoint.y;
		if(d > 0) {
			if(c <= 0) {
				if(k.cancelable && !k.defaultPrevented) {
					k.preventDefault()
				}
				if(b.optDown.use && !b.inTouchend && !b.isDownScrolling && !b.optDown.isLock && (!b.isUpScrolling || (b.isUpScrolling && b.optUp.isBoth))) {
					var n = Math.abs(b.lastPoint.x - g.x);
					var m = Math.abs(b.lastPoint.y - g.y);
					var l = Math.sqrt(n * n + m * m);
					if(l != 0) {
						var f = Math.asin(m / l) / Math.PI * 180;
						if(f < b.optDown.minAngle) {
							return
						}
					}
					if(b.maxTouchmoveY > 0 && g.y >= b.maxTouchmoveY) {
						b.inTouchend = true;
						b.touchendEvent();
						return
					}
					var o = g.y - b.lastPoint.y;
					if(!b.downHight) {
						b.downHight = 0
					}
					if(b.downHight < b.optDown.offset) {
						if(b.movetype != 1) {
							b.movetype = 1;
							b.optDown.inOffset(b);
							b.downwarp.classList.remove(b.optDown.resetClass);
							b.scrollDom.classList.add(b.optDown.hardwareClass);
							b.scrollDom.style.webkitOverflowScrolling = "auto";
							b.isMoveDown = true
						}
						b.downHight += o
					} else {
						if(b.movetype != 2) {
							b.movetype = 2;
							b.optDown.outOffset(b);
							b.downwarp.classList.remove(b.optDown.resetClass);
							b.scrollDom.classList.add(b.optDown.hardwareClass);
							b.scrollDom.style.webkitOverflowScrolling = "auto";
							b.isMoveDown = true
						}
						if(o > 0) {
							b.downHight += o * b.optDown.outOffsetRate
						} else {
							b.downHight += o
						}
					}
					b.downwarp.style.height = b.downHight + "px";
					var j = b.downHight / b.optDown.offset;
					b.optDown.onMoving(b, j, b.downHight)
				}
			}
		} else {
			if(d < 0) {
				var p = b.getScrollHeight();
				var i = b.getClientHeight();
				var h = p - i - c;
				if(!b.optUp.isBounce && k.cancelable && !k.defaultPrevented && h <= 0) {
					k.preventDefault()
				}
				if(b.optUp.use && !b.optUp.isLock && b.optUp.hasNext && !b.isUpScrolling && (!b.isDownScrolling || (b.isDownScrolling && b.optDown.isBoth)) && (i + b.optUp.offset >= p || h <= 0)) {
					b.triggerUpScroll()
				}
			}
		}
		b.lastPoint = g
	};
	b.scrollDom.addEventListener("touchmove", b.touchmoveEvent);
	b.touchendEvent = function() {
		if(b.optDown.use && b.isMoveDown) {
			if(b.downHight >= b.optDown.offset) {
				b.triggerDownScroll()
			} else {
				b.downwarp.classList.add(b.optDown.resetClass);
				b.downHight = 0;
				b.downwarp.style.height = 0
			}
			b.scrollDom.style.webkitOverflowScrolling = "touch";
			b.scrollDom.classList.remove(b.optDown.hardwareClass);
			b.movetype = 0;
			b.isMoveDown = false
		}
		if(b.os.pc) {
			b.scrollDom.removeEventListener("mousemove", b.touchmoveEvent);
			document.ondragstart = function() {
				return true
			}
		}
	};
	b.scrollDom.addEventListener("mouseup", b.touchendEvent);
	b.scrollDom.addEventListener("mouseleave", b.touchendEvent);
	b.scrollDom.addEventListener("touchend", b.touchendEvent);
	b.scrollDom.addEventListener("touchcancel", b.touchendEvent);
	if(b.optDown.use) {
		b.downwarp = document.createElement("div");
		b.downwarp.className = b.optDown.warpClass;
		b.downwarp.innerHTML = '<div class="downwarp-content">' + b.optDown.htmlContent + "</div>";
		var a = b.optDown.warpId ? b.getDomById(b.optDown.warpId) : b.scrollDom;
		if(b.optDown.warpId && a) {
			a.appendChild(b.downwarp)
		} else {
			if(!a) {
				a = b.scrollDom
			}
			a.insertBefore(b.downwarp, b.scrollDom.firstChild)
		}
		setTimeout(function() {
			b.optDown.inited(b, b.downwarp)
		}, 0)
	}
};
MeScroll.prototype.getPoint = function(a) {
	return {
		x: a.touches ? a.touches[0].pageX : a.clientX,
		y: a.touches ? a.touches[0].pageY : a.clientY
	}
};
MeScroll.prototype.triggerDownScroll = function() {
	if(!this.optDown.beforeLoading(this, this.downwarp)) {
		this.showDownScroll();
		this.optDown.callback && this.optDown.callback(this)
	}
};
MeScroll.prototype.showDownScroll = function() {
	this.isDownScrolling = true;
	this.optDown.showLoading(this);
	this.downHight = this.optDown.offset;
	this.downwarp.classList.add(this.optDown.resetClass);
	this.downwarp.style.height = this.optDown.offset + "px"
};
MeScroll.prototype.endDownScroll = function() {
	this.downHight = 0;
	this.downwarp.style.height = 0;
	this.isDownScrolling = false;
	if(this.downProgressDom) {
		this.downProgressDom.classList.remove("mescroll-rotate")
	}
};
MeScroll.prototype.lockDownScroll = function(a) {
	if(a == null) {
		a = true
	}
	this.optDown.isLock = a
};
MeScroll.prototype.initUpScroll = function() {
	var b = this;
	b.optUp = b.options.up || {
		use: false
	};
	b.extendUpScroll(b.optUp);
	if(b.optUp.scrollbar.use) {
		b.scrollDom.classList.add(b.optUp.scrollbar.barClass)
	}
	if(!b.optUp.isBounce) {
		b.setBounce(false)
	}
	if(b.optUp.use == false) {
		return
	}
	b.optUp.hasNext = true;
	b.upwarp = document.createElement("div");
	b.upwarp.className = b.optUp.warpClass;
	var a;
	if(b.optUp.warpId) {
		a = b.getDomById(b.optUp.warpId)
	}
	if(!a) {
		a = b.scrollDom
	}
	a.appendChild(b.upwarp);
	b.preScrollY = 0;
	b.scrollEvent = function() {
		var e = b.getScrollTop();
		var d = e - b.preScrollY > 0;
		b.preScrollY = e;
		if(!b.isUpScrolling && (!b.isDownScrolling || (b.isDownScrolling && b.optDown.isBoth))) {
			if(!b.optUp.isLock && b.optUp.hasNext) {
				var c = b.getScrollHeight() - b.getClientHeight() - e;
				if(c <= b.optUp.offset && d) {
					b.triggerUpScroll()
				}
			}
			var f = b.optUp.toTop;
			if(f.src || f.html) {
				if(e >= f.offset) {
					b.showTopBtn()
				} else {
					b.hideTopBtn()
				}
			}
		}
		b.optUp.onScroll && b.optUp.onScroll(b, e, d)
	};
	if(b.isScrollBody) {
		window.addEventListener("scroll", b.scrollEvent)
	} else {
		b.scrollDom.addEventListener("scroll", b.scrollEvent)
	}
	setTimeout(function() {
		b.optUp.inited(b, b.upwarp)
	}, 0)
};
MeScroll.prototype.setBounce = function(a) {
	if(this.isScrollBody || !this.os.ios) {
		return
	}
	if(a == false) {
		this.optUp.isBounce = false;
		window.addEventListener("touchmove", this.bounceTouchmove)
	} else {
		this.optUp.isBounce = true;
		window.removeEventListener("touchmove", this.bounceTouchmove)
	}
};
MeScroll.prototype.bounceTouchmove = function(g) {
	var i = this;
	var c = g.target;
	var d = true;
	while(c !== document.body && c !== document) {
		var l = c.classList;
		if(l) {
			if(l.contains("mescroll") || l.contains("mescroll-touch")) {
				d = false;
				break
			} else {
				if(l.contains("mescroll-touch-x") || l.contains("mescroll-touch-y")) {
					var b = g.touches ? g.touches[0].pageX : g.clientX;
					var a = g.touches ? g.touches[0].pageY : g.clientY;
					if(!i.preWinX) {
						i.preWinX = b
					}
					if(!i.preWinY) {
						i.preWinY = a
					}
					var k = Math.abs(i.preWinX - b);
					var j = Math.abs(i.preWinY - a);
					var h = Math.sqrt(k * k + j * j);
					i.preWinX = b;
					i.preWinY = a;
					if(h != 0) {
						var f = Math.asin(j / h) / Math.PI * 180;
						if((f <= 45 && l.contains("mescroll-touch-x")) || (f > 45 && l.contains("mescroll-touch-y"))) {
							d = false;
							break
						}
					}
				}
			}
		}
		c = c.parentNode
	}
	if(d && g.cancelable && !g.defaultPrevented) {
		g.preventDefault()
	}
};
MeScroll.prototype.triggerUpScroll = function() {
	if(!this.isUpScrolling) {
		this.showUpScroll();
		this.optUp.page.num++;
		this.isUpAutoLoad = true;
		this.optUp.callback && this.optUp.callback(this.optUp.page, this)
	}
};
MeScroll.prototype.showUpScroll = function() {
	this.isUpScrolling = true;
	this.upwarp.classList.add(this.optUp.hardwareClass);
	this.upwarp.style.visibility = "visible";
	this.optUp.showLoading(this, this.upwarp)
};
MeScroll.prototype.showNoMore = function() {
	this.upwarp.style.visibility = "visible";
	this.optUp.hasNext = false;
	this.optUp.showNoMore(this, this.upwarp)
};
MeScroll.prototype.hideUpScroll = function() {
	this.upwarp.style.visibility = "hidden";
	this.upwarp.classList.remove(this.optUp.hardwareClass);
	var a = this.upwarp.getElementsByClassName("upwarp-progress")[0];
	if(a) {
		a.classList.remove("mescroll-rotate")
	}
};
MeScroll.prototype.endUpScroll = function(a) {
	if(a != null) {
		if(a) {
			this.showNoMore()
		} else {
			this.hideUpScroll()
		}
	}
	this.isUpScrolling = false
};
MeScroll.prototype.resetUpScroll = function(b) {
	if(this.optUp && this.optUp.use) {
		var a = this.optUp.page;
		this.prePageNum = a.num;
		this.prePageTime = a.time;
		a.num = 1;
		a.time = null;
		if(!this.isDownScrolling && b != false) {
			if(b == null) {
				this.removeEmpty();
				this.clearDataList();
				this.showUpScroll()
			} else {
				this.showDownScroll()
			}
		}
		this.isUpAutoLoad = true;
		this.optUp.callback && this.optUp.callback(a, this)
	}
};
MeScroll.prototype.setPageNum = function(a) {
	this.optUp.page.num = a - 1
};
MeScroll.prototype.setPageSize = function(a) {
	this.optUp.page.size = a
};
MeScroll.prototype.clearDataList = function() {
	var b = this.optUp.clearId || this.optUp.clearEmptyId;
	if(b) {
		var a = this.getDomById(b);
		if(a) {
			a.innerHTML = ""
		}
	}
};
MeScroll.prototype.endByPage = function(b, d, c) {
	var a;
	if(this.optUp.use && d != null) {
		a = this.optUp.page.num < d
	}
	this.endSuccess(b, a, c)
};
MeScroll.prototype.endBySize = function(c, b, d) {
	var a;
	if(this.optUp.use && b != null) {
		var e = (this.optUp.page.num - 1) * this.optUp.page.size + c;
		a = e < b
	}
	this.endSuccess(c, a, d)
};
MeScroll.prototype.endSuccess = function(c, a, e) {
	if(this.isDownScrolling) {
		this.endDownScroll()
	}
	if(this.optUp.use) {
		var d;
		if(c != null) {
			var f = this.optUp.page.num;
			var b = this.optUp.page.size;
			if(f == 1) {
				this.clearDataList();
				if(e) {
					this.optUp.page.time = e
				}
			}
			if(c < b || a == false) {
				this.optUp.hasNext = false;
				if(c == 0 && f == 1) {
					d = false;
					this.showEmpty()
				} else {
					var g = (f - 1) * b + c;
					if(g < this.optUp.noMoreSize) {
						d = false
					} else {
						d = true
					}
					this.removeEmpty()
				}
			} else {
				d = false;
				this.optUp.hasNext = true;
				this.removeEmpty()
			}
		}
		this.endUpScroll(d);
		this.loadFull()
	}
};
MeScroll.prototype.endErr = function() {
	if(this.isDownScrolling) {
		var a = this.optUp.page;
		if(a && this.prePageNum) {
			a.num = this.prePageNum;
			a.time = this.prePageTime
		}
		this.endDownScroll()
	}
	if(this.isUpScrolling) {
		this.optUp.page.num--;
		this.endUpScroll(false)
	}
};
MeScroll.prototype.loadFull = function() {
	var a = this;
	if(a.optUp.loadFull.use && !a.optUp.isLock && a.optUp.hasNext && a.getScrollHeight() <= a.getClientHeight()) {
		setTimeout(function() {
			if(a.getScrollHeight() <= a.getClientHeight()) {
				a.triggerUpScroll()
			}
		}, a.optUp.loadFull.delay)
	}
};
MeScroll.prototype.lockUpScroll = function(a) {
	if(a == null) {
		a = true
	}
	this.optUp.isLock = a
};
MeScroll.prototype.showEmpty = function() {
	var b = this;
	var c = b.optUp.empty;
	var a = c.warpId || b.optUp.clearEmptyId;
	if(a == null) {
		return
	}
	var f = b.getDomById(a);
	if(f) {
		b.removeEmpty();
		var e = "";
		if(c.icon) {
			e += '<img class="empty-icon" src="' + c.icon + '"/>'
		}
		if(c.tip) {
			e += '<p class="empty-tip">' + c.tip + "</p>"
		}
		if(c.btntext) {
			e += '<p class="empty-btn">' + c.btntext + "</p>"
		}
		b.emptyDom = document.createElement("div");
		b.emptyDom.className = "mescroll-empty";
		b.emptyDom.innerHTML = e;
		f.appendChild(b.emptyDom);
		if(c.btnClick) {
			var d = b.emptyDom.getElementsByClassName("empty-btn")[0];
			if(c.supportTap) {
				d.addEventListener("tap", function(g) {
					g.stopPropagation();
					g.preventDefault();
					c.btnClick()
				})
			} else {
				d.onclick = function() {
					c.btnClick()
				}
			}
		}
	}
};
MeScroll.prototype.removeEmpty = function() {
	this.removeChild(this.emptyDom)
};
MeScroll.prototype.showTopBtn = function() {
	if(!this.topBtnShow) {
		this.topBtnShow = true;
		var b = this;
		var c = b.optUp.toTop;
		if(b.toTopBtn == null) {
			if(c.html) {
				b.toTopBtn = document.createElement("div");
				b.toTopBtn.innerHTML = c.html
			} else {
				b.toTopBtn = document.createElement("img");
				b.toTopBtn.src = c.src
			}
			b.toTopBtn.className = c.warpClass;
			if(c.supportTap) {
				b.toTopBtn.addEventListener("tap", function(d) {
					d.stopPropagation();
					d.preventDefault();
					b.scrollTo(0, b.optUp.toTop.duration)
				})
			} else {
				b.toTopBtn.onclick = function() {
					b.scrollTo(0, b.optUp.toTop.duration)
				}
			}
			var a;
			if(c.warpId) {
				a = b.getDomById(c.warpId)
			}
			if(!a) {
				a = document.body
			}
			a.appendChild(b.toTopBtn)
		}
		b.toTopBtn.classList.remove(c.hideClass);
		b.toTopBtn.classList.add(c.showClass)
	}
};
MeScroll.prototype.hideTopBtn = function() {
	if(this.topBtnShow && this.toTopBtn) {
		this.topBtnShow = false;
		this.toTopBtn.classList.remove(this.optUp.toTop.showClass);
		this.toTopBtn.classList.add(this.optUp.toTop.hideClass)
	}
};
MeScroll.prototype.scrollTo = function(f, b) {
	var c = this;
	var e = c.getScrollTop();
	var a = f;
	if(a > 0) {
		var d = c.getScrollHeight() - c.getClientHeight();
		if(a > d) {
			a = d
		}
	} else {
		a = 0
	}
	c.isScrollTo = true;
	c.getStep(e, a, function(g) {
		c.setScrollTop(g);
		if(g == a) {
			c.isScrollTo = false
		}
	}, b)
};
MeScroll.prototype.getStep = function(e, c, j, k, g) {
	var h = c - e;
	if(k == 0 || h == 0) {
		j && j(c);
		return
	}
	k = k || 300;
	g = g || 30;
	var f = k / g;
	var b = h / f;
	var d = 0;
	var a = window.setInterval(function() {
		if(d < f - 1) {
			e += b;
			j && j(e, a);
			d++
		} else {
			j && j(c, a);
			window.clearInterval(a)
		}
	}, g)
};
MeScroll.prototype.getScrollHeight = function() {
	return this.scrollDom.scrollHeight
};
MeScroll.prototype.getClientHeight = function() {
	if(this.isScrollBody && document.compatMode == "CSS1Compat") {
		return document.documentElement.clientHeight
	} else {
		return this.scrollDom.clientHeight
	}
};
MeScroll.prototype.getBodyHeight = function() {
	return document.body.clientHeight || document.documentElement.clientHeight
};
MeScroll.prototype.getScrollTop = function() {
	if(this.isScrollBody) {
		return document.documentElement.scrollTop || document.body.scrollTop
	} else {
		return this.scrollDom.scrollTop
	}
};
MeScroll.prototype.getToBottom = function() {
	return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop()
};
MeScroll.prototype.setScrollTop = function(a) {
	if(this.isScrollBody) {
		document.documentElement.scrollTop = a;
		document.body.scrollTop = a
	} else {
		this.scrollDom.scrollTop = a
	}
};
MeScroll.prototype.getDomById = function(b) {
	var a;
	if(b) {
		a = document.getElementById(b)
	}
	if(!a) {
		console.error('the element with id as "' + b + '" can not be found: document.getElementById("' + b + '")==null')
	}
	return a
};
MeScroll.prototype.removeChild = function(b) {
	if(b) {
		var a = b.parentNode;
		a && a.removeChild(b);
		b = null
	}
};
MeScroll.prototype.destroy = function() {
	var a = this;
	a.scrollDom.removeEventListener("touchstart", a.touchstartEvent);
	a.scrollDom.removeEventListener("touchmove", a.touchmoveEvent);
	a.scrollDom.removeEventListener("touchend", a.touchendEvent);
	a.scrollDom.removeEventListener("touchcancel", a.touchendEvent);
	a.scrollDom.removeEventListener("mousedown", a.touchstartEvent);
	a.scrollDom.removeEventListener("mousemove", a.touchmoveEvent);
	a.scrollDom.removeEventListener("mouseup", a.touchendEvent);
	a.scrollDom.removeEventListener("mouseleave", a.touchendEvent);
	a.removeChild(a.downwarp);
	if(a.isScrollBody) {
		window.removeEventListener("scroll", a.scrollEvent)
	} else {
		a.scrollDom.removeEventListener("scroll", a.scrollEvent)
	}
	a.removeChild(a.upwarp);
	a.removeChild(a.toTopBtn);
	a.setBounce(true)
};
window.MeScroll = MeScroll;