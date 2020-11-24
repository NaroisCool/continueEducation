<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="assets/plugin/jquery/jquery.js" type="text/javascript"></script>  
        <script src="assets/js2/admin-login.js" type="text/javascript"></script>  
        <script src="assets/js2/const.js" type="text/javascript"></script>  
        <title>
            南昌市道路运输从业人员继续教育平台</title>
        <script>
            // 浏览器检测
            var userAgent = navigator.userAgent.toLowerCase();
            var check = function(regex) {
                return regex.test(userAgent);
            },
                    isStrict = document.compatMode === "CSS1Compat",
                    version = function(is, regex) {
                var m;
                return (is && (m = regex.exec(userAgent))) ? parseFloat(m[1]) : 0;
            },
                    docMode = document.documentMode,
                    isOpera = check(/opera/),
                    isIE = !isOpera && check(/msie/),
                    isIE7 = isIE && ((check(/msie 7/) && docMode != 8 && docMode != 9 && docMode != 10) || docMode == 7),
                    isIE8 = isIE && ((check(/msie 8/) && docMode != 7 && docMode != 9 && docMode != 10) || docMode == 8),
                    isIE9 = isIE && ((check(/msie 9/) && docMode != 7 && docMode != 8 && docMode != 10) || docMode == 9),
                    isIE10 = isIE && ((check(/msie 10/) && docMode != 7 && docMode != 8 && docMode != 9) || docMode == 10),
                    isIE6 = isIE && check(/msie 6/),
                    ieVersion = version(isIE, /msie (\d+\.\d+)/);

            // 如果是IE6
            if (isIE && ieVersion <= 7) {
                window.location.href = "ie.html";
            }
        </script>
        <style type="text/css">
            *
            {
                margin: 0;
                padding: 0;
            }
            body
            {
                background-color: #76acd8;
                font-family: "微软雅黑" , "宋体";
                font-size: 14px;
            }
            input
            {
                font-family: "微软雅黑" , "宋体";
                outline: none;
            }
            #container
            {
                width: 900px;
                margin: 0 auto;
                position: relative;
                height: 549px;
            }
            #loginDiv
            {
                width: 312px;
                height: 290px;
                position: absolute;
                left: 566px;
                top: 106px;
                padding-top: 40px;
                padding-left: 16px;
            }
            #loginDiv_bg
            {
                width: 328px;
                height: 330px;
                position: absolute;
                left: 566px;
                top: 106px;
            }
            .login_textBox
            {
                width: 235px;
                height: 35px;
                background: url(assets/images/login_textBox_normal.png) no-repeat;
                border: none;
                font-size: 14px;
                line-height: 30px;
                padding: 0 7px 0 7px;
            }
            #selectContainer
            {
                display: inline-block;
                background: url(assets/images/login_select_normal.png);
                width: 168px;
                height: 35px;
            }
            #lisLogin
            {
                border: none;
                width: 150px;
                font-family: "微软雅黑" , "宋体";
                margin-left: 10px;
                margin-top: 5px;
            }
            #txtUserName, #txtUserPwd
            {
                padding-left: 10px;
            }
            /* select  开始*/
            #mySelect, #mapSelect
            {
                width: 167px;
                position: absolute;
            }
            #mySelect
            {
                left: 78px;
                top: 142px;
                z-index: 1;
            }
            #mapSelect
            {
                left: 80px;
                top: 165px;
            }
            #myOptionText, #mapOptionText
            {
                font-family: "微软雅黑" , "宋体";
                cursor: pointer;
                background: url(assets/images/login_select_normal.png) no-repeat;
                height: 35px;
                line-height: 35px;
                text-align: center;
                margin-left: -4px;
                margin-top: -3px;
            }
            #myOption, #mapOption
            {
                width: 165px;
                position: absolute;
                left: 3px;
                top: 28px;
            }
            #myOptionTop, #mapOptionTop
            {
                background: url(assets/images/login_select_top.png) no-repeat;
                width: 165px;
                height: 12px;
                position: absolute;
                top: 0px;
                margin-left: -4px;
            }
            #myOptionMiddle, #mapOptionMiddle
            {
                background: url(assets/images/login_select_middle.png) repeat-y;
                width: 165px;
                position: absolute;
                top: 12px;
                height: auto;
                overflow: hidden;
                margin-left: -4px;
            }
            #listOption, #listOptionMap
            {
                list-style-type: none;
                margin: 0px;
                width: 165px;
            }
            #listOption li, #listOptionMap li
            {
                margin-left: 5px;
                padding-left: -5px;
                height: 30px !important;
            }
            #listOption li a, #listOptionMap li a
            {
                width: 153px;
                height: 27px;
                line-height: 27px;
                display: inline-block;
                text-decoration: none;
                text-align: center;
                color: Black;
                font-family: "微软雅黑" , "宋体";
            }
            .liOptChked
            {
                background: url(assets/images/login_select_bg.gif) no-repeat;
            }
            #myOptionBottom, #mapOptionBottom
            {
                background: url(assets/images/login_select_bottom.png) no-repeat;
                width: 165px;
                height: 14px;
                position: absolute;
                margin-left: -4px;
            }
            #myOptionBottom
            {
                top: 102px
            }
            #mapOptionBottom
            {
                top: 69px;
            }

            /*选择 结束*/


            #login_button
            {
                width: 100px;
                height: 34px;
                background: url(assets/images/login_button.png) 0 0;
                border: none;
                cursor: pointer;
                font-size: 14px;
                font-family: "微软雅黑" , "宋体";
            }

            #login_foot a
            {
                text-decoration: none;
                color: Black;
            }
            #login_foot a:hover
            {
                color: Blue;
                color: #06F;
                text-decoration: underline;
            }

            #login_button:hover
            {
                background: url(assets/images/login_button.png) 0 -34px;
            }
            .inputContainer
            {
                height: 43px;
                margin-bottom: 6px;
            }
            .inputContainer .label
            {
                width: 60px;
                float: left;
                display: inline-block;
                padding-top: 6px;
            }
            .inputContainer .MapChoose
            {
                float: left;
                margin-top: 6px;
                margin-left: 12px;
            }
            a img
            {
                border: none;
            }
            .MapChoose
            {
                margin-top: 15px;
            }
        </style>

        <script language="javascript" type="text/javascript">
            function textBox_hover(WhichId, WhichImg) {
                var obj = document.getElementById(WhichId);
                obj.style.background = "url(assets/images/" + WhichImg + "_hover." + imgType + ") no-repeat";
            }
            function textBox_normal(WhichId, WhichImg) {
                var obj = document.getElementById(WhichId);
                obj.style.background = "url(assets/images/" + WhichImg + "_normal." + imgType + ") no-repeat";
            }
        </script>
        <script language="javascript" type="text/javascript">
            function load() {
                if (GetCookie("txtUserPwd") != null)
                    document.getElementById("txtUserPwd").value = GetCookie("txtUserPwd");

                if (this.window != top) {
                    this.parent.window.location = this.document.URL.toString();
                }
                //initEcAd()
                var layer = $("#HiddenField_icon").val();

                if (layer == "1") {
                    $("#AdLayer1").hide();
                }
                if (layer == "2") {
                    $("#AdLayer2").hide();
                }
            }
            function GetCookie(name) {
                var arg = name + "=";
                var alen = arg.length;
                if (window.document.cookie != null) {
                    var clen = window.document.cookie.length;
                    var i = 0;
                    while (i < clen) {
                        var j = i + alen;
                        if (window.document.cookie.substring(i, j) == arg)
                            return getCookieVal(j);
                        i = window.document.cookie.indexOf(" ", i) + 1;
                        if (i == 0)
                            break;
                    }
                }
                return null;
            }
            function getCookieVal(offset) {
                if (window.document.cookie != null) {
                    var endstr = window.document.cookie.indexOf(";", offset);
                    if (endstr == -1)
                        endstr = window.document.cookie.length;
                }
                return unescape(window.document.cookie.substring(offset, endstr));
            }

            function check() {
                //用户名称
                var txtUserName = document.getElementById("txtUserName").value;
                var re = /()/gi;
                txtUserName = txtUserName.replace(re, "");
                re = /\</gi;
                txtUserName = txtUserName.replace(re, "&lt;");
                if (txtUserName == "") {
                    alert("请输入用户名。");
                    document.getElementById("txtUserName").focus();
                    return false;
                }
                //密码
                var txtUserPwd = document.getElementById("txtUserPwd").value;
                var re = /()/gi;
                txtUserPwd = txtUserPwd.replace(re, "");
                re = /\</gi;
                txtUserPwd = txtUserPwd.replace(re, "&lt;");
                if (txtUserPwd == "") {
                    alert("请输入密码。");
                    document.getElementById("txtUserPwd").focus();
                    return false;
                }
            }
            //在IE6正确显示PNG图片
            //开始
            function correctPNG() {
                for (var i = 0; i < document.images.length; i++) {
                    var img = document.images[i]
                    var imgName = img.src.toUpperCase()
                    if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                        var imgID = (img.id) ? "id='" + img.id + "' " : ""
                        var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                        var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                        var imgStyle = "display:inline-block;" + img.style.cssText
                        if (img.align == "left")
                            imgStyle = "float:left;" + imgStyle
                        if (img.align == "right")
                            imgStyle = "float:right;" + imgStyle
                        if (img.parentElement.href)
                            imgStyle = "cursor:hand;" + imgStyle
                        var strNewHTML = "<span " + imgID + imgClass + imgTitle
                                + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                                + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                                + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                        img.outerHTML = strNewHTML
                        i = i - 1
                    }
                    ;
                }
                ;
            }
            ;
            var imgType = "png";
            //结束

            function initEcAd() {
                document.all.AdLayer1.style.posTop = -200;
                document.all.AdLayer1.style.visibility = 'visible'
                document.all.AdLayer2.style.posTop = -200;
                document.all.AdLayer2.style.visibility = 'visible'
                MoveLeftLayer('AdLayer1');
                MoveRightLayer('AdLayer2');
            }
            function MoveLeftLayer(layerName) {
                var x = 5;
                var y = 100; // 左侧广告距离页首高度
                var diff = (document.body.scrollTop + y - document.all.AdLayer1.style.posTop) * .40;
                var y = document.body.scrollTop + y - diff;
                eval("document.all." + layerName + ".style.posTop = parseInt(y)");
                eval("document.all." + layerName + ".style.posLeft = x");
                setTimeout("MoveLeftLayer('AdLayer1');", 20);
            }
            function MoveRightLayer(layerName) {
                var x = 5;
                var y = 100; // 右侧广告距离页首高度 divcss5 www.divcss5.com
                var diff = (document.body.scrollTop + y - document.all.AdLayer2.style.posTop) * .40;
                var y = document.body.scrollTop + y - diff;
                eval("document.all." + layerName + ".style.posTop = y");
                eval("document.all." + layerName + ".style.posRight = x");
                setTimeout("MoveRightLayer('AdLayer2');", 20);
            }
            //        document.write($("#AdLayer1").innerHtml + $("#AdLayer2").innerHtml);

            //        initEcAd()
        </script>
    </head>
    <body onload="load()">
        <form name="myForm" method="post" id="myForm">


            <style type="text/css">
                /* 左边浮动的CSS*/
                .cleft_b {
                    position: fixed;
                    z-index: 10000;
                }
                .cleft_box {
                    overflow: hidden;
                    width: 282px;
                }
                .cleft_box .cright {
                    background: url("assets/images/CustomerService_ico.png") no-repeat scroll left top transparent !important;
                    cursor: pointer;
                    float: right;
                    height: 121px;
                    width: 102px;
                }
                .cleft_box .cleft  {
                    background: none repeat scroll 0 0 #FFFFFF;
                    float: left;
                    height: 100%;
                    margin-top: 20px;
                    overflow: hidden;
                    padding: 5px;
                    width: 170px;
                }
                .cleft_box_content {
                    background: none repeat scroll 0 0 #EAEAEA;
                    margin: 0;
                    padding: 5px;
                    width: 160px;
                }
                .cheader {
                    background: none repeat scroll 0 0 #D5D5D5;
                    height: 36px;
                    overflow: hidden;
                    padding-top: 6px;
                    width: 160px;
                }
                .cheader .ctitle {
                    background: url("assets/images/mainPNG.png") no-repeat scroll -300px -1026px transparent;
                    height: 26px;
                    margin: 0 auto;
                    width: 108px;
                }
                .qqOnline {
                    background: none repeat scroll 0 0 #D5D5D5;
                    border-bottom: 1px solid #FFFFFF;
                    padding-bottom: 10px;
                    text-align: center;
                    width: 160px;
                }
                .qqOnline li {
                    line-height: 180%;
                    margin: 0 auto;
                    padding-top: 5px;
                }
                .ctel {
                    background: none repeat scroll 0 0 #E1E1E1;
                    width: 160px;
                }
                .ctel_title {
                    background: url("assets/images/mainPNG.png") no-repeat scroll -500px -1015px transparent;
                    height: 35px;
                    margin: 0 auto;
                    width: 121px;
                }
                .ctel ul {
                    padding: 10px 0;
                }
                .ctel li {
                    color: #186591;
                    font-family: "microsoft YaHei";
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 200%;
                    text-align: center;
                    width: 160px;
                }
                ol, ul {
                    list-style: none outside none;
                }
            </style>

            <div onmouseout="toSmall();" class="cleft_b" id="cleft_box"  style="top: 149.9px; left: 1px; position: absolute;">
                <div class="cleft_box">
                    <div onclick="copen();" onmouseover="toBig();" class="cright">
                        <span style="layout-flow: vertical-ideographic"></span>
                    </div>
                    <div onmouseover="toBig();" class="cleft">
                        <div class="cleft_box_content">
                            <div class="cheader">
                                <div onclick="cclose()" class="ctitle png">
                                </div>
                            </div>
                            <div class="qqOnline">
                                <ul id="UcCustomerService1_ul_QQ">

                                </ul>
                            </div>
                            <div class="ctel">
                                <div class="ctel_title png">
                                </div>
                                <ul id="UcCustomerService1_ul_telphone">

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style="clear: both;">
                    </div>
                </div>
            </div>
            <script language="javascript" type="text/javascript">
            /*登录页面左边的联系方式*/
            celive = function(id, _top, _left) {
                var me = id.charAt ? document.getElementById(id) : id, d1 = document.body, d2 = document.documentElement;
                d1.style.height = d2.style.height = '100%';
                me.style.top = _top ? _top + 'px' : 0;
                me.style.left = _left + "px"; //[(_left>0?'left':'left')]=_left?Math.abs(_left)+'px':0;
                me.style.position = 'absolute';
                setInterval(function() {
                    me.style.top = parseInt(me.style.top) + (Math.max(d1.scrollTop, d2.scrollTop) + _top - parseInt(me.style.top)) * 0.1 + 'px';
                }, 10 + parseInt(Math.random() * 20));
                return arguments.callee;
            };
            window.onload = function() {
                celive('cleft_box', 90, -180)
            }
            lastScrollY = 0;

            var InterTime = 1;
            var maxWidth = -1;
            var minWidth = -180;
            var numInter = 18;
            var BigInter;
            var SmallInter;
            var o = document.getElementById("cleft_box");
            var i = parseInt(o.style.left);
            function Big() {
                if (parseInt(o.style.left) < maxWidth) {
                    i = parseInt(o.style.left);
                    i += numInter;
                    o.style.left = i + "px";
                    if (i == maxWidth)
                        clearInterval(BigInter);
                }
            }
            function toBig() {
                clearInterval(SmallInter);
                clearInterval(BigInter);
                BigInter = setInterval(Big, InterTime);
            }
            function Small() {
                if (parseInt(o.style.left) > minWidth) {
                    i = parseInt(o.style.left);
                    i -= numInter;
                    o.style.left = i + "px";

                    if (i == minWidth)
                        clearInterval(SmallInter);
                }
            }
            function toSmall() {
                clearInterval(SmallInter);
                clearInterval(BigInter);
                SmallInter = setInterval(Small, InterTime);
            }
            </script>

            <div id="container" onclick="hideDiv()">
                <div style="height: 100px;" >
                    <a href="http://www.666gps.com" target="_blank">
                        <img style="margin-top: 28px;" src="assets/images/login_logo.png" alt="宜春星唯科技"></a></div>

                <div id="flashDiv" width="900" height="425">
                    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="900" height="425" id="FlashID">
                        <param name="movie" value="assets/images/login.swf">
                            <param name="quality" value="high">
                                <param name="wmode" value="transparent">
                                    <param name="swfversion" value="6.0.65.0">
                                        <!-- 此 param 标签提示使用 Flash Player 6.0 r65 和更高版本的用户下载最新版本的 Flash Player。如果您不想让用户看到该提示，请将其删除。 -->
                                        <param name="expressinstall" value="js/expressInstall.swf">
                                            <!-- 下一个对象标签用于非 IE 浏览器。所以使用 IECC 将其从 IE 隐藏。 -->
                                            <!--[if !IE]>-->
                                            <object type="application/x-shockwave-flash" data="assets/images/login.swf" width="900" height="425">
                                                <!--<![endif]-->
                                                <param name="quality" value="high">
                                                    <param name="wmode" value="transparent">
                                                        <param name="menu" value="false">
                                                            <param name="swfversion" value="6.0.65.0">
                                                                <param name="expressinstall" value="js/expressInstall.swf">
                                                                    <!-- 浏览器将以下替代内容显示给使用 Flash Player 6.0 和更低版本的用户。 -->
                                                                    <div>
                                                                        <h4>
                                                                            此页面上的内容需要较新版本的 Adobe Flash Player。</h4>
                                                                        <p>
                                                                            <a href="http://www.adobe.com/go/getflashplayer">
                                                                                <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="获取 Adobe Flash Player" width="112" height="33"></a></p>
                                                                    </div>
                                                                    <!--[if !IE]>-->
                                                                    </object>
                                                                    <!--<![endif]-->
                                                                    </object>
                                                                    </div>
                                                                    <div id="login_foot">
                                                                        <center>



                                                                            &nbsp;&nbsp;&nbsp;&nbsp;

                                                                            <br>
                                                                                Copyright ©
                                                                                2014
                                                                                <a href="http://www.666gps.com">
                                                                                    南昌星唯科技</a> All rights reserved.
                                                                        </center>
                                                                    </div>
                                                                    <div id="loginDiv_bg">
                                                                        <img src="assets/images/login_inputPanel.png"></div>
                                                                    <div id="loginDiv">
                                                                        <div class="inputContainer">
                                                                            <span class="label">用户名</span>
                                                                            <input name="txtUserName" type="text" value="${lastLoginName}" id="txtUserName" class="login_textBox" onfocus="textBox_hover(this.id, 'login_textBox')" onblur="textBox_normal(this.id, 'login_textBox')" style="background-image: url(assets/images/login_textBox_normal.png); background-position: initial initial; background-repeat: no-repeat no-repeat;">
                                                                        </div>
                                                                        <div class="inputContainer">
                                                                            <span class="label">密码</span>
                                                                            <input name="txtUserPwd" type="password" id="txtUserPwd" class="login_textBox" onfocus="textBox_hover(this.id, 'login_textBox')" onblur="textBox_normal(this.id, 'login_textBox')">
                                                                        </div>
                                                                        <div class="inputContainer" id="myChoose">
                                                                            <span class="label" style="margin-top: 1px;">身份</span>
                                                                            <div id="mySelect">
                                                                                <div id="myOptionText" onclick="selectVisible('myOption');">
                                                                                    驾校登陆
                                                                                </div>
                                                                                <input name="loginType" type="hidden" id="HiddenOptionValue" value="2">
                                                                                    <div id="myOption" onmouseover="isOut = false;" onmouseout="isOut = true;" style="display: none;
                                                                                         z-index: 9999;">
                                                                                        <div id="myOptionTop">
                                                                                        </div>
                                                                                        <div id="myOptionMiddle">
                                                                                            <ul id="listOption">
                                                                                                <li class="liOptChked" onmousemove="selectTextClass(this, 'listOption', 'liOptChked')">
                                                                                                    <a href="javascript:getOptionText('myOption','myOptionText','HiddenOptionValue','驾校登陆','2');">
                                                                                                        驾校登陆 </a></li>
                                                                                                <li onmousemove="selectTextClass(this, 'listOption', 'liOptChked')"><a href="javascript:getOptionText('myOption','myOptionText','HiddenOptionValue','运管登录','1');">
                                                                                                        运管登录</a></li>
                                                                                                <li onmousemove="selectTextClass(this, 'listOption', 'liOptChked')"><a href="javascript:getOptionText('myOption','myOptionText','HiddenOptionValue','管理员登录','0');">
                                                                                                        管理员登录</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div id="myOptionBottom">
                                                                                        </div>
                                                                                    </div>
                                                                            </div>
                                                                        </div>
                                                                        <div id="mapChoose" class="inputContainer" style="display: none;">
                                                                            <span class="label" style="margin-top: 1px;">地图选择</span>
                                                                            <div id="mapSelect">
                                                                                <div id="mapOptionText" onclick="selectVisible('mapOption');">
                                                                                    MapAbc
                                                                                </div>
                                                                                <input name="HiddenMapSelectValue" type="hidden" id="HiddenMapSelectValue" value=" ">
                                                                                    <div id="mapOption" style="display: none;">
                                                                                        <div id="mapOptionTop">
                                                                                        </div>
                                                                                        <div id="mapOptionMiddle">
                                                                                            <ul id="listOptionMap">
                                                                                                <li class="liOptChked" onmousemove="selectTextClass(this, 'listOptionMap', 'liOptChked')">
                                                                                                    <a onclick="radioBtnClick('RadioButMapAbc')" href="javascript:getOptionText('mapOption','mapOptionText','HiddenMapSelectValue','MapAbc','0');">
                                                                                                        MapAbc </a></li>
                                                                                                <li onmousemove="selectTextClass(this, 'listOptionMap', 'liOptChked')"><a onclick="radioBtnClick('RadioButMapBar')" href="javascript:getOptionText('mapOption','mapOptionText','HiddenMapSelectValue','MapBar','1');">
                                                                                                        MapBar </a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div id="mapOptionBottom">
                                                                                        </div>
                                                                                    </div>
                                                                            </div>
                                                                            <div style="display: none;">
                                                                                <span class="MapChoose"><input id="RadioButMapAbc" type="radio" name="Map" value="RadioButMapAbc" checked="checked"><label for="RadioButMapAbc">MapAbc</label></span>
                                                                                <span class="MapChoose"><input id="RadioButMapBar" type="radio" name="Map" value="RadioButMapBar"><label for="RadioButMapBar">MapBar</label></span>
                                                                            </div>
                                                                            <script type="text/javascript">
            //selectOptionID 下拉选项ID;textID 文本ID；valueID 值ID
            function getOptionText(selectOptionID, textID, valueID, txtValue, optionValue) {
                document.getElementById(textID).innerHTML = txtValue;
                document.getElementById(valueID).value = optionValue;
                document.getElementById(selectOptionID).style.display = "none";

            }

            function selectTextClass(currObj, listID, className) {
                var liArr = document.getElementById(listID).getElementsByTagName("li");

                for (var i = 0; i < liArr.length; i++) {
                    liArr[i].className = "";
                    //fireFox
                    if (currObj.innerText == undefined) {
                        if (liArr[i].textContent == currObj.textContent)
                            liArr[i].className = className;
                        else
                            liArr[i].className = "";
                    } else {
                        //IE 
                        if (liArr[i].innerText == currObj.innerText)
                            liArr[i].className = className;
                        else
                            liArr[i].className = "";
                    }
                }
            }
            //selectOptionID 下拉选项ID
            function selectVisible(selectOptionID) {
                if (document.getElementById(selectOptionID).style.display == "none") {
                    document.getElementById(selectOptionID).style.display = "block";
                } else {
                    document.getElementById(selectOptionID).style.display = "none";
                }

                if (selectOptionID == "myOption") {
                    document.getElementById("mapOption").style.display = "none";
                } else {
                    document.getElementById("myOption").style.display = "none";
                }
            }
            //选择地图时,触发选择radiobtn
            function radioBtnClick(RadioButID) {
                document.getElementById(RadioButID).click();
            }
            //点下拉框以外的区域隐藏下拉框
            function hideDiv() {
                if (event.srcElement.id != "myOption" && event.srcElement.id != "myOptionText") {
                    document.getElementById("myOption").style.display = "none";
                }
                if (event.srcElement.id != "mapOption" && event.srcElement.id != "mapOptionText") {
                    document.getElementById("mapOption").style.display = "none";
                }
            }
                                                                            </script>
                                                                        </div>
                                                                        <div class="inputContainer">
                                                                            <span class="label"></span>&nbsp;&nbsp;
                                                                            <input id="CheckBox1" type="checkbox" name="CheckBox1" checked="checked"><label for="CheckBox1"> 保存登录信息</label>
                                                                        </div>
                                                                        <div class="inputContainer">
                                                                            <span class="label"></span>&nbsp;&nbsp;
                                                                            <input type="button" name="login_button" value="登  录" onclick="return check();" id="login_button">
                                                                                &nbsp;<a id="publicServic" href="user-login">在线学习登录</a>
                                                                        </div>
                                                                    </div>
                                                                    </div>

                                                                    "

                                                                    <input type="hidden" name="HiddenField_icon" id="HiddenField_icon" value="0">
                                                                        <input type="hidden" name="_Login" id="_Login" value="old">
                                                                            </form>
                                                                            <script language="javascript" type="text/javascript">
            if (navigator.appName == "Microsoft Internet Explorer") {
                if (navigator.appVersion.indexOf("MSIE 6.0") >= 0) {
                    window.attachEvent("onload", correctPNG);
                    document.getElementById("txtUserName").style.background = "url(assets/images/login_select_normal.gif) no-repeat";
                    document.getElementById("txtUserPwd").style.background = "url(assets/images/login_select_normal.gif) no-repeat";
                    imgType = "gif";
                    document.getElementById("login_button").style.background = "url(assets/images/login_button_hover.gif) 0 0";
                    document.getElementById('txtUserPwd').select();
                    document.getElementById('txtUserName').select();

                }
                else {
                    document.getElementById('txtUserName').select();
                }
            }
            else {
                document.getElementById('txtUserName').select();
            }
            ;
                                                                            </script>


                                                                            </body></html>