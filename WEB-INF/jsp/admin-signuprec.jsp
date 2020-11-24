<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script src="assets/js2/const.js" type="text/javascript"></script>  
        <script src="assets/jPlayer/jquery.jplayer.min.js" type="text/javascript"></script>
        <title>${title}</title>
        <style>
            body{
                background-color: rgb(223, 232, 246);
            }
            .step{
                width: 100%;
                height: 100%;
                line-height: 100%;
                min-height: 600px;
                text-align: center;
                display: none;
            }
            .msg{
                font-size: 30px;
                color: #0522fd;
                font-weight: bold;
            }
            .msg2{
                color: #330033;
            }
            .tipmsg{
                font-size: 30px;
                color: #333333;
            }
            .btn{
                font-size: 20px;
                padding: 10px 20px;
                font-weight: bold;
            }
            #idCard{
                font-size: 40px;
                height: 52px;
                width:400px;
                line-height: 52px;
            }
            .mp3{
                visibility: hidden;
            }
            body{
                width: 1000px;
                height:670px;
                background-image: url(assets/images/bgsu.jpg);
                background-repeat:no-repeat;
                background-position:center;
            }
            #step3msg{
                font-size: 48px;
                color: #f405fd;
                font-weight: bold;
            }

        </style>
        <script type="text/javascript">
            var sign, chg, val, n = 0;
            function reset() {
                val = void 0;
                $('#step3').hide();
                $('#step2').show();
                $('#step3msg').text('');
                n = 0;
            }
            function resetDelay() {
                window.setTimeout(reset, 3000);
            }
        </script>  
        <script language="javascript" for="Biokey" event="OnCapture(ActionResult,ATemplate)" type="text/javascript">
            if (val != void 0) {
                if (Biokey.VerFinger(Biokey.DecodeTemplate1(sign), ATemplate, false, chg)) {
                    var ic = val;
                    $('#step3msg').text('指纹采集成功');
                    $.post('action-admin-signuprec-live', {idCard: ic}, function(ret) {
                        if (ret.resultCode === '0' || ret.resultCode === 0) {
                            $("#mp3s").jPlayer("play");
                            $('#step3msg').text('签到成功!');
                            resetDelay();
                        } else {
                            $("#mp3f").jPlayer("play");
                            $('#step3msg').text(retcode[ret.resultCode]);
                            resetDelay();
                        }
                    });
                } else {
                    $("#mp3f").jPlayer("play");
                    $('#step3msg').text('您好，你的指纹不正确，请重试');
                    n++;
                    if (n > 0) {
                        resetDelay();
                    }
                }
            }
        </script>  
    </head>
    <body>
        <div class="mp3">
            <div id="mp3s"></div>
            <div id="mp3f"></div>
        </div>
        <object classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7" id="CVR_IDCard" name="CVR_IDCard" width="0" height="0"></object>
        <object classid="clsid:CA69969C-2F27-41D3-954D-A48B941C3BA7" id="Biokey" width="0" height="0"></object>
        <div id="step2" class="step">
            <div style="top:200px;position: absolute;height: 700px;width: 1000px;left: 17%;">
                <input type="text" id="idCard" maxlength="18">
                <a href="#" id="read"><img style="margin-top: 10px" src="assets/images/subtn.png"></a>
            </div>
            <div style="margin-top: 20px;">
                <span id="step2msg" class="tipmsg"></span>
            </div>

        </div>
        <div id="step3" class="step">
            <div style="top:290px;position: absolute;height: 700px;width: 1000px;left: 17%;">
                <span class="msg">请按指纹进行签到</span>
                <div style="margin-top: 50px;">
                    <span id="step3msg"></span>
                </div>
            </div>
        </div>
    </body>
</html>
