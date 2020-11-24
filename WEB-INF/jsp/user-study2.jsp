<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="user" value="login" />
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/const.js" type="text/javascript"></script>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>
        <script type="text/javascript" src="assets/splayer/splayer/splayer.js" charset="utf-8"></script>
        <%--<script src="assets/webcam/jquery.webcam.min.js" type="text/javascript"></script>--%>
        <title>${title}</title>
        <style type="text/css">
            #result{
                height: 800px;
            }
            #title{
                text-align: center; font-size: 13px;line-height: 26px;
            }
            #title span{
                color: #0B90C4;
            }
            #webcam {z-index: 9999;}
        </style>
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-user.jspf" %>
                <div id="content" class="span12" style="width: 1000px">

                        <div class="row-fluid">
                            <div class="box span12">
                                <div id="title" class="well">
                                    【姓名：${user.name}，身份证号：${user.idCard} 】   总进度：<span id="tp">%</span>  已学<span id="th"></span>课时，剩余<span id="tl"></span>课时
                            </div>
                            <div class="box-content">
                                <div style="text-align: center;font-size: 17px;padding: 20px 0 10px 0;">个人所学课程</div>
                                <div style="color: #61b0df;padding: 5px;">全国道路运输驾驶员继续教育网络平台,道路货物运输共
                                    <span style="color: red">24</span>学时,总时长<span style="color: red">1445</span>分钟</div>
                                <div id="result">
                                            </div>
                                <div id="playBox" class="modal fade static" style="width: 990px;top:40%;left: 32%;">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h3>学习中</h3>
                                    </div>
                                    <div class="modal-body" style="max-height: 550px;">
                                        <div id="a1"></div>
                                        <%--<div id="webcam">--%>
                                        </div>
                                    </div>

                                </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>

                                            </div>
                                            </div>
                                            </div>
                                            <%@include file="../jspf/foot.jspf" %>
                                            </body>
                                            </html>
