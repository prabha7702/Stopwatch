$(document).ready(()=>{
    const start=$('#start');
    const lap=$('#lap');
    const reset=$('#reset');
    let running=false;
    let timer=$('#timer');
    let hour,minute,sec,msec;
    let h=0,m=0,s=0,ms=0,lapCount=0;
    let timerRef;
    const formatTime=(h,m,s,ms)=>{
        hour=(h<10)?'0'+h:h;
        minute=(m<10)?'0'+m:m;
        sec=(s<10)?'0'+s:s;
        msec=(ms<10)?'0'+ms:ms;
    };
    const showTime=()=>{
        timer.text(`${hour} : ${minute} : ${sec} : ${msec}`);
    };
    const startCounter=()=>{
        ms+=1;
        if(ms==100){
            s+=1;
            ms=0;
            if(s==60){
                m+=1;
                s=0;
                if(m==60){
                    h+=1;
                    m=0;
                }
            }
        }
        formatTime(h,m,s,ms)
        showTime();
    };
    const startTimer=()=>{
        lap.css('visibility','visible');
        reset.css('visibility','visible');
        if(running){
            clearInterval(timerRef);
        }
        timerRef=setInterval(startCounter,10);
        if(!running){
            start.text("Pause");
            running=true;
        }
        else{
            clearInterval(timerRef);
            stopTimer();
        }
    };
    const stopTimer=()=>{
        clearInterval(timerRef);
        start.text("Start");
        running=false;
    };
    const resetTimer=()=>{
        stopTimer();
        h=0,m=0,s=0,ms=0,lapCount=0;
        formatTime(h,m,s,ms);
        showTime();
        $('.laps').empty();
        lap.css('visibility','hidden');
        reset.css('visibility','hidden');
    };
    const lapTimer=()=>{
        formatTime(h,m,s,ms);
        $('.laps').append(`<p>
            <span>${++lapCount}.</span>
            <span>${hour} : ${minute} : ${sec} : ${msec}</span>
        </p>`);
    };
    start.click(startTimer);
    reset.click(resetTimer);
    lap.click(lapTimer);
});