;(function($){
	$.fn.extend({
		Tables: function(options){

			this.options = {
				event: 'click',
				onindex: 1,
				timeout: 0,
				autoplay: 0,
				list:[]
			}

			//如果用户有传值 并且传的是{}或new obj的东西
			if(options && $.isPlainObject(options)){
				$.extend(this.options, options);
			}else{
				//没有传值的时候 设置一个状态
				this.isoptions = true;
			}

			var _options = this.options;
			var self = $(this);
			var bd_li = self.find('.bd>.item');
			var hd = $('<ul class="hd"></ul>');
			var timer;

			_options.onindex = (_options.onindex > bd_li.length || _options.onindex < 1) ? bd_li.length : _options.onindex;

			for (let i = 0; i < bd_li.length; i++) {
				// 在没有传入列表时 设定默认列表头
				if(_options.list.length == 0 || _options.list.length != bd_li.length){
					_options.list.push('默认Tab'+i);
				}
				if(_options.onindex-1 == i){
					hd.append('<li class="item on">'+_options.list[i]+'</li>');
					bd_li.eq(hd.find('.item').index()).addClass('on')
				}
				else{
					hd.append('<li class="item">'+_options.list[i]+'</li>');
				}
			}

			self.prepend(hd);

			var tabHandle = function(ele){
				ele.siblings('.item').removeClass('on').end().addClass('on');
				bd_li.siblings('.item').removeClass('on').end().eq(ele.index()).addClass('on');
			}

			var delay = function(ele, time){
				time ? setTimeout(function(){tabHandle(ele)}, time) : tabHandle(ele);
			}

			hd.find('.item').on(_options.event, function(){
				delay($(this), _options.timeout);
			});

			var autoPlay = function(){
				var current = hd.find('li.on');
				var firstItem = hd.find('li.item').eq(0);
				var len = hd.find('li.item').length;
				var index = current.index() + 1;
				var item = index === len ? firstItem : current.next('li');
				var i = index === len ? 0 : index;

				current.removeClass('on');
				item.addClass('on');

				bd_li.siblings('.item').removeClass('on').end().eq(i).addClass('on');

			}

			// 自动切换
			var start = function(){
				timer = setInterval( autoPlay, _options.autoplay );
			}

			// 当用户传了 autoplay 值后
			if(!!options.autoplay){
				start()
				self.hover(function(){
					clearInterval(timer)
				}, function(){
					start()
				})
			}

			
			return this;
		}
	})
})(jQuery);