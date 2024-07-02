import { FRUITS } from "/suika33/fruits.js";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events;


    //엔진 선언
    const engine = Engine.create();

    // 렌더 선언
    const render = Render.create({
        engine,
        element : document.body,
        options: {
            wireframes : false, // true면 색 설정 안됨
            background : '#F7F4C8', //배경
            width: 620,
            height: 850,
        }
    })

    const world = engine.world;
    const leftWall = Bodies.rectangle(15,395,30,790, {
        isStatic : true ,
        render : {fillStyle: '#E6B143'}
    })

    const rightWall = Bodies.rectangle(605,395,30,790, {
        isStatic : true, // 고정해주는 기능
        render : { fillStyle: '#E6B143'} // 색상지정
    })

    const ground = Bodies.rectangle(310,820,620,60,{
        isStatic : true, // 고정해주는 기능
        render : { fillStyle: '#E6B143'} // 색상지정
    })
    const topLine = Bodies.rectangle(310,150,620,2,{
        name : "topLine",
        isStatic : true, // 고정해주는 기능
        isSensor : true,
        render : { fillStyle: '#E6B143'} // 색상지정
    })

    World.add(world,[leftWall,rightWall,ground,topLine]);



    Render.run(render);
    Runner.run(engine);

    //현재 과일 값을 저장할 변수 생성
    let currentBody = null;
    let currentFruit = null;

    let disableAction = false;

    //과일 떨어지는 함수 만들기
    function addFruit(){
        //과일 번호
        const index = Math.floor(Math.random()*5);
        const fruit = FRUITS[index];

        const body = Bodies.circle(300 , 50 , fruit.radius, {
            index : index,
            isSleeping : true,
            render : {

                sprite: { texture:`${fruit.name}.png`},
              
            },
              restitution : 0.2,
        });

        currentBody = body;
        currentFruit = fruit;

        World.add(world,body)
    }

    window.onkeydown = (event) => {

        if(disableAction)
        return;

        switch(event.code){
            case "KeyA":
                if(currentBody.position.x - currentFruit.radius>30)
                Body.setPosition(currentBody, {
                    x : currentBody.position.x -10,
                    y : currentBody.position.y
                })
                break;
            case "KeyD":
                if(currentBody.position.x + currentFruit.radius<590)
                Body.setPosition(currentBody, {
                    x : currentBody.position.x +10,
                    y : currentBody.position.y
                })
                break;
            case "KeyS":
                currentBody.isSleeping = false;

                disableAction = true;
                setTimeout(()=>{
                    addFruit();
                    disableAction = false;
                },1000);
                break;
        }
    }
    Events.on(engine, "collisionStart",(event)=>{
        //콜리전 이벤트 발생시 생기는 모든 오브젝트를 비교
        event.pairs.forEach((collision)=>{
            if(collision.bodyA.index == collision.bodyB.index){
                //기존 과일의 index를 저장
                const index = collision.bodyA.index;

                //수박일 경우 처리 안함
                if(index === FRUITS.length - 1)
                    return;

                //충돌이 일어나는 같은 과일 제거
                World.remove(world, [collision.bodyA, collision.bodyB]);

                //기존 과일에서 1 증가 시킨 값을 저장
                const newFruit = FRUITS[index + 1];
                const newBody = Bodies.circle(
                    //부딪친 위치의 x,y값
                    collision.collision.supports[0].x,
                    collision.collision.supports[0].y,

                    newFruit.radius,
                    {
                        index : index + 1,
                        render : {sprite : { texture : `${newFruit.name}.png`}},
                    }
                );
                World.add(world,newBody);
              
            }
            if(!disableAction && (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")){
                alert("game over")
                disableAction = true;
            }
        })
    });

    addFruit();
    