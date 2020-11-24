$(document).ready(function() {

    var time = 0, t, s, m, h, tStr,
            isAlert = false,
            posTime = 0,
            $timeIE = $('#timeIE');

//    if ($.browser.msie) {
//        $timeIE.removeClass('hidden');
//    } else {
//        $('#time').removeClass('hidden');
//    }

    var clock = $('#time').FlipClock({
        autoStart: false,
        callbacks: {
            interval: function() {
                t = clock.getTime().time;
                s = 0;
                m = 0;
                h = 0;
                if (t < 60) {
                    s = t;
                    if (s < 10) {
                        s = '0' + s;
                    }
                    tStr = '00:00:' + s;
                } else if (t < 3600) {
                    m = parseInt(t / 60);
                    s = t - m * 60;
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (s < 10) {
                        s = '0' + s;
                    }
                    tStr = '00:' + m + ':' + s;
                } else {
                    h = parseInt(t / 3600);
                    m = parseInt((t - h * 3600) / 60);
                    s = t - h * 3600 - m * 60;
                    if (h < 10) {
                        h = '0' + h;
                    }
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (s < 10) {
                        s = '0' + s;
                    }
                    tStr = h + ':' + m + ':' + s;
                }
                $timeIE.text(tStr);
                time++;
                if (time >= 30) {
                    time = 0;
                    document.onmousemove = mouseEv;
                    refresh(true);
                }
            }
        }
    });

    function mousePos(ev) {
        if (ev.pageX || ev.pageY) {
            return {x: ev.pageX, y: ev.pageY};
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft, y: ev.clientY +
                    document.body.scrollTop - document.body.clientTop
        };
    }

    function mouseEv(ev) {
        ev = ev || window.event;
        var posNow = mousePos(ev);
        document.onmousemove = null;
        if (posTime != 0) {
            if (posTime >= 10) {
                clock.start();
                refresh();
            }
            posTime = 0;
        }
    }


    $('.flip-clock-divider.hours .flip-clock-label').text('小时').css('right', '-84px');
    $('.flip-clock-divider.minutes .flip-clock-label').text('分钟').css('right', '-84px');
    $('.flip-clock-divider.seconds .flip-clock-label').text('秒').css('right', '-76px');

    var $ret = $('#result'), $timeuse = $('#inf-timeuse'), $timeleft = $('#inf-timeleft'), $timelive = $('#inf-timelive'), $notReced = $('#inf-notReced');
    function refresh(pos) {
        if (pos && document.onmousemove != void 0 && document.onmousemove != null) {
            posTime++;
            if (posTime >= 10) {
                clock.stop();
            }
        }
        $.ajax({
            type: "post",
            url: 'action-user-studyrec-refresh',
            data: {},
            async: false,
            success: function(ret) {
                if (ret.resultCode == 0) {
                    $timeuse.text(ret.codeInfo.studyUseTime + '  分钟');
                    $timeleft.text(ret.codeInfo.studyLeftTime + '  分钟');
                    $notReced.text(ret.codeInfo.studynotReced ? '完成' : '未完成');
                    if (ret.codeInfo.studynotReced) {
                        notRec = true;
                        clock.stop();
                        $('#orderLive').show();
                        if (confirm('您已完成全部培训，是否马上预约授课？')) {
                            window.location.href = 'user-reserve';
                        }
                    }
                    isAlert = true;
                } else if (!isAlert) {
                    if (ret.resultCode == 200) {
                        notRec = true;
                        clock.stop();
                        $('#orderLive').show();
                        if (confirm('您已完成全部培训，是否马上预约授课？')) {
                            window.location.href = 'user-reserve';
                        }
                    } else if (ret.resultCode == 202) {
                        notRec = true;
                        alert('您的培训类型为“课堂集中授课”，在线学习不计时');
                    } else if (ret.resultCode == 201) {
                        alert('您今日培训学时已经完成，今日继续学习不再计时');
                    } else {
                        alert(retcode[ret.resultCode]);
                    }
                    isAlert = true;
                }
            }
        });
    }

    $('a[study][studysrc]').click(function() {
        var typ = $(this).attr('typ'), src = $(this).attr('studysrc'), study = $ret.attr('study'), nowStudy = $(this).attr('study');
        if (study == void 0 && study == null && study == '' || nowStudy == study) {
            return;
        }
        $ret.attr('study', nowStudy);
        refresh(false);
        if (!notRec && time == 0) {
            clock.start();
            document.onmousemove = mouseEv;
        }
        if (typ == 1) {
            $ret.FlexPaperViewer(
                    {config: {
                            jsDirectory: 'assets/flexpaper/js/',
                            SWFFile: 'books/' + src,
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
        } else if (typ == 2) {
            $ret.html(decodeURIComponent(src));
        }
    });
});