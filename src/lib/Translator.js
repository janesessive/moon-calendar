export const translateSign = (name) => {
   var data = [];
        data['Mesha']='Овен';
        data['Vrushabha']='Телец';
        data['Mithuna']='Близнецы';
        data['Karkataka']='Рак';
        data['Simha']='Лев';
        data['Kanya']='Дева';
        data['Tula']='Весы';
        data['Vrushchika']='Скорпион';
        data['Dhanu']='Стрелец';
        data['Makara']='Козерог';
        data['Kumbha']='Водолей';
        data['Meena']='Рыбы';
        
        return data[name];
}

export const translateDay = (name) => {
        var data = [];
        data['Sunday']='Воскресенье';
        data['Monday']='Понедельник';
        data['Tuesday']='Вторник';
        data['Wednesday']='Среда';
        data['Thursday']='Четверг';
        data['Friday']='Пятница';
        data['Saturday']='Суббота';
        
        
        return data[name];
}

export const translateNaks = (name) => {
        var data = [];
        data['Ashwini']='Ашвини';
        data['Bharani']='Бхарани';
        data['Kruthika']='Криттика';
        data['Rohini']='Рохини';
        data['Mrugasira']='Мригашира';
        data['Aarudra']='Ардра';
        data['Punarwasu']='Пунарвасу';
        data['Pushyami']='Пушйами';
        data['Aslesha']='Ашлеша';
        data['Makha']='Магха';
        data['Pubha']='Пурвапхалгуни';
        data['Uttara']='Уттарапхалгуни';
        data['Hasta']='Хаста';
        data['Chitta']='Читра';
        data['Swati']='Свати';
        data['Visakha']='Вишакха';
        data['Anuradha']='Анурадха';
        data['Jyesta']='Джйештха';
        data['Mula']='Мула';
        data['Purva-Shada']='Пурвашадха';
        data['Uttara-Shaada']='Уттарашадха';
        data['Sravanam']='Шравана';
        data['Dhanista']='Дхаништха';
        data['Satabhisham']='Сатабхиша';
        data['Purva-Bhadra']='Пурвабхадра';
        data['Uttara-Bhadra']='Уттарабхадра';
        data['Revathi']='Ревати';
             
             return data[name];
     }

     export const translateTithi = (name) => {
        var data = [];
        data['Padyami*']='Шукла Пратипад(1й↑)';
        data['Vidhiya']='Шукла Двитйа(2й↑)';
        data['Thadiya']='Шукла Тритйа(3й↑)';
        data['Chavithi']='Шукла Чатуртхи(4й↑)';
        data['Panchami']='Шукла Панчами(5й↑)';
        data['Shasti']='Шукла Шаштхи(6й↑)';
        data['Sapthami']='Шукла Саптами(7й↑)';
        data['Ashtami']='Шукла Аштами(8й↑)';
        data['Navami']='Шукла Навами(9й↑)';
        data['Dasami']='Шукла Дашами(10й↑)';
        data['Ekadasi']='Шукла Экадаши(11й↑)';
        data['Dvadasi']='Шукла Двадаши(12й↑)';
        data['Trayodasi']='Шукла Трайодаши(13й↑)';
        data['Chaturdasi']='Шукла Чатурдаши(14й↑)';
        data['Punnami']='Пурнима(Полнолуние)';
        data['Padyami']='Кришна Пратипад(1й↓)';
        data['Vidhiya']='Кришна Двитйа(2й↓)';
        data['Thadiya']='Кришна Тритйа(3й↓)';
        data['Chaviti']='Кришна Чатуртхи(4й↓)';
        data['Panchami']='Кришна Панчами(5й↓)';
        data['Shasti']='Кришна Шаштхи(6й↓)';
        data['Sapthami']='Кришна Саптами(7й↓)';
        data['Ashtami']='Кришна Аштами(8й↓)';
        data['Navami']='Кришна Навами(9й↓)';
        data['Dasami']='Кришна Дашами(10й↓)';
        data['Ekadasi']='Кришна Экадаши(11й↓)';
        data['Dvadasi']='Кришна Двадаши(12й↓)';
        data['Trayodasi']='Кришна Трайодаши(13й↓)';
        data['Chaturdasi']='Кришна Чатурдаши(14й↓) ';
        data['Amavasya']='Амавашья(Новолуние)';
        
             return data[name];
     }


     export const translateKarana = (name) => {
        var data = [];
        data['Bawa']='Бава';
        data['Balava']='Балава';
        data['Kaulava']='Каулава';
        data['Taitula']='Таитила';
        data['Garaja']='Гариджа';
        data['Vanija']='Ваниджа';
        data['Vishti']='Вишти';
        data['Sakuna']='Шакуни';
        data['Chatushpada']='Чатушпада';
        data['Nagava']='Нага';
        data['Kimstughana']='Кимстугхна';
        
        
        return data[name];
}

export const translateYoga = (name) => {
        var data = [];
        data['Vishkambha']='-Вишкумбха';
        data['Prithi']='Притхи';
        data['Ayushman']='Айушман';
        data['Saubhagya']='Саубхагйа';
        data['Sobhana']='Собхана';
        data['Atiganda']='-Атиганда';
        data['Sukarman']='Сукарман';
        data['Dhrithi']='Дхридхи';
        data['Soola']='-Шула';
        data['Ganda']='-Ганда';
        data['Vridhi']='Вридхи';
        data['Dhruva']='Дхрува';
        data['Vyaghata']='-Вйагхат';
        data['Harshana']='-Харшана';
        data['Vajra']='-Ваджра';
        data['Siddhi']='Сидхи';
        data['Vyatipata']='-Вйатипат';
        data['Variyan']='Варийан';
        data['Parigha']='-Паригха';
        data['Siva']='Шива';
        data['Siddha']='Сидха';
        data['Sadhya']='Садха';
        data['Subha']='Субха';
        data['Sukla']='Шукла';
        data['Bramha']='Брамха';
        data['Indra']='Индра';
        data['Vaidhruthi']='-Вайдхрити';
 
       return data[name];
}
