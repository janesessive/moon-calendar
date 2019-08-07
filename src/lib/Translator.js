const translate = (name) => {
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

export default translate;

