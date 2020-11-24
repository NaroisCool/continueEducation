$(document).ready(function() {

    $("#mp3s").jPlayer({
        swfPath: "assets/jPlayer/Jplayer.swf",
        ready: function() {
            $(this).jPlayer("setMedia", {
                mp3: "assets/mp3/s.mp3"
            });
        },
        preload: "auto"
    });

    $("#mp3f").jPlayer({
        swfPath: "assets/jPlayer/Jplayer.swf",
        ready: function() {
            $(this).jPlayer("setMedia", {
                mp3: "assets/mp3/f.mp3"
            });
        },
        preload: "auto"
    });

    $('#step2').show();

    $('#start').click(function() {
        $('#step1').hide();
        $('#step2').show();
    });

    $('#read').click(function() {
        try {
            var ret = CVR_IDCard.ReadCard();
            if (ret == 0) {
                $('#idCard').val(CVR_IDCard.CardNo);
                $('#idCard').change();
                $('#step2msg').text('');
            } else {
                $('#step2msg').text('身份证读取失败，请重试或者输入身份证号码并回车');
            }
        } catch (e) {
            alert('身份证控件未安装');
        }
    });

    $('#idCard').keypress(function(e) {
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which;
        if (code == 13) {
            $('#idCard').change();
        }
    });

    $('#idCard').change(function() {
        $('#step2msg').text('');
        var pid = $(this).val();
        $(this).val('');
        if (pid.length === 18) {
            $.post('action-admin-user-getByIdCard', {idCard: pid}, function(ret) {
                if (ret.resultCode === '0' || ret.resultCode === 0) {
                    if (ret.obj !== void 0 && ret.obj !== null) {
                        sign = ret.obj.finger;
                        val = ret.obj.idCard;
                        try {
                            Biokey.InitEngine();
                        } catch (e) {
                            alert('指纹控件未安装');
                        }
                        $('#step2').hide();
                        $('#step3').show();
                    } else {
                        $('#step2msg').text('查询不到该学员，请确认身份证号码是否正确');
                    }
                }
            });
        }
    });

});