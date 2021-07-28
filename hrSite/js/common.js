var dahuotu = {
	link_jump: function(id, num)
	{
		//平滑跳转
		console.log(id);
		// 定义将要去的描点位置
		if(num == 0)
		{
			var pos = $(id).offset().top;
		}
		else
		{
			var pos = $(id).offset().top - num;
		}
		// 实现平滑移动 1000代表时间ms
		$("html,body").animate(
		{
			scrollTop: pos
		}, 1000);
	},
	link_parentjump: function(fid, id)
	{
		//平滑跳转
		console.log(id);
		console.log(fid);
		console.log($(id).offset().top);
		$(fid).scrollTop(-($(id).offset().top));
		// 定义将要去的描点位置
		var pos = $(id).offset().top - 50;
		// 实现平滑移动 1000代表时间ms
		$(fid).scrollTop(pos);
	},
	layer_msg: function(msg)
	{
		//弹出层
		layer.open(
		{
			content: msg,
			skin: 'msg',
			time: 2
		});
	},
	layer_endmsg: function(msg, fn)
	{
		//弹出提示层后执行效果
		layer.open(
		{
			content: msg,
			skin: 'msg',
			time: 2,
			end: fn
		});
	},
	from_reg: function(v, reg, msg)
	{
		//表单验证合理性提示
		var flag = true;
		if(!reg.test(v))
		{
			dahuotu.layer_msg(msg);
			flag = false;
		}
		return flag;
	},
	from_search: function(content, keyWord)
	{
		var keyWordArr = keyWord.replace(/[\s]+/g, ' ').split(' ');
		var re;
		for(var n = 0; n < keyWordArr.length; n++)
		{
			//re = new RegExp(">[\s\S]*?"+keyWordArr[n]+"[\s\S]*?<\S","gmi");
			re = new RegExp("" + keyWordArr[n] + "", "gmi");
			content = content.replace(re, '<span style="color:#0f0;background-color:#ff0">' + keyWordArr[n] + '</span>');
		}
		return content;
	},
	button_downtime: function(id, time, text)
	{
		//验证码倒计时
		var count = time;
		var countdown = setInterval(count_downtime, 1000);

		function count_downtime()
		{
			$(id).attr("disabled", true);
			$(id).val(count + "秒后重新发送");
			if(count == 0)
			{
				$(id).val(text).removeAttr("disabled");
				clearInterval(countdown);
			}
			count--;
		}
	},
	get_urlpara: function(key)
	{
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
		var r = location.search.substr(1).match(reg);
		if(r != null)
			return unescape(r[2]);
		else
			return null;
	},
	get_nowformatdate: function()
	{
		//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();

		if(month >= 1 && month <= 9)
		{
			month = "0" + month;
		}
		if(day >= 0 && day <= 9)
		{
			day = "0" + day;
		}
		if(hours >= 0 && hours <= 9)
		{
			hours = "0" + hours;
		}
		if(minutes >= 0 && minutes <= 9)
		{
			minutes = "0" + minutes;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + day +
			" " + hours + seperator2 + minutes;
		return currentdate;
	},
	compare_date: function(d1, d2)
	{
		return((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
	},
	format_date: function(date, format)
	{
		console.log(date);
		//日期格式转换成字符串格式 dahuotu.format_date("2010-4-29 1:50:00", "yyyy-MM-dd HH:mm:ss");
		if(!date) return;
		if(!format) format = "yyyy-MM-dd";
		switch(typeof date)
		{
			case "string":
				date = new Date(date.replace(/-/, "/"));
				break;
			case "number":
				date = new Date(date);
				break;
		}
		if(!date instanceof Date) return;
		var dict = {
			"yyyy": date.getFullYear(),
			"M": date.getMonth() + 1,
			"d": date.getDate(),
			"H": date.getHours(),
			"m": date.getMinutes(),
			"s": date.getSeconds(),
			"MM": ("" + (date.getMonth() + 101)).substr(1),
			"dd": ("" + (date.getDate() + 100)).substr(1),
			"HH": ("" + (date.getHours() + 100)).substr(1),
			"mm": ("" + (date.getMinutes() + 100)).substr(1),
			"ss": ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function()
		{
			return dict[arguments[0]];
		});
	},

}