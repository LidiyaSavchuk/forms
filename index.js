document.getElementById('question-save').addEventListener('click', function (){
	var title=document.getElementById('question-title').value
	var question={'title': title}
	firebase.database().ref('users/test/form/1').set(question,onSaveComplete)
	
	document.getElementById('loader').setAttribute('style', 'display:block')
	
});
firebase.database().ref('users/test/form/1').on('value', onLoad)
function onLoad(snapshot){
	var question=snapshot.val()
	document.getElementById('question-title').value=question.title

}
function onSaveComplete(err){
	if(err){
		document.getElementById('message').innerText='Ошибка при сохранении'
		
	}else{
		document.getElementById('message').innerText='Вопрос сохранен!'
	
	}
	document.getElementById('loader').setAttribute('style', 'display:none')
}
document.getElementById('about-save').addEventListener('click', function (){
	var title1=document.getElementById('about-title').value
	var about={'title1': title1}
	firebase.database().ref('users/test/profile/about').set(about,onSave)
	document.getElementById('loader').setAttribute('style', 'display:block')
});
firebase.database().ref('users/test/profile/about').on('value', onLoading)
function onLoading(snapshot){
	var about=snapshot.val()
	document.getElementById('about-title').value=about.title1
}
function onSave(err){
	if(err){
		document.getElementById('message').innerText='Ошибка при сохранении'
	}else{
		document.getElementById('message').innerText='Данные сохранены!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none')
}
