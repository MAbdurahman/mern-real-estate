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
    <link rel="icon" type="image/png" href="https://res.cloudinary.com/mdbdrrhm/image/upload/v1699189975/favicons/favicon_jouvmk.png">
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
            overflow: hidden;
        }
        
        
        .wrapper {
            position: relative;
            width: 100vw;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgb(22, 22, 22);
        }
        #home {
            position: relative;
            height: 100%;
            width: 100%;
        }
        .brand {
            display: -webkit-box;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
        }
        .brand-gif {
            width: 55%;
            display: -webkit-box;
            display: flex;
            align-self: center;
        }
        
        @media screen and (max-width: 768px) {
            .brand-gif {
                width: 60%;
            }
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
        @media screen and (max-width: 420px) {
            .page-title h1 {
                font-size: 2rem;
            }
            .page-title h2 {
                font-size: 1.125rem;
            }
            
        }
    
    </style>
</head>
<body>
<div class="wrapper">
    <!-- begin of brand -->
    <div class="brand" >
        <img src="https://res.cloudinary.com/mdbdrrhm/image/upload/v1699189765/gifs/3-gears-set_llqhcz.gif" alt="three animated cogs" class="brand-gif"/>
    </div>
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