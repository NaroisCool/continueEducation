$(document).ready(function() {

    $('#uploadHelper').click(function() {
        $('#uploadHelp').slideToggle();
    });

    function upload($btn, $msg, $fmsg, fileId, onSuccess) {
        var omsg = $msg.text(), ofmsg = $fmsg.text();
//        $btn.addClass('disabled');
        $msg.text('上传中，请稍后...').fadeIn();
        $.ajaxFileUpload({
            url: 'action-admin-study-uploadswf',
            secureuri: false,
            fileElementId: fileId,
            dataType: 'json',
            success: function(data, status) {
                if (data.resultCode === '0' || data.resultCode === 0) {
                    $msg.text('上传成功，请点击保存').delay(500).fadeOut(function() {
                        $msg.text(omsg);
                    });
                    if (onSuccess !== void 0) {
                        onSuccess();
                    }
                    $contents.val(data.fileFileName + '.swf');
                    $('#preview').FlexPaperViewer(
                            {config: {
                                    jsDirectory: 'assets/flexpaper/js/',
                                    SWFFile: 'books/' + $contents.val(),
                                    Scale: 0.6,
                                    ZoomTransition: 'easeOut',
                                    ZoomTime: 0.5,
                                    ZoomInterval: 0.2,
                                    FitPageOnLoad: true,
                                    FitWidthOnLoad: true,
                                    FullScreenAsMaxWindow: false,
                                    ProgressiveLoading: false,
                                    MinZoomSize: 0.2,
                                    MaxZoomSize: 5,
                                    SearchMatchAll: false,
                                    InitViewMode: 'Portrait',
                                    RenderingOrder: 'flash',
                                    StartAtPage: '',
                                    ViewModeToolsVisible: true,
                                    ZoomToolsVisible: true,
                                    NavToolsVisible: true,
                                    CursorToolsVisible: true,
                                    SearchToolsVisible: true,
                                    WMode: 'window',
                                    localeChain: 'zh_CN'
                                }}
                    );
//                    $btn.removeClass('disabled');
                } else {
                    $msg.fadeOut();
                    $fmsg.text(retcode[data.resultCode]).fadeIn().delay(1000).fadeOut(function() {
                        $fmsg.text(ofmsg);
                    });
                }
            }
        });
    }

    var $contents;

    var boxs = $.editboxInit({title: '培训资料', fade: false, display: true, modal: false, renderTo: '#result',
        urlAdd: 'action-admin-study-add',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'name', label: '名称*：', validate: 'required', validateMsg: '名称不能为空'},
            {type: 'select', name: 'type', label: '类型*：', options: studyType, validate: 'required', validateMsg: '类型不能为空'},
            {type: 'select', name: 'contentsType', label: '形式*：', options: contentsType, validate: 'required', validateMsg: '形式不能为空'},
            {type: 'text', name: 'contents', label: '内容*：', validate: 'required', validateMsg: '内容不能为空', click: function() {
                    var typ = $(this).editboxGetField('contentsType').val();
                    if (typ == 1) {
                        $contents = $(this);
                        if ($.browser.msie) {
                            $('#uploadIE').modal('show');
                        } else {
                            $('#file').click();
                        }
                    } else if (typ == 2) {
                    }
                }},
            {type: 'text', name: 'createTime', label: '添加时间：', disabled: true},
            {type: 'text', name: 'lastModifyTime', label: '最后修改时间：', disabled: true}
        ],
        onSubmit: function($box, subData) {
            if (subData.contentsType == 2) {
                var cont = subData.contents;
                cont = cont.replace(/width=\"[0-9]+\"/, 'width="100%"');
                cont = cont.replace(/height=\"[0-9]+\"/, 'height="600"');
                subData.contents = encodeURIComponent(cont);
                $('#preview').html(cont);
            }
            return subData;
        }
    });

    $('#uploadIEOk').click(function() {
        var $msg = $('#uploadIEMsg'), $fmsg = $('#uploadIEFailMsg'),
                $btn = $('#uploadIEOk'), fileId = 'fileIE';
        upload($btn, $msg, $fmsg, fileId, function() {
            $('#uploadIE').modal('hide');
            $msg.hide();
        });
    });

    $('#file').live('change', function() {
        var $msg = $contents.editboxGetFoot('successMsg'), $fmsg = $contents.editboxGetFoot('failMsg'),
                $btn = $contents.editboxGetFoot('ok'), fileId = 'file';
        upload($btn, $msg, $fmsg, fileId);
    });

    boxs.add.css('margin', '0').css('margin-left', '140px');
    boxs.add.editboxShow({backdrop: false, keyboard: false});
});