function random(num) {
	return Math.floor(Math.random() * num);
}
var types = ['add10', 'sub10', 'add20', 'sub20', 'add20_1', 'sub20_1'];

var g_begintime;
var g_timeId=0;
var g_timeResult = document.getElementById('time');

var createQuestion = {};

function isSame(result,num1,num2) {
	for (var i = result.length - 1; i >= 0; i--) {
		if((result[i].number[0] == num1) && (result[i].number[1] == num2)) return true;
	}
	return false;
}

createQuestion.add10 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(10);
		var num2 = random(10);
		if ((num1 + num2) <= 10) {
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "＋" + num2 + "=",
				answer: num1 + num2
			});
		}
	}
	console.info(result);
	return result;
};

createQuestion.add20 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(10);
		var num2 = random(10);
		if ((num1 + num2) <= 10) {
			if(random(2)===0) {
				num1+=10;
			}else {
				num2+=10;
			}
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "＋" + num2 + "=",
				answer: num1 + num2
			});
		}
	}
	return result;
};

createQuestion.add20_1 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(20);
		var num2 = random(20);
		if ((num1 + num2) <= 20) {
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "＋" + num2 + "=",
				answer: num1 + num2
			});
		}
	}
	console.info(result);
	return result;
};

createQuestion.sub10 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(10);
		var num2 = random(10);
		if (num1 < num2) {
			var tmp = num1;
			num1 = num2;
			num2 = tmp;
		}
		if ((num1 - num2) >= 0) {
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "－" + num2 + "=",
				answer: num1 - num2
			});
		}
	}
	console.info(result);
	return result;
};

createQuestion.sub20 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(10);
		var num2 = random(10);
		if (num1 < num2) {
			var tmp = num1;
			num1 = num2;
			num2 = tmp;
		}
		if ((num1 - num2) >= 0) {
			num1+=10;
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "－" + num2 + "=",
				answer: num1 - num2
			});
		}
	}
	console.info(result);
	return result;
};

createQuestion.sub20_1 = function(count) {
	var result = [];

	while (result.length < count) {
		var num1 = random(20);
		var num2 = random(20);
		if (num1 < num2) {
			var tmp = num1;
			num1 = num2;
			num2 = tmp;
		}
		if ((num1 - num2) >= 0) {
			if(isSame(result,num1,num2)) continue;
			result.push({
				number: [num1, num2],
				display: num1 + "－" + num2 + "=",
				answer: num1 - num2
			});
		}
	}
	console.info(result);
	return result;
};


document.getElementById('start').onclick = function() {

	var result = [];
	for (var i = 0; i < types.length; i++) {
		if (document.getElementById(types[i]).checked) {
			var count = parseInt(document.getElementById(types[i] + "_count").value, 10);
			if (count > 0) {
				result = result.concat(createQuestion[types[i]](count));
			}
		}
	}
	console.info(result);
	if (result.length > 0) {
		if(document.getElementById('randomList').checked) {
			randomResult(result);
		}
		showQuestion(result);
		
		startTime();
	} else {
		alert("请设置题目类型和数量！");
	}
};

function addZone(m) {
	if(m<10) {
		return "0"+m;
	}
	return m;
}

function time2str(seconds) {
	var s = seconds % 60;
	var m = Math.floor(seconds/60);
	return addZone(m)+":"+addZone(s);
}

function startTime() {
	if(g_timeId) clearInterval(g_timeId);
	g_begintime = Date.now();
	g_timeResult.innerText="00:00";
	g_timeId = setInterval(function(){
		var seconds = Math.floor((Date.now() - g_begintime)/1000);
		console.info(seconds);
		g_timeResult.innerText = time2str(seconds);
	},500);
}

function stopTime() {
	clearInterval(g_timeId);
	g_timeId = 0;
}

function randomResult(result) {
	for (var i = 0; i < 20; i++) {
		var index1 = random(result.length);
		var index2 = random(result.length);
		if(index1 != index2) {
			var tmp = result[index1];
			result[index1] = result[index2];
			result[index2] = tmp;
		}
	}
}

function showQuestion(result) {
	document.getElementById('main').style.display = 'none';
	document.getElementById('answerDiv').style.display = 'block';
	document.getElementById('resultDiv').style.display = 'none';		
	var htmls = [];
	for (var i = 0; i < result.length; i++) {
		var question = result[i];
		var html = "<li> " + question.display + " <input type='number' index='"+i+"' answer='" + question.answer + "' /> <span id='result_"+i+"'></span>" + "</li>";
		htmls.push(html);
	}
	document.getElementById('questions').innerHTML = htmls.join('');
}

document.getElementById('submitQuestion').onclick = function() {
	document.getElementById('main').style.display = 'none';
	document.getElementById('answerDiv').style.display = 'block';
	document.getElementById('resultDiv').style.display = 'block';	
	stopTime();

	var answers = document.querySelectorAll("#questions input");
	var count = 0,
		right = 0;
	count = answers.length;
	for (var i = answers.length - 1; i >= 0; i--) {
		var resultSpan = document.getElementById('result_'+answers[i].getAttribute('index'));
		var answer = answers[i].value;
		console.info(answer, answers[i].getAttribute('answer'));
		if (answer == answers[i].getAttribute('answer')) {
			right++;
			resultSpan.innerHTML='√';
			resultSpan.style.color='green';
		} else {
			resultSpan.innerHTML='×';
			resultSpan.style.color='red';
		}
	}
	var score = Math.floor(right * 100 / count);
	document.getElementById('result').innerHTML = "总共"+count+"题，答对"+right+ "题，得分：" + score;
};

document.getElementById('gotoHome').onclick = function() {
	stopTime();
	document.getElementById('main').style.display = 'block';
	document.getElementById('answerDiv').style.display = 'none';
	document.getElementById('resultDiv').style.display = 'none';
}