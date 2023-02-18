status1="";
object=[];

function setup(){
    canvas=createCanvas(480 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480 , 380);
    if (status1 != ""){
        objectDetector.detect(video , gotresult);
        for(i=0 ; i<=object.length; i++);{
            document.getElementById('status').innerHTML ='status : object detceted';
           
            fill('red');
            percent = floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+'%',object[i].x ,object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x ,object[i].y ,object[i].width, object[i].height);
            

            
              if (object[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotresult);
                  document.getElementById('status1').innerHTML =object_name+'Found';
                  var synth=window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(object_name+'Found');
            synth.speak(utterThis);
              }
              else{
                document.getElementById('status1').innerHTML =object_name+'Not Found';
              }

        }
    }
    
    }
    
    function start(){
        objectDetector = ml5.objectDetector('cocossd' , load);
        object_name= document.getElementById('input').value;
    document.getElementById('status').innerHTML= 'status: detecting objects';
    }
    
    function load(){
        console.log("load");
        status1= true;
    }

    function gotresult(error,result)
{
    if (error){
        console.log(error);
    }
    console.log(result);
    object=result;
}
