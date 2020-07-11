/*
 * @Descripttion
 * @Author leigy<760374213@qq.com>
 * @Date 2020-06-28 14:35:33
 * @LastEditors leigy<760374213@qq.com>
 * @LastEditTime 2020-06-28 14:36:19
 * @Tip 版权所有： 中科空间信息（廊坊）研究院
 * 注意：本内容仅限于中科空间信息（廊坊）研究院内部传阅，禁止外泄以及用于其他的商业目的。
 */
var bxmap = bxmap || {}
bxmap.FlyCesium = {
	cesium: null,
	draw3DObj: null,
	drawHelper: null,
	isDrawFly: false, //设定路线模式
	data: [
		{
			id: '1',
			name: '阳江闸坡',
			geojson:
				'{"orientation":{"heading":0.07372076173362352,"pitch":-1.5574628887292024,"roll":0},"position":{"x":-2205629.231433604,"y":5509184.64306962,"z":2331219.615547844},"geometry":{"type":"LineString","coordinates":[[111.8181532375421,21.57868178213224],[111.81835028960268,21.578460581633188],[111.81832383076255,21.57812489081727],[111.81847943987464,21.577930686377922],[111.81878489838651,21.57765953027421],[111.81916083936886,21.577412646930927],[111.81958489944898,21.57729241143278],[111.82004766614196,21.57718315464893],[111.8206409631356,21.577000552080584],[111.82134398589339,21.576873639989994],[111.8219423400026,21.576726154070943],[111.822467537162,21.576376210912294],[111.82307030263561,21.576058642812292],[111.8237103973151,21.5756704298083],[111.8240924390803,21.575296152837485],[111.82504071801145,21.575766169089448],[111.82603850185104,21.576124273877287],[111.82694738799758,21.576428149353344],[111.82754018969692,21.576728981595224],[111.828099605676,21.57697046673728],[111.82845968318266,21.577307788777407],[111.8287111214647,21.577998110617774],[111.82881328135024,21.578557636789135],[111.82905095574245,21.57877846306897],[111.82918966895863,21.579074053131905],[111.82928422024466,21.579329257594996],[111.82930019172734,21.579630618390876],[111.82966603969574,21.580020790142015],[111.82960868244719,21.580744679418963],[111.82989219533579,21.581251462292837],[111.83013608532544,21.582236343172],[111.83037855800974,21.58254231013029],[111.83032824715998,21.58299431932842],[111.83001717858694,21.583468817164515],[111.8299185766154,21.584290601587544],[111.82948276544901,21.58496623602712],[111.8289749235787,21.58556878427974],[111.82886305199469,21.585776309810406],[111.8287779821505,21.585946333271792],[111.82865496967007,21.586265136888645],[111.82847674720864,21.586438092096014],[111.82845974740698,21.586567373767977],[111.828355170664,21.586736247366822],[111.82830843296874,21.586863152790087],[111.82825365102633,21.58710380271154],[111.82821734971404,21.587138762444976],[111.82817916952548,21.587294814193356],[111.82787759367034,21.587314539280754],[111.82719468513524,21.587237821164194],[111.82672929414602,21.58716013804561],[111.82658494057793,21.587131014021804],[111.82652478882481,21.587094797111455],[111.82647814913857,21.58694770659332],[111.82649812273736,21.58651375697629],[111.82650209141173,21.586517166652694],[111.82650209141173,21.586517166652694]]}}'
		}
	], //漫游路径信息模拟数据
	Init: function (cesium, drawHelper) {
		this.cesium = cesium //cesium对象
		this.drawHelper = drawHelper //drawHelper对象
		this.InitEvent()
		this.loadData()
	},
	InitEvent: function () {
		//飞行路径顶端部分的切换事件
		$('.fly3DPaths_tab li').bind('click', function () {
			$('.fly3DPaths_tab_ul>li').each(function (index) {
				$('.fly3DPaths_tab_ul>li').eq(index).removeClass('select')
			})
			//三角形标识切换
			switch ($(this).index()) {
				case 0: //预设路线
					$('#overFlyClick').addClass('select')
					$('#overFlyPage').css({ display: 'block' })
					$('#drawFlyPage').css({ display: 'none' })
					bxmap.FlyCesium.loadData()
					break
				case 1: //手动绘制
					$('#drawFlyCilck').addClass('select')
					$('#overFlyPage').css({ display: 'none' })
					$('#drawFlyPage').css({ display: 'block' })
					break
			}
		})
		//开始飞行
		$('#start_Fly3DPaths').click(function () {
			//debugger;
			if (bxmap.FlyCesium.draw3DObj) {
				bxmap.FlyCesium.cesium.showFly3DPaths(bxmap.FlyCesium.draw3DObj)
			} else {
				jDialog.dialog({
					title: '提示信息',
					modal: true, // 非模态，即不显示遮罩层
					autoClose: 1500,
					content: '漫游路线不存在'
				})
			}
		})
		//暂停飞行
		$('#pause_Fly3DPaths').click(function () {
			//bxmap.FlyCesium.cesium.pauseFly3DPaths();
			if (bxmap.FlyCesium.draw3DObj) {
				bxmap.FlyCesium.cesium.pauseFly3DPaths()
			} else {
				jDialog.dialog({
					title: '提示信息',
					modal: true, // 非模态，即不显示遮罩层
					autoClose: 1500,
					content: '漫游路线不存在'
				})
			}
		})
		//向前飞行
		$('#playForward_Fly3DPaths').click(function () {
			//bxmap.FlyCesium.cesium.playForwardFly3DPaths();
			if (bxmap.FlyCesium.draw3DObj) {
				bxmap.FlyCesium.cesium.playForwardFly3DPaths()
			} else {
				jDialog.dialog({
					title: '提示信息',
					modal: true, // 非模态，即不显示遮罩层
					autoClose: 1500,
					content: '漫游路线不存在'
				})
			}
		})
		//向后飞行
		$('#playReverse_Fly3DPaths').click(function () {
			//bxmap.FlyCesium.cesium.playReverseFly3DPaths();
			if (bxmap.FlyCesium.draw3DObj) {
				bxmap.FlyCesium.cesium.playReverseFly3DPaths()
			} else {
				jDialog.dialog({
					title: '提示信息',
					modal: true, // 非模态，即不显示遮罩层
					autoClose: 1500,
					content: '漫游路线不存在'
				})
			}
		})
		//退出飞行
		$('#stop_Fly3DPaths').click(function () {
			$('#cesiumFly3DPaths').click()
			bxmap.FlyCesium.cesium.stopFly3DPaths()
		})
		//清空路线
		$('#clear_Fly3DPaths').click(function () {
			bxmap.FlyCesium.cesium.clearFly3DPaths()
			bxmap.FlyCesium.draw3DObj = null
		})

		//设定路线
		$('#draw_Fly3DPaths').click(function () {
			if (!bxmap.FlyCesium.drawHelper) {
				bxmap.FlyCesium.drawHelper = new DrawHelper(bxmap.FlyCesium.cesium.cesiumViewer)
			}
			bxmap.FlyCesium.draw3DObj = bxmap.FlyCesium.cesium.DrawFly3DPaths(bxmap.FlyCesium.drawHelper)
		})
		//保存路线
		$('#save_Fly3DPaths').click(function () {
			if (bxmap.FlyCesium.draw3DObj && bxmap.FlyCesium.isDrawFly) {
				jDialog.dialog({
					title: '保存路线',
					content: '<div><span>名称:</span><input type="text" id="FlyAdd_name" value="' + name + '"></div>',
					width: 300,
					height: 120,
					modal: true, // 非模态，即不显示遮罩层
					buttons: [
						{
							text: '确定',
							handler: function (button, dialog) {
								var draw3DObj = JSON.stringify(bxmap.FlyCesium.draw3DObj) //将JSON对象转化为JSON字符
								var TbFly = { id: Math.random().toString(36).substr(2), name: $('#FlyAdd_name').val(), geojson: draw3DObj }
								bxmap.FlyCesium.data.push(TbFly)
								$('#overFlyClick').click()
								dialog.close()
								bxmap.FlyCesium.cesium.clearFly3DPaths()
								/*var draw3DObj=JSON.stringify(bxmap.FlyCesium.draw3DObj); //将JSON对象转化为JSON字符
                               var TbFly={name:$("#FlyAdd_name").val(),geojson:draw3DObj};
                               //保存三维漫游轨迹
                               $.ajax({
                                   url: GLOBAL.domainRest + "/information/fly/saveOrUpdate",
                                   type: 'post',
                                   async: true,//异步
                                   dataType: 'json',
                                   data:TbFly,
                                   success: function () {
                                       $("#overFlyClick").click();
                                       jDialog.dialog({
                                           title: "提示信息",
                                           modal: true,// 非模态，即不显示遮罩层
                                           autoClose: 1000,
                                           content: "保存成功"
                                       });
                                       dialog.close();
                                       bxmap.FlyCesium.cesium.clearFly3DPaths();
                                   },
                                   error:function () {
                                       jDialog.dialog({
                                           title: "提示信息",
                                           modal: true,// 非模态，即不显示遮罩层
                                           autoClose: 1000,
                                           content: "保存失败"
                                       });
                                   }
                               });*/
							}
						},
						{
							text: '取消',
							handler: function (button, dialog) {
								dialog.close()
							}
						}
					]
				})
			} else {
				jDialog.dialog({
					title: '提示信息',
					modal: true, // 非模态，即不显示遮罩层
					autoClose: 1500,
					content: '设定的漫游路线不存在，请绘制再保存'
				})
			}
		})
	},
	//飞行路径列表表格监听事件
	flyTableOnclick: function () {
		$('#overFly_table td').click(function () {
			var trSeq = $(this).parent().parent().find('tr').index($(this).parent()) //选中的哪行
			var geojson = $('#overFly_table tr:gt(0):eq(' + trSeq + ') td:eq(5)').text() //获取选中行的geojson列值
			var name = $('#overFly_table tr:gt(0):eq(' + trSeq + ') td:eq(0)').text() //获取选中行的name列值
			var id = $('#overFly_table tr:gt(0):eq(' + trSeq + ') td:eq(4)').text() //获取选中行的id列值
			geojson = eval('(' + geojson + ')')
			var tdSeq = $(this).parent().find('td').index($(this)) //选中哪一列
			switch (tdSeq) {
				case 0: //名称
					break
				case 1: //飞行
					bxmap.FlyCesium.draw3DObj = geojson
					bxmap.FlyCesium.cesium.showFly3DPaths(geojson)
					$('#drawFlyCilck').click()
					break
				case 2: //修改
					jDialog.dialog({
						title: '修改路线',
						content: '<div><span>名称:</span><input type="text" id="Fly_name" value="' + name + '"></div>',
						width: 300,
						height: 120,
						modal: true, // 非模态，即不显示遮罩层
						buttons: [
							{
								text: '确定',
								handler: function (button, dialog) {
									bxmap.FlyCesium.data = bxmap.FlyCesium.modifyElement(bxmap.FlyCesium.data, id, $('#Fly_name').val())
									$('#overFlyClick').click()
									dialog.close()
									/*var draw3DObj=JSON.stringify(geojson); //将JSON对象转化为JSON字符
                                    var TbFly={id:id,name:$("#Fly_name").val(),geojson:draw3DObj};
                                    //保存三维漫游轨迹
                                    $.ajax({
                                        url: GLOBAL.domainRest + "/information/fly/saveOrUpdate",
                                        type: 'post',
                                        async: true,//异步
                                        dataType: 'json',
                                        data:TbFly,
                                        success: function () {
                                            jDialog.dialog({
                                                title: "提示信息",
                                                modal: true,// 非模态，即不显示遮罩层
                                                autoClose: 1000,
                                                content: "修改成功"
                                            });
                                            dialog.close();
                                            $("#overFlyClick").click();
                                        },
                                        error:function () {
                                            jDialog.dialog({
                                                title: "提示信息",
                                                modal: true,// 非模态，即不显示遮罩层
                                                autoClose: 1000,
                                                content: "修改失败"
                                            });
                                        }
                                    });*/
								}
							},
							{
								text: '取消',
								handler: function (button, dialog) {
									dialog.close()
								}
							}
						]
					})
					break
				case 3: //删除
					//删除
					jDialog.dialog({
						title: '删除路线',
						modal: true, // 非模态，即不显示遮罩层
						content: '确定要删除该漫游路线?',
						buttons: [
							{
								text: '确定',
								handler: function (button, dialog) {
									bxmap.FlyCesium.data = bxmap.FlyCesium.delElement(bxmap.FlyCesium.data, id)
									$('#overFlyClick').click()
									dialog.close()
									/*$.ajax({
                                        url: GLOBAL.domainRest + "/information/fly/delete/"+id,
                                        type: 'post',
                                        async: true,//异步
                                        dataType: 'json',
                                        //data:id,
                                        success: function () {
                                            $("#overFlyClick").click();
                                            jDialog.dialog({
                                                title: "提示信息",
                                                modal: true,// 非模态，即不显示遮罩层
                                                autoClose: 1000,
                                                content: "删除成功"
                                            });
                                            dialog.close();
                                        },
                                        error:function () {
                                            jDialog.dialog({
                                                title: "提示信息",
                                                modal: true,// 非模态，即不显示遮罩层
                                                autoClose: 1000,
                                                content: "删除失败"
                                            });
                                        }
                                    });*/
								}
							},
							{
								text: '取消',
								handler: function (button, dialog) {
									dialog.close()
								}
							}
						]
					})
					break
			}
		})
	},
	/**
     * 从数组中移除指定的元素,要是存在的话
     @ serviceArray筛选数组
     @ id移除元素id
     */
	delElement: function (serviceArray, id) {
		var array = []
		for (var i = 0; i < serviceArray.length; i++) {
			if (serviceArray[i].id != id) {
				array.push(serviceArray[i])
			}
		}
		return array
	},
	/**
     * 从数组中修改指定的元素,要是存在的话
     @ serviceArray筛选数组
     @ id修改元素id
     @ name修改元素名称
     */
	modifyElement: function (serviceArray, id, name) {
		var array = []
		for (var i = 0; i < serviceArray.length; i++) {
			if (serviceArray[i].id == id) {
				serviceArray[i].name = name
			}
			array.push(serviceArray[i])
		}
		return array
	},
	loadData: function () {
		var data = bxmap.FlyCesium.data
		var html = ''
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var flydata = data[i]
				html +=
					'<tr>' +
					// '<td><input type="checkbox" name="FLYNAME" id="'+flydata.id+'" style="cursor: pointer;" onchange=""></td>'+
					'<td><a style="color:#fff;text-decoration:none;font-size:12px;">' +
					flydata.name +
					'</a></td>' +
					'<td><button class="btn btn-default btn-xs" style="color:#fff;background:none;border:none;">飞行</button></td>' +
					'<td><button class="btn btn-default btn-xs" style="color:#fff;background:none;border:none;">修改</button></td>' +
					'<td><button class="btn btn-default btn-xs" style="color:#fff;background:none;border:none;">删除</button></td>' +
					"<td><a style='color:black;text-decoration:none;font-size:13px;'>" +
					flydata.id +
					'</a></td>' +
					"<td><a style='color:black;text-decoration:none;font-size:13px;'>" +
					flydata.geojson +
					'</a></td>' +
					"<td><a style='color:black;text-decoration:none;font-size:13px;'>" +
					flydata.position +
					'</a></td>' +
					"<td><a style='color:black;text-decoration:none;font-size:13px;'>" +
					flydata.orientation +
					'</a></td>' +
					'</tr>'
			}
			$('#overFly_table tbody').html(html)
			$('#overFly_table').find('td:eq(4)').hide() //隐藏id字段列
			$('#overFly_table').find('td:eq(5)').hide() //隐藏geojson字段列
			$('#overFly_table').find('td:eq(6)').hide() //隐藏position字段列
			$('#overFly_table').find('td:eq(7)').hide() //隐藏orientation字段列
			//表格---行点击事件
			bxmap.FlyCesium.flyTableOnclick()
		}
		//请求三维漫游轨迹
		/*$.ajax({
            url: GLOBAL.domainRest + "/information/fly/queryAll",
            type: 'post',
            async: true,//异步
            dataType: 'json',
            success: function (data) {
                var html=''
                if (data.length>0) {
                    for(var i=0;i<data.length;i++){
                        var flydata=data[i];
                        //flydata.name
                        //flydata.id
                        html+='<tr>'+
                            // '<td><input type="checkbox" name="FLYNAME" id="'+flydata.id+'" style="cursor: pointer;" onchange=""></td>'+
                            '<td><a style="color:#fff;text-decoration:none;font-size:12px;">'+flydata.name+'</a></td>'+
                            '<td><button class="btn btn-default btn-xs" style="color:#fff;">飞行</button></td>'+
                            '<td><button class="btn btn-default btn-xs" style="color:#fff;">修改</button></td>'+
                            '<td><button class="btn btn-default btn-xs" style="color:#fff;">删除</button></td>'+
                            "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.id + "</a></td>" +
                            "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.geojson + "</a></td>" +
                            "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.position + "</a></td>" +
                            "<td><a style='color:black;text-decoration:none;font-size:13px;'>" + flydata.orientation + "</a></td>" +
                            '</tr>';
                    }
                    $("#overFly_table tbody").html(html);
                    $('#overFly_table').find('td:eq(4)').hide();//隐藏id字段列
                    $('#overFly_table').find('td:eq(5)').hide();//隐藏geojson字段列
                    $('#overFly_table').find('td:eq(6)').hide();//隐藏position字段列
                    $('#overFly_table').find('td:eq(7)').hide();//隐藏orientation字段列
                    //表格---行点击事件
                    bxmap.FlyCesium.flyTableOnclick();
                }
                else {
                }
            },
            error:function () {
                jDialog.dialog({
                    title: "提示信息",
                    modal: true,// 非模态，即不显示遮罩层
                    autoClose: 1000,
                    content: "获取漫游路线信息失败"
                });
            }
        });*/
	}
}
