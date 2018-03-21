# foyoflow 单线流程图（路线图） 

- jQuery插件
- 需要支持CSS3、ES6


[查看Demo](https://colormark.github.io/foyoflow/demo/)

---


``` javascript

$("#test").foyoflow({
	//数据
	"roadmaps":[

		{
			"roadmap_id": "xx", //必需唯一
			"label": "付钱",    //标签
			"status": "done",   //状态："todo","waiting","processing","done"
			"flag":  //可选
			{
				"flag_id": "yy", //必需唯一
				"label": "买到", //旗帜标签
				"color": "#03A9F4" //flag颜色
			},
			"timestamp": 1521609065, //完成时间，可选
			"reddot":true, //提示红点，可选
		}
	],
	
	//更多设置
	"lineWidth":100,/*限制宽度(垂直时为高度)，默认不限制*/
	"showIntervalWhenMouseHoverOnLine":true,/*鼠标悬停Line时显示时间差*/ //to-do
	"direction":"row",/*方向，默认column*/
	
	//事件
	"onStepClick":function (step)//步骤小球被点击
	{
		var stepData = step.data("stepData");
		alert(stepData["label"]);
	},
	"onPathClick":function (step)//步骤路径被点击 
	{}
});

//更新数据 
$("#test").foyoflowUpdate(roadmaps);

//更新具体一个步骤的数据
$("#test").foyoflowUpdateStep(roadmap);

//追加一个roadmap
$("#test").foyoflowAppendStep(roadmap);
	
	
```
