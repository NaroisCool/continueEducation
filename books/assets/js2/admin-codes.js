$(document).ready(function() {

    var valCodes;

    $('#addBatch').click(function() {
        if ($(this).attr('disabled') !== void 0) {
            return;
        }
        $('#addBatch').attr('disabled', true).text('正在保存...');
        var code, codes = [];
        for (var i = 0; i < valCodes.length; i++) {
            code = valCodes[i].code;
            codes.push(code);
        }
        $.post('action-admin-codes-addCodes', {code: codes.join(',')}, function(ret) {
            if (ret.resultCode === '0' || ret.resultCode === 0) {
                $('#addSuccessMsg').fadeIn().delay(500).fadeOut();
            } else {
                $('#addFailMsg').text(retcode[ret.resultCode]).fadeIn().delay(500).fadeOut();
                $('#addBatch').removeAttr('disabled');
            }
            $('#addBatch').text('保存');
        });
    });

    $('#generate').click(function() {
        var $table = $('#result table'), postData = {}, data, $ipt, name;
        $('#filter :text[name],#filter select[name]').each(function() {
            $ipt = $(this);
            name = $ipt.attr('name');
            data = $ipt.val();
            postData[name] = data;
        });
        $.tableRefresh({subData: postData, table: $table});
    });

    $('#result').table({url: 'action-admin-codes-genCodes',
        toolbar: false,
        bodyToolbar: false,
        field: [{name: 'code', head: '激活码'},
            {name: 'sn', head: '校验', convert: function(val) {
                    return '<span val="' + val + '">未校验</span>';
                }}
        ], getReturnData: function(ret) {
            return ret.codes;
        },
        onDataRendered: function(retData) {
            var len = retData.length, code, $code, codes = [], codeMap = {}, notValCodes;
            for (var i = 0; i < len; i++) {
                code = retData[i].code;
                codes.push(code);
                $code = $('#result [val="' + code + '"]');
                $code.text('校验中...');
                codeMap[code] = $code;
            }
            $.post('action-admin-codes-valCodes', {code: codes.join(',')}, function(ret) {
                if (ret.resultCode === '0' || ret.resultCode === 0) {
                    notValCodes = ret.notValCodes;
                    for (var j = 0; j < notValCodes.length; j++) {
                        codeMap[notValCodes[j].code].attr('val', false).html('<span class="label label-warning">已被使用</span>');
                    }
                    valCodes = ret.valCodes;
                    for (var j = 0; j < valCodes.length; j++) {
                        codeMap[valCodes[j].code].attr('val', true).html('<span class="label label-success">校验通过</span>');
                    }
                    $('#addBatch').removeAttr('disabled');
                }
            });
        }
    });
});