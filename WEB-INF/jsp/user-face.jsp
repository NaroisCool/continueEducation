<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="user" value="login"/>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="assets/plugin/jquery/jquery.js" type="text/javascript"></script>
    <script src="assets/webcam/jquery.webcam.min.js" type="text/javascript"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <script src="assets/js/exif.js"></script>
    <script src="assets/js2/const.js" type="text/javascript"></script>
    <title>道路运输从业人员继续教育培训网</title>

    <script type="text/javascript">

        var flashObj = void(0) != (function () {
                    if (typeof window.ActiveXObject != "undefined") {
                        return new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    } else {
                        return navigator.plugins['Shockwave Flash'];
                    }
                })();

        // @param {string} img 图片的base64
        // @param {int} dir exif获取的方向信息
        // @param {function} next 回调方法，返回校正方向后的base64
        function getImgData(img,dir,next){
            var image=new Image();
            image.onload=function(){
                var degree=0,drawWidth,drawHeight,width,height;
                drawWidth=this.naturalWidth;
                drawHeight=this.naturalHeight;
                //以下改变一下图片大小
                var maxSide = Math.max(drawWidth, drawHeight);
                if (maxSide > 1024) {
                    var minSide = Math.min(drawWidth, drawHeight);
                    minSide = minSide / maxSide * 1024;
                    maxSide = 1024;
                    if (drawWidth > drawHeight) {
                        drawWidth = maxSide;
                        drawHeight = minSide;
                    } else {
                        drawWidth = minSide;
                        drawHeight = maxSide;
                    }
                }
                var canvas=document.createElement('canvas');
                canvas.width=width=drawWidth;
                canvas.height=height=drawHeight;
                var context=canvas.getContext('2d');
                //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
                switch(dir){
                        //iphone横屏拍摄，此时home键在左侧
                    case 3:
                        degree=180;
                        drawWidth=-width;
                        drawHeight=-height;
                        break;
                        //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                    case 6:
                        canvas.width=height;
                        canvas.height=width;
                        degree=90;
                        drawWidth=width;
                        drawHeight=-height;
                        break;
                        //iphone竖屏拍摄，此时home键在上方
                    case 8:
                        canvas.width=height;
                        canvas.height=width;
                        degree=270;
                        drawWidth=-width;
                        drawHeight=height;
                        break;
                }
                //使用canvas旋转校正
                context.rotate(degree*Math.PI/180);
                context.drawImage(this,0,0,drawWidth,drawHeight);
                //返回校正图片
                next(canvas.toDataURL("image/jpeg",1));
            }
            image.src=img;
        }


        function compressLoad(){
            var src = compress(document.getElementById('webcamImg2'), 100).src;
            $('#webcamImg').attr("src", src).show();
        }

        function compress(source_img_obj, quality) {
            var w = source_img_obj.width,h = source_img_obj.height;
            var mime_type = "image/jpeg";
            var cvs = document.createElement('canvas');
            if (w <= 320 && h <= 240) {
                return source_img_obj;
            } else {
                if (w > h) {
                    cvs.width = 320;
                    cvs.height = h / w * 240;
                } else {
                    cvs.height = 240;
                    cvs.width = w / h * 320;
                }
            }

            var ctx = cvs.getContext("2d");
            ctx.drawImage(source_img_obj, 0, 0, cvs.width, cvs.height);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        }

        $(document).ready(function () {
            alert('若不是本人拍照，本次学习所有学时全部作废！');
            if (flashObj) {
                var pos = 0, image = [];
                $('#webcam').html('');

                jQuery("#webcam").webcam({
                    width: 320,
                    height: 240,
                    mode: "callback",
                    swffile: "assets/webcam/jscam_canvas_only.swf", // canvas only doesn't implement a jpeg encoder, so the file is much smaller

                    onSave: function (data) {
                        image.push(data);
                        pos += 4 * 320;
                        if (pos >= 4 * 320 * 240) {
                            validate(image.join('|'));
                            pos = 0;
                            image = [];
                        }
                    },

                    onCapture: function () {
                        webcam.save();
                    }
                });

                $('#faceLogin').click(function () {
                    $('#faceLogin').attr("disabled", "disabled");
                    $('#faceMsg').text("正在比对...")
                    webcam.capture();
                });
            } else {
                $('#faceLogin').click(function () {
                    $('#faceLogin').attr("disabled", "disabled");
                    $('#faceMsg').text("正在比对...")
                    validate($('#webcamImg').attr("src"));
                });

                $('#webcamFile').change(function () {
                    var file = this.files[0];
                    var orientation,date;
                    EXIF.getData(file,function(){
                        orientation=EXIF.getTag(this,'Orientation');
//                        alert(EXIF.pretty(this));
                        date=EXIF.getTag(this,'DateTimeOriginal');
                    });
                    var reader = new FileReader(),dt;
                    reader.onload = function (e) {
                        if(navigator.userAgent.match(/iphone/i)){
                            if(orientation == void 0 || date != void 0){
                                alert('请使用拍照')
                                location.reload();
                            }
                            getImgData(this.result,orientation,function(data){
                                $('#webcamImg2').attr("src", data);
                            });
                        }
//                        else if(navigator.userAgent.match(/android/i)){
//                            if( date == void 0 || 1000<(new Date() - new Date(date.replace(':','/').replace(':','/')))){
//                                alert('请使用拍照')
//                                location.reload();
//                            }
//                            $('#webcamImg2').attr("src", this.result);
//                        }
                        else{
                            $('#webcamImg2').attr("src", this.result);
                        }
                        $('#webcamBtn').hide();
                    }
                    reader.readAsDataURL(file);
                });
            }

            function validate(face) {
                $.post('action-user-face-validate', {face: face}, function (ret) {
                    $('#faceMsg').text("")
                    if (ret.resultCode === '0' || ret.resultCode === 0) {
                        // if (window.location.hash == '#play') {
                        //     $.cookie("faceScc", $.cookie("studyId"));
                        //     $.cookie("studyId", null);
                        //     window.location.href = "user-study" + window.location.hash;
                        // } else if (window.location.hash == '#exam') {
                        //     window.location.href = "user-exam";
                        // } else {
                            window.location.href = "user-study";
                        // }

                    } else {
                        alert(retcode[ret.resultCode]);
                        $('#faceLogin').removeAttr("disabled");
                    }
                });
            }

        });
    </script>
    <style type="text/css" media="all">
        body {
            background: #cfe7ff url(assets/images/bg.jpg) repeat-x 0 0;
            overflow: hidden;
        }

        #webcam {
            z-index: 9999;
            position: absolute;
            top: 178px;
            left: 414px;
            width: 320px;
            height: 240px;
            text-align: center;
        }
    </style>
</head>
<body>
<div>
    <div style="width: 800px; height: 567px; background: url('assets/images/face.png') 0px 50% no-repeat;"></div>
    <table style="background-color:white;position: absolute;top:135px;left: 40px;width: 260px;height: 391px;font-weight: bold">
        <tbody>
        <tr style="height: 30px;">
            <td style=" color: blue;">姓名:</td>
        </tr>
        <tr style="height: 30px">
            <td style="padding-left: 30px;color: green;">${user.name}</td>
        </tr>
        <tr style="height: 30px;">
            <td style=" color: blue">身份证号:</td>
        </tr>
        <tr style="height: 30px">
            <td style="padding-left: 30px;color: green;">${user.idCard}</td>
        </tr>
        <tr style="height: 30px">
            <td style=" color: red;">脸部对比照</td>
        </tr>
        <tr>
            <td style="padding-left: 30px;"><img id="face" src="data:image/jpeg;base64,${avatar}"
                                                 style="width:180px;height:200px"></td>
        </tr>
        </tbody>
    </table>
    <div id="webcam">
        <%--<img id="webcamImg" src="" width="320" height="240" style="display: none">--%>
        <img id="webcamImg" src="" style="display: none">
        <img id="webcamImg2" src="" style="display: none" onload="compressLoad()">
        <input id="webcamBtn" type="button" value="点击采集图像" onclick="webcamFile.click()"
               style="margin-top: 80px;height: 80px;width: 160px; font-size: 20px;">
        <input id="webcamFile" type="file" accept="image/*" capture="camera" style="display:none">

    </div>
    <label id="faceMsg" style="position:absolute;top: 428px;left: 414px;font-size: 11px;color: gray;"></label>
    <button id="faceLogin"
            style="position:absolute;top: 475px;left: 508px;background-image: url('assets/images/btnFace.png');width: 126px;height: 39px;"></button>
</div>

</body>
</html>
