// ------------------------------Navbar--------------------------------------
var open =true;
var city;
var colorVal;
$("#navBtn").click(function(){
    showNav(open)
});

$("#okBtn").click(function(){
    
    var valCity=$("#lockCity").val();

    if(valCity==0)
    {
        showNav(false);
    }
    else
    {    
        city = $("#lockCity").val();
        main(true)
        localStorage.removeItem('setCity');
        localStorage.setItem('setCity', city);  
        showNav(false);
    }
});

$("#btn1").click(function(){
    localStorage.removeItem('setColor');
    localStorage.setItem('setColor', '1'); 
    $("#btn1").addClass('active');
    $("#btn2").removeClass('active');
    $("#btn3").removeClass('active');
    pageColor('#622569', '#6b5b95');
});
$("#btn2").click(function(){
    localStorage.removeItem('setColor');
    localStorage.setItem('setColor', '2'); 
    $("#btn2").addClass('active');
    $("#btn1").removeClass('active');
    $("#btn3").removeClass('active');
    pageColor('#4d454e', '#75726d');
});
$("#btn3").click(function(){
    localStorage.removeItem('setColor');
    localStorage.setItem('setColor', '3'); 
    $("#btn3").addClass('active');
    $("#btn2").removeClass('active');
    $("#btn1").removeClass('active');
    pageColor('#da4fa2', '#d173b5');
});

const showNav = (a)=>{
    if(a==true)
    {
        $(".navContent").attr({'hidden' : false});
        open = false;
        $("#okBtn").attr({'hidden' : false});
        $(".rotate").addClass("rotated");   
    }
    else 
    {
        $(".navContent").attr({'hidden' : true});
        open =true;
        $("#okBtn").attr({'hidden' : true});
        $(".rotate").removeClass("rotated");
    }
}

$("#btnSearch").ready(function(){
    
    city = localStorage.getItem('setCity');
    if(city==null)
    {
        main(false)
    }  
    else
    {
        main(true)
    }   
    colorVal = localStorage.getItem('setColor');
    if(colorVal==2)
    {
        pageColor('#4d454e', '#75726d');
    }
    else if(colorVal==3)
    {
        pageColor('#da4fa2', '#d173b5');
    }
});

$("#btnSearch").click(function(){
    city = $("#city").val();
    main(true)
});
$("#city").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btnSearch").click();
    }
});

// ------------------------------Function to set background and icons--------------------------------------
const setIcon = (icon, hour, hourRise, hourSet, id, classImg,  bool)=>{

    if(icon=="Clear"){
        if(hour>=hourRise && hour<=hourSet){
            $(id).append('<img class="'+classImg+'" src="img/clear.png" alt="image"></img>');
            if(bool==true){
                $("body").css({'background-image' : 'url(bg/clear-bg.jpeg)'});
            }
        }
        else{
            $(id).append('<img class="'+classImg+'" src="img/moon.png" alt="image"></img>');
            if(bool==true){
                $("body").css({'background-image' : 'url(bg/clearNight-bg.jpg)'});
            }
        }
     }
     else if(icon=="Clouds"){
        if(hour>hourRise && hour<hourSet){
            $(id).append('<img class="'+classImg+'" src="img/clouds.png" alt="image"></img>');
            if(bool==true){
                $("body").css({'background-image' : 'url(bg/clouds-bg.jpg)'});
            }
        }
        else{
            $(id).append('<img class="'+classImg+'" src="img/cloudsNight.png" alt="image"></img>');
            if(bool==true){
                $("body").css({'background-image' : 'url(bg/clouds-bg.jpg)'});
            }
        }
     }
     else if(icon=="Rain"){
        $(id).append('<img class="'+classImg+'" src="img/rain.png" alt="image"></img>');
        if(bool==true){
            $("body").css({'background-image' : 'url(bg/rain-bg.jpg)'});
        }
     }
     else if(icon=="Mist"||icon=="Fog"){
        $(id).append('<img class="'+classImg+'" src="img/mist.png" alt="image"></img>');
        if(bool==true){
            $("body").css({'background-image' : 'url(bg/mist-bg.jpg)'});
           }
     }
     else if(icon=="Snow"){
        $(id).append('<img class="'+classImg+'" src="img/snow.png" alt="image"></img>');
        if(bool==true){
            $("body").css({'background-image' : 'url(bg/snow-bg.jpg)'});
         }
     }
     else if(icon=="Thunderstorm"){
        $(id).append('<img class="'+classImg+'" src="img/storm.png" alt="image"></img>');
        if(bool==true){
            $("body").css({'background-image' : 'url(bg/storm-bg.jpg)'});
         }
     }
     else if(icon=="Wind"){
        $(id).append('<img class="'+classImg+'" src="img/wind.png" alt="image"></img>');
        if(bool==true){
            $("body").css({'background-image' : 'url(bg/wind-bg.jpg)'});
         }
     }
     else{
        $(id).append('<img class="'+classImg+'" src="..." alt="image"></img>');
     }
}

// ------------------------------Main function--------------------------------------
  const main=(mainBool)=>{

    if(mainBool==false){
        city = "Kraków";  
    }

    riseset =[];

    $.ajax({

        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=8b73082f7b6509b01f99db4dbfae848a',
        success: function(data){

            $("#img").empty();
           
            // City name
            $("#cityName").html(data.name + ", "+ data.sys.country);

            //Date
            var d = new Date((data.dt)*1000);
            var dd = d.getDate();
            var dm = d.getMonth();
            var dy = d.getFullYear();
            today = dd + "." + (dm+1) + "." + dy;

            var lochh = new Date((data.dt+(data.timezone-7200))*1000);
            lochour =lochh.toString();
            var hhh = lochh.getHours();
            var mmm = lochh.getMinutes();
            $("#date").html("Data: "+today + "</br>" +"Czas lokalny: " + lochour.substring(16, 21));

            //Temperature
            var tmp = data.main.temp-273;
            temper = Math.round(tmp);
            $("#temp").html(temper+"<sup>o</sup>C");
            
            //Description
            $("#descr").html("Opis: "+data.weather[0].description);

            //SUNRISE and SUNSET
            var rd = new Date((data.sys.sunrise+(data.timezone-7200))*1000);
            timer = rd.toString();
            rise = timer.substring(16,21);
            var rh = rd.getHours();
            var rm = rd.getMinutes();
            var hourr = (rh+(rm/100));

            var sd = new Date((data.sys.sunset+(data.timezone-7200))*1000);
            times = sd.toString();
            set = times.substring(16,21);
            var sh = sd.getHours();
            var sm = sd.getMinutes();
            var hours = (sh+(sm/100));

            riseset.push(hourr);
            riseset.push(hours);

            $("#sunrise").html(rise);
            $("#sunset").html(set);

            //Icon
             let hour = (hhh+(mmm/100));
             let hourRise = (rh+(rm/100));
             let hourSet = (sh+(sm/100));
             let icon = data.weather[0].main;

             setIcon(icon,hour,hourRise,hourSet, "#img","imgBig", true);

            //Humidity
            $("#humidity").html(data.main.humidity+"%");

            //Pressure
            $("#pressure").html(data.main.pressure+"hPa");

            //Temperature MAX and MIN
            var tmpmax = data.main.temp_max-273;
            tempermax = Math.round(tmpmax);

            var tmpmin = data.main.temp_min-273;
            tempermin = Math.round(tmpmin);

            $("#tempMax").html(tempermax+"<sup>o</sup>C");
            $("#tempMin").html(tempermin+"<sup>o</sup>C");

            //Wind
            var velocity = (Math.round((data.wind.speed*3.6),0));
            $("#wind").html(velocity +"<sup>km</sup>/<sub>h</sub>");

            //Wind direction
            let direct = (data.wind.deg-225);

            $("#navicon").css({'transform' : 'rotate('+ direct +'deg)'});

            if(data.wind.deg<=15 || data.wind.deg>=345){
                $("#windDirection").html("S");
            }
            else if(data.wind.deg<75 && data.wind.deg>15){
                $("#windDirection").html("SW");
            }
            else if(data.wind.deg<=105 && data.wind.deg>=75){
                $("#windDirection").html("W");
            }
            else if(data.wind.deg<165 && data.wind.deg>105){
                $("#windDirection").html("NW");
            }
            else if(data.wind.deg<=195 && data.wind.deg>=165){
                $("#windDirection").html("N");
            }
            else if(data.wind.deg<255 && data.wind.deg>195){
                $("#windDirection").html("NE");
            }
            else if(data.wind.deg<=295 && data.wind.deg>=255){
                $("#windDirection").html("E");
            }
            else if(data.wind.deg<345 && data.wind.deg>295){
                $("#windDirection").html("SE");
            }
            city = $("#city").val(null);   
               
        },

        error: function(){
            if(mainBool==true){
                alert("Wprowdź poprawną nazwę miasta.")
                }     
            localStorage.removeItem('setCity');
        }
    });

    $.ajax({

        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=8b73082f7b6509b01f99db4dbfae848a',
        success: function(data){
            
            
    // ------------------------------Function for 24h and 5 days weather--------------------------------------
            const dailyWeather = (x,y,miniNav)=>{
                $("#weatherHolder").empty();

                let iconids=[];     //<---id icon
                let navigids=[];     //<---id  Wind direction 

                var j=0;
                for(var i=0; i<x; i+=y){

                    //Time
                    var hhmm = new Date((data.list[i].dt+(data.city.timezone-7200))*1000);


                    if(miniNav==true){
                        time2=hhmm.toString();
                        t=time2.substring(16,21);
                    }
                    else{
                        tmphour =hhmm.getHours();
                        time2=hhmm.toString();

                        if(tmphour<=14 && tmphour>=11){

                            t=time2.substring(0,3);
                            if(t=="Mon"){t="Poniedziałek"}
                            if(t=="Tue"){t="Wtorek"}
                            if(t=="Wed"){t="Środa"}
                            if(t=="Thu"){t="Czwartek"}
                            if(t=="Fri"){t="Piątek"}
                            if(t=="Sat"){t="Sobota"}
                            if(t=="Sun"){t="Niedziela"}
                        }
                        else{
                            do{
                                i++;
                                let hhmm = new Date((data.list[i].dt+(data.city.timezone-7200))*1000);
                                tmphour =hhmm.getHours();    
                            }
                            while(tmphour>14 || tmphour<11)

                            let hhmm = new Date((data.list[i].dt+(data.city.timezone-7200))*1000);
                            time2=hhmm.toString();
                            t=time2.substring(0,3);
                            
                            if(t=="Mon"){t="Poniedziałek"}
                            if(t=="Tue"){t="Wtorek"}
                            if(t=="Wed"){t="Środa"}
                            if(t=="Thu"){t="Czwartek"}
                            if(t=="Fri"){t="Piątek"}
                            if(t=="Sat"){t="Sobota"}
                            if(t=="Sun"){t="Niedziela"}
                        }
                    }
                    var hhmm = new Date((data.list[i].dt+(data.city.timezone-7200))*1000);
                   

                    //TEMPERATURE
                    var temper2 = Math.round(data.list[i].main.temp-273);
                    tem=(temper2+"<sup>o</sup>C");

                    //Humidity
                    humi = (data.list[i].main.humidity +"%");

                    //Wind speed
                    var velocity2 = (Math.round(data.list[i].wind.speed*3.6));
                    velo = (velocity2 +"<sup>km</sup>/<sub>h</sub>");

                    var hh = hhmm.getHours();
                    var mm = hhmm.getMinutes();
                    var hour = (hh+(mm/100));
                    var icon = data.list[i].weather[0].main;

                    //Wind direction
                    var navigId= ("navicon"+i);
                    navigids.push(navigId);        

                    //APPEND WeatherHolder
                    var iconId= ("iconid"+i);
                    iconids.push(iconId);

                    $("#weatherHolder").append('<div class="daymin">'+
                        '<div class="templocation"></div>'+
                        '<div class="text-temp navtext">'+t+'</div>'+
                        '<div class="templocation">'+
                            '<div id="'+iconids[j]+'" ></div>'+
                            '<div class="textSearch navtext">'+tem+'</div>'+
                        '</div>'+
                        '<div class="templocation">'+
                            '<img class="imgMin" id="navicon" src="img/humidity.png" alt="humidity"/>'+
                            '<div id="humidity" class="text-min navtext" style="margin-right:10px;">'+humi+'</div>'+
                            '<img class="imgMin" id="'+navigids[j]+'" style="margin-right:5px;" src="img/navigation.png" alt="navigation"/>'+
                            '<div id="wind" class="text-min navtext">'+velo+'</div>'+
                        '</div>'+
                    '</div>')

                    let direct = (data.list[i].wind.deg-225);
                    $("#"+navigids[j]).css({'transform' : 'rotate('+ direct +'deg)'});

                    setIcon(icon,hour,riseset[0],riseset[1], "#"+iconids[j],"img", false);
                   j++;
                }
            }

            dailyWeather(8, 1, true)

                
            $("#weather24").click(function(){
                colorVal = localStorage.getItem('setColor');
                if(colorVal==2)
                {
                    $("#weather5").css({'background-color' : '#4d454e'});
                    $("#weather24").css({'background-color' : '#75726d'});
                }
                
                else if(colorVal==3)
                {
                    $("#weather5").css({'background-color' : '#da4fa2'});
                    $("#weather24").css({'background-color' : '#d173b5'});
                }
                else
                {
                    $("#weather24").css({'background-color' : '#6b5b95'});
                    $("#weather5").css({'background-color' : '#622569'});    
                }
                $("#weatherHolder").empty();
                dailyWeather(8, 1, true)
            });
            $("#weather5").click(function(){
                colorVal = localStorage.getItem('setColor');
                if(colorVal==2)
                {
                    $("#weather24").css({'background-color' : '#4d454e'});
                    $("#weather5").css({'background-color' : '#75726d'});
                }
                
                else if(colorVal==3)
                {
                    $("#weather24").css({'background-color' : '#da4fa2'});
                    $("#weather5").css({'background-color' : '#d173b5'});
                }
                else
                {
                    $("#weather5").css({'background-color' : '#6b5b95'});
                    $("#weather24").css({'background-color' : '#622569'});
                }
                $("#weatherHolder").empty();
                dailyWeather(40, 8, false)
            });
            
        },
        error: function(){
                // if(mainBool==true){
                //     alert("Brak danych o pogodzie.")
                // }       
            }
        });
};

// ------------------------------Function change color--------------------------------------
const pageColor =(firstColor, secondColor) =>
{
    $(".navbar").css({'background-color' : firstColor});
    $("#navWindow").css({'background-color' : firstColor});
    $("#searchmenu").css({'background-color' : firstColor});
    $("#weather5").css({'background-color' : firstColor});
    $(".bottom").css({'background-color' : firstColor});

    $("#lockCity").css({'background-color' : secondColor});
    $("#city").css({'background-color' : secondColor});
    $("#btnSearch").css({'background-color' : secondColor});
    $("#firstContent").css({'background-color' : secondColor});
    $("#weather24").css({'background-color' : secondColor});
    $("#weatherHolder").css({'background-color' : secondColor});
}











