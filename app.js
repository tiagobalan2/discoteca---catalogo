const { sequelize, models } = require('./models');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const albumRoutes = require('./routes/albumRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const generoRoutes = require('./routes/generoRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.use('/albuns', albumRoutes);
app.use('/artistas', artistaRoutes);
app.use('/generos', generoRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.redirect('/albuns');  // 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Sincronização concluída!");
  })
  .catch(err => {
    console.error("Erro na sincronização:", err);
});
