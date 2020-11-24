<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script> 
        <title>${title}</title>
        <style type="text/css">
            .time{
                /*min-width: 477px;*/
                /*height: 180px;*/
                padding: 30px;
            }
            .time ul li{
                margin-bottom: 10px;
            }
            [name="reserve"]{
                margin-bottom: 0;
                
            }
        </style>
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-user.jspf" %>
                <div id="content" class="span10">  
                    <%@include file="../jspf/site.jspf" %>                      
                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <h2> 重要说明</h2>
                            </div>
                            <div class="box-content time">
                                <ul class="unstyled">
                                    <li>一、道路运输驾驶员继续教育每个学习周期（两年）远程网络自学必须完成18学时，现场课堂学习6学时。</li>
                                    <li>二、学员报名后即可进行远程网络自学，并根据自身情况在网上进行现场课堂教学学习时段预约，系统提供一次预约现场课堂教学时段更改机会，但必须在所预约时段的两天之前更改。</li>
                                    <li>三、江西交通学院继续教育培训基地：<br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、报名地点：江西交院驾校（南昌市经开区江西交通职业技术学院内）<br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、授课地点：学院内第一教学楼西北阶梯教室<br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、联系电话:0791-83804579<br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4 、市内乘703、704、210、240、232、223路公交到昌北下罗站向前100米，右转后直行300米到交通学院（西门）；
                                    </li>
                                    <li>开车走庐山南大道往英雄大桥方向行驶200米即到交通学院（南门），或者市内过英雄大桥后1.5公里即到交通学院（右边）。</li>
                                    <li id="tip" style="text-align: center;margin-top: 40px">
                                        
                                    </li>
                                    <li style="text-align: center;margin-top: 40px">
                                        <input type="text" class="input-medium" name="reserve">
                                        <a id="order" class="btn btn-small" name="class"> 我要预约</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
