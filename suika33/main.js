var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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

    Render.run(render);
    Runner.run(engine);