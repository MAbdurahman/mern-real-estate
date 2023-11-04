import path from 'path';

export default function Template() {

    // language=HTML
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--favicon -->
    <link rel="icon" type="image/png" href='./favicon.png' >
    <title>MERN APP Server</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
        html {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            min-height: 100vh;
            font-family: 'PT Sans', sans-serif;
        }
        
        
        .wrapper {
            width: 100vw;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgb(22, 22, 22);
        }
        
        .page-title {
            text-align: center;
        }
        
        .page-title h1 {
            color: rgb(255, 255, 255);
            font-size: 5rem;
            font-weight: 700;
            margin: 0;
        }
        
        .page-title h2 {
            color: rgb(255, 255, 255);
            font-size: 2rem;
            font-weight: 400;
            margin: 0;
        }
        
        @media screen and (max-width: 600px) {
            .page-title h1 {
                font-size: 3rem;
            }
            .page-title h2 {
                font-size: 1.5rem;
            }
        }
    
    </style>
</head>
<body>
<div class="wrapper">
    <section id="home">
        <div class="page-title">
            <h1>MERN APP SERVER</h1>
            <h2>MongoDB, ExpressJS, ReactJS, and NodeJS</h2>
        </div>
    </section>
</div>

</body>
</html>`
}