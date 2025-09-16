const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000;


//middleware para configurar a sessão
app.use(express.static('public'));

app.use(session({

    secret: 'meusegredoseguro',
    resave: false, //nao renova a sessão a cada req
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 1000 // 1 minute
    }
}));

//middleware para ler o corpo da requisicao em JSON
app.use(express.json());

app.get('/', (req, res) => {

    if (req.session.usuario) {
        if (req.session.visitas) {
            req.session.visitas++
        } else {
            req.session.visitas = 1;
        }
        res.send(`Oba ${req.session.usuario}, ocê visitou essa pagina ${req.session.visitas} veiz.`);



    } else {
        res.send('ocê visitou essa página 1 veiz. Faze o login!')
    }



});


app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username === 'gustavo' && password === '123') {
        req.session.usuario = username;
        res.send('Login bem sucedido');

    } else {
        res.send('as credencial ta inválidais!')
    }

});

app.get('/perfil', (req, res) => {

    if (req.session.usuario) {
        res.send(`Bem vindo ao seu perfir so ${req.session.usuario}`);
    } else {
        res.send('faze o login primer')
    }

});

// ROTA DO LOGOUT

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Erro ao saírr so')
        }
        res.send('Logauti realizado')
    })
})



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

