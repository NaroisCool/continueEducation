$(document).ready(function() {

    var $contents;

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

    var boxs = $.editboxInit({title: '培训资料',
//        urlAdd: 'action-admin-study-add',
        urlEdit: 'action-admin-study-edit',
        urlView: 'action-admin-study-get',
        urlDel: 'action-admin-study-del',
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
        getReturnData: function(ret) {
            if (ret.obj.contentsType == 2) {
                ret.obj.contents = decodeURIComponent(ret.obj.contents);
            }
            return ret.obj;
        },
        onSubmit: function($box, subData) {
            if (subData.contentsType === '2') {
                var cont = subData.contents;
                cont = cont.replace(/width=\"[0-9]+\"/, 'width="100%"');
                cont = cont.replace(/height=\"[0-9]+\"/, 'height="600"');
                subData.contents = encodeURIComponent(cont);
                $('#preview').html(cont);
            }
            return subData;
        },
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
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

    $('[view="stduy"]').live('click', function() {
        var val = $(this).attr('val'),
                type = $(this).attr('typ'),
                $preview = $('#preview');
        if (type === '1') {
            $preview.FlexPaperViewer(
                    {config: {
                            jsDirectory: 'assets/flexpaper/js/',
                            SWFFile: 'books/' + val,
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
        } else if (type === '2') {
            $preview.html(decodeURIComponent(val));
        }
    });

    $('#result').table({url: 'action-admin-study-page',
        page: true,
        editbox: boxs,
        toolbarAdd: false,
        firstTimeRefresh: true,
        field: [{name: 'name', head: '名称'},
            {name: 'type', head: '类型', convert: studyType},
            {name: 'contentsType', head: '形式', convert: contentsType},
            {name: 'createTime', head: '添加时间'},
            {name: 'lastModifyTime', head: '最后修改时间'},
            {name: 'contents', head: '预览', convert: function(val, item) {
                    return '<a view="stduy" href="javascript:void(0);" typ="' + item.contentsType + '" val="' + val + '">预览</a>';
                }}
        ]
    });
});