;(function($){
	$.fn.extend({
		Tables: function(options){
			this.options = {
				event: 'click',
				onindex: 1,
				timeout: 0,
				autoplay: 4000,
				list:[],
				arrow: false,
				skin: 'tab-default',
				callback : null
			}

			$.extend(this.options, options);
		
			var _options = this.options;
			var self = $(this);
			var bd_li = self.find('.bd>.item');
			var hd = $('<ul class="hd"></ul>');
			var timer;

			_options.onindex = (_options.onindex > bd_li.length || _options.onindex < 1) ? bd_li.length : _options.onindex;

			for (var i = 0; i < bd_li.length; i++) {
				// 在没有传入列表时 设定默认列表头
				if(_options.list.length == 0 || _options.list.length != bd_li.length){
					_options.list.push('默认Tab'+i);
				}

				if(_options.onindex-1 == i){
					hd.append('<li class="item on">'+_options.list[i]+'</li>');
					bd_li.eq(i).addClass('on')
				}else{
					hd.append('<li class="item">'+_options.list[i]+'</li>');
				}
			}

			options.skin && self.addClass(_options.skin);
			self.prepend(hd);

			var tabHandle = function(ele) {
				ele.siblings('.item').removeClass('on').end().addClass('on');
				bd_li.siblings('.item').removeClass('on').end().eq(ele.index()).addClass('on');
			}

			var delay = function(ele, time){
				time ? setTimeout(function(){tabHandle(ele)}, time) : tabHandle(ele);
			}

			hd.find('.item').on(_options.event, function(){
				delay($(this), _options.timeout);
				if( options.callback ){
					options.callback( self );
				}
			});

			var run = function(idx, action){
				var current = hd.find('li.on');
				var firstItem = hd.find('li.item').eq(0);
				var len = hd.find('li.item').length;
				var lastItem = hd.find('li.item').eq(len-1);
				var index = current.index() + (idx-0);

				// var child = index === 0 ? lastItem : firstItem;
				// var item = index === len ? child : current[action]('li');
				// var bd_i = index === 0 ? len : index;

				// item 记录下一个要 显示的li元素, bd_li 记录下一个要显示的内容框位置。
				var item, bd_i;
				if(index == -1){
					item = lastItem;
					bd_i = len-1;
				}else if(index == len){
					item = firstItem;
					bd_i = 0;
				}else{
					item = current[action]('li');
					bd_i = index;
				}

				// 删除原有on
				current.removeClass('on');

				item.addClass('on');
				bd_li.siblings('.item').removeClass('on').end().eq(bd_i).addClass('on');

			}

			// 自动切换
			function start(){
				// if(!options.autoplay){return;}
				timer = setInterval(function(){
					run(1, 'next');
				}, _options.autoplay );
			}

			if(_options.arrow == true) {
				var btn_prev = $('<span class="prev">＜</span>');
				var btn_next = $('<span class="next">＞</span>');
				self.append(btn_prev);
				self.append(btn_next);

				btn_prev.on('click', function(){
					run(-1, 'prev')
				});
				btn_next.on('click', function(){
					run(1, 'next')
				})

			}

			// 当用户传了 autoplay 值后
			if(!!options.autoplay){
				start();
				self.hover(function(){
					clearInterval(timer);
					timer = undefined;
				}, function(){
					start();
				})
			}

			return this;
		}
	})
})(jQuery);