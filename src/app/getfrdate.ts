export class GetFrDate {
    GetFrDateNow(){
      var d1 = Date.now();
      var date = new Date(d1);
      var localfr = date.toLocaleString('fr-FR',{
          weekday: 'long',
          day: 'numeric',
          year: 'numeric',
          month: 'numeric',
          minute: 'numeric',
          hour:'numeric',
          second:'numeric',
      });
      return localfr;
    }
    GetDateOF(d: number){
        var date= new Date(d);
        var localfr = date.toLocaleString('fr-FR',{
            weekday: 'long',
            day: 'numeric',
            year: 'numeric',
            month: 'numeric',
            minute: 'numeric',
            hour:'numeric',
            second:'numeric',
        });
        return localfr;
    }
    GetDateNow(){
        return Date.now();
    }
}