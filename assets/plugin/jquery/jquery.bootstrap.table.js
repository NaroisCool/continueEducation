/* 
 Document   : jquery.bootstrap.table
 Created on : 2013-6-25, 10:56:37
 Author     : shaopei
 Description: 带工具条的表格
 */

(function($) {
    $.fn.table = function(options) {
        var opts = $.extend({}, $.fn.table.defaults, options);
        var t0_0 = '<div name="toolBar" class="btn-group toolBar">',
                t0_add = '<button class="btn btn-small" name="add"><i class="icon-btnadd" style="margin-top: 1px;"></i> 增加</button>',
                t0_view = '<button class="btn btn-small" name="view" disabled><i class="icon-btnview" style="margin-top: 1px;"></i> 明细</button>',
                t0_edit = '<button class="btn btn-small" name="edit" disabled><i class="icon-btnedit" style="margin-top: 1px;"></i> 编辑</button>',
                t0_del = '<button class="btn btn-small" name="del" disabled><i class="icon-btndel" style="margin-top: 1px;"></i> 删除</button>',
                t0_exp = '<button class="btn btn-small" name="exp"><i class="icon-btnexp" style="margin-top: 1px;"></i> 导出</button>',
                t0_ttl = '<button class="btn btn-small" name="ttl"> 共有-条记录</button><span name="msg" class="label label-success" style="display: none;"></span>',
                t0_1 = '</div>',
                t1 = '<table class="table table-striped table-bordered table-condensed"><thead><tr>',
                t2_radio = '<th></th>',
                t2_checkbox = '<th><input type="checkbox" name="all" title="全选/全不选" /></th>',
                t3 = '<th>序号</th>',
                t4 = '<th>操作</th>',
                t5 = '</tr></thead><tbody>',
                t6 = '</tbody></table>',
                t7 = '<div name="pageBar" class="pagination pagination-small" cur="0" total="0"><ul><li name="first" class="disabled"><a href="javascript:void(0);">首页</a></li><li name="prev" class="disabled"><a href="javascript:void(0);">上一页</a></li><li name="next" class="disabled"><a href="javascript:void(0);">下一页</a></li><li name="last" class="disabled"><a href="javascript:void(0);">末页</a></li><li name="info" class="disabled"><a style="color:#000000"></a></li></ul></div>',
                t8 = '<div name="pageBar2" class="pagination pagination-small"><ul><li name="prev"><a href="javascript:void(0);">上一页</a></li><li name="next"><a href="javascript:void(0);">下一页</a></li></ul></div>';
        var $this, item, tab, $tab, head = '', covertMap = {}, heads = [], rowClass = {};
        return this.each(function() {
            $this = $(this);
            if (opts.title !== '') {
                head += '<h4 class="table-title">' + opts.title + '</h4>';
            }
            if (opts.toolbar) {
                head += t0_0 + (opts.toolbarAdd ? t0_add : '') + (((opts.radio || opts.checkbox) && opts.toolbarView) ? t0_view : '') + (((opts.radio || opts.checkbox) && opts.toolbarEdit) ? t0_edit : '') + (((opts.radio || opts.checkbox) && opts.toolbarDel) ? t0_del : '') + opts.toolbarOther + ((opts.toolbarExp) ? t0_exp : '') + ((opts.toolbarTtl) ? t0_ttl : '') + t0_1;
            }
            head += t1;
            if (opts.toolbar) {
                if (opts.radio) {
                    head += t2_radio;
                } else if (opts.checkbox) {
                    head += t2_checkbox;
                }
            }
            if (opts.serialNum) {
                head += t3;
            }
            for (var i = 0; i < opts.field.length; i++) {
                item = opts.field[i];
                head += '<th>' + item.head + '</th>';
                heads.push(item.name);
                //转换
                if (item.convert !== void 0) {
                    covertMap[item.name] = item.convert;
                }
                //状态标示行class
                if (item.rowClass !== void 0) {
                    rowClass = {name: [item.name], clazz: item.rowClass};
                }
            }
            if (opts.bodyToolbar) {
                head += t4;
            }
            tab = head + t5 + t6;
            if (opts.page) {
                tab += t7;
            } else if (opts.page2) {
                tab += t8;
            }
            $this.html(tab);
            $tab = $('table', $this);
            opts.onToolBarRendered($tab);
            $tab.data({'args': {opts: opts, heads: heads, covertMap: covertMap, rowClass: rowClass}});
            if (opts.firstTimeRefresh) {
                $('tbody', $tab).html('<span style="color: #e3e3e3">数据读取中...<span>');
                $.tableRefresh({table: $tab});
            }

            $('thead :checkbox[name="all"]', $this).live('click', function() {
                var chk = $(this).attr('checked') === 'checked', $tb = $(this).parents('table');
                $('tbody :checkbox[name="tbodyCheck"]', $tb).attr('checked', chk);
                $('tbody div.checker span', $tb).toggleClass('checked', chk);
                refreshToolbarBtn($tb, opts);
            });
            $('tbody [name="tbodyCheck"]', $this).live('change', function() {
                refreshToolbarBtn($(this).parents('table'), opts);
            });
            $('tbody [name="edit2"],tbody [name="del2"],tbody [name="view2"]', $this).live('click', function() {
                var $btn = $(this), $td = $btn.parent('div').parent('td[value]'), name = $btn.attr('name'),
                        val = $td.attr('value');
                if (name === 'edit2') {
                    opts.onEditClick(val, $btn, opts);
                } else if (name === 'del2') {
                    opts.onDelClick(val, $btn, opts);
                } else if (name === 'view2') {
                    opts.onViewClick(val, $btn, opts);
                }
            });
            $('[name="pageBar"] > ul > li[name]', $this).live('click', function() {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var $bar = $(this).parent().parent(),
                        name = $(this).attr('name'),
                        cur = parseInt($bar.attr('cur')), //页
                        total = parseInt($bar.attr('total')), //总数
                        start, subData = {},
                        num = parseInt(total / opts.pageSize);
                if (name === 'first') {
                    start = cur = 0;
                } else if (name === 'prev') {
                    start = cur === 0 ? 0 : ((--cur) * opts.pageSize);
                } else if (name === 'next') {
                    start = (cur === num ? (cur * opts.pageSize) : ((++cur) * opts.pageSize));
                } else if (name === 'last') {
                    cur = (total % opts.pageSize === 0) ? (num - 1) : num;
                    start = cur * opts.pageSize;
                }
                var otherSubDt = opts.getSubDataOnPage();
                var subData = $.extend({}, subData, otherSubDt);
                subData[opts.pageStart] = start;
                $bar.attr('cur', cur);
                $.tableRefresh({table: $tab, subData: subData});
            });
            $('[name="pageBar2"] > ul > li[name]', $this).live('click', function() {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var subData = {}, start, name = $(this).attr('name');
                if (name === 'prev') {
                    start = '-';
                } else if (name === 'next') {
                    start = '+';
                }
                var otherSubDt = opts.getSubDataOnPage();
                var subData = $.extend({}, subData, otherSubDt);
                subData[opts.pageDirection] = start;
                $.tableRefresh({table: $tab, subData: subData});
            });
            $('[name="toolBar"] > [name="edit"],[name="toolBar"] > [name="del"],[name="toolBar"] > [name="add"],[name="toolBar"] > [name="view"],[name="toolBar"] > [name="exp"]', $this).live('click', function() {
                var $btn = $(this), name = $btn.attr('name'), val,
                        checked = $('tbody > tr > td [name="tbodyCheck"]:checked', $btn.parent('[name="toolBar"]').next('table'));
                if (name === 'edit') {
                    val = $(checked[0]).parents('td[value]').attr('value');
                    opts.onEditClick(val, $btn, opts);
                } else if (name === 'del') {
                    if (checked.length === 1) {
                        val = $(checked[0]).parents('td[value]').attr('value');
                        opts.onDelClick(val, $btn, opts);
                    } else {
                        var ids = [];
                        $(checked).parents('td[value]').each(function(i) {
                            ids.push($(this).attr('value'));
                        });
                        val = ids.join(',');
                        opts.onDelsClick(val, $btn, opts);
                    }
                    //TODO:批量删除
                } else if (name === 'add') {
                    opts.onAddClick($btn, opts);
                } else if (name === 'view') {
                    val = $(checked[0]).parents('td[value]').attr('value');
                    opts.onViewClick(val, $btn, opts);
                } else if (name === 'exp') {
                    opts.onExpClick($btn, opts);
                }
            });
        });
    };

    function refreshToolbarBtn($table, opts) {
        var $slts = $('tbody > tr > td [name="tbodyCheck"]:checked', $table).parents('td[value]'),
                editBtn = $('[name="toolBar"] > [name="edit"]', $table.parent()),
                delBtn = $('[name="toolBar"] > [name="del"]', $table.parent()),
                viewBtn = $('[name="toolBar"] > [name="view"]', $table.parent()),
                sltNum = $slts.length, $toolBar = $('[name="toolBar"]', $table.parent());
        var ids = [];
        $slts.each(function(i) {
            ids.push($(this).attr('value'));
        });
        if (sltNum === 0) {
            editBtn.attr('disabled', '');
            delBtn.attr('disabled', '');
            viewBtn.attr('disabled', '');
        } else if (sltNum === 1) {
            editBtn.removeAttr('disabled');
            delBtn.removeAttr('disabled');
            viewBtn.removeAttr('disabled');
        } else {
            editBtn.attr('disabled', '');
            delBtn.removeAttr('disabled');
            viewBtn.attr('disabled', '');
        }
        opts.onRefreshToolbarBtn(ids, $toolBar, opts);
    }

    $.tableRefresh = function(options) {
        var body = '',
                t7 = '<td value="',
                t8_radio = '"><input type="radio" name="tbodyCheck" /></td>',
                t8_checkbox = '"><input type="checkbox" name="tbodyCheck" /></td>',
                t9 = '<td value="',
                t10_0 = '"><div class="btn-group">',
                t10_view = '<button name="view2" class="btn btn-operate" title="明细"><i class="icon-eye-open"></i></button>',
                t10_edit = '<button name="edit2" class="btn btn-operate" title="编辑"><i class="icon-pencil"></i></button>',
                t10_del = '<button name="del2" class="btn btn-operate" title="删除"><i class="icon-trash"></i></button>',
                t10_1 = '</div></td>',
                data = options.table.data('args'),
                opts = data.opts,
                heads = data.heads,
                covertMap = data.covertMap,
                rowClass = data.rowClass,
                subData = {},
                $toolBar = $('[name="toolBar"]', options.table.parent()),
                $pageBar = $('[name="pageBar"]', options.table.parent());
        if (options.subData !== void 0) {
            subData = options.subData;
        }
        if (opts.page) {
            if (options.pageData !== void 0) {
                options.table.data('pageData', options.pageData);
                $pageBar.attr('cur', 0);
            }
            subData = $.extend({}, subData, options.table.data('pageData'));
            subData[opts.pagePageSize] = opts.pageSize;
            subData[opts.pageStart] = parseInt($pageBar.attr('cur')) * opts.pageSize;
        } else if (opts.page2) {
            if (options.pageData !== void 0) {
                options.table.data('pageData', options.pageData);
            }
            subData = $.extend({}, subData, options.table.data('pageData'));
            subData[opts.pagePageSize] = opts.pageSize;
        }
        var $tbody = $('tbody', options.table);
        if (opts.dataLoadingMsg) {
            $tbody.html('<span style="color: #e3e3e3">数据读取中...<span>');
        }
        $.post(opts.url, subData,
                function(ret) {
                    if (!opts.checkSuccess(ret)) {
                        $tbody.html('<span style="color: #e3e3e3">获取数据失败<span>');
                        return;
                    }
                    var retData = opts.getReturnData(ret), val, item, pKey, convt, name, v, clz, sNum, curNum;
                    opts.retData = retData;
                    if (retData.length === 0) {
                        $tbody.html('<span style="color: #e3e3e3">暂无数据<span>');
                        //return;
                    }
                    if (opts.page) {
                        var total = opts.getPageTotal(ret),
                                cur = curNum = parseInt($pageBar.attr('cur')),
                                $first = $('[name="first"]', $pageBar),
                                $prev = $('[name="prev"]', $pageBar),
                                $next = $('[name="next"]', $pageBar),
                                $last = $('[name="last"]', $pageBar),
                                $info = $('[name="info"]', $pageBar),
                                num = parseInt(total / opts.pageSize),
                                curPage = cur + 1, tolPage = (total % opts.pageSize === 0) ? (num === 0 ? 1 : num) : num + 1,
                                curLin1 = cur * opts.pageSize + 1, curLin2 = curLin1 + retData.length - (retData.length === 0 ? 0 : 1);
                        $pageBar.attr('total', total);
//                        $('a', $info).text('[' + curPage + '/' + tolPage + ']页');
                        $('[name="ttl"]', $toolBar).text('共有 ' + total + ' 条记录');
                        $('a', $info).text(' 当前页：[ ' + curPage + ' ] 总页数：[ ' + tolPage + ' ] 当前记录行：[ ' + curLin1 + ' ~ ' + curLin2 + ' ] 总记录行数：[ ' + total + ' ] 每页显示行数：[ ' + opts.pageSize + ' ] ');
//                        $info.popover('destroy').popover({placement: 'top', trigger: 'hover', html: true,
//                            content: '当前页：' + curPage + '总页数：' + tolPage + '当前记录行：' + curLin1 + ' ~ ' + curLin2 + '总记录行数：' + total + '每页显示行数：' + opts.pageSize});
                        if (cur === 0) {
                            $first.addClass('disabled');
                            $prev.addClass('disabled');
                            if (num === 0 || tolPage === 1) {
                                $next.addClass('disabled');
                                $last.addClass('disabled');
                            } else {
                                $next.removeClass('disabled');
                                $last.removeClass('disabled');
                            }
                        } else if ((cur === (num - 1)) & num === tolPage) {
                            $first.removeClass('disabled');
                            $prev.removeClass('disabled');
                            $next.addClass('disabled');
                            $last.addClass('disabled');
                        } else if (cur === num) {
                            $first.removeClass('disabled');
                            $prev.removeClass('disabled');
                            $next.addClass('disabled');
                            $last.addClass('disabled');
                        } else {
                            $first.removeClass('disabled');
                            $prev.removeClass('disabled');
                            $next.removeClass('disabled');
                            $last.removeClass('disabled');
                        }
                    }
                    for (var i = 0; i < retData.length; i++) {
                        item = retData[i];
                        pKey = opts.getPrimaryKeyVal(item);
                        if (rowClass.clazz !== void 0) {
                            clz = rowClass.clazz[item[rowClass.name]];
                            if (clz !== void 0) {
                                body += '<tr class="' + clz + '">';
                            } else {
                                body += '<tr>';
                            }
                        } else {
                            body += '<tr>';
                        }
                        if (opts.toolbar) {
                            if (opts.radio) {
                                body += t7 + pKey + t8_radio;
                            } else if (opts.checkbox) {
                                body += t7 + pKey + t8_checkbox;
                            }
                        }
                        if (opts.serialNum) {
                            sNum = (i + 1);
                            if (opts.page) {
                                sNum = (curNum * opts.pageSize) + sNum;
                            }
                            body += '<td>' + sNum + '</td>';
                        }
                        for (var j = 0; j < heads.length; j++) {
                            name = heads[j];
                            val = item[name];
                            convt = covertMap[name];
                            if (convt !== void 0) {
                                if (typeof (convt) === 'object') {
                                    v = convt[val];
                                } else if (typeof (convt) === 'function') {
                                    v = convt(val, item);
                                }
                                body += '<td>' + v + '</td>';
                            } else {
                                if (val === void 0 || val === null) {
                                    val = '-';
                                }
                                body += '<td>' + val + '</td>';
                            }
                        }
                        if (opts.bodyToolbar) {
                            body += t9 + pKey + t10_0 + (opts.bodyToolbarView ? t10_view : '') + (opts.bodyToolbarEdit ? t10_edit : '') + (opts.bodyToolbarDel ? t10_del : '') + t10_1;
                        }
                    }
                    if (retData.length > 0) {
                        $tbody.fadeTo('slow', 0, function() {
                            $tbody.html(body);
                            $("input:checkbox, input:radio", $tbody).not('[data-no-uniform="true"],#uniform-is-ajax').uniform();
                            $tbody.fadeTo('slow', 1, function() {
                                opts.onDataRendered(retData);
                                refreshToolbarBtn(options.table, opts);
                            });

                        });
                    }
                });
    };
    $.fn.table.defaults = {
        title: '',
        page: false,
        pageStart: 'start',
        pageDirection: 'direction',
        pagePageSize: 'pageSize',
        pageSize: 12,
        dataLoadingMsg: false,
        toolbar: true,
        toolbarAdd: true,
        toolbarTtl: true,
        toolbarView: true,
        toolbarEdit: true,
        toolbarDel: true,
        toolbarExp: false,
        toolbarOther: '',
        checkbox: true,
        radio: false,
        serialNum: true,
        bodyToolbar: false,
        bodyToolbarView: true,
        bodyToolbarEdit: true,
        bodyToolbarDel: true,
        firstTimeRefresh: false,
        getPrimaryKeyVal: function(item) {
            return item.id;
        },
        checkSuccess: function(ret) {
            return ret.resultCode === '0' || ret.resultCode === 0;
        },
        getReturnData: function(ret) {
            return ret.page.result;
        },
        getPageTotal: function(ret) {
            return ret.page.total;
        },
        getSubDataOnPage: function() {
            return {};
        },
        onAddClick: function($btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.add.editboxShow();
            }
        },
        onEditClick: function(pKey, $btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.edit.editboxShow({subData: {id: pKey}});
            }
        },
        onDelClick: function(pKey, $btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.del.editboxShow({subData: {id: pKey}});
            }
        },
        onDelsClick: function(pKey, $btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.del.editboxShow({subData: {ids: pKey}});
            }
        },
        onViewClick: function(pKey, $btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.view.editboxShow({subData: {id: pKey}});
            }
        },
        onExpClick: function($btn, opts) {
            $('#export').submit();
        },
        onDataRendered: function(retData) {
        },
        onToolBarRendered: function($tab) {
        },
        onRefreshToolbarBtn: function(ids, $toolBar, opts) {
        }
    };
})(jQuery);  