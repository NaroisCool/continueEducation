
/* 
 Document   : jquery.bootstrap.editbox
 Created on : 2013-6-25, 16:46:31
 Author     : shaopei
 Description: 模态自动生成的编辑框
 */

(function($) {
    $.editboxInit = function(options) {
        var opts = $.extend({}, $.editboxInit.defaults, options);
        var f1 = '<div box id="',
                f2 = '',
                f2_fade = '" class="modal fade" style="display: none;',
                f2_fade2 = '" class="modal" style="display: none;',
                f2_modal = '">',
                f2_modal2 = 'position:static;margin-left:0;">',
                f2_head = '<div class="modal-header" style="display: none;>',
                f2_head2 = '<div class="modal-header">',
                f2_close = '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>',
                f2_close2 = '<h3>',
                f3 = '</h3></div><div class="modal-body">',
                f4 = '</div><div class="modal-footer"><span name="successMsg" class="label label-success" style="display: none;">',
                f5 = '</span><span name="failMsg" class="label label-important" style="display: none;">',
                f6 = '</span><a name="cancel" class="btn"><i class="icon-cancel"></i> ',
                f6_cancel = '</span><a name="cancel" class="btn" style="display: none;"><i class="icon-cancel"></i> ',
                f7 = '</a><a name="ok" class="btn btn-primary"><i class="icon-submit"></i> ',
                f8 = '</a></div>';
        if (opts.fade) {
            f2 += f2_fade;
        } else {
            f2 += f2_fade2;
        }
        if (opts.modal) {
            f2 += f2_modal;
        } else {
            f2 += f2_modal2;
        }
        if (opts.headHide) {
            f2 += f2_head;
        } else {
            f2 += f2_head2;
            if (opts.display) {
                f2 += f2_close2;
            } else {
                f2 += f2_close;
            }
        }

        if (opts.display) {
            f6 = f6_cancel;
        }
        var ebid, $box, boxAdd, boxEdit, boxView, boxDel, $boxAdd, $boxEdit, $boxView, $boxDel, field = '', fieldEdit = '', item, fd, inpt, fdEdit, inptEdit, editDisabled = '', other, commons, bind = [];
        ebid = 'editbox' + Math.floor(Math.random() * 10000);
        for (var i = 0; i < opts.field.length; i++) {
            item = opts.field[i];
            var tgt = '.modal-body [editoxType][name="' + item.name + '"]';

            //事件绑定
            if (item.click !== void 0) {
                bind.push({event: 'click', target: tgt, func: item.click});
            }
            if (item.change !== void 0) {
                bind.push({event: 'change', target: tgt, func: item.change});
            }

            commons = ' editoxType="' + item.type + '"';
            //公共属性
            if (item.name !== void 0) {
                commons += ' name="' + item.name + '"';
            }
            if (item.title !== void 0) {
                commons += ' title="' + item.title + '"';
            }
            if (item.placeholder !== void 0) {
                commons += ' placeholder="' + item.placeholder + '"';
            }

            other = '';
            //校验
            if (item.validate !== void 0) {
                other += ' validate="' + item.validate + '" validateparam="' + item.validateParam + '" validatemsg="' + item.validateMsg + '"';
            }

            //初始不可用
            if (item.disabled) {
                other += ' disabled="disabled"';
            }

            //编辑
            editDisabled = '';
            if (item.editDisabled) {
                editDisabled = ' disabled="disabled"';
            }
            switch (item.type) {
                case 'finger':
                    inpt = '<input type="text" style="width:140px;" class="uneditable-input"' + commons + other;
                    inptEdit = inpt + editDisabled + ' ><img name="fingerImg" width="70" height="85" class="hide"> <button name="fingerBtn" class="btn" type="button">采集</button>';
                    inpt += ' ><img name="fingerImg" width="70" height="85" class="hide"> <button name="fingerBtn" class="btn" type="button">采集</button>';
                    break;
                case 'image':
                    inpt = '<img alt="暂无图片" width="119" height="136" src=""' + commons + other;
                    inptEdit = inpt + editDisabled + ' > <button name="imgBtn" class="btn" type="button">选择...</button>';
                    inpt += ' > <button name="imgBtn" class="btn" type="button">选择...</button>';
                    break;
                case 'password':
                    inpt = '<input type="password"' + commons + other;
                    inptEdit = inpt + editDisabled + ' />';
                    inpt += ' />';
                    break;
                case 'text':
                    inpt = '<input type="text"' + commons + other;
                    inptEdit = inpt + editDisabled + ' />';
                    inpt += ' />';
                    break;
                case 'textarea':
                    var rows = item.rows === void 0 ? opts.textareaRow : item.rows;
                    inpt = '<textarea rows="' + rows + '"' + commons + other;
                    inptEdit = inpt + editDisabled + '></textarea>';
                    inpt += '></textarea>';
                    break;
                case 'select':
                    inpt = '<select' + commons + other;
                    if (item.multiple) {
                        if (item.size === void 0) {
                            item.size = opts.selectSize;
                        }
                        inpt += ' multiple="multiple" size="' + item.size + '"';
                    }
                    inptEdit = inpt + editDisabled + '>';
                    inpt += '>';
                    var op = getItemList(item, opts, '<option', '</option>');
                    inpt += op + '</select>';
                    inptEdit += op + '</select>';
                    break;
                case 'checkboxList':
                    if (item.size === void 0) {
                        item.size = opts.checkboxListSize;
                    }
                    var height = 20 + (item.size - 1) * 25;
                    inpt = '<div class="checkboxList" style="height:' + height + 'px;"' + commons + other;
                    inptEdit = inpt + editDisabled + ' >';
                    inpt += ' >';
                    var op = getItemList(item, opts, '<label class="checkbox"><input type="checkbox" name="' + item.name + '"', '</label>');
                    inpt += op + '</div>';
                    inptEdit += op + '</div>';
                    break;
                case 'hidden':
                    if (item.value !== void 0) {
                        other += 'initvalue value="' + item.value + '"';
                    }
                    inptEdit = inpt = '<input type="hidden"' + commons + other + ' />';
                    break;
                default:
                    break;
            }
            if (item.type === 'hidden') {
                fd = inpt;
                fdEdit = inptEdit;
            } else {
                fd = '<div class="control-group"><label class="control-label">' + item.label + '</label><div class="controls">';
                fdEdit = fd + inptEdit + '<span class="help-inline"></span></div></div>';
                fd += inpt + '<span class="help-inline"></span></div></div>';
            }
            field += fd;
            fieldEdit += fdEdit;
        }

        boxAdd = f1 + ebid + 'Add' + f2 + opts.titleAdd + opts.title + f3 + field + f4 + opts.successMsgAdd + f5 + opts.failMsgAdd + f6 + opts.cancelButtonNameAdd + f7 + opts.okButtonNameAdd + f8;
        boxView = f1 + ebid + 'View' + f2 + opts.titleView + opts.title + f3 + field + f4 + opts.successMsgView + f5 + opts.failMsgView + f6 + opts.cancelButtonNameView + f7 + opts.okButtonNameView + f8;
        boxEdit = f1 + ebid + 'Edit' + f2 + opts.titleEdit + opts.title + f3 + fieldEdit + f4 + opts.successMsgEdit + f5 + opts.failMsgEdit + f6 + opts.cancelButtonNameEdit + f7 + opts.okButtonNameEdit + f8;
        boxDel = f1 + ebid + 'Del' + f2 + opts.titleDel + opts.title + f3 + opts.delConfirmMsg + f4 + opts.successMsgDel + f5 + opts.failMsgDel + f6 + opts.cancelButtonNameDel + f7 + opts.okButtonNameDel + f8;
        if (opts.urlAdd !== void 0) {
            $(opts.renderTo).append(boxAdd);
        }
        if (opts.urlView !== void 0) {
            $(opts.renderTo).append(boxView);
        }
        if (opts.urlEdit !== void 0) {
            $(opts.renderTo).append(boxEdit);
        }
        if (opts.urlDel !== void 0) {
            $(opts.renderTo).append(boxDel);
        }
        $box = $('#' + ebid + 'Add,' + '#' + ebid + 'View,' + '#' + ebid + 'Edit,' + '#' + ebid + 'Del');
        $boxAdd = $('#' + ebid + 'Add');
        $boxView = $('#' + ebid + 'View');
        $boxEdit = $('#' + ebid + 'Edit');
        $boxDel = $('#' + ebid + 'Del');

        for (var k = 0; k < bind.length; k++) {
            var b = bind[k];
            $(b.target).bind(b.event, b.func);
        }

        $('.modal-body [editoxType][name]', $box).focusout(function() {
            validated($(this), opts);
        });

        $('.modal-footer [name="cancel"]', $box).click(function() {
            if (!opts.display) {
                $box.modal('hide');
            }
        });

        //View
        $('.modal-body [editoxType][name],.modal-body [editoxType][name] [name]', $boxView).css('background-color', 'rgb(245, 245, 245)');

        $('.modal-footer [name="ok"]', $boxView).click(function() {
            if (!opts.display) {
                $box.modal('hide');
            }
        });

        $boxView.on('show', function() {
            opts.onViewShowGetData($boxView, function() {
                $('.modal-body [editoxType][name],.modal-body [editoxType][name] [name]', $boxView).css('background-color', 'rgb(245, 245, 245)');
                getData($boxView, opts);
            });
            opts.onViewShow($boxView);
            opts.onBoxShow('view', $boxView);
        });

        //Add
        $('.modal-body [editoxType][name][disabled]', $boxAdd).parents('div.control-group').hide();
        $('.modal-footer [name="ok"]', $boxAdd).click(function() {
            if (!$(this).hasClass('disabled')) {
                submitData($boxAdd, opts, opts.urlAdd);
            }
        });

        $boxAdd.on('show', function() {
            opts.onAddShowGetData($boxAdd);
            initData($boxAdd);
            opts.onAddShow($boxAdd);
            opts.onBoxShow('add', $boxAdd);
        });

        $boxAdd.on('hide', function() {
            $(':input:not(select,:checkbox,[initvalue])', $boxAdd).val('');
            $(':checkbox', $boxAdd).attr("checked", false);
        });

        //Edit
        $('.modal-footer [name="ok"]', $boxEdit).click(function() {
            if (!$(this).hasClass('disabled')) {
                submitData($boxEdit, opts, opts.urlEdit);
            }
        });

        $boxEdit.on('show', function() {
            opts.onEditShowGetData($boxEdit, function() {
                getData($boxEdit, opts);
            });
            opts.onEditShow($boxEdit);
            opts.onBoxShow('edit', $boxEdit);
        });

        //Del
        $('.modal-footer [name="ok"]', $boxDel).click(function() {
            submitData($boxDel, opts, opts.urlDel);
        });

        $boxDel.on('show', function() {
            opts.onDelShow($boxDel);
            opts.onBoxShow('del', $boxDel);
        });


        return {all: $box, add: $boxAdd, edit: $boxEdit, view: $boxView, del: $boxDel};
    };

    function getData($box, opts) {
        if (opts.urlView !== void 0) {
            $.post(opts.urlView, $box.data('subData'),
                    function(ret) {
                        var isSuccess = opts.checkSuccess(ret),
                                msgName = isSuccess ? 'successMsg' : 'failMsg',
                                $msg = $('.modal-footer [name="' + msgName + '"]', $box),
                                $ok = $('.modal-footer [name="ok"]', $box),
                                oMsg = $msg.text(),
                                msg = opts.getGetDataMsg(ret);
                        if (msg === '') {
                            msg = isSuccess ? opts.successMsgView : opts.failMsgView;
                        }
                        $msg.text(msg);
                        isSuccess || opts.display ? $ok.show() : $ok.hide();
                        $msg.fadeIn().delay(isSuccess ? 500 : 1500).fadeOut(function() {
                            $msg.text(oMsg);
                        });
                        var retData = opts.getReturnData(ret);
                        setInputValues(retData, $box);
                        opts.onBoxShowed($box);
                    });
        }
    }

    function setInputValues(retData, $box) {
        var val, $ipt;
        for (var name in retData) {
            val = retData[name];
            $ipt = $('.modal-body [editoxType][name="' + name + '"]', $box);
            if ($ipt.attr('editoxType') === 'checkboxList') {
                for (var i = 0; i < val.length; i++) {
                    $('[name="' + name + '"][value="' + val[i] + '"]').attr("checked", true);
                }
            } else {
                $ipt.val(val);
            }
            //TODO:按照类型设置值
        }
    }

    function getItemList(item, opts, itemHead, itemTail) {
        var dis, op = '';
        if (item.options !== void 0) {
            op = '';
            for (var val in item.options) {
                dis = item.options[val];
                op += itemHead + ' value="' + val + '">' + dis + itemTail;
            }
        } else if (item.dynamic !== void 0) {
            var dync = item.dynamic, name = item.name;
            opts.onAddShowGetData = opts.onViewShowGetData = opts.onEditShowGetData = function($box, getData) {
                var $sid = $box.editboxGetField(name), subData = {};
                if (dync.getSubData !== void 0) {
                    subData = dync.getSubData();
                }
                $.post(dync.url, subData,
                        function(ret) {
                            if (opts.checkSuccess(ret)) {
                                var retData = dync.getReturnData === void 0 ? ret.list : dync.getReturnData(ret), itm;
                                op = '';
                                for (var i = 0; i < retData.length; i++) {
                                    itm = retData[i];
                                    op += itemHead + ' value="' + itm[dync.key] + '" ';
                                    if (dync.getOptionAttr !== void 0) {
                                        var exAttr = dync.getOptionAttr(itm);
                                        itm = $.extend({}, itm, exAttr);
                                    }
                                    for (var val in itm) {
                                        dis = itm[val];
                                        op += val + '="' + dis + '" ';
                                    }
                                    op += '>' + itm[dync.value] + itemTail;
                                }
                                $sid.html(op);
                            }
                            if (getData !== undefined) {
                                getData();
                            }
                        });
            };
        }
        return op;
    }

    function initData($box) {
        var retData = $box.data('initData');
        setInputValues(retData, $box);
    }

    function submitData($box, opts, url) {
        $('.modal-body [editoxType][name][validate]:not([disabled])', $box).each(function() {
            validated($(this), opts);
        });
        if ($('.modal-body [editoxType][name][validated="false"]', $box).length !== 0) {
            return;
        }
        var subData = {}, $ipt, val, name, data;
        $('.modal-body [editoxType][name]', $box).each(function() {
            $ipt = $(this);
            name = $ipt.attr('name');
            if ($ipt.attr('editoxType') === 'checkboxList') {
                var arrys = [];
                $(':checkbox:checked', $ipt).each(function() {
                    arrys.push($(this).val());
                });
                data = arrys;
            } else {
                data = $ipt.val();
            }
            subData[name] = data;
            //TODO:按照类型获取值
        });
        subData = $.extend({}, subData, $box.data('subData'));
        subData = opts.onSubmit($box, subData);
        $.post(url, subData,
                function(ret) {
                    var isSuccess = opts.checkSuccess(ret),
                            msgName = isSuccess ? 'successMsg' : 'failMsg',
                            $msg = $('.modal-footer [name="' + msgName + '"]', $box),
                            oMsg = $msg.text(),
                            msg = opts.getSubDataMsg(ret);
                    if (msg !== '') {
                        $msg.text(msg);
                    }
                    $msg.fadeIn().delay(isSuccess ? 500 : 1500).fadeOut(function() {
                        $msg.text(oMsg);
                        if (!opts.display && isSuccess) {
                            $box.modal('hide');
                        } else {
                        }
                    });
                    if (url === opts.urlAdd) {
                        opts.onAdded($box);
                        if (opts.display && isSuccess) {
                            $(':input:not(select,:checkbox)', $box).val('');
                        }
                    } else if (url === opts.urlEdit) {
                        opts.onEdited($box);
                    } else if (url === opts.urlDel) {
                        opts.onDeled($box);
                    }
                    opts.onSubmited($box);
                });

    }

    function validated($ipt, opts) {
        var isValidated = true, type = $ipt.attr('validate'), msg = $ipt.attr('validatemsg'), param = $ipt.attr('validateparam');
        msg = msg === (void 0 || 'void 0') ? opts.validateMsg : msg;
        switch (type) {
            case 'required':
                if ($ipt.attr('editoxType') === 'checkboxList') {
                    isValidated = $(':checkbox:checked', $ipt).length > 0;
                } else {
                    isValidated = ($ipt.val() !== '' && $ipt.val() !== null && $ipt.val() !== void 0);
                }
                //TODO:按照类型获取值
                break;
            case 'length':
                isValidated = ($ipt.val() !== '' && $ipt.val() !== null && $ipt.val() !== void 0 && $ipt.val().length == param);
                //TODO:按照类型获取值
                break;
            default:
                break;
        }
        $ipt.attr('validated', isValidated).parents('.control-group').toggleClass('error', !isValidated);
        $('span.help-inline', $ipt.parents('.control-group')).text(!isValidated ? msg : '');
    }

    $.editboxInit.defaults = {
        titleAdd: '添加',
        titleEdit: '修改',
        titleView: '查看',
        titleDel: '删除',
        title: '未命名',
        fade: true,
        display: false,
        headHide: false,
        modal: true,
        renderTo: 'body',
        cancelButtonNameAdd: '取消',
        okButtonNameAdd: '保存',
        cancelButtonNameEdit: '取消',
        okButtonNameEdit: '保存',
        cancelButtonNameView: '关闭',
        okButtonNameView: '确定',
        cancelButtonNameDel: '取消',
        okButtonNameDel: '确定',
        validateMsg: '未通过校验',
        successMsgAdd: '添加成功',
        failMsgAdd: '添加失败',
        successMsgEdit: '修改成功',
        failMsgEdit: '修改失败',
        successMsgView: '获取成功',
        failMsgView: '获取失败',
        successMsgDel: '删除成功',
        failMsgDel: '删除失败',
        delConfirmMsg: '确认删除该项？',
        textareaRow: 3,
        selectSize: 6,
        checkboxList: 6,
        checkSuccess: function(ret) {
            return ret.resultCode === '0' || ret.resultCode === 0;
        },
        getReturnData: function(ret) {
            return ret.obj;
        },
        getGetDataMsg: function(ret) {
            if (!this.checkSuccess(ret) && retcode !== void 0) {
                return retcode[ret.resultCode];
            }
            return '';
        },
        getSubDataMsg: function(ret) {
            if (!this.checkSuccess(ret) && retcode !== void 0) {
                return retcode[ret.resultCode];
            }
            return '';
        },
        onSubmit: function($box, subData) {
            return subData;
        },
        onSubmited: function($box) {
        },
        onAdded: function($box) {
        },
        onEdited: function($box) {
        },
        onDeled: function($box) {
        },
        onBoxShow: function(type, $box) {
        },
        onBoxShowed: function($box) {
        },
        onViewShow: function($box) {
        },
        onAddShow: function($box) {
        },
        onEditShow: function($box) {
        },
        onDelShow: function($box) {
        },
        onAddShowGetData: function($box, funcGetData) {
            if (funcGetData !== void 0) {
                funcGetData();
            }
        },
        onViewShowGetData: function($box, funcGetData) {
            if (funcGetData !== void 0) {
                funcGetData();
            }
        },
        onEditShowGetData: function($box, funcGetData) {
            if (funcGetData !== void 0) {
                funcGetData();
            }
        }
    };

    $.fn.editboxShow = function(options) {
        var opts = $.extend({}, $.fn.editboxShow.defaults, options);
        $(this).data(options);
        $(this).modal({
            backdrop: opts.backdrop,
            keyboard: opts.keyboard,
            show: true
        });
    };

    $.fn.editboxHide = function(options) {
        $(this).modal('hide');
    };

    $.fn.editboxShow.defaults = {
        backdrop: true,
        keyboard: true
    };

    $.fn.editboxResetvalidate = function() {
        $(this).removeAttr('validated').parents('.control-group').removeClass('error');
        $(this).next('span').text('');
    };

    $.fn.editboxGetField = function(name) {
        var ret = $('[editoxType][name="' + name + '"]', $(this));
        if (ret.length === 0) {
            ret = $('[editoxType][name="' + name + '"]', $(this).parents('.modal-body'));
        }
        return ret;
    };

    $.fn.editboxGetBox = function() {
        return $(this).parents('[id][box]');
    };

    $.fn.editboxGetFoot = function(name) {
        var bx = $(this).editboxGetBox();
        return $('.modal-footer [name="' + name + '"]', bx);
    };

})(jQuery);   