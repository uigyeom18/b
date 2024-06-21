import { FRUITS } from "/suika33/fruits.js";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

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
        isStatic : true, // 고정해주는 기능
        render : { fillStyle: '#E6B143'} // 색상지정
    })

    World.add(world,[leftWall,rightWall,ground,topLine]);



    Render.run(render);
    Runner.run(engine);

    //과일 떨어지는 함수 만들기
    function addFruit(){
        //과일 번호
        const index = 0;
        const fruit = FRUITS[index];

        const body = Bodies.circle(300 , 50 , fruit.radius, {
            render : {
                sprite: { texture:`${fruit.name}.png`},
            }
        });

        World.add(world,body)
    }
    addFruit();