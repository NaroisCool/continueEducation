
/* 
 Document   : jquery.bootstrap.dropdown
 Created on : 2013-6-25, 15:16:16
 Author     : shaopei
 Description: dropdown下拉框
 */
(function($) {
    $.fn.dropdown = function(options) {
        var opts = $.extend({}, $.fn.dropdown.defaults, options);
        opts.s1 = '<select class="input-medium" name="';
        opts.s2 = '"><option value="NULL">' + opts.defaultText + '</option>';
        opts.s3 = '<option value="';
        opts.s4 = '">';
        opts.s5 = '</option>';
        opts.s6 = '</select>';
        var $this;
        return this.each(function() {
            $this = $(this);
            if (opts.url === void 0) {
                genDropdown(opts, $this);
            } else {
                $.post(opts.url, {}, function(ret) {
                    if (opts.checkSuccess(ret)) {
                        opts.options = {};
                        var retData = opts.getReturnData === void 0 ? ret.list : opts.getReturnData(ret), itm;
                        for (var i = 0; i < retData.length; i++) {
                            itm = retData[i];
                            opts.options[itm[opts.key]] = itm[opts.value];
                        }
                        genDropdown(opts, $this);
                    }
                });
            }
        });
    };

    function genDropdown(opts, $this) {
        var slt, ops = '', dis;
        for (var val in opts.options) {
            dis = opts.options[val];
            ops += opts.s3 + val + opts.s4 + dis + opts.s5;
        }
        if (opts.name === void 0) {
            opts.name = $this.attr('name');
        }
        slt = opts.s1 + opts.name + opts.s2 + ops + opts.s6;
        $this.replaceWith(slt);
    }

    $.fn.dropdown.defaults = {
        defaultText: '全部',
        checkSuccess: function(ret) {
            return ret.resultCode === '0' || ret.resultCode === 0;
        }
    };
})(jQuery);   