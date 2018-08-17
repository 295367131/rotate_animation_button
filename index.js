;(function($){
    $.fn.loadBtn = function(obj){
        var config = {
            degFd:60,
            btnItemHeight:140,
            degPy:0,
            type:0,
            time:500,
            time1:0,
            time2:500
        }
        for(var n in obj){
            config[n] = obj[n]
        }
        var _this = $(this);
        var _item = _this.find('.btn-item');
        var _item_span = _item.children('span');
        var degStart = (-((_item.length - 1) * config.degFd) / 2) + config.degPy;
        var setTime = null;
        
        //设置遮罩
        var _bg = $('<div></div>');
        _bg.css({
            'display': 'none',
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'top': '0',
            'left': '0',
            'z-index': '2',
            'background': '#000000',
            'opacity': '0',
            'transition': 'opacity .5s'
        });
        $('body').append(_bg);
        
        
        //按degPy初始化transform
        _item.css({
            'transform-origin': '25px 25px',
            'transform': 'rotate(' + config.degPy + 'deg)'
        });
        _item_span.css({
            'transform': 'rotate(' + (-config.degPy) + 'deg)'
        });
        
        
        //按type设置过渡时长
        if(config.type === 0){
            config.time1 = 0;
            config.time2 = config.time;
            _item.css('transition','all '+ config.time/1000 +'s');
            _item_span.css('transition','all '+ config.time/1000 +'s');
        }else if(config.type === 1){
            config.time1 = config.time / 2;
            config.time1 = config.time / 2;
            _item.css('transition','all '+ config.time/2000 +'s');
            _item_span.css('transition','all '+ config.time/2000 +'s');
        }
        
        
        
        var hideFun = function($this,$item,$span){
            _bg.css('opacity', '0');
            $this.removeClass('on');
            $item.css({
                'transform': 'rotate(' + config.degPy + 'deg)'
            });
            $span.css('transform', 'rotate(' + (-config.degPy) + 'deg)');
            setTime = setTimeout(function(){
                $item.css({
                    'height': '50px',
                    'opacity': '0',
                    'transform-origin': '25px 25px'
                });
                setTime = setTimeout(function() {
                    $item.hide();
                    _bg.hide();
                }, config.time2)
            },config.time1)
        }
        var showFun = function($this,$item,$span,$degStart){
            _bg.show();
            _bg.css('opacity', '.2');
            $this.addClass('on');
            _item.show();
            _item.css({
                'height': config.btnItemHeight + 'px',
                'opacity': '1',
                'transform-origin': '25px ' + (config.btnItemHeight - 25) + 'px'
            });
            setTime = setTimeout(function(){
                for (var i = 0; i < _item.length; i++) {
                    $(_item[i]).css('transform', 'rotate(' + ($degStart + config.degFd * i) + 'deg)');
                    $(_item[i]).children('span').css('transform', 'rotate(' + (-($degStart + config.degFd * i)) + 'deg)');
                }
            },config.time1)
        }
        _this.click(function() {
            clearTimeout(setTime);
            var $this = $(this);
            _item = $this.find('.btn-item');
            _item_span = _item.children('span');
            var degStart = (-((_item.length - 1) * config.degFd) / 2) + config.degPy;
            if ($this.hasClass('on')) {
                hideFun($this,_item,_item_span);
            } else {
                showFun($this,_item,_item_span,degStart);
            }
        })
        _item.click(function(e) {
            e.stopPropagation();
        })
        _item_span.click(function(e) {
            e.stopPropagation();
        })
        _bg.click(function() {
            hideFun(_this,_item,_item_span);
        })
    }
})(jQuery)