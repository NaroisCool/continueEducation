<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="user" value="login" /> 
<s:set name="code" value="codeInfo" /> 
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>        
        <script src="assets/js2/${action}.js" type="text/javascript"></script> 
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
        <script src="assets/js2/user-viewer.js" type="text/javascript"></script>  
        <link rel="stylesheet" href="assets/flipclock/css/flipclock.css">        
        <script src="assets/flipclock/js/flipclock/libs/prefixfree.min.js"></script>
        <script src="assets/flipclock/js/flipclock/flipclock.min.js"></script>
        <link rel="stylesheet" href="assets/flexpaper/css/flexpaper.css">      
        <script src="assets/flexpaper/js/flexpaper.js"></script>
        <script src="assets/flexpaper/js/flexpaper_handlers.js"></script>
        <title>${title}</title>
        <script>
            notRec = ${code.studyIsCompleted};
        </script>
        <style type="text/css">
            .time{
                /*min-width: 477px;*/
                height: 180px;
                padding: 50px 0 0 0;
            }
            .time2{
                height: 210px;
            }
            .dashboard-list span{
                color: #1ea4e3;
                text-align: right;
                font-size: 14px;
                font-weight: bold;
            }
            #inf-timeuser,#inf-timeleft,#inf-iscompleted{
                font-weight: bold;
            }
            #result{
                height: 700px;
            }
            .tips{
                font-size: 30px;
                color: #cccccc;
            }
            #timeIE{
                font-size:80px;
                line-height:120px;
                text-align: center;
            }
            #userpic{
                text-align: center;
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
                    <div class="row-fluid sortable">
                        <div class="box span5">
                            <div class="box-header well">
                                <h2> 本次培训计时</h2>
                            </div>
                            <div class="box-content time">
                                <div id="time" class="hidden">                                  
                                </div>
                                <div id="timeIE">  
                                    00:00:00
                                </div>
                            </div>
                        </div>
                        <div class="box span3">
                            <div class="box-header well">
                                <h2> 学员照片</h2>
                            </div>
                            <div id="userpic" class="box-content time">
                                <img alt="暂无图片" width=119 height=136 src="data:image/jpeg;base64,${avatar}">
                            </div>
                        </div>
                        <div class="box span4">
                            <div class="box-header well">
                                <h2> 培训信息</h2>
                            </div>
                            <div class="box-content time2">
                                <ul class="dashboard-list">
                                    <li>
                                        <span class="span4">学员姓名：</span><a>${user.name}</a>                                        
                                    </li>
                                    <li>
                                        <span class="span4">身份证号：</span><a>${user.idCard}</a>                                        
                                    </li>
                                    <li>
                                        <span class="span4" title="包含现场学时">已训时间：</span><a id="inf-timeuse">${code.studyUseTime} 分钟</a> 
                                    </li>
                                    <li>
                                        <span class="span4">剩余时间：</span><a id="inf-timeleft">${code.studyLeftTime} 分钟</a> 
                                    </li>
                                    <li>
                                        <span class="span4">是否完成：</span>
                                        <a id="inf-iscompleted"><s:if test="#code.studyIsCompleted == true">完成</s:if><s:else>未完成</s:else></a> 
                                        </li>
                                        <!--                                        <li>
                                                                                    <span class="span4">上次培训时间：</span>
                                                                                        <a id="inf-lasttime"><s:if test="#code.lastStudyTime == null">-</s:if><s:else>${code.getLastStudyTimeF()}</s:else></a> 
                                                                                </li>-->
                                        <li>
                                            <span class="span4">上次登录：</span>
                                                <a><s:if test="#user.lastLoginTime == null">-</s:if><s:else>${user.getLastLoginTimeF()}</s:else></a> 
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="box span12">
                                <div class="box-header well">
                                        <h2 id="ms"> ${title}</h2>
                            </div>
                            <div class="box-content">
                                <div id="result">
                                    <span class="tips">左边选择培训资料开始<span>
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
